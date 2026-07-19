package com.voltcontrol.ibm.dto;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;

public class CreateScanJobRequestDto {

    @NotEmpty(message = "At least one device UUID is required")
    private List<String> deviceUuids;

    public List<String> getDeviceUuids() {
        return deviceUuids;
    }

    public void setDeviceUuids(List<String> deviceUuids) {
        this.deviceUuids = deviceUuids;
    }
}
