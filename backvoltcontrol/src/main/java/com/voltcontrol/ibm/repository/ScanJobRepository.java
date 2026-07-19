package com.voltcontrol.ibm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.voltcontrol.ibm.entity.ScanJob;

@Repository
public interface ScanJobRepository extends JpaRepository<ScanJob, Long> {
    ScanJob findByUuid(String uuid);
}
