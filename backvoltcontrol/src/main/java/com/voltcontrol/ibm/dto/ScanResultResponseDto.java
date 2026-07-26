package com.voltcontrol.ibm.dto;

import java.time.LocalDateTime;

public class ScanResultResponseDto {

    private String device;
    private String ip;
    private String model;
    private String status;
    private String errorMessage;
    private LocalDateTime timestamp;

    public ScanResultResponseDto(String device, String ip, String model, String status, String errorMessage,
            LocalDateTime timestamp) {
        this.device = device;
        this.ip = ip;
        this.model = model;
        this.status = status;
        this.errorMessage = errorMessage;
        this.timestamp = timestamp;
    }

    public String getDevice() {
        return device;
    }

    public void setDevice(String device) {
        this.device = device;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
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

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
