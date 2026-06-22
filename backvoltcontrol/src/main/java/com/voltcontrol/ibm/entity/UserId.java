package com.voltcontrol.ibm.entity;

import java.io.Serializable;
import java.util.Objects;

public class UserId implements Serializable {
    private String username;
    private String empId;

    public UserId() {
    }

    public UserId(String username, String empId) {
        this.username = username;
        this.empId = empId;
    }

    // Now getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;

        UserId userId = (UserId) o;
        return Objects.equals(username, userId.username) && Objects.equals(empId, userId.empId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, empId); // add the password also
    }
}