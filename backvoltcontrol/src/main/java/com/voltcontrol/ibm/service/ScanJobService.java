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
        scanJob.setStatus("QUEUED");
        scanJob.setTotalDevices(foundDevices.size());
        scanJob.setCompletedDevices(0);
        scanJob.setCreatedByEmpId(user.getId().getEmpId());
        scanJob = scanJobRepository.save(scanJob);

        for (Device device : foundDevices) {
            ScanJobDevice sjd = new ScanJobDevice();
            sjd.setScanJob(scanJob);
            sjd.setDevice(device);
            sjd.setStatus("QUEUED");
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
        ScanJob scanJob = scanJobRepository.findByUuid(uuid);
        if (scanJob == null) return;

        self.startScanJob(scanJob.getId());

        List<ScanJobDevice> scanJobDevices = scanJobDeviceRepository.findByScanJob_Id(scanJob.getId());
        for (ScanJobDevice sjd : scanJobDevices) {
            self.scanSingleDevice(sjd.getId());
        }
    }

    @Transactional
    public void startScanJob(Long jobId) {
        ScanJob scanJob = scanJobRepository.findById(jobId).orElse(null);
        if (scanJob == null) return;

        scanJob.setStatus("RUNNING");
        scanJob.setStartedTimestamp(LocalDateTime.now());
        scanJobRepository.save(scanJob);

        List<ScanJobDevice> scanJobDevices = scanJobDeviceRepository.findByScanJob_Id(jobId);
        for (ScanJobDevice sjd : scanJobDevices) {
            if (!"COMPLETED".equalsIgnoreCase(sjd.getStatus())) {
                sjd.setStatus("RUNNING");
                sjd.setStartedTimestamp(LocalDateTime.now());
                scanJobDeviceRepository.save(sjd);
            }
        }
    }

    @Transactional
    public void scanSingleDevice(Long scanJobDeviceId) {
        ScanJobDevice sjd = scanJobDeviceRepository.findById(scanJobDeviceId).orElse(null);
        if (sjd == null) return;

        if ("COMPLETED".equalsIgnoreCase(sjd.getStatus())) {
            return;
        }

        Device device = sjd.getDevice();
        ScanJob scanJob = sjd.getScanJob();

        if ("CANCELLED".equalsIgnoreCase(scanJob.getStatus())) {
            sjd.setStatus("CANCELLED");
            sjd.setCompletedTimestamp(LocalDateTime.now());
            scanJobDeviceRepository.save(sjd);
            updateScanJobProgress(scanJob.getId());
            return;
        }

        try {
            simulateDeviceScan(device);
            ScanJob updatedScanJob = scanJobRepository.findById(scanJob.getId()).orElse(scanJob);
            if ("CANCELLED".equalsIgnoreCase(updatedScanJob.getStatus())) {
                sjd.setStatus("CANCELLED");
                sjd.setCompletedTimestamp(LocalDateTime.now());
                scanJobDeviceRepository.save(sjd);
                updateScanJobProgress(scanJob.getId());
                return;
            }
            sjd.setStatus("COMPLETED");
            sjd.setCompletedTimestamp(LocalDateTime.now());
        } catch (Exception e) {
            ScanJob updatedScanJob = scanJobRepository.findById(scanJob.getId()).orElse(scanJob);
            if ("CANCELLED".equalsIgnoreCase(updatedScanJob.getStatus())) {
                sjd.setStatus("CANCELLED");
                sjd.setCompletedTimestamp(LocalDateTime.now());
                scanJobDeviceRepository.save(sjd);
                updateScanJobProgress(scanJob.getId());
                return;
            }
            sjd.setStatus("FAILED");
            sjd.setErrorMessage(e.getMessage() != null ? e.getMessage() : "Connection timed out");
            sjd.setCompletedTimestamp(LocalDateTime.now());

            device.setOperationalStatus("Offline");
            device.setOperationalDetails("Scan failed: " + sjd.getErrorMessage());
            deviceRepository.save(device);
        }
        scanJobDeviceRepository.save(sjd);

        // Update progress in the same transaction to prevent race conditions
        updateScanJobProgress(scanJob.getId());
    }

    @Transactional
    public ScanJobResponseDto cancelScanJob(String uuid) {
        ScanJob scanJob = scanJobRepository.findByUuid(uuid);
        if (scanJob == null) {
            throw new NoSuchElementException("Scan job not found: " + uuid);
        }

        String status = scanJob.getStatus();
        if ("RUNNING".equalsIgnoreCase(status) || "QUEUED".equalsIgnoreCase(status) || "In Progress".equalsIgnoreCase(status)) {
            scanJob.setStatus("CANCELLED");
            scanJob.setCompletedTimestamp(LocalDateTime.now());
            scanJobRepository.save(scanJob);

            List<ScanJobDevice> scanJobDevices = scanJobDeviceRepository.findByScanJob_Id(scanJob.getId());
            for (ScanJobDevice sjd : scanJobDevices) {
                if ("QUEUED".equalsIgnoreCase(sjd.getStatus()) || "RUNNING".equalsIgnoreCase(sjd.getStatus())) {
                    sjd.setStatus("CANCELLED");
                    sjd.setCompletedTimestamp(LocalDateTime.now());
                    scanJobDeviceRepository.save(sjd);
                }
            }
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
        if ("FAILED".equalsIgnoreCase(status) || "CANCELLED".equalsIgnoreCase(status)) {
            scanJob.setStatus("QUEUED");
            scanJobRepository.save(scanJob);

            List<ScanJobDevice> scanJobDevices = scanJobDeviceRepository.findByScanJob_Id(scanJob.getId());
            for (ScanJobDevice sjd : scanJobDevices) {
                if (!"COMPLETED".equalsIgnoreCase(sjd.getStatus())) {
                    sjd.setStatus("QUEUED");
                    sjd.setErrorMessage(null);
                    sjd.setStartedTimestamp(null);
                    sjd.setCompletedTimestamp(null);
                    scanJobDeviceRepository.save(sjd);
                }
            }

            jobScheduler.enqueue(() -> self.executeScanJob(uuid));
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

        scanJob.setStatus("QUEUED");
        scanJob.setCompletedDevices(0);
        scanJob.setStartedTimestamp(null);
        scanJob.setCompletedTimestamp(null);
        scanJobRepository.save(scanJob);

        List<ScanJobDevice> scanJobDevices = scanJobDeviceRepository.findByScanJob_Id(scanJob.getId());
        for (ScanJobDevice sjd : scanJobDevices) {
            sjd.setStatus("QUEUED");
            sjd.setErrorMessage(null);
            sjd.setStartedTimestamp(null);
            sjd.setCompletedTimestamp(null);
            scanJobDeviceRepository.save(sjd);
        }

        jobScheduler.enqueue(() -> self.executeScanJob(uuid));

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
        boolean anyFailed = false;
        boolean allFinished = true;

        for (ScanJobDevice sjd : sjds) {
            if ("COMPLETED".equalsIgnoreCase(sjd.getStatus()) || "FAILED".equalsIgnoreCase(sjd.getStatus())) {
                completedCount++;
            } else {
                allFinished = false;
            }
            if ("FAILED".equalsIgnoreCase(sjd.getStatus())) {
                anyFailed = true;
            }
        }

        scanJob.setCompletedDevices(completedCount);

        if (allFinished) {
            scanJob.setStatus(anyFailed ? "FAILED" : "COMPLETED");
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

    private boolean isNotValidUuid(String value) {
        try {
            UUID.fromString(value);
            return false;
        } catch (IllegalArgumentException | NullPointerException e) {
            return true;
        }
    }
}