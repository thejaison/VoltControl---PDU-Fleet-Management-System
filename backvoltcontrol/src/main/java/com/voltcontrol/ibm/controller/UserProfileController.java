package com.voltcontrol.ibm.controller;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

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
        dto.setEmpId(user.getId().getEmpId());
        dto.setRole(user.getRole());
        dto.setOfficeEmail(user.getOfficeEmail());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setJoiningDate(user.getJoiningDate());
        dto.setEnabled(user.isEnabled());
        dto.setProfileImage(user.getProfileImage());

        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<UserDto> users = userRepository.findAll().stream().map(user -> {
            UserDto dto = new UserDto();
            dto.setUsername(user.getId().getUsername());
            dto.setEmpId(user.getId().getEmpId());
            dto.setPhoneNumber(user.getPhoneNumber());
            dto.setOfficeEmail(user.getOfficeEmail());
            dto.setJoiningDate(user.getJoiningDate());
            dto.setRole(user.getRole());
            dto.setEnabled(user.isEnabled());
            dto.setProfileImage(user.getProfileImage());
            return dto;
        }).toList();

        return ResponseEntity.ok(users);
    }

    @PutMapping("/{empId}/toggle-status")
    public ResponseEntity<?> toggleUserStatus(@PathVariable String empId) {
        Optional<User> userOpt = userRepository.findByEmpId(empId);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = userOpt.get();
        user.setEnabled(!user.isEnabled());
        userRepository.save(user);

        UserDto dto = new UserDto();
        dto.setUsername(user.getId().getUsername());
        dto.setEmpId(user.getId().getEmpId());
        dto.setEnabled(user.isEnabled());

        return ResponseEntity.ok(dto);
    }

    @org.springframework.transaction.annotation.Transactional
    @PutMapping("/{empId}/update-username")
    public ResponseEntity<?> updateUsername(@PathVariable String empId,
            @RequestBody java.util.Map<String, String> body) {
        String newUsername = body.get("username");
        if (newUsername == null || newUsername.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username cannot be empty");
        }

        Optional<User> userOpt = userRepository.findByEmpId(empId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Check if new username is already taken by another user with a different empId
        boolean exists = userRepository.findAll().stream()
                .anyMatch(u -> u.getId().getUsername().equalsIgnoreCase(newUsername)
                        && !u.getId().getEmpId().equals(empId));
        if (exists) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already taken by another employee");
        }

        userRepository.updateUsername(empId, newUsername);

        // Return updated user DTO
        Optional<User> updatedUserOpt = userRepository.findByEmpId(empId);
        if (updatedUserOpt.isPresent()) {
            User user = updatedUserOpt.get();
            UserDto dto = new UserDto();
            dto.setUsername(user.getId().getUsername());
            dto.setEmpId(user.getId().getEmpId());
            dto.setOfficeEmail(user.getOfficeEmail());
            dto.setJoiningDate(user.getJoiningDate());
            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{empId}/update-profile-image")
    public ResponseEntity<?> updateProfileImage(@PathVariable String empId,
            @RequestBody java.util.Map<String, String> body) {
        String profileImage = body.get("profileImage");
        Optional<User> userOpt = userRepository.findByEmpId(empId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = userOpt.get();
        user.setProfileImage(profileImage);
        userRepository.save(user);

        UserDto dto = new UserDto();
        dto.setUsername(user.getId().getUsername());
        dto.setEmpId(user.getId().getEmpId());
        dto.setProfileImage(user.getProfileImage());

        return ResponseEntity.ok(dto);
    }
}
