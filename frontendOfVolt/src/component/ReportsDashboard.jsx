import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styles, colors } from "../styles/files/reportsDashboardStyles";
import Sidebar from "./Sidebar";
import apiRequest from "../api/apiClient";

// Icons
const FileTextIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const UploadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const LoadingSpinner = () => (
  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ animation: "spin 1s linear infinite" }}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" />
    <path d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
  </svg>
);

const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: colors.green }}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: colors.amber }}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ReportsDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const empId = localStorage.getItem("loggedInEmpId") || "EMP-USER";

  const [userData, setUserData] = useState({
    username: localStorage.getItem("loggedInUsername") || "PDU Operator",
    role: localStorage.getItem("loggedInRole") || "User",
    profileImage: localStorage.getItem("loggedInProfileImage") || null,
    officeEmail: "",
    joiningDate: ""
  });

  const userName = userData.username;
  const userRole = userData.role;

  // Collapsed state listener
  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );

  // General report listings and counts
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [deviceStats, setDeviceStats] = useState({ total: 0, online: 0, offline: 0, onlineRate: 100 });
  const [searchQuery, setSearchQuery] = useState("");

  // Upload/Import State
  const [fileToUpload, setFileToUpload] = useState(null);
  const [uploadDescription, setUploadDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle | loading | success | error
  const [uploadError, setUploadError] = useState("");

  // Excel Preview Import State
  const [excelPreviewData, setExcelPreviewData] = useState([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [commitStatus, setCommitStatus] = useState("idle"); // idle | loading | success | error
  const [commitProgress, setCommitProgress] = useState({ current: 0, total: 0 });

  // Hover states for export cards
  const [hoveredExport, setHoveredExport] = useState(null);

  // Toast message
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3500);
  };

  useEffect(() => {
    // Poll sidebar collapsed state from body class
    const checkSidebarCollapsed = () => {
      const isBodyCollapsed = document.body.classList.contains("sidebar-collapsed");
      setIsCollapsed(isBodyCollapsed);
    };

    const interval = setInterval(checkSidebarCollapsed, 250);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    setLoadingReports(true);
    try {
      // 1. Fetch saved reports
      const repRes = await apiRequest("/api/reports");
      if (repRes && repRes.ok) {
        const repData = await repRes.json();
        // Sort reports: newest uploaded/generated first
        const sorted = repData.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
        setReports(sorted);
      }

      // 2. Fetch devices to calculate live fleet metrics
      const devRes = await apiRequest("/api/devices?size=1000");
      if (devRes && devRes.ok) {
        const devData = await devRes.json();
        const devices = devData.content || [];
        const total = devices.length;
        const online = devices.filter(d => d.operationalStatus?.toLowerCase() === "online").length;
        const offline = total - online;
        const onlineRate = total > 0 ? Math.round((online / total) * 100) : 100;
        setDeviceStats({ total, online, offline, onlineRate });
      }
    } catch (e) {
      console.error("Error loading reports or devices data", e);
      showToast("Error retrieving system data. Is the server running?", "error");
    } finally {
      setLoadingReports(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (empId && empId !== "EMP-USER") {
      apiRequest(`/api/users/${empId}`)
        .then(res => {
          if (res && res.ok) return res.json();
          throw new Error("Failed to fetch");
        })
        .then(data => {
          setUserData({
            username: data.username || userData.username,
            role: data.role || userData.role,
            profileImage: data.profileImage || null,
            officeEmail: data.officeEmail || "",
            joiningDate: data.joiningDate || ""
          });
        })
        .catch(err => console.error("Error loading user profile in ReportsDashboard:", err));
    }
  }, []);

  // --- Export Actions ---
  const handleExportExcel = async () => {
    try {
      showToast("Generating live Excel sheet...", "success");
      const res = await apiRequest("/api/reports/export/excel");
      if (!res || !res.ok) throw new Error("Excel export failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      // Extract filename from Content-Disposition if present, else template
      const disposition = res.headers.get('content-disposition');
      let filename = `PDU_Devices_Report_${new Date().toISOString().slice(0, 10)}.xlsx`;
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);

      showToast("Excel spreadsheet downloaded & archived!", "success");
      fetchData(); // Refresh history
    } catch (e) {
      console.error(e);
      showToast("Could not generate Excel spreadsheet.", "error");
    }
  };

  const handleExportPdf = async () => {
    try {
      showToast("Compiling PDF fleet summary report...", "success");
      const res = await apiRequest("/api/reports/export/pdf");
      if (!res || !res.ok) throw new Error("PDF export failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      const disposition = res.headers.get('content-disposition');
      let filename = `PDU_System_Report_${new Date().toISOString().slice(0, 10)}.pdf`;
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);

      showToast("PDF report generated & archived!", "success");
      fetchData(); // Refresh history
    } catch (e) {
      console.error(e);
      showToast("Could not compile PDF report.", "error");
    }
  };

  // --- Upload / Import drag-and-drop triggers ---
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file) => {
    const name = file.name.toLowerCase();
    if (!name.endsWith(".pdf") && !name.endsWith(".xlsx") && !name.endsWith(".xls")) {
      setUploadError("Unsupported format. Please upload PDF or Excel documents only.");
      setUploadStatus("error");
      setFileToUpload(null);
      return;
    }

    if (file.size > 15 * 1024 * 1024) { // 15MB max
      setUploadError("File exceeds the 15MB maximum size limit.");
      setUploadStatus("error");
      setFileToUpload(null);
      return;
    }

    setFileToUpload(file);
    setUploadError("");
    setUploadStatus("idle");
  };

  const handleImportSubmit = async () => {
    if (!fileToUpload) return;

    const isExcel = fileToUpload.name.endsWith(".xlsx") || fileToUpload.name.endsWith(".xls");

    if (isExcel) {
      // If it is Excel, trigger Excel preview parsing
      setUploadStatus("loading");
      const formData = new FormData();
      formData.append("file", fileToUpload);

      try {
        const res = await apiRequest("/api/reports/import/excel/preview", {
          method: "POST",
          body: formData,
        });

        if (!res || !res.ok) {
          const errText = await res.text();
          throw new Error(errText || "Failed parsing Excel sheet");
        }

        const data = await res.json();
        setExcelPreviewData(data);
        setShowPreviewModal(true);
        setUploadStatus("success");
        showToast(`Parsed ${data.length} device rows from Excel sheet!`, "success");
      } catch (e) {
        console.error(e);
        setUploadError(e.message || "Failed to parse Excel spreadsheet.");
        setUploadStatus("error");
      }
    } else {
      // If PDF, upload and store PDF directly to the database
      setUploadStatus("loading");
      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("description", uploadDescription || "Uploaded external PDF report");

      try {
        const res = await apiRequest("/api/reports/upload", {
          method: "POST",
          body: formData,
        });

        if (!res || !res.ok) throw new Error("Report upload failed");

        setUploadStatus("success");
        setFileToUpload(null);
        setUploadDescription("");
        showToast("PDF report imported and saved to log archives!", "success");
        fetchData(); // Refresh history
      } catch (e) {
        console.error(e);
        setUploadError("Could not upload PDF report file to the database.");
        setUploadStatus("error");
      }
    }
  };

  // --- Commit Excel Devices Import ---
  const handleCommitExcelImport = async () => {
    if (excelPreviewData.length === 0) return;

    setCommitStatus("loading");
    setCommitProgress({ current: 0, total: excelPreviewData.length });

    let successCount = 0;
    let failedCount = 0;

    for (let i = 0; i < excelPreviewData.length; i++) {
      const row = excelPreviewData[i];
      const newUuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, () =>
        (Math.random() * 16 | 0).toString(16)
      );

      const payload = {
        uuid: row.uuid || newUuid,
        deviceName: row.deviceName || "",
        assetId: row.assetId || "",
        site: row.site || "",
        location: row.location || "",
        ipAddress: row.ipAddress || "",
        hostname: row.hostname || "",
        model: row.model || "",
        serialNumber: row.serialNumber || "",
        adapterType: row.adapterType || "",
        enabledStatus: row.enabledStatus || "Enabled",
        operationalStatus: row.operationalStatus || "Online",
        operationalDetails: row.operationalDetails || "Imported from Excel",
        lastSeen: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
        createdByEmpId: empId,
      };

      try {
        const res = await apiRequest('/api/devices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res && res.ok) {
          successCount++;
        } else {
          failedCount++;
        }
      } catch (err) {
        failedCount++;
      }

      setCommitProgress({ current: i + 1, total: excelPreviewData.length });
    }

    setCommitStatus("success");
    showToast(`Successfully imported ${successCount} devices from Excel! (${failedCount} failed)`, successCount > 0 ? "success" : "error");

    // Also auto-archive the imported spreadsheet to report logs history
    try {
      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("description", `Excel device source file (imported ${successCount} devices)`);
      await apiRequest("/api/reports/upload", {
        method: "POST",
        body: formData,
      });
    } catch (err) {
      console.warn("Failed to archive source excel sheet in history", err);
    }

    setTimeout(() => {
      setShowPreviewModal(false);
      setFileToUpload(null);
      setExcelPreviewData([]);
      setCommitStatus("idle");
      fetchData(); // Refresh history & device stats!
    }, 1500);
  };

  // --- Download Archived file ---
  const handleDownloadSavedReport = (id, fileName) => {
    showToast(`Downloading report: ${fileName}...`, "success");
    window.open(`http://localhost:8080/api/reports/download/${id}`);
  };

  // --- Delete Saved report ---
  const handleDeleteSavedReport = async (id, fileName) => {
    if (!window.confirm(`Are you sure you want to delete report: ${fileName}?`)) return;

    try {
      const res = await apiRequest(`/api/reports/${id}`, {
        method: "DELETE",
      });

      if (!res || !res.ok) throw new Error("Delete failed");

      showToast("Report deleted from logs archives.", "success");
      fetchData();
    } catch (e) {
      console.error(e);
      showToast("Could not delete report.", "error");
    }
  };

  const getFileIcon = (fileType) => {
    if ("PDF".equalsIgnoreCase(fileType)) return "📄";
    return "📈";
  };

  // Formatting utils
  const formatBytes = (bytes) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatTimestamp = (isoStr) => {
    if (!isoStr) return "-";
    const date = new Date(isoStr);
    return date.toLocaleString();
  };

  const filteredReports = reports.filter(r =>
    r.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.page(isCollapsed)}>
      {/* Toast Notification */}
      {toast.show && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          backgroundColor: toast.type === "success" ? "#0f172a" : "#ef4444",
          color: "#ffffff",
          padding: "12px 24px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          fontWeight: "600",
          animation: "fadeInUp 0.3s ease-out"
        }}>
          {toast.type === "success" ? "✓" : "⚠️"} {toast.message}
        </div>
      )}

      {/* Sidebar Layout */}
      <Sidebar />

      {/* Main Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.headerTitle}>System Reports Hub</h1>
          <p style={styles.headerSubtitle}>Generate, export, and import live PDU databases, health summaries, and fleet mappings</p>
        </div>
        <div style={styles.headerRight}>
          <button
            type="button"
            style={styles.browseButton}
            onClick={fetchData}
            title="Refresh logs history"
          >
            <RefreshIcon />
          </button>
          <div
            style={{ ...styles.profilePill, cursor: 'pointer' }}
            onClick={() => navigate('/admin/detail', {
              state: {
                userData,
                empId: empId
              }
            })}
          >
            <div style={{ ...styles.avatarCircle, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {userData.profileImage ? (
                <img src={userData.profileImage} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                userName.slice(0, 2).toUpperCase()
              )}
            </div>
            <span style={styles.profileName}>{userName} ({userRole})</span>
          </div>
        </div>
      </header>

      {/* Fleet Overview statistics */}
      <section style={styles.metricsGrid}>
        <div style={styles.metricCard(colors.tealLight)}>
          <div style={styles.metricIconCircle(colors.tealLight, colors.teal)}>📈</div>
          <div style={styles.metricMeta}>
            <span style={styles.metricLabel}>Total Report Logs</span>
            <h3 style={styles.metricValue}>{reports.length}</h3>
          </div>
        </div>

        <div style={styles.metricCard(colors.indigoLight)}>
          <div style={styles.metricIconCircle(colors.indigoLight, colors.indigo)}>🖥️</div>
          <div style={styles.metricMeta}>
            <span style={styles.metricLabel}>Total PDU Devices</span>
            <h3 style={styles.metricValue}>{deviceStats.total}</h3>
          </div>
        </div>

        <div style={styles.metricCard(colors.greenLight)}>
          <div style={styles.metricIconCircle(colors.greenLight, colors.green)}>✓</div>
          <div style={styles.metricMeta}>
            <span style={styles.metricLabel}>Online PDUs</span>
            <h3 style={styles.metricValue}>{deviceStats.online}</h3>
          </div>
        </div>

        <div style={styles.metricCard(colors.amberLight)}>
          <div style={styles.metricIconCircle(colors.amberLight, colors.amber)}>📡</div>
          <div style={styles.metricMeta}>
            <span style={styles.metricLabel}>Fleet Availability Rate</span>
            <h3 style={styles.metricValue}>{deviceStats.onlineRate}%</h3>
          </div>
        </div>
      </section>

      {/* Controls Panels split grid */}
      <section style={styles.dashboardGrid}>
        {/* Panel 1: Live Exports */}
        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <div style={styles.panelTitleRow}>
              <span style={styles.panelIcon}><FileTextIcon /></span>
              <div>
                <h3 style={styles.panelTitle}>Export Live Fleet Reports</h3>
                <p style={styles.panelSubtitle}>Download generated assets based on real-time data</p>
              </div>
            </div>
          </div>

          <div style={styles.exportsGrid}>
            {/* Excel card */}
            <div
              style={styles.exportCard(colors.green, hoveredExport === "excel")}
              onMouseEnter={() => setHoveredExport("excel")}
              onMouseLeave={() => setHoveredExport(null)}
              onClick={handleExportExcel}
            >
              <div style={styles.exportIconCircle(colors.greenLight, colors.green)}>📈</div>
              <div style={styles.exportMeta}>
                <h4 style={styles.exportTitle}>Live Excel Database</h4>
                <p style={styles.exportDescription}>Full-detail spreadsheet containing all registered device records, IPs, serial keys, sites, and configuration parameters.</p>
              </div>
              <button
                type="button"
                style={styles.exportButton(colors.green, hoveredExport === "excel")}
              >
                Generate Excel
              </button>
            </div>

            {/* PDF card */}
            <div
              style={styles.exportCard(colors.red, hoveredExport === "pdf")}
              onMouseEnter={() => setHoveredExport("pdf")}
              onMouseLeave={() => setHoveredExport(null)}
              onClick={handleExportPdf}
            >
              <div style={styles.exportIconCircle(colors.redLight, colors.red)}>📄</div>
              <div style={styles.exportMeta}>
                <h4 style={styles.exportTitle}>Live PDF Fleet Status</h4>
                <p style={styles.exportDescription}>Beautiful executive summary showing site-based online/offline mappings, operational statuses, scan metrics, and health alerts.</p>
              </div>
              <button
                type="button"
                style={styles.exportButton(colors.red, hoveredExport === "pdf")}
              >
                Generate PDF Report
              </button>
            </div>
          </div>
        </div>

        {/* Panel 2: Upload / Import */}
        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <div style={styles.panelTitleRow}>
              <span style={styles.panelIcon}><UploadIcon /></span>
              <div>
                <h3 style={styles.panelTitle}>Import Devices or Archive Reports</h3>
                <p style={styles.panelSubtitle}>Drop Excel files to import PDU devices, or PDF files to save/archive</p>
              </div>
            </div>
          </div>

          {/* Drag & Drop zone */}
          <div
            style={styles.dropZone(isDragging, !!fileToUpload)}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {fileToUpload ? (
              <div style={styles.loadedFileCard}>
                <div style={styles.loadedFileIconBox(
                  fileToUpload.name.endsWith(".pdf") ? colors.redLight : colors.greenLight,
                  fileToUpload.name.endsWith(".pdf") ? colors.red : colors.green
                )}>
                  {fileToUpload.name.endsWith(".pdf") ? "PDF" : "XLS"}
                </div>
                <div style={styles.loadedFileMeta}>
                  <p style={styles.loadedFileName}>{fileToUpload.name}</p>
                  <p style={styles.loadedFileSize}>{formatBytes(fileToUpload.size)}</p>
                </div>
                <div style={styles.loadedFileActions}>
                  <button
                    type="button"
                    style={styles.removeFileBtn}
                    onClick={() => { setFileToUpload(null); setUploadStatus("idle"); setUploadDescription(""); }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={styles.dropIconCircle}>
                  <UploadIcon />
                </div>
                <p style={styles.dropText}>Drag and drop PDF or Excel sheet here</p>
                <p style={styles.dropSubtext}>Excel imports devices | PDF archives reports (Max 15MB)</p>
                <label style={styles.browseButton}>
                  Browse Files
                  <input
                    type="file"
                    accept=".pdf,.xlsx,.xls"
                    onChange={handleFileSelect}
                    style={styles.fileInput}
                  />
                </label>
              </>
            )}
          </div>

          {fileToUpload && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "4px" }}>
              <div style={styles.formGroup}>
                <label style={styles.inputLabel}>File Description / Notes</label>
                <input
                  type="text"
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  placeholder={fileToUpload.name.endsWith(".pdf") ? "E.g., Frankfurt Q3 Maintenance Audit PDF" : "E.g., Excel batch import source - August"}
                  style={styles.textInput}
                />
              </div>

              <button
                type="button"
                onClick={handleImportSubmit}
                style={{
                  ...styles.exportButton(fileToUpload.name.endsWith(".pdf") ? colors.red : colors.green, true),
                  alignSelf: "flex-end",
                  width: "auto",
                  padding: "10px 28px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
                disabled={uploadStatus === "loading"}
              >
                {uploadStatus === "loading" && <LoadingSpinner />}
                {fileToUpload.name.endsWith(".pdf") ? "Archive PDF Report" : "Parse & Import Devices"}
              </button>
            </div>
          )}

          {uploadStatus === "error" && uploadError && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 14px",
              backgroundColor: colors.redLight,
              color: colors.red,
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: "500",
              textAlign: "left"
            }}>
              <span style={{ fontSize: "16px" }}>⚠️</span> {uploadError}
            </div>
          )}
        </div>

        {/* Panel 3: Saved Reports Logs history */}
        <div style={{ ...styles.panel, ...styles.panelFullWidth }}>
          <div style={styles.panelHeader}>
            <div style={styles.panelTitleRow}>
              <span style={styles.panelIcon}>📁</span>
              <div>
                <h3 style={styles.panelTitle}>Archived Report Logs</h3>
                <p style={styles.panelSubtitle}>History listing of generated exports and imported reports</p>
              </div>
            </div>

            {/* Search Filter */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <span style={{ position: "absolute", left: "12px", color: colors.textSecondary, display: "flex" }}><SearchIcon /></span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search logs..."
                  style={{
                    ...styles.textInput,
                    paddingLeft: "36px",
                    width: "220px",
                    backgroundColor: colors.slate50,
                    border: `1px solid ${colors.border}`,
                    fontSize: "13px",
                  }}
                />
              </div>
            </div>
          </div>

          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Report Name / File</th>
                  <th style={styles.th}>Description</th>
                  <th style={styles.th}>File Size</th>
                  <th style={styles.th}>Date Stamped</th>
                  <th style={styles.th}>Origin</th>
                  <th style={{ ...styles.th, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingReports ? (
                  <tr>
                    <td colSpan="7" style={{ ...styles.td, textAlign: "center", padding: "30px", color: colors.textSecondary }}>
                      Loading report logs from vault...
                    </td>
                  </tr>
                ) : filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ ...styles.td, textAlign: "center", padding: "30px", color: colors.textSecondary }}>
                      No reports found in history log.
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((report) => (
                    <tr key={report.id} style={styles.trHover} className="report-log-row">
                      <td style={styles.td}>
                        <span style={styles.typeBadge(report.fileType)}>{report.fileType}</span>
                      </td>
                      <td style={{ ...styles.td, fontWeight: "600" }}>{report.fileName}</td>
                      <td style={styles.td}>{report.description}</td>
                      <td style={styles.td}>{formatBytes(report.fileSize)}</td>
                      <td style={styles.td}>{formatTimestamp(report.uploadedAt)}</td>
                      <td style={styles.td}>
                        {report.generated ? (
                          <span style={{ fontSize: "11px", color: colors.teal, fontWeight: "600", padding: "3px 8px", borderRadius: "6px", backgroundColor: colors.tealLight }}>System</span>
                        ) : (
                          <span style={{ fontSize: "11px", color: colors.indigo, fontWeight: "600", padding: "3px 8px", borderRadius: "6px", backgroundColor: colors.indigoLight }}>Import</span>
                        )}
                      </td>
                      <td style={{ ...styles.td, textAlign: "right" }}>
                        <div style={{ ...styles.actionBtnGroup, justifyContent: "flex-end" }}>
                          <button
                            type="button"
                            style={styles.iconActionBtn(colors.tealLight, colors.teal)}
                            onClick={() => handleDownloadSavedReport(report.id, report.fileName)}
                            title="Download Report file"
                          >
                            <DownloadIcon />
                          </button>
                          <button
                            type="button"
                            style={styles.iconActionBtn(colors.redLight, colors.red)}
                            onClick={() => handleDeleteSavedReport(report.id, report.fileName)}
                            title="Delete Log"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Excel Devices Preview Modal */}
      {showPreviewModal && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "20px" }}>📈</span>
                <div>
                  <h3 style={{ ...styles.panelTitle, fontSize: "17px" }}>Review Devices to Import</h3>
                  <p style={styles.panelSubtitle}>Excel sheet successfully parsed. Please review rows before database commit.</p>
                </div>
              </div>
              <button
                type="button"
                style={styles.removeFileBtn}
                onClick={() => setShowPreviewModal(false)}
              >
                &times;
              </button>
            </div>

            <div style={styles.modalBody}>
              {commitStatus === "loading" ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center", padding: "50px 0", gap: "16px" }}>
                  <LoadingSpinner />
                  <p style={{ fontWeight: "700", color: colors.textPrimary }}>Importing devices into VoltControl...</p>
                  <div style={{ width: "100%", maxWidth: "300px", height: "8px", backgroundColor: colors.slate100, borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${(commitProgress.current / commitProgress.total) * 100}%`,
                      backgroundColor: colors.green,
                      transition: "width 0.2s ease"
                    }} />
                  </div>
                  <span style={{ fontSize: "12px", color: colors.textSecondary }}>Row {commitProgress.current} of {commitProgress.total}</span>
                </div>
              ) : commitStatus === "success" ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center", padding: "40px 0", gap: "12px" }}>
                  <CheckCircleIcon />
                  <p style={{ fontWeight: "800", color: colors.textPrimary, fontSize: "18px" }}>Import Completed!</p>
                  <p style={{ fontSize: "14px", color: colors.textSecondary }}>Device database has been successfully updated.</p>
                </div>
              ) : (
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Device Name</th>
                        <th style={styles.th}>Asset ID</th>
                        <th style={styles.th}>Site</th>
                        <th style={styles.th}>Location</th>
                        <th style={styles.th}>IP Address</th>
                        <th style={styles.th}>Model</th>
                        <th style={styles.th}>Operational Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {excelPreviewData.map((row, idx) => (
                        <tr key={idx} style={styles.trHover}>
                          <td style={styles.td}>{row.deviceName}</td>
                          <td style={styles.td}>{row.assetId}</td>
                          <td style={styles.td}>{row.site}</td>
                          <td style={styles.td}>{row.location || "-"}</td>
                          <td style={styles.td}>{row.ipAddress || "-"}</td>
                          <td style={styles.td}>{row.model || "-"}</td>
                          <td style={styles.td}>{row.operationalStatus || "Online"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {commitStatus === "idle" && (
              <div style={styles.modalFooter}>
                <button
                  type="button"
                  style={styles.browseButton}
                  onClick={() => setShowPreviewModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCommitExcelImport}
                  style={styles.exportButton(colors.green, true)}
                >
                  Confirm Import ({excelPreviewData.length} Devices)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsDashboard;
