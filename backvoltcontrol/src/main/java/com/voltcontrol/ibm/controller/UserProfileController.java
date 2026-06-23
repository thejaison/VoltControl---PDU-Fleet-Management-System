package com.voltcontrol.ibm.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.voltcontrol.ibm.dto.UserDto;
import com.voltcontrol.ibm.entity.User;
import com.voltcontrol.ibm.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserProfileController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{empId}")
    public ResponseEntity<?> getUserByEmpId(@PathVariable String empId) {
        Optional<User> userOpt = userRepository.findAll().stream()
                .filter(u -> u.getId().getEmpId().equals(empId))
                .findFirst();

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = userOpt.get();
        UserDto dto = new UserDto();
        dto.setUsername(user.getId().getUsername());
        dto.setJoiningDate(user.getJoiningDate());
        dto.setOfficeEmail(user.getOfficeMail());

        return ResponseEntity.ok(dto);
    }
}
