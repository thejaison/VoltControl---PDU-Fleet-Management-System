package com.voltcontrol.ibm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.voltcontrol.ibm.entity.ScanJobDevice;

@Repository
public interface ScanJobDeviceRepository extends JpaRepository<ScanJobDevice, Long> {
    List<ScanJobDevice> findByScanJob_Id(Long scanJobId);

    @Query("SELECT sjd FROM ScanJobDevice sjd JOIN FETCH sjd.device ORDER BY sjd.updatedTimestamp DESC")
    List<ScanJobDevice> findRecentResults(org.springframework.data.domain.Pageable pageable);

    @Query("SELECT sjd FROM ScanJobDevice sjd JOIN FETCH sjd.device JOIN FETCH sjd.scanJob ORDER BY sjd.updatedTimestamp DESC")
    List<ScanJobDevice> findAllScanDeviceResults();
}
