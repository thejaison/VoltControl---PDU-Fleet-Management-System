package com.voltcontrol.ibm.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.voltcontrol.ibm.dto.LoginDto;
import com.voltcontrol.ibm.dto.UserDto;
import com.voltcontrol.ibm.entity.User;
import com.voltcontrol.ibm.entity.UserId;
import com.voltcontrol.ibm.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserRepository userRepository;

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
        user.setOfficeMail(userDto.getOfficeEmail());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setJoiningDate(userDto.getJoiningDate());
        user.setPassword(userDto.getPassword());

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto) {
        UserId primaryKey = new UserId(loginDto.getUsername(), loginDto.getEmpId());
        Optional<User> userOpt = userRepository.findById(primaryKey);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(loginDto.getPassword())) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Password.");
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found. Please Sign Up first.");
    }
}
