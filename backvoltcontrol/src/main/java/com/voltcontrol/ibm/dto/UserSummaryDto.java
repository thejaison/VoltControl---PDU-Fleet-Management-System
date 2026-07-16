package com.voltcontrol.ibm.dto;

public class UserSummaryDto {
    private String username;
    private String empId;
    private String phoneNumber;
    private String officeEmail;
    private boolean enabled;

    public UserSummaryDto(String username, String empId, String phoneNumber, String officeEmail, boolean enabled) {
        this.username = username;
        this.empId = empId;
        this.phoneNumber = phoneNumber;
        this.officeEmail = officeEmail;
        this.enabled = enabled;
    }

    public String getUsername() {
        return username;
    }

    public String getEmpId() {
        return empId;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getOfficeEmail() {
        return officeEmail;
    }

    public boolean isEnabled() {
        return enabled;
    }
}
