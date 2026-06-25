package com.voltcontrol.ibm.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "devices")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String deviceName;
    private String assetId;
    private String site;
    private String location;
    private String ipAddress;
    private String hostname;
    private String model;
    private String serialNumber;
    private String adapterType;
    private String enabledStatus;
    private String operationalStatus;
    private String operationalDetails;
    private String uuid;
    private String lastSeen;

    private LocalDateTime createdTimestamp;
    private LocalDateTime updatedTimestamp;

    private String createdByEmpId;

    @PrePersist
    protected void onCreate() {
        this.createdTimestamp = LocalDateTime.now();
        this.updatedTimestamp = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedTimestamp = LocalDateTime.now();
    }

    // Now getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getAssetId() {
        return assetId;
    }

    public void setAssetId(String assetId) {
        this.assetId = assetId;
    }

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getAdapterType() {
        return adapterType;
    }

    public void setAdapterType(String adapterType) {
        this.adapterType = adapterType;
    }

    public String getEnabledStatus() {
        return enabledStatus;
    }

    public void setEnabledStatus(String enabledStatus) {
        this.enabledStatus = enabledStatus;
    }

    public String getOperationalStatus() {
        return operationalStatus;
    }

    public void setOperationalStatus(String operationalStatus) {
        this.operationalStatus = operationalStatus;
    }

    public String getOperationalDetails() {
        return operationalDetails;
    }

    public void setOperationalDetails(String operationalDetails) {
        this.operationalDetails = operationalDetails;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getLastSeen() {
        return lastSeen;
    }

    public void setLastSeen(String lastSeen) {
        this.lastSeen = lastSeen;
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

    public String getCreatedByEmpId() {
        return createdByEmpId;
    }

    public void setCreatedByEmpId(String createdByEmpId) {
        this.createdByEmpId = createdByEmpId;
    }
}
