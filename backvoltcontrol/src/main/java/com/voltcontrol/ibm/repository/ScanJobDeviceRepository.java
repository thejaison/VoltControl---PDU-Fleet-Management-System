package com.voltcontrol.ibm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.voltcontrol.ibm.entity.ScanJobDevice;

@Repository
public interface ScanJobDeviceRepository extends JpaRepository<ScanJobDevice, Long> {
    List<ScanJobDevice> findByScanJob_Id(Long scanJobId);
}
