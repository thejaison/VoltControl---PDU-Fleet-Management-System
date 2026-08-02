package com.voltcontrol.ibm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.lang.management.ManagementFactory;
import java.lang.management.OperatingSystemMXBean;
import java.lang.management.ThreadMXBean;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.sql.Connection;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/monitor")
@CrossOrigin(origins = "http://localhost:5173")
public class MonitoringController {

    @Autowired
    private DataSource dataSource;

    @Value("${spring.data.redis.host:localhost}")
    private String redisHost;

    @Value("${spring.data.redis.port:6379}")
    private int redisPort;

    private static final long START_TIME = System.currentTimeMillis();

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getHealth() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", Instant.now().toString());
        response.put("uptimeSeconds", (System.currentTimeMillis() - START_TIME) / 1000);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/readiness")
    public ResponseEntity<Map<String, Object>> getReadiness() {
        Map<String, Object> response = new HashMap<>();
        
        long dbStart = System.currentTimeMillis();
        boolean dbUp = checkDatabase();
        long dbLatency = System.currentTimeMillis() - dbStart;
        
        long redisStart = System.currentTimeMillis();
        boolean redisUp = checkRedis();
        long redisLatency = System.currentTimeMillis() - redisStart;
        
        boolean overallUp = dbUp && redisUp;
        
        response.put("status", overallUp ? "UP" : "DEGRADED");
        response.put("timestamp", Instant.now().toString());
        
        Map<String, Object> dbStatus = new HashMap<>();
        dbStatus.put("status", dbUp ? "UP" : "DOWN");
        dbStatus.put("latencyMs", dbLatency);
        dbStatus.put("details", dbUp ? "PostgreSQL database connection is healthy" : "Database connection failed");
        response.put("database", dbStatus);
        
        Map<String, Object> redisStatus = new HashMap<>();
        redisStatus.put("status", redisUp ? "UP" : "DOWN");
        redisStatus.put("latencyMs", redisLatency);
        redisStatus.put("details", redisUp ? "Redis connectivity is healthy" : "Could not connect to Redis at " + redisHost + ":" + redisPort);
        response.put("redis", redisStatus);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Object>> getMetrics() {
        Map<String, Object> response = new HashMap<>();
        
        // JVM memory
        Runtime runtime = Runtime.getRuntime();
        long maxMemory = runtime.maxMemory();
        long totalMemory = runtime.totalMemory();
        long freeMemory = runtime.freeMemory();
        long usedMemory = totalMemory - freeMemory;
        
        Map<String, Object> memory = new HashMap<>();
        memory.put("maxBytes", maxMemory);
        memory.put("totalBytes", totalMemory);
        memory.put("freeBytes", freeMemory);
        memory.put("usedBytes", usedMemory);
        memory.put("usedPercentage", totalMemory > 0 ? ((double) usedMemory / totalMemory * 100) : 0);
        response.put("memory", memory);
        
        // CPU & Threads
        OperatingSystemMXBean osBean = ManagementFactory.getOperatingSystemMXBean();
        ThreadMXBean threadBean = ManagementFactory.getThreadMXBean();
        
        Map<String, Object> system = new HashMap<>();
        system.put("availableProcessors", osBean.getAvailableProcessors());
        
        // System load average can be negative if not supported by OS
        double load = osBean.getSystemLoadAverage();
        system.put("systemLoadAverage", load >= 0 ? load : 0.0);
        
        system.put("threadCount", threadBean.getThreadCount());
        system.put("peakThreadCount", threadBean.getPeakThreadCount());
        response.put("system", system);
        
        response.put("timestamp", Instant.now().toString());
        return ResponseEntity.ok(response);
    }

    private boolean checkDatabase() {
        try (Connection connection = dataSource.getConnection()) {
            return connection.isValid(2);
        } catch (Exception e) {
            return false;
        }
    }

    private boolean checkRedis() {
        try (Socket socket = new Socket()) {
            socket.connect(new InetSocketAddress(redisHost, redisPort), 1000);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
