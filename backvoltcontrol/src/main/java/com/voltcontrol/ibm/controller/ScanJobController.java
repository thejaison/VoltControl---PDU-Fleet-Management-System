package com.voltcontrol.ibm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.jobrunr.scheduling.JobScheduler;
import jakarta.validation.Valid;

import com.voltcontrol.ibm.dto.CreateScanJobRequestDto;
import com.voltcontrol.ibm.dto.ScanJobResponseDto;
import com.voltcontrol.ibm.dto.ScanResultResponseDto;
import com.voltcontrol.ibm.dto.ScanDeviceResultResponseDto;
import com.voltcontrol.ibm.service.ScanJobService;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/scan-jobs")
@CrossOrigin(origins = "http://localhost:5173")
public class ScanJobController {

    @Autowired
    private ScanJobService scanJobService;

    @Autowired
    private JobScheduler jobScheduler;

    @PostMapping
    public ResponseEntity<ScanJobResponseDto> createScanJob(
            @Valid @RequestBody CreateScanJobRequestDto request) {
        ScanJobResponseDto response = scanJobService.createScanJob(request);
        if (request.getScheduledTime() != null) {
            jobScheduler.schedule(request.getScheduledTime(), () -> scanJobService.executeScanJob(response.getUuid()));
        } else {
            jobScheduler.enqueue(() -> scanJobService.executeScanJob(response.getUuid()));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<ScanJobResponseDto>> getAllScanJobs() {
        List<ScanJobResponseDto> response = scanJobService.getAllScanJobs();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/recent-results")
    public ResponseEntity<List<ScanResultResponseDto>> getRecentScanResults() {
        List<ScanResultResponseDto> response = scanJobService.getRecentScanResults();
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/{uuid}/progress", produces = org.springframework.http.MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamProgress(@PathVariable String uuid) {
        return scanJobService.registerProgressEmitter(uuid);
    }

    @GetMapping("/results")
    public ResponseEntity<List<ScanDeviceResultResponseDto>> getAllScanDeviceResults() {
        List<ScanDeviceResultResponseDto> response = scanJobService.getAllScanDeviceResults();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{uuid}/cancel")
    public ResponseEntity<ScanJobResponseDto> cancelScanJob(@PathVariable String uuid) {
        ScanJobResponseDto response = scanJobService.cancelScanJob(uuid);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{uuid}/continue")
    public ResponseEntity<ScanJobResponseDto> continueScanJob(@PathVariable String uuid) {
        ScanJobResponseDto response = scanJobService.continueScanJob(uuid);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{uuid}/scan-again")
    public ResponseEntity<ScanJobResponseDto> scanAgain(@PathVariable String uuid) {
        ScanJobResponseDto response = scanJobService.scanAgain(uuid);
        return ResponseEntity.ok(response);
    }
}