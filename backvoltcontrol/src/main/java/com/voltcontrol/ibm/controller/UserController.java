package com.voltcontrol.ibm.controller;

import java.util.Optional;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.voltcontrol.ibm.dto.LoginDto;
import com.voltcontrol.ibm.dto.UserDto;
import com.voltcontrol.ibm.dto.UserSummaryDto;
import com.voltcontrol.ibm.entity.User;
import com.voltcontrol.ibm.entity.UserId;
import com.voltcontrol.ibm.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto) {
        UserId primaryKey = new UserId(userDto.getUsername(), userDto.getEmpId());

        if (userRepository.existsById(primaryKey)) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Account already exists with this combination of Username and Employee ID. Please Login.");
        }

        User user = new User();
        user.setId(primaryKey);
        user.setRole(userDto.getRole());
        user.setOfficeEmail(userDto.getOfficeEmail());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setJoiningDate(userDto.getJoiningDate());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setEnabled(true);

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto) {
        UserId primaryKey = new UserId(loginDto.getUsername(), loginDto.getEmpId());
        Optional<User> userOpt = userRepository.findById(primaryKey);

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            if (!user.isEnabled()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("You have been disabled. Please contact the administrator.");
            }

            if (passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
                user.setPassword(null);
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Password.");
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found. Please Sign Up first.");
    }

    @GetMapping("/users")
    public ResponseEntity<?> getUsersByRole(@RequestParam String role) {
        List<User> users = userRepository.findByRoleIgnoreCase(role);

        List<UserSummaryDto> result = users.stream()
                .map(u -> new UserSummaryDto(
                        u.getId().getUsername(),
                        u.getId().getEmpId(),
                        u.getPhoneNumber(),
                        u.getOfficeEmail(),
                        u.isEnabled()))
                .toList();

        return ResponseEntity.ok(result);
    }

    @PatchMapping("/users/{username}/{empId}/status")
    public ResponseEntity<?> updateUserStatus(
            @PathVariable String username,
            @PathVariable String empId,
            @RequestBody Map<String, Boolean> body) {
        Boolean enabled = body.get("enabled");
        if (enabled == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing 'enabled' field in request body.");
        }

        UserId primaryKey = new UserId(username, empId);
        Optional<User> userOpt = userRepository.findById(primaryKey);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        User user = userOpt.get();
        user.setEnabled(enabled);
        userRepository.save(user);

        user.setPassword(null);
        return ResponseEntity.ok(user);
    }
}
