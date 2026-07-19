package com.voltcontrol.ibm.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "scan_job_devices")
public class ScanJobDevice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scan_job_id", nullable = false)
    private ScanJob scanJob;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "device_id", nullable = false)
    private Device device;

    private String status;

    @Column(length = 2000)
    private String errorMessage;

    private LocalDateTime createdTimestamp;
    private LocalDateTime updatedTimestamp;
    private LocalDateTime startedTimestamp;
    private LocalDateTime completedTimestamp;

    @PrePersist
    protected void onCreate() {
        this.createdTimestamp = LocalDateTime.now();
        this.updatedTimestamp = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedTimestamp = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ScanJob getScanJob() {
        return scanJob;
    }

    public void setScanJob(ScanJob scanJob) {
        this.scanJob = scanJob;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public LocalDateTime getCreatedTimestamp() {
        return createdTimestamp;
    }

    public void setCreatedTimestamp(LocalDateTime createdTimestamp) {
        this.createdTimestamp = createdTimestamp;
    }

    public LocalDateTime getUpdatedTimestamp() {
        return updatedTimestamp;
    }

    public void setUpdatedTimestamp(LocalDateTime updatedTimestamp) {
        this.updatedTimestamp = updatedTimestamp;
    }

    public LocalDateTime getStartedTimestamp() {
        return startedTimestamp;
    }

    public void setStartedTimestamp(LocalDateTime startedTimestamp) {
        this.startedTimestamp = startedTimestamp;
    }

    public LocalDateTime getCompletedTimestamp() {
        return completedTimestamp;
    }

    public void setCompletedTimestamp(LocalDateTime completedTimestamp) {
        this.completedTimestamp = completedTimestamp;
    }
}
