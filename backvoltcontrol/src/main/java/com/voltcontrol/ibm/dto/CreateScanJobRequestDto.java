package com.voltcontrol.ibm.dto;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;

public class CreateScanJobRequestDto {

    @NotEmpty(message = "At least one device UUID is required")
    private List<String> deviceUuids;

    @NotEmpty(message = "Creator employee ID is required")
    private String createdByEmpId;

    private java.time.LocalDateTime scheduledTime;

    public List<String> getDeviceUuids() {
        return deviceUuids;
    }

    public void setDeviceUuids(List<String> deviceUuids) {
        this.deviceUuids = deviceUuids;
    }

    public String getCreatedByEmpId() {
        return createdByEmpId;
    }

    public void setCreatedByEmpId(String createdByEmpId) {
        this.createdByEmpId = createdByEmpId;
    }

    public java.time.LocalDateTime getScheduledTime() {
        return scheduledTime;
    }

    public void setScheduledTime(java.time.LocalDateTime scheduledTime) {
        this.scheduledTime = scheduledTime;
    }
}
