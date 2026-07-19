package com.voltcontrol.ibm.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "scan_jobs")
public class ScanJob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String uuid;
    private String status;
    private int totalDevices;
    private int completedDevices;
    private String createdByEmpId;

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

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getTotalDevices() {
        return totalDevices;
    }

    public void setTotalDevices(int totalDevices) {
        this.totalDevices = totalDevices;
    }

    public int getCompletedDevices() {
        return completedDevices;
    }

    public void setCompletedDevices(int completedDevices) {
        this.completedDevices = completedDevices;
    }

    public String getCreatedByEmpId() {
        return createdByEmpId;
    }

    public void setCreatedByEmpId(String createdByEmpId) {
        this.createdByEmpId = createdByEmpId;
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
