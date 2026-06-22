package com.voltcontrol.ibm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.voltcontrol.ibm.entity.User;
import com.voltcontrol.ibm.entity.UserId;

@Repository
public interface UserRepository extends JpaRepository<User, UserId> {
    // JpaRepository gives us findById(UserId id) out of the box!
}
