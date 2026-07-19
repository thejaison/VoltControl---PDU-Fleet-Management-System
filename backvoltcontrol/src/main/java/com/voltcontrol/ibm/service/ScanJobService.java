package com.voltcontrol.ibm.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import com.voltcontrol.ibm.dto.CreateScanJobRequestDto;
import com.voltcontrol.ibm.dto.ScanJobResponseDto;
import com.voltcontrol.ibm.entity.Device;
import com.voltcontrol.ibm.entity.ScanJob;
import com.voltcontrol.ibm.entity.ScanJobDevice;
import com.voltcontrol.ibm.repository.DeviceRepository;
import com.voltcontrol.ibm.repository.ScanJobDeviceRepository;
import com.voltcontrol.ibm.repository.ScanJobRepository;

@Service
public class ScanJobService {

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private ScanJobRepository scanJobRepository;

    @Autowired
    private ScanJobDeviceRepository scanJobDeviceRepository;

    @Transactional
    public ScanJobResponseDto createScanJob(CreateScanJobRequestDto request) {
        List<String> requestedUuids = request.getDeviceUuids();

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
        scanJob.setCreatedByEmpId("SYSTEM");
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
                scanJob.getCreatedTimestamp());
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