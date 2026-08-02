package com.voltcontrol.ibm.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import com.voltcontrol.ibm.dto.DeviceDto;
import com.voltcontrol.ibm.entity.Device;
import com.voltcontrol.ibm.entity.Report;
import com.voltcontrol.ibm.entity.ScanJob;
import com.voltcontrol.ibm.repository.DeviceRepository;
import com.voltcontrol.ibm.repository.ReportRepository;
import com.voltcontrol.ibm.repository.ScanJobRepository;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private ScanJobRepository scanJobRepository;

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    public Optional<Report> getReportById(Long id) {
        return reportRepository.findById(id);
    }

    public Report saveReport(String fileName, String fileType, Long fileSize, byte[] fileData, String description, boolean isGenerated) {
        Report report = new Report();
        report.setFileName(fileName);
        report.setFileType(fileType);
        report.setFileSize(fileSize);
        report.setFileData(fileData);
        report.setDescription(description);
        report.setGenerated(isGenerated);
        return reportRepository.save(report);
    }

    public void deleteReport(Long id) {
        reportRepository.deleteById(id);
    }

    /**
     * Live generates an Excel spreadsheet of all current devices.
     */
    public byte[] generateExcelReport() throws IOException {
        List<Device> devices = deviceRepository.findAll();

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("PDU Devices");

            // Header Font & Style
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerFont.setFontHeightInPoints((short) 11);

            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);
            headerCellStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
            headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerCellStyle.setAlignment(HorizontalAlignment.CENTER);
            headerCellStyle.setVerticalAlignment(VerticalAlignment.CENTER);
            headerCellStyle.setBorderBottom(BorderStyle.MEDIUM);

            String[] columns = {
                "ID", "Device Name", "Asset ID", "Site", "Location", "IP Address", 
                "Hostname", "Model", "Serial Number", "Adapter Type", 
                "Enabled Status", "Operational Status", "Operational Details", "Last Seen"
            };

            Row headerRow = sheet.createRow(0);
            headerRow.setHeightInPoints(24);
            for (int col = 0; col < columns.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(columns[col]);
                cell.setCellStyle(headerCellStyle);
            }

            // Cell Styles for Data
            CellStyle centerStyle = workbook.createCellStyle();
            centerStyle.setAlignment(HorizontalAlignment.CENTER);
            centerStyle.setBorderBottom(BorderStyle.THIN);
            centerStyle.setBorderLeft(BorderStyle.THIN);
            centerStyle.setBorderRight(BorderStyle.THIN);
            centerStyle.setBorderTop(BorderStyle.THIN);

            CellStyle leftStyle = workbook.createCellStyle();
            leftStyle.setAlignment(HorizontalAlignment.LEFT);
            leftStyle.setBorderBottom(BorderStyle.THIN);
            leftStyle.setBorderLeft(BorderStyle.THIN);
            leftStyle.setBorderRight(BorderStyle.THIN);
            leftStyle.setBorderTop(BorderStyle.THIN);

            int rowIdx = 1;
            for (Device device : devices) {
                Row row = sheet.createRow(rowIdx++);
                row.setHeightInPoints(18);

                createCell(row, 0, device.getId() != null ? String.valueOf(device.getId()) : "", centerStyle);
                createCell(row, 1, device.getDeviceName(), leftStyle);
                createCell(row, 2, device.getAssetId(), centerStyle);
                createCell(row, 3, device.getSite(), leftStyle);
                createCell(row, 4, device.getLocation(), leftStyle);
                createCell(row, 5, device.getIpAddress(), centerStyle);
                createCell(row, 6, device.getHostname(), leftStyle);
                createCell(row, 7, device.getModel(), leftStyle);
                createCell(row, 8, device.getSerialNumber(), centerStyle);
                createCell(row, 9, device.getAdapterType(), centerStyle);
                createCell(row, 10, device.getEnabledStatus(), centerStyle);
                createCell(row, 11, device.getOperationalStatus(), centerStyle);
                createCell(row, 12, device.getOperationalDetails(), leftStyle);
                createCell(row, 13, device.getLastSeen(), centerStyle);
            }

            // Auto-size columns
            for (int col = 0; col < columns.length; col++) {
                sheet.autoSizeColumn(col);
            }

            workbook.write(out);
            return out.toByteArray();
        }
    }

    private void createCell(Row row, int column, String value, CellStyle style) {
        Cell cell = row.createCell(column);
        cell.setCellValue(value != null ? value : "");
        cell.setCellStyle(style);
    }

    /**
     * Live generates a PDF report summarizing site-based status, operational states, scan stats, and alerts.
     */
    public byte[] generatePdfReport() throws DocumentException {
        List<Device> devices = deviceRepository.findAll();
        List<ScanJob> scanJobs = scanJobRepository.findAll();

        // 1. Calculations
        long totalDevices = devices.size();
        long onlineDevices = devices.stream().filter(d -> "Online".equalsIgnoreCase(d.getOperationalStatus())).count();
        long offlineDevices = totalDevices - onlineDevices;
        double onlineRate = totalDevices > 0 ? ((double) onlineDevices / totalDevices) * 100 : 0.0;

        // Group by Site
        Map<String, List<Device>> devicesBySite = devices.stream()
                .filter(d -> d.getSite() != null && !d.getSite().isBlank())
                .collect(Collectors.groupingBy(Device::getSite));

        // Group by Operational Status
        Map<String, Long> statusCounts = devices.stream()
                .filter(d -> d.getOperationalStatus() != null)
                .collect(Collectors.groupingBy(Device::getOperationalStatus, Collectors.counting()));

        // Group by Scan Job Status
        long totalScans = scanJobs.size();
        long activeScans = scanJobs.stream().filter(j -> "Running".equalsIgnoreCase(j.getStatus()) || "Pending".equalsIgnoreCase(j.getStatus())).count();
        long completedScans = scanJobs.stream().filter(j -> "Completed".equalsIgnoreCase(j.getStatus()) || "Finished".equalsIgnoreCase(j.getStatus())).count();
        long failedScans = scanJobs.stream().filter(j -> "Failed".equalsIgnoreCase(j.getStatus()) || "Cancelled".equalsIgnoreCase(j.getStatus())).count();

        // Critical alerts: Devices that are offline or disabled but should be online
        List<Device> criticalDevices = devices.stream()
                .filter(d -> !"Online".equalsIgnoreCase(d.getOperationalStatus()) || "Disabled".equalsIgnoreCase(d.getEnabledStatus()))
                .collect(Collectors.toList());

        // 2. Build PDF Document
        Document document = new Document(PageSize.A4, 36, 36, 36, 36);
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, out);

        document.open();

        // Styled Fonts
        com.lowagie.text.Font titleFont = new com.lowagie.text.Font(com.lowagie.text.Font.HELVETICA, 20, com.lowagie.text.Font.BOLD, new java.awt.Color(13, 148, 136)); // teal accent
        com.lowagie.text.Font sectionFont = new com.lowagie.text.Font(com.lowagie.text.Font.HELVETICA, 14, com.lowagie.text.Font.BOLD, new java.awt.Color(30, 41, 59));
        com.lowagie.text.Font bodyFont = new com.lowagie.text.Font(com.lowagie.text.Font.HELVETICA, 10, com.lowagie.text.Font.NORMAL);
        com.lowagie.text.Font bodyBoldFont = new com.lowagie.text.Font(com.lowagie.text.Font.HELVETICA, 10, com.lowagie.text.Font.BOLD);
        com.lowagie.text.Font headerFont = new com.lowagie.text.Font(com.lowagie.text.Font.HELVETICA, 10, com.lowagie.text.Font.BOLD, java.awt.Color.WHITE);
        com.lowagie.text.Font subtitleFont = new com.lowagie.text.Font(com.lowagie.text.Font.HELVETICA, 9, com.lowagie.text.Font.ITALIC, java.awt.Color.GRAY);

        // Header Title
        Paragraph title = new Paragraph("VoltControl - PDU Fleet Management Report", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingAfter(4);
        document.add(title);

        // Subtitle / Date
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        Paragraph subtitle = new Paragraph("Generated on: " + LocalDateTime.now().format(formatter) + " | Scope: Live Device Network Summary", subtitleFont);
        subtitle.setAlignment(Element.ALIGN_CENTER);
        subtitle.setSpacingAfter(20);
        document.add(subtitle);

        // Section 1: Summary Cards
        Paragraph sec1 = new Paragraph("1. System Fleet Summary", sectionFont);
        sec1.setSpacingAfter(10);
        document.add(sec1);

        PdfPTable summaryTable = new PdfPTable(4);
        summaryTable.setWidthPercentage(100);
        summaryTable.setSpacingAfter(20);

        addSummaryCell(summaryTable, "Total PDU Devices", String.valueOf(totalDevices), bodyFont, bodyBoldFont);
        addSummaryCell(summaryTable, "Online PDUs", String.valueOf(onlineDevices), bodyFont, bodyBoldFont);
        addSummaryCell(summaryTable, "Offline / Issue PDUs", String.valueOf(offlineDevices), bodyFont, bodyBoldFont);
        addSummaryCell(summaryTable, "Fleet Availability", String.format("%.1f%%", onlineRate), bodyFont, bodyBoldFont);

        document.add(summaryTable);

        // Section 2: Site-Based Mapping
        Paragraph sec2 = new Paragraph("2. Site-Based PDU Mapping", sectionFont);
        sec2.setSpacingAfter(10);
        document.add(sec2);

        PdfPTable siteTable = new PdfPTable(5);
        siteTable.setWidthPercentage(100);
        siteTable.setSpacingAfter(20);
        siteTable.setWidths(new float[]{2.5f, 1.0f, 1.0f, 1.0f, 1.5f});

        addTableHeader(siteTable, "Site Name", headerFont);
        addTableHeader(siteTable, "Total PDUs", headerFont);
        addTableHeader(siteTable, "Online", headerFont);
        addTableHeader(siteTable, "Offline", headerFont);
        addTableHeader(siteTable, "Online Rate", headerFont);

        for (Map.Entry<String, List<Device>> entry : devicesBySite.entrySet()) {
            String siteName = entry.getKey();
            List<Device> siteDevices = entry.getValue();
            long total = siteDevices.size();
            long online = siteDevices.stream().filter(d -> "Online".equalsIgnoreCase(d.getOperationalStatus())).count();
            long offline = total - online;
            double rate = total > 0 ? ((double) online / total) * 100 : 0.0;

            addTableCell(siteTable, siteName, bodyFont, Element.ALIGN_LEFT);
            addTableCell(siteTable, String.valueOf(total), bodyFont, Element.ALIGN_CENTER);
            addTableCell(siteTable, String.valueOf(online), bodyFont, Element.ALIGN_CENTER);
            addTableCell(siteTable, String.valueOf(offline), bodyFont, Element.ALIGN_CENTER);
            addTableCell(siteTable, String.format("%.1f%%", rate), bodyFont, Element.ALIGN_CENTER);
        }

        if (devicesBySite.isEmpty()) {
            PdfPCell cell = new PdfPCell(new Phrase("No site information found.", bodyFont));
            cell.setColspan(5);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            siteTable.addCell(cell);
        }

        document.add(siteTable);

        // Section 3: Operational Statuses & Scans
        Paragraph sec3 = new Paragraph("3. Operations & Scanning Activities", sectionFont);
        sec3.setSpacingAfter(10);
        document.add(sec3);

        PdfPTable opsTable = new PdfPTable(2);
        opsTable.setWidthPercentage(100);
        opsTable.setSpacingAfter(20);

        // Sub Table for Operational Status Counts
        PdfPTable opsStatusSub = new PdfPTable(2);
        opsStatusSub.setWidthPercentage(95);
        addTableHeader(opsStatusSub, "Operational Status", headerFont);
        addTableHeader(opsStatusSub, "Device Count", headerFont);
        for (Map.Entry<String, Long> entry : statusCounts.entrySet()) {
            addTableCell(opsStatusSub, entry.getKey(), bodyFont, Element.ALIGN_LEFT);
            addTableCell(opsStatusSub, String.valueOf(entry.getValue()), bodyFont, Element.ALIGN_CENTER);
        }
        if (statusCounts.isEmpty()) {
            PdfPCell cell = new PdfPCell(new Phrase("No data available.", bodyFont));
            cell.setColspan(2);
            opsStatusSub.addCell(cell);
        }

        // Sub Table for Scanning Status
        PdfPTable scanSub = new PdfPTable(2);
        scanSub.setWidthPercentage(95);
        addTableHeader(scanSub, "Scan Job Metric", headerFont);
        addTableHeader(scanSub, "Count", headerFont);
        addTableCell(scanSub, "Total Scan Jobs Run", bodyFont, Element.ALIGN_LEFT);
        addTableCell(scanSub, String.valueOf(totalScans), bodyFont, Element.ALIGN_CENTER);
        addTableCell(scanSub, "Active Scan Jobs", bodyFont, Element.ALIGN_LEFT);
        addTableCell(scanSub, String.valueOf(activeScans), bodyFont, Element.ALIGN_CENTER);
        addTableCell(scanSub, "Completed Scan Jobs", bodyFont, Element.ALIGN_LEFT);
        addTableCell(scanSub, String.valueOf(completedScans), bodyFont, Element.ALIGN_CENTER);
        addTableCell(scanSub, "Failed / Cancelled Scans", bodyFont, Element.ALIGN_LEFT);
        addTableCell(scanSub, String.valueOf(failedScans), bodyFont, Element.ALIGN_CENTER);

        PdfPCell opsContainerCell = new PdfPCell(opsStatusSub);
        opsContainerCell.setBorder(PdfPCell.NO_BORDER);
        opsTable.addCell(opsContainerCell);

        PdfPCell scanContainerCell = new PdfPCell(scanSub);
        scanContainerCell.setBorder(PdfPCell.NO_BORDER);
        opsTable.addCell(scanContainerCell);

        document.add(opsTable);

        // Section 4: Health Conditions & Alerts
        Paragraph sec4 = new Paragraph("4. Device Health Alerts (Offline or Disabled Devices)", sectionFont);
        sec4.setSpacingAfter(10);
        document.add(sec4);

        PdfPTable alertTable = new PdfPTable(5);
        alertTable.setWidthPercentage(100);
        alertTable.setWidths(new float[]{1.5f, 1.2f, 1.5f, 1.2f, 2.6f});

        addTableHeader(alertTable, "Device Name", headerFont);
        addTableHeader(alertTable, "IP Address", headerFont);
        addTableHeader(alertTable, "Site / Location", headerFont);
        addTableHeader(alertTable, "Status", headerFont);
        addTableHeader(alertTable, "Operational Details / Notes", headerFont);

        int alertCount = 0;
        for (Device device : criticalDevices) {
            if (alertCount++ >= 15) {
                // limit to top 15 alerts to avoid overfilling
                break;
            }
            addTableCell(alertTable, device.getDeviceName(), bodyFont, Element.ALIGN_LEFT);
            addTableCell(alertTable, device.getIpAddress(), bodyFont, Element.ALIGN_CENTER);
            addTableCell(alertTable, device.getSite() + " / " + (device.getLocation() != null ? device.getLocation() : "-"), bodyFont, Element.ALIGN_LEFT);
            
            String statusText = device.getOperationalStatus() + " (" + device.getEnabledStatus() + ")";
            addTableCell(alertTable, statusText, bodyFont, Element.ALIGN_CENTER);
            addTableCell(alertTable, device.getOperationalDetails() != null ? device.getOperationalDetails() : "No details recorded", bodyFont, Element.ALIGN_LEFT);
        }

        if (criticalDevices.isEmpty()) {
            PdfPCell cell = new PdfPCell(new Phrase("All devices are fully online and healthy. No alerts generated.", bodyFont));
            cell.setColspan(5);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setPadding(8);
            alertTable.addCell(cell);
        } else if (criticalDevices.size() > 15) {
            PdfPCell cell = new PdfPCell(new Phrase("Showing top 15 anomalies. Total fleet anomalies: " + criticalDevices.size(), subtitleFont));
            cell.setColspan(5);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            alertTable.addCell(cell);
        }

        document.add(alertTable);

        document.close();
        return out.toByteArray();
    }

    private void addSummaryCell(PdfPTable table, String label, String value, com.lowagie.text.Font labelFont, com.lowagie.text.Font valueFont) {
        PdfPCell cell = new PdfPCell();
        cell.setPadding(8);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setBackgroundColor(new java.awt.Color(248, 250, 252)); // slate-50
        cell.setBorderColor(new java.awt.Color(226, 232, 240));

        Paragraph labelPara = new Paragraph(label, labelFont);
        labelPara.setAlignment(Element.ALIGN_CENTER);
        cell.addElement(labelPara);

        Paragraph valPara = new Paragraph(value, valueFont);
        valPara.setAlignment(Element.ALIGN_CENTER);
        valPara.setSpacingBefore(4);
        cell.addElement(valPara);

        table.addCell(cell);
    }

    private void addTableHeader(PdfPTable table, String headerTitle, com.lowagie.text.Font font) {
        PdfPCell header = new PdfPCell();
        header.setBackgroundColor(new java.awt.Color(13, 148, 136)); // teal accent
        header.setBorderColor(new java.awt.Color(20, 184, 166));
        header.setPadding(6);
        header.setHorizontalAlignment(Element.ALIGN_CENTER);
        header.setVerticalAlignment(Element.ALIGN_MIDDLE);
        header.setPhrase(new Phrase(headerTitle, font));
        table.addCell(header);
    }

    private void addTableCell(PdfPTable table, String text, com.lowagie.text.Font font, int alignment) {
        PdfPCell cell = new PdfPCell(new Phrase(text != null ? text : "", font));
        cell.setPadding(5);
        cell.setHorizontalAlignment(alignment);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell.setBorderColor(new java.awt.Color(241, 245, 249));
        table.addCell(cell);
    }

    /**
     * Parses an uploaded Excel sheet and extracts device rows.
     */
    public List<DeviceDto> parseExcelImport(MultipartFile file) throws IOException {
        List<DeviceDto> parsedDevices = new ArrayList<>();

        try (InputStream is = file.getInputStream(); Workbook workbook = new XSSFWorkbook(is)) {
            Sheet sheet = workbook.getSheetAt(0);

            // Find header row or default to row 0
            Row headerRow = sheet.getRow(0);
            if (headerRow == null) {
                throw new IOException("Excel file does not contain a header row.");
            }

            // Map columns
            Map<String, Integer> colMap = new HashMap<>();
            for (int colIdx = 0; colIdx < headerRow.getLastCellNum(); colIdx++) {
                Cell cell = headerRow.getCell(colIdx);
                if (cell != null) {
                    String val = cell.getStringCellValue().trim().toLowerCase();
                    colMap.put(val, colIdx);
                }
            }

            // Expected Columns Matchers
            int nameIdx = getIndexForKeys(colMap, "device name", "devicename", "name");
            int assetIdx = getIndexForKeys(colMap, "asset id", "assetid", "asset");
            int siteIdx = getIndexForKeys(colMap, "site");
            int locIdx = getIndexForKeys(colMap, "location");
            int ipIdx = getIndexForKeys(colMap, "ip address", "ipaddress", "ip");
            int hostIdx = getIndexForKeys(colMap, "hostname");
            int modelIdx = getIndexForKeys(colMap, "model");
            int serialIdx = getIndexForKeys(colMap, "serial number", "serialnumber", "serial num", "serial");
            int adapterIdx = getIndexForKeys(colMap, "adapter type", "adaptertype", "adapter");
            int enabledIdx = getIndexForKeys(colMap, "enabled status", "enabledstatus", "enabled");
            int operationalIdx = getIndexForKeys(colMap, "operational status", "operationalstatus", "operational");

            // We must have at least Device Name, Asset ID, Site
            if (nameIdx == -1 || assetIdx == -1 || siteIdx == -1) {
                throw new IOException("Excel file must contain at least 'Device Name', 'Asset ID', and 'Site' columns.");
            }

            // Loop through data rows
            for (int r = 1; r <= sheet.getLastRowNum(); r++) {
                Row row = sheet.getRow(r);
                if (row == null || isRowEmpty(row)) {
                    continue;
                }

                DeviceDto dto = new DeviceDto();
                dto.setDeviceName(getCellValueAsString(row.getCell(nameIdx)));
                dto.setAssetId(getCellValueAsString(row.getCell(assetIdx)));
                dto.setSite(getCellValueAsString(row.getCell(siteIdx)));
                dto.setLocation(locIdx != -1 ? getCellValueAsString(row.getCell(locIdx)) : "");
                dto.setIpAddress(ipIdx != -1 ? getCellValueAsString(row.getCell(ipIdx)) : "");
                dto.setHostname(hostIdx != -1 ? getCellValueAsString(row.getCell(hostIdx)) : "");
                dto.setModel(modelIdx != -1 ? getCellValueAsString(row.getCell(modelIdx)) : "");
                dto.setSerialNumber(serialIdx != -1 ? getCellValueAsString(row.getCell(serialIdx)) : "");
                dto.setAdapterType(adapterIdx != -1 ? getCellValueAsString(row.getCell(adapterIdx)) : "");
                
                String enabled = enabledIdx != -1 ? getCellValueAsString(row.getCell(enabledIdx)) : "Enabled";
                dto.setEnabledStatus(enabled.isBlank() ? "Enabled" : enabled);
                
                String operational = operationalIdx != -1 ? getCellValueAsString(row.getCell(operationalIdx)) : "Online";
                dto.setOperationalStatus(operational.isBlank() ? "Online" : operational);
                dto.setOperationalDetails("Imported from Excel");

                parsedDevices.add(dto);
            }
        }

        return parsedDevices;
    }

    private int getIndexForKeys(Map<String, Integer> colMap, String... keys) {
        for (String key : keys) {
            if (colMap.containsKey(key)) {
                return colMap.get(key);
            }
        }
        return -1;
    }

    private boolean isRowEmpty(Row row) {
        for (int c = row.getFirstCellNum(); c < row.getLastCellNum(); c++) {
            Cell cell = row.getCell(c);
            if (cell != null && cell.getCellType() != CellType.BLANK) {
                return false;
            }
        }
        return true;
    }

    private String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return "";
        }
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue().trim();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getLocalDateTimeCellValue().toString();
                }
                // Handle numeric double or integer formatting
                double val = cell.getNumericCellValue();
                if (val == (long) val) {
                    return String.format("%d", (long) val);
                } else {
                    return String.valueOf(val);
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                try {
                    return cell.getStringCellValue();
                } catch (Exception e) {
                    return String.valueOf(cell.getNumericCellValue());
                }
            case BLANK:
            default:
                return "";
        }
    }
}
