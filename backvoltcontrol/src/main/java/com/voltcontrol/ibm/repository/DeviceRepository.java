package com.voltcontrol.ibm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.voltcontrol.ibm.entity.Device;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    List<Device> findByCreatedByEmpId(String createdByEmpId);
}
