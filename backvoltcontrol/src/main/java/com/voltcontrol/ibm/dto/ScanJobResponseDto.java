package com.voltcontrol.ibm.dto;

import java.time.LocalDateTime;

public class ScanJobResponseDto {

    private String uuid;
    private String status;
    private int totalDevices;
    private int completedDevices;
    private LocalDateTime createdTimestamp;

    public ScanJobResponseDto(String uuid, String status, int totalDevices, int completedDevices,
            LocalDateTime createdTimestamp) {
        this.uuid = uuid;
        this.status = status;
        this.totalDevices = totalDevices;
        this.completedDevices = completedDevices;
        this.createdTimestamp = createdTimestamp;
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
}
