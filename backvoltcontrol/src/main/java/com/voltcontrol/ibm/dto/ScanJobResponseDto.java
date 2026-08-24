package com.voltcontrol.ibm.dto;

import java.time.LocalDateTime;

public class ScanJobResponseDto {

    private String uuid;
    private String status;
    private int totalDevices;
    private int completedDevices;
    private LocalDateTime createdTimestamp;
    private String createdByEmpId;
    private LocalDateTime scheduledTime;

    public ScanJobResponseDto(String uuid, String status, int totalDevices, int completedDevices,
            LocalDateTime createdTimestamp, String createdByEmpId, LocalDateTime scheduledTime) {
        this.uuid = uuid;
        this.status = status;
        this.totalDevices = totalDevices;
        this.completedDevices = completedDevices;
        this.createdTimestamp = createdTimestamp;
        this.createdByEmpId = createdByEmpId;
        this.scheduledTime = scheduledTime;
    }

    public String getUuid() {
        return uuid;
    }

    public String getStatus() {
        return status;
    }

    public int getTotalDevices() {
        return totalDevices;
    }

    public int getCompletedDevices() {
        return completedDevices;
    }

    public LocalDateTime getCreatedTimestamp() {
        return createdTimestamp;
    }

    public String getCreatedByEmpId() {
        return createdByEmpId;
    }

    public LocalDateTime getScheduledTime() {
        return scheduledTime;
    }
}
