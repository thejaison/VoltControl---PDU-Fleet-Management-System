package com.voltcontrol.ibm.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.lowagie.text.DocumentException;
import com.voltcontrol.ibm.dto.DeviceDto;
import com.voltcontrol.ibm.entity.Report;
import com.voltcontrol.ibm.service.ReportService;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping
    public ResponseEntity<List<Report>> getReportsList() {
        List<Report> reports = reportService.getAllReports();
        // Clear binary file data for the listing view to optimize payload size
        reports.forEach(report -> report.setFileData(null));
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadReport(@PathVariable Long id) {
        Optional<Report> opt = reportService.getReportById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Report report = opt.get();
        byte[] fileData = report.getFileData();

        HttpHeaders headers = new HttpHeaders();
        if ("PDF".equalsIgnoreCase(report.getFileType())) {
            headers.setContentType(MediaType.APPLICATION_PDF);
        } else {
            headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        }
        headers.setContentDispositionFormData("attachment", report.getFileName());

        return new ResponseEntity<>(fileData, headers, HttpStatus.OK);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadReport(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "description", defaultValue = "") String description) {
        try {
            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null || originalFilename.isBlank()) {
                return ResponseEntity.badRequest().body("File must have a filename.");
            }

            String fileType = "Excel";
            if (originalFilename.toLowerCase().endsWith(".pdf")) {
                fileType = "PDF";
            } else if (!originalFilename.toLowerCase().endsWith(".xlsx") && !originalFilename.toLowerCase().endsWith(".xls")) {
                return ResponseEntity.badRequest().body("Unsupported file type. Only PDF and Excel files are allowed.");
            }

            byte[] bytes = file.getBytes();
            Report saved = reportService.saveReport(
                    originalFilename,
                    fileType,
                    file.getSize(),
                    bytes,
                    description.isBlank() ? "Uploaded report" : description,
                    false
            );

            // Hide bytes in return
            saved.setFileData(null);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error reading uploaded file: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReport(@PathVariable Long id) {
        if (reportService.getReportById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        reportService.deleteReport(id);
        return ResponseEntity.ok().body("Report deleted.");
    }

    @GetMapping("/export/excel")
    public ResponseEntity<byte[]> exportExcelReport() {
        try {
            byte[] fileData = reportService.generateExcelReport();
            
            // Format timestamp for filename
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
            String fileName = "PDU_Devices_Report_" + timestamp + ".xlsx";

            // Archive report in database history
            reportService.saveReport(
                    fileName,
                    "Excel",
                    (long) fileData.length,
                    fileData,
                    "Auto-generated live PDU Devices Excel spreadsheet",
                    true
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            headers.setContentDispositionFormData("attachment", fileName);

            return new ResponseEntity<>(fileData, headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/export/pdf")
    public ResponseEntity<byte[]> exportPdfReport() {
        try {
            byte[] fileData = reportService.generatePdfReport();
            
            // Format timestamp for filename
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
            String fileName = "PDU_System_Report_" + timestamp + ".pdf";

            // Archive report in database history
            reportService.saveReport(
                    fileName,
                    "PDF",
                    (long) fileData.length,
                    fileData,
                    "Auto-generated live PDU Fleet Management PDF summary",
                    true
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", fileName);

            return new ResponseEntity<>(fileData, headers, HttpStatus.OK);
        } catch (DocumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/import/excel/preview")
    public ResponseEntity<?> previewExcelImport(@RequestParam("file") MultipartFile file) {
        try {
            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null || (!originalFilename.toLowerCase().endsWith(".xlsx") && !originalFilename.toLowerCase().endsWith(".xls"))) {
                return ResponseEntity.badRequest().body("Please upload a valid Excel file (.xlsx or .xls)");
            }

            List<DeviceDto> devices = reportService.parseExcelImport(file);
            return ResponseEntity.ok(devices);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error parsing Excel file: " + e.getMessage());
        }
    }
}
