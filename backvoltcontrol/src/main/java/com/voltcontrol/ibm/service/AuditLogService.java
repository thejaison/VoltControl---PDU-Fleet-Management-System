package com.voltcontrol.ibm.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.voltcontrol.ibm.entity.AuditLog;
import com.voltcontrol.ibm.repository.AuditLogRepository;

@Service
public class AuditLogService {
    private static final Logger log = LoggerFactory.getLogger(AuditLogService.class);
    private static final int MAX_DETAILS = 1000;

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void record(String action, String entityType, String entityId, String username, String empId, String status,
            String details) {
        try {
            AuditLog entry = new AuditLog();
            entry.setAction(action);
            entry.setEntityType(entityType);
            entry.setEntityId(entityId);
            entry.setUsername(username);
            entry.setEmpId(empId);
            entry.setStatus(status);
            entry.setDetails(truncate(details));
            auditLogRepository.save(entry);
        } catch (Exception e) {
            log.warn("Failed to write audit log for action {}: {}", action, e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public Page<AuditLog> findAll(Pageable pageable) {
        return auditLogRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    private String truncate(String s) {
        if (s == null) {
            return null;
        }
        return s.length() <= MAX_DETAILS ? s : s.substring(0, MAX_DETAILS - 3) + "...";
    }
}
