package com.voltcontrol.ibm.service;

import java.io.IOException;
import java.net.ConnectException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.jobrunr.scheduling.JobScheduler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import com.voltcontrol.ibm.dto.CreateScanJobRequestDto;
import com.voltcontrol.ibm.dto.ScanJobResponseDto;
import com.voltcontrol.ibm.dto.ScanResultResponseDto;
import com.voltcontrol.ibm.dto.ScanDeviceResultResponseDto;
import com.voltcontrol.ibm.entity.Device;
import com.voltcontrol.ibm.entity.ScanJob;
import com.voltcontrol.ibm.entity.ScanJobDevice;
import com.voltcontrol.ibm.entity.User;
import com.voltcontrol.ibm.repository.DeviceRepository;
import com.voltcontrol.ibm.repository.ScanJobDeviceRepository;
import com.voltcontrol.ibm.repository.ScanJobRepository;
import com.voltcontrol.ibm.repository.UserRepository;

@Service
public class ScanJobService {

    @Autowired
    private DeviceRepository deviceRepository;

    private final java.util.Map<String, org.springframework.web.servlet.mvc.method.annotation.SseEmitter> emitters = new java.util.concurrent.ConcurrentHashMap<>();
    private final java.util.concurrent.ScheduledExecutorService scheduler = java.util.concurrent.Executors.newScheduledThreadPool(1);

    @jakarta.annotation.PostConstruct
    public void init() {
        scheduler.scheduleAtFixedRate(this::sendHeartbeats, 10, 10, java.util.concurrent.TimeUnit.SECONDS);
    }

    private void sendHeartbeats() {
        emitters.forEach((uuid, emitter) -> {
            try {
                emitter.send(org.springframework.web.servlet.mvc.method.annotation.SseEmitter.event()
                        .name("heartbeat")
                        .data("ping"));
            } catch (Exception e) {
                emitter.complete();
                emitters.remove(uuid);
            }
        });
    }

    @jakarta.annotation.PreDestroy
    public void shutdown() {
        scheduler.shutdown();
    }

    @Autowired
    private ScanJobRepository scanJobRepository;

    @Autowired
    private ScanJobDeviceRepository scanJobDeviceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    @Lazy
    private ScanJobService self;

    @Autowired
    private JobScheduler jobScheduler;

    @Transactional
    public ScanJobResponseDto createScanJob(CreateScanJobRequestDto request) {
        List<String> requestedUuids = request.getDeviceUuids();

        // Verify user existence and ADMIN role
        User user = userRepository.findByEmpId(request.getCreatedByEmpId())
                .orElseThrow(() -> new NoSuchElementException("User not found: " + request.getCreatedByEmpId()));

        if (!"ADMIN".equalsIgnoreCase(user.getRole())) {
            throw new IllegalArgumentException("Permission Denied: Only administrators can create scan jobs.");
        }

        List<String> malformed = requestedUuids.stream()
                .filter(this::isNotValidUuid)
                .collect(Collectors.toList());

        if (!malformed.isEmpty()) {
            throw new IllegalArgumentException("Invalid device UUID format: " + String.join(", ", malformed));
        }

        // --- this block was missing: look up devices, check they all exist ---
        List<Device> foundDevices = deviceRepository.findByUuidIn(requestedUuids);
        Set<String> foundUuids = foundDevices.stream()
                .map(Device::getUuid)
                .collect(Collectors.toSet());

        List<String> missing = requestedUuids.stream()
                .filter(id -> !foundUuids.contains(id))
                .collect(Collectors.toList());

        if (!missing.isEmpty()) {
            throw new NoSuchElementException("Device(s) not found: " + String.join(", ", missing));
        }
        // --- end of missing block ---

        List<String> disabled = foundDevices.stream()
                .filter(d -> !"ENABLED".equalsIgnoreCase(d.getEnabledStatus()))
                .map(Device::getUuid)
                .collect(Collectors.toList());

        if (!disabled.isEmpty()) {
            throw new IllegalStateException(
                    "Device(s) disabled, cannot be scanned: " + String.join(", ", disabled));
        }

        ScanJob scanJob = new ScanJob();
        scanJob.setUuid(UUID.randomUUID().toString());
        scanJob.setStatus("Queued");
        scanJob.setTotalDevices(foundDevices.size());
        scanJob.setCompletedDevices(0);
        scanJob.setCreatedByEmpId(user.getId().getEmpId());
        scanJob = scanJobRepository.save(scanJob);

        for (Device device : foundDevices) {
            ScanJobDevice sjd = new ScanJobDevice();
            sjd.setScanJob(scanJob);
            sjd.setDevice(device);
            sjd.setStatus("Queued");
            scanJobDeviceRepository.save(sjd);
        }

        return new ScanJobResponseDto(
                scanJob.getUuid(),
                scanJob.getStatus(),
                scanJob.getTotalDevices(),
                scanJob.getCompletedDevices(),
                scanJob.getCreatedTimestamp(),
                scanJob.getCreatedByEmpId());
    }

    public void executeScanJob(String uuid) {
        try {
            ScanJob scanJob = scanJobRepository.findByUuid(uuid);
            if (scanJob == null) return;

            self.startScanJob(scanJob.getId());
            sendProgressUpdate(uuid);

            List<ScanJobDevice> scanJobDevices = scanJobDeviceRepository.findByScanJob_Id(scanJob.getId());
            for (ScanJobDevice sjd : scanJobDevices) {
                self.scanSingleDevice(sjd.getId());
            }
        } catch (Exception e) {
            org.springframework.web.servlet.mvc.method.annotation.SseEmitter emitter = emitters.get(uuid);
            if (emitter != null) {
                try {
                    emitter.send(org.springframework.web.servlet.mvc.method.annotation.SseEmitter.event()
                            .name("error")
                            .data(e.getMessage() != null ? e.getMessage() : "Unknown execution error"));
                    emitter.complete();
                } catch (Exception ignored) {}
                emitters.remove(uuid);
            }
        }
    }

    @Transactional
    public void startScanJob(Long jobId) {
        ScanJob scanJob = scanJobRepository.findById(jobId).orElse(null);
        if (scanJob == null) return;

        scanJob.setStatus("Running");
        scanJob.setStartedTimestamp(LocalDateTime.now());
        scanJobRepository.save(scanJob);

        List<ScanJobDevice> scanJobDevices = scanJobDeviceRepository.findByScanJob_Id(jobId);
        for (ScanJobDevice sjd : scanJobDevices) {
            if (!"Succeeded".equalsIgnoreCase(sjd.getStatus())) {
                sjd.setStatus("Running");
                sjd.setStartedTimestamp(LocalDateTime.now());
                scanJobDeviceRepository.save(sjd);
            }
        }
    }

    @Transactional
    public void scanSingleDevice(Long scanJobDeviceId) {
        ScanJobDevice sjd = scanJobDeviceRepository.findById(scanJobDeviceId).orElse(null);
        if (sjd == null) return;

        if ("Succeeded".equalsIgnoreCase(sjd.getStatus()) || "Failed".equalsIgnoreCase(sjd.getStatus()) || "Timed out".equalsIgnoreCase(sjd.getStatus()) || "Cancelled".equalsIgnoreCase(sjd.getStatus())) {
            return;
        }

        Device device = sjd.getDevice();
        ScanJob scanJob = sjd.getScanJob();

        if ("Cancelled".equalsIgnoreCase(scanJob.getStatus())) {
            sjd.setStatus("Cancelled");
            sjd.setCompletedTimestamp(LocalDateTime.now());
            scanJobDeviceRepository.save(sjd);
            updateScanJobProgress(scanJob.getId());
            sendProgressUpdate(scanJob.getUuid());
            return;
        }

        try {
            simulateDeviceScan(device);
            ScanJob updatedScanJob = scanJobRepository.findById(scanJob.getId()).orElse(scanJob);
            if ("Cancelled".equalsIgnoreCase(updatedScanJob.getStatus())) {
                sjd.setStatus("Cancelled");
                sjd.setCompletedTimestamp(LocalDateTime.now());
                sjd.setScanResultData(generateMockScanResultData(device, "Cancelled", "Scan cancelled by user"));
                scanJobDeviceRepository.save(sjd);
                updateScanJobProgress(scanJob.getId());
                sendProgressUpdate(scanJob.getUuid());
                return;
            }
            sjd.setStatus("Succeeded");
            sjd.setCompletedTimestamp(LocalDateTime.now());
            sjd.setScanResultData(generateMockScanResultData(device, "Succeeded", null));
        } catch (Exception e) {
            ScanJob updatedScanJob = scanJobRepository.findById(scanJob.getId()).orElse(scanJob);
            if ("Cancelled".equalsIgnoreCase(updatedScanJob.getStatus())) {
                sjd.setStatus("Cancelled");
                sjd.setCompletedTimestamp(LocalDateTime.now());
                sjd.setScanResultData(generateMockScanResultData(device, "Cancelled", "Scan cancelled by user"));
                scanJobDeviceRepository.save(sjd);
                updateScanJobProgress(scanJob.getId());
                sendProgressUpdate(scanJob.getUuid());
                return;
            }

            String errorMsg = e.getMessage() != null ? e.getMessage() : "Connection timed out";
            boolean isTimeout = errorMsg.toLowerCase().contains("timeout") || errorMsg.toLowerCase().contains("time out") || e instanceof java.net.SocketTimeoutException || e instanceof java.net.ConnectException;
            String deviceStatus = isTimeout ? "Timed out" : "Failed";

            sjd.setStatus(deviceStatus);
            sjd.setErrorMessage(errorMsg);
            sjd.setCompletedTimestamp(LocalDateTime.now());
            sjd.setScanResultData(generateMockScanResultData(device, deviceStatus, errorMsg));

            device.setOperationalStatus("Offline");
            device.setOperationalDetails("Scan failed: " + sjd.getErrorMessage());
            deviceRepository.save(device);
        }
        scanJobDeviceRepository.save(sjd);

        // Update progress in the same transaction to prevent race conditions
        updateScanJobProgress(scanJob.getId());
        sendProgressUpdate(scanJob.getUuid());
    }

    @Transactional
    public ScanJobResponseDto cancelScanJob(String uuid) {
        ScanJob scanJob = scanJobRepository.findByUuid(uuid);
        if (scanJob == null) {
            throw new NoSuchElementException("Scan job not found: " + uuid);
        }

        String status = scanJob.getStatus();
        if ("Running".equalsIgnoreCase(status) || "Queued".equalsIgnoreCase(status) || "In Progress".equalsIgnoreCase(status)) {
            scanJob.setStatus("Cancelled");
            scanJob.setCompletedTimestamp(LocalDateTime.now());
            scanJobRepository.save(scanJob);

            List<ScanJobDevice> scanJobDevices = scanJobDeviceRepository.findByScanJob_Id(scanJob.getId());
            for (ScanJobDevice sjd : scanJobDevices) {
                if ("Queued".equalsIgnoreCase(sjd.getStatus()) || "Running".equalsIgnoreCase(sjd.getStatus())) {
                    sjd.setStatus("Cancelled");
                    sjd.setCompletedTimestamp(LocalDateTime.now());
                    scanJobDeviceRepository.save(sjd);
                }
            }
            sendProgressUpdate(uuid);
        }

        return new ScanJobResponseDto(
                scanJob.getUuid(),
                scanJob.getStatus(),
                scanJob.getTotalDevices(),
                scanJob.getCompletedDevices(),
                scanJob.getCreatedTimestamp(),
                scanJob.getCreatedByEmpId());
    }

    @Transactional
    public ScanJobResponseDto continueScanJob(String uuid) {
        ScanJob scanJob = scanJobRepository.findByUuid(uuid);
        if (scanJob == null) {
            throw new NoSuchElementException("Scan job not found: " + uuid);
        }

        String status = scanJob.getStatus();
        if ("Failed".equalsIgnoreCase(status) || "Cancelled".equalsIgnoreCase(status)) {
            scanJob.setStatus("Queued");
            scanJobRepository.save(scanJob);

            List<ScanJobDevice> scanJobDevices = scanJobDeviceRepository.findByScanJob_Id(scanJob.getId());
            for (ScanJobDevice sjd : scanJobDevices) {
                if (!"Succeeded".equalsIgnoreCase(sjd.getStatus())) {
                    sjd.setStatus("Queued");
                    sjd.setErrorMessage(null);
                    sjd.setStartedTimestamp(null);
                    sjd.setCompletedTimestamp(null);
                    sjd.setScanResultData(null);
                    scanJobDeviceRepository.save(sjd);
                }
            }

            jobScheduler.enqueue(() -> self.executeScanJob(uuid));
            sendProgressUpdate(uuid);
        }

        return new ScanJobResponseDto(
                scanJob.getUuid(),
                scanJob.getStatus(),
                scanJob.getTotalDevices(),
                scanJob.getCompletedDevices(),
                scanJob.getCreatedTimestamp(),
                scanJob.getCreatedByEmpId());
    }

    @Transactional
    public ScanJobResponseDto scanAgain(String uuid) {
        ScanJob scanJob = scanJobRepository.findByUuid(uuid);
        if (scanJob == null) {
            throw new NoSuchElementException("Scan job not found: " + uuid);
        }

        scanJob.setStatus("Queued");
        scanJob.setCompletedDevices(0);
        scanJob.setStartedTimestamp(null);
        scanJob.setCompletedTimestamp(null);
        scanJobRepository.save(scanJob);

        List<ScanJobDevice> scanJobDevices = scanJobDeviceRepository.findByScanJob_Id(scanJob.getId());
        for (ScanJobDevice sjd : scanJobDevices) {
            sjd.setStatus("Queued");
            sjd.setErrorMessage(null);
            sjd.setStartedTimestamp(null);
            sjd.setCompletedTimestamp(null);
            sjd.setScanResultData(null);
            scanJobDeviceRepository.save(sjd);
        }

        jobScheduler.enqueue(() -> self.executeScanJob(uuid));
        sendProgressUpdate(uuid);

        return new ScanJobResponseDto(
                scanJob.getUuid(),
                scanJob.getStatus(),
                scanJob.getTotalDevices(),
                scanJob.getCompletedDevices(),
                scanJob.getCreatedTimestamp(),
                scanJob.getCreatedByEmpId());
    }

    @Transactional
    public void updateScanJobProgress(Long jobId) {
        ScanJob scanJob = scanJobRepository.findById(jobId).orElse(null);
        if (scanJob == null) return;

        List<ScanJobDevice> sjds = scanJobDeviceRepository.findByScanJob_Id(jobId);

        int completedCount = 0;
        int succeededCount = 0;
        int errorCount = 0;
        int cancelledCount = 0;
        boolean allFinished = true;

        for (ScanJobDevice sjd : sjds) {
            String s = sjd.getStatus();
            if ("Succeeded".equalsIgnoreCase(s) || "Failed".equalsIgnoreCase(s) || "Timed out".equalsIgnoreCase(s) || "Cancelled".equalsIgnoreCase(s)) {
                completedCount++;
                if ("Succeeded".equalsIgnoreCase(s)) {
                    succeededCount++;
                } else if ("Failed".equalsIgnoreCase(s) || "Timed out".equalsIgnoreCase(s)) {
                    errorCount++;
                } else if ("Cancelled".equalsIgnoreCase(s)) {
                    cancelledCount++;
                }
            } else {
                allFinished = false;
            }
        }

        scanJob.setCompletedDevices(completedCount);

        if (allFinished) {
            if (cancelledCount == sjds.size()) {
                scanJob.setStatus("Cancelled");
            } else if (errorCount > 0) {
                if (succeededCount > 0) {
                    scanJob.setStatus("Completed with errors");
                } else {
                    scanJob.setStatus("Failed");
                }
            } else {
                scanJob.setStatus("Completed");
            }
            scanJob.setCompletedTimestamp(LocalDateTime.now());
        }

        scanJobRepository.save(scanJob);
    }

    private void simulateDeviceScan(Device device) throws Exception {
        String adapter = device.getAdapterType() != null ? device.getAdapterType() : "SNMP";
        String ip = device.getIpAddress();

        if (ip == null || ip.isBlank()) {
            throw new IllegalArgumentException("Connection failed: device IP address is empty");
        }

        // Apply connection and collection timeouts simulated (sleep 1.5 seconds)
        try {
            Thread.sleep(1500);
        } catch (InterruptedException ie) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Scan interrupted");
        }

        // Simulate failures based on IP or name for demo/testing
        if (ip.startsWith("192.168.99") || (device.getDeviceName() != null && device.getDeviceName().toLowerCase().contains("fail"))) {
            throw new ConnectException("Connection timed out to " + ip + " after 1000ms");
        }

        if ("UNKNOWN".equalsIgnoreCase(adapter) || "INVALID".equalsIgnoreCase(adapter)) {
            throw new IOException("Adapter protocol error: unsupported adapter type: " + adapter);
        }

        device.setOperationalStatus("Online");
        device.setOperationalDetails("Successfully scanned using " + adapter + " adapter");
        
        String lastSeenStr = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) + " UTC";
        device.setLastSeen(lastSeenStr);

        deviceRepository.save(device);
    }

    public List<ScanJobResponseDto> getAllScanJobs() {
        return scanJobRepository.findAll(Sort.by(Sort.Direction.DESC, "createdTimestamp")).stream()
                .map(scanJob -> new ScanJobResponseDto(
                        scanJob.getUuid(),
                        scanJob.getStatus(),
                        scanJob.getTotalDevices(),
                        scanJob.getCompletedDevices(),
                        scanJob.getCreatedTimestamp(),
                        scanJob.getCreatedByEmpId()))
                .collect(Collectors.toList());
    }

    public List<ScanResultResponseDto> getRecentScanResults() {
        org.springframework.data.domain.Pageable limit = org.springframework.data.domain.PageRequest.of(0, 10);
        List<ScanJobDevice> results = scanJobDeviceRepository.findRecentResults(limit);
        return results.stream()
                .map(sjd -> new ScanResultResponseDto(
                        sjd.getDevice().getDeviceName(),
                        sjd.getDevice().getIpAddress(),
                        sjd.getDevice().getModel(),
                        sjd.getStatus(),
                        sjd.getErrorMessage(),
                        sjd.getUpdatedTimestamp()))
                .collect(Collectors.toList());
    }

    public List<ScanDeviceResultResponseDto> getAllScanDeviceResults() {
        return scanJobDeviceRepository.findAllScanDeviceResults().stream()
                .map(sjd -> new ScanDeviceResultResponseDto(
                        sjd.getId(),
                        sjd.getScanJob().getUuid(),
                        sjd.getDevice().getDeviceName(),
                        sjd.getDevice().getIpAddress(),
                        sjd.getDevice().getModel(),
                        sjd.getStatus(),
                        sjd.getErrorMessage(),
                        sjd.getScanResultData(),
                        sjd.getUpdatedTimestamp()))
                .collect(Collectors.toList());
    }

    public org.springframework.web.servlet.mvc.method.annotation.SseEmitter registerProgressEmitter(String uuid) {
        org.springframework.web.servlet.mvc.method.annotation.SseEmitter emitter = new org.springframework.web.servlet.mvc.method.annotation.SseEmitter(180000L); // 3 minutes timeout
        emitters.put(uuid, emitter);

        emitter.onCompletion(() -> emitters.remove(uuid));
        emitter.onTimeout(() -> emitters.remove(uuid));
        emitter.onError((ex) -> emitters.remove(uuid));

        try {
            emitter.send(org.springframework.web.servlet.mvc.method.annotation.SseEmitter.event()
                    .name("heartbeat")
                    .data("connected"));
        } catch (Exception e) {
            emitters.remove(uuid);
        }

        return emitter;
    }

    public void sendProgressUpdate(String uuid) {
        org.springframework.web.servlet.mvc.method.annotation.SseEmitter emitter = emitters.get(uuid);
        if (emitter == null) return;

        ScanJob scanJob = scanJobRepository.findByUuid(uuid);
        if (scanJob == null) return;

        try {
            int percent = scanJob.getTotalDevices() > 0 ? Math.round(((float)scanJob.getCompletedDevices() / scanJob.getTotalDevices()) * 100) : 0;
            
            java.util.Map<String, Object> payload = new java.util.HashMap<>();
            payload.put("uuid", scanJob.getUuid());
            payload.put("status", scanJob.getStatus());
            payload.put("completedDevices", scanJob.getCompletedDevices());
            payload.put("totalDevices", scanJob.getTotalDevices());
            payload.put("percent", percent);

            if ("Completed".equalsIgnoreCase(scanJob.getStatus()) || 
                "Completed with errors".equalsIgnoreCase(scanJob.getStatus()) || 
                "Failed".equalsIgnoreCase(scanJob.getStatus()) || 
                "Cancelled".equalsIgnoreCase(scanJob.getStatus())) {
                
                emitter.send(org.springframework.web.servlet.mvc.method.annotation.SseEmitter.event()
                        .name("completed")
                        .data(payload));
                emitter.complete();
                emitters.remove(uuid);
            } else {
                emitter.send(org.springframework.web.servlet.mvc.method.annotation.SseEmitter.event()
                        .name("progress")
                        .data(payload));
            }
        } catch (Exception e) {
            emitters.remove(uuid);
        }
    }

    private String generateMockScanResultData(Device device, String status, String errorMsg) {
        try {
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            java.util.Map<String, Object> data = new java.util.HashMap<>();
            data.put("deviceStatus", "Succeeded".equalsIgnoreCase(status) ? "Online" : "Offline");
            data.put("connectionResult", "Succeeded".equalsIgnoreCase(status) ? "Connected" : "Failed");
            data.put("deviceIdentification", "Asset-" + (device.getAssetId() != null ? device.getAssetId() : "UNK"));
            data.put("model", device.getModel() != null ? device.getModel() : "APC AP7953");
            data.put("serialNumber", device.getSerialNumber() != null ? device.getSerialNumber() : "SN-SIM-" + Math.abs(device.hashCode() % 1000000));
            data.put("firmwareVersion", "v6.8.2");
            data.put("collectionTimestamp", java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            
            if (errorMsg != null) {
                data.put("errorMessage", errorMsg);
            } else {
                java.util.List<java.util.Map<String, Object>> outlets = new java.util.ArrayList<>();
                for (int i = 1; i <= 4; i++) {
                    java.util.Map<String, Object> outlet = new java.util.HashMap<>();
                    outlet.put("id", i);
                    outlet.put("name", "Outlet " + i);
                    outlet.put("status", Math.random() > 0.2 ? "ON" : "OFF");
                    outlet.put("load", String.format(java.util.Locale.US, "%.2f A", Math.random() * 2.5));
                    outlets.add(outlet);
                }
                data.put("outlets", outlets);

                java.util.Map<String, Object> electrical = new java.util.HashMap<>();
                electrical.put("voltage", "230.4 V");
                electrical.put("current", String.format(java.util.Locale.US, "%.1f A", 2.0 + Math.random() * 3.0));
                electrical.put("activePower", String.format(java.util.Locale.US, "%.0f W", 400 + Math.random() * 500));
                electrical.put("frequency", "50.0 Hz");
                data.put("electrical", electrical);

                data.put("rawDeviceData", "SNMPv2-MIB::sysDescr.0 = STRING: Simulated PDU Adapter=" + (device.getAdapterType() != null ? device.getAdapterType() : "SNMP"));
            }

            return mapper.writeValueAsString(data);
        } catch (Exception e) {
            return "{\"error\":\"Failed to generate scan data: \"}";
        }
    }

    private boolean isNotValidUuid(String value) {
        try {
            UUID.fromString(value);
            return false;
        } catch (IllegalArgumentException | NullPointerException e) {
            return true;
        }
    }
}