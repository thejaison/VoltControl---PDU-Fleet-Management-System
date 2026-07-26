package com.voltcontrol.ibm.dto;

import java.time.LocalDateTime;

public class ScanDeviceResultResponseDto {
    private Long id;
    private String jobUuid;
    private String deviceName;
    private String ipAddress;
    private String model;
    private String status;
    private String errorMessage;
    private String scanResultData;
    private LocalDateTime timestamp;

    public ScanDeviceResultResponseDto(Long id, String jobUuid, String deviceName, String ipAddress, String model,
            String status, String errorMessage, String scanResultData, LocalDateTime timestamp) {
        this.id = id;
        this.jobUuid = jobUuid;
        this.deviceName = deviceName;
        this.ipAddress = ipAddress;
        this.model = model;
        this.status = status;
        this.errorMessage = errorMessage;
        this.scanResultData = scanResultData;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJobUuid() {
        return jobUuid;
    }

    public void setJobUuid(String jobUuid) {
        this.jobUuid = jobUuid;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
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

    public String getScanResultData() {
        return scanResultData;
    }

    public void setScanResultData(String scanResultData) {
        this.scanResultData = scanResultData;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
