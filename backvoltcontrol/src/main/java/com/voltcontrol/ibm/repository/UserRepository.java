package com.voltcontrol.ibm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.voltcontrol.ibm.entity.User;
import com.voltcontrol.ibm.entity.UserId;

@Repository
public interface UserRepository extends JpaRepository<User, UserId> {
    // JpaRepository gives us findById(UserId id) out of the box!
    @Query("SELECT u FROM User u WHERE u.id.empId = :empId")
    Optional<User> findByEmpId(@Param("empId") String empId);
}
