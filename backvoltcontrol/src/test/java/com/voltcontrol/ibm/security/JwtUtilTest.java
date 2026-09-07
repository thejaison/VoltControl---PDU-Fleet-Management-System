package com.voltcontrol.ibm.security;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setup() {
        jwtUtil = new JwtUtil();

        ReflectionTestUtils.setField(jwtUtil, "secretKeyString",
                "test-secret-key-must-be-long-enough-for-HS256-signing-1234567890");
        ReflectionTestUtils.setField(jwtUtil, "expirationMs", 3600000L);
    }

    @Test
    void generateTokens_thenExtractUsername_returnsOriginalUsername() {
        String token = jwtUtil.generateTokens("meenakshi", "ADMIN", "EMP001");
        String username = jwtUtil.extractUsername(token);

        assertEquals("meenakshi", username);
    }

    @Test
    void generateTokens_thenExtractRole_returnsOriginalRole() {
        String token = jwtUtil.generateTokens("meenakshi", "ADMIN", "EMP001");
        String role = jwtUtil.extractRole(token);

        assertEquals("ADMIN", role);
    }

    @Test
    void generateTokens_thenExtractEmpId_returnsOriginalEmpId() {
        String token = jwtUtil.generateTokens("meenakshi", "ADMIN", "EMP001");
        String empId = jwtUtil.extractEmpId(token);

        assertEquals("EMP001", empId);
    }

    @Test
    void isTokenValid_withMatchingUsernameAndUnexpiredToken_returnsTrue() {
        String token = jwtUtil.generateTokens("meenakshi", "ADMIN", "EMP001");
        boolean valid = jwtUtil.isTokenValid(token, "meenakshi");

        assertTrue(valid);
    }

    @Test
    void isTokenValid_withMismatchedUsername_returnsFalse() {
        String token = jwtUtil.generateTokens("meenakshi", "ADMIN", "EMP001");
        boolean valid = jwtUtil.isTokenValid(token, "someone.else");

        assertFalse(valid);
    }

    @Test
    void isTokenValid_withExpiredToken_returnsFalse() throws InterruptedException {
        ReflectionTestUtils.setField(jwtUtil, "expirationMs", 1L);
        String token = jwtUtil.generateTokens("meenakshi", "ADMIN", "EMP001");

        Thread.sleep(50);

        boolean valid = jwtUtil.isTokenValid(token, "meenakshi");

        assertFalse(valid);
    }

    @Test
    void isTokenValid_withMalformedToken_returnsFalseWithoutThrowing() {
        boolean valid = jwtUtil.isTokenValid("not-a-real-token", "meenakshi");

        assertFalse(valid);
    }

}
