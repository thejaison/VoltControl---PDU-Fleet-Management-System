package com.voltcontrol.ibm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.voltcontrol.ibm.entity.Device;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long>, JpaSpecificationExecutor<Device> {
    List<Device> findByCreatedByEmpId(String createdByEmpId);

    List<Device> findByUuidIn(List<String> uuids);
}
