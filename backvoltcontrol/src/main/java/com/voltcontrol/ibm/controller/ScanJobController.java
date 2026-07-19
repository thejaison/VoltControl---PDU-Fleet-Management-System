package com.voltcontrol.ibm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.voltcontrol.ibm.dto.CreateScanJobRequestDto;
import com.voltcontrol.ibm.dto.ScanJobResponseDto;
import com.voltcontrol.ibm.service.ScanJobService;

@RestController
@RequestMapping("/api/scan-jobs")
public class ScanJobController {

    @Autowired
    private ScanJobService scanJobService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ScanJobResponseDto> createScanJob(
            @Valid @RequestBody CreateScanJobRequestDto request) {
        ScanJobResponseDto response = scanJobService.createScanJob(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}