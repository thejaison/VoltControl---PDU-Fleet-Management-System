package com.voltcontrol.ibm.repository;

import org.springframework.data.jpa.domain.Specification;

import com.voltcontrol.ibm.entity.Device;

public class DeviceSpecifications {

    public static Specification<Device> withFilters(String search, String searchField, String operationalStatus,
            String enabledStatus) {
        return (root, query, cb) -> {
            var predicates = cb.conjunction();

            if (search != null && !search.isBlank() && searchField != null) {
                predicates = cb.and(predicates,
                        cb.like(cb.lower(root.get(searchField)), "%" + search.toLowerCase() + "%"));
            }
            if (operationalStatus != null && !operationalStatus.equalsIgnoreCase("None")) {
                predicates = cb.and(predicates,
                        cb.equal(root.get("operationalStatus"), operationalStatus));
            }
            if (enabledStatus != null && !enabledStatus.equalsIgnoreCase("None")) {
                predicates = cb.and(predicates,
                        cb.equal(root.get("enabledStatus"), enabledStatus));
            }
            return predicates;
        };
    }
}
