package com.voltcontrol.ibm.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.voltcontrol.ibm.dto.DeviceDto;
import com.voltcontrol.ibm.entity.Device;
import com.voltcontrol.ibm.repository.DeviceRepository;
import com.voltcontrol.ibm.repository.DeviceSpecifications;

@RestController
@RequestMapping("/api/devices")
@CrossOrigin(origins = "http://localhost:5173")
public class DeviceController {

    @Autowired
    private DeviceRepository deviceRepository;

    @PostMapping
    public ResponseEntity<Device> createDevice(@RequestBody DeviceDto dto) {
        Device device = new Device();
        mapDtoToDevice(dto, device);
        Device saved = deviceRepository.save(device);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDevice(@PathVariable Long id, @RequestBody DeviceDto dto) {
        Optional<Device> opt = deviceRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Device not found.");
        }
        Device device = opt.get();
        mapDtoToDevice(dto, device);
        return ResponseEntity.ok(deviceRepository.save(device));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDevice(@PathVariable Long id) {
        if (!deviceRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Device not found.");
        }
        deviceRepository.deleteById(id);
        return ResponseEntity.ok("Device deleted.");
    }

    @GetMapping("/by-admin/{empId}")
    public ResponseEntity<List<Device>> getDeviceByAdmin(@PathVariable String empId) {
        List<Device> devices = deviceRepository.findByCreatedByEmpId(empId);
        return ResponseEntity.ok(devices);
    }

    private void mapDtoToDevice(DeviceDto dto, Device device) {
        device.setDeviceName(dto.getDeviceName());
        device.setAssetId(dto.getAssetId());
        device.setSite(dto.getSite());
        device.setLocation(dto.getLocation());
        device.setIpAddress(dto.getIpAddress());
        device.setHostname(dto.getHostname());
        device.setModel(dto.getModel());
        device.setSerialNumber(dto.getSerialNumber());
        device.setAdapterType(dto.getAdapterType());
        device.setEnabledStatus(dto.getEnabledStatus());
        device.setOperationalStatus(dto.getOperationalStatus());
        device.setOperationalDetails(dto.getOperationalDetails());
        device.setUuid(dto.getUuid());
        device.setLastSeen(dto.getLastSeen());
        device.setCreatedByEmpId(dto.getCreatedByEmpId());
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllDevices(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String searchField,
            @RequestParam(required = false) String operationalStatus,
            @RequestParam(required = false) String enabledStatus) {

        Pageable pageable = PageRequest.of(page, size);

        Specification<Device> spec = DeviceSpecifications.withFilters(search, searchField, operationalStatus,
                enabledStatus);

        Page<Device> devicePage = deviceRepository.findAll(spec, pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("content", devicePage.getContent());
        response.put("currentPage", devicePage.getNumber());
        response.put("pageSize", devicePage.getSize());
        response.put("totalItems", devicePage.getTotalElements());
        response.put("totalPages", devicePage.getTotalPages());

        return ResponseEntity.ok(response);
    }
}
