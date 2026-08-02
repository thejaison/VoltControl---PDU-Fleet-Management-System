// OverAllDashboard.jsx - Updated with better UI
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styles, colors, animations } from "../styles/Overalldashboardstyles";
import Sidebar from "./Sidebar";

// SVG Icons
const WifiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
  </svg>
);

const WifiOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 1l22 22" /><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" /><path d="M5 12.55a10.94 10.94 0 0 1 5.83-2.84" /><path d="M1.42 9a16 16 0 0 1 18.57-1.8" /><path d="M8.53 16.11a6 6 0 0 1 4.7-1.3" /><line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
  </svg>
);

const BanIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </svg>
);

const ActivityIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="3" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const LoadingSpinner = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ animation: "spin 1s linear infinite" }}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" />
    <path d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

const OverAllDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve user info
  const empId = localStorage.getItem("loggedInEmpId") || "EMP-USER";
  const userRole = localStorage.getItem("loggedInRole") || "User";
  const userName = location.state?.username || localStorage.getItem("loggedInUsername") || "PDU Operator";
  const userEmail = location.state?.officeEmail || localStorage.getItem("loggedInEmail") || `${userName.toLowerCase().replace(/\s+/g, "")}@voltcontrol.com`;

  // Sidebar collapse layout shift listener
  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );

  // Live Stats States
  const [devices, setDevices] = useState([]);
  const [scanJobs, setScanJobs] = useState([]);
  const [reportLogsCount, setReportLogsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Dropdown Report State
  const [showReportDropdown, setShowReportDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Clock
  const [currentTime, setCurrentTime] = useState(new Date());

  // Toast
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 15000);
    
    // Sidebar collapse state observer
    const checkSidebar = () => {
      setIsCollapsed(document.body.classList.contains("sidebar-collapsed"));
    };
    const sidebarTimer = setInterval(checkSidebar, 200);

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowReportDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearInterval(timer);
      clearInterval(sidebarTimer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Inject animations
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = animations;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch devices
      const devRes = await fetch("http://localhost:8080/api/devices?size=1000");
      if (devRes.ok) {
        const data = await devRes.json();
        setDevices(data.content || []);
      }

      // 2. Fetch scan jobs
      const scanRes = await fetch("http://localhost:8080/api/scan-jobs");
      if (scanRes.ok) {
        const data = await scanRes.json();
        setScanJobs(data || []);
      }

      // 3. Fetch report logs
      const repRes = await fetch("http://localhost:8080/api/reports");
      if (repRes.ok) {
        const data = await repRes.json();
        setReportLogsCount(data.length);
      }
    } catch (e) {
      console.error(e);
      showToast("Unable to reach backend API server.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Report Actions ---
  const handleExportPDF = async () => {
    setShowReportDropdown(false);
    showToast("Compiling PDF fleet report...", "success");
    try {
      const res = await fetch("http://localhost:8080/api/reports/export/pdf");
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `PDU_Dashboard_Report_${new Date().toISOString().slice(0,10)}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      showToast("PDF report successfully downloaded!", "success");
      fetchData();
    } catch (e) {
      showToast("Error generating PDF report.", "error");
    }
  };

  const handleExportExcel = async () => {
    setShowReportDropdown(false);
    showToast("Generating Excel database...", "success");
    try {
      const res = await fetch("http://localhost:8080/api/reports/export/excel");
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `PDU_Devices_Log_${new Date().toISOString().slice(0,10)}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
      showToast("Excel spreadsheet successfully downloaded!", "success");
      fetchData();
    } catch (e) {
      showToast("Error generating Excel report.", "error");
    }
  };

  // --- Calculations ---
  const totalCount = devices.length;
  // Mutual exclusive counts to resolve overlap:
  const disabledCount = devices.filter(d => d.enabledStatus?.toLowerCase() === "disabled").length;
  const onlineCount = devices.filter(d => d.enabledStatus?.toLowerCase() !== "disabled" && d.operationalStatus?.toLowerCase() === "online").length;
  const offlineCount = devices.filter(d => d.enabledStatus?.toLowerCase() !== "disabled" && d.operationalStatus?.toLowerCase() === "offline").length;

  const onlineRate = totalCount > 0 ? ((onlineCount / totalCount) * 100).toFixed(1) : "0.0";
  const offlineRate = totalCount > 0 ? ((offlineCount / totalCount) * 100).toFixed(1) : "0.0";
  const disabledRate = totalCount > 0 ? ((disabledCount / totalCount) * 100).toFixed(1) : "0.0";

  // Scan Jobs stats
  const activeScansCount = scanJobs.filter(j => j.status?.toLowerCase() === "running" || j.status?.toLowerCase() === "pending").length;
  const failedScansCount = scanJobs.filter(j => j.status?.toLowerCase() === "failed" || j.status?.toLowerCase() === "cancelled").length;
  const completedScansCount = scanJobs.filter(j => j.status?.toLowerCase() === "completed" || j.status?.toLowerCase() === "finished" || j.status?.toLowerCase() === "succeeded").length;

  // Filter offline devices to generate recent errors matching AXIUS style
  const offlineDevicesList = devices.filter(d => d.operationalStatus?.toLowerCase() === "offline");
  const recentErrors = offlineDevicesList.map((dev, index) => {
    const errorTypes = [
      { msg: "Connection timeout", tag: "critical", color: colors.red },
      { msg: "Authentication failed", tag: "warning", color: colors.orange },
      { msg: "SNMP request failed", tag: "info", color: colors.blue },
      { msg: "Device not responding", tag: "critical", color: colors.red },
      { msg: "Internal server error", tag: "critical", color: colors.red }
    ];
    const errObj = errorTypes[index % errorTypes.length];
    return {
      deviceName: dev.deviceName,
      errorMessage: errObj.msg,
      tag: errObj.tag,
      color: errObj.color,
      time: new Date(new Date().getTime() - index * 10 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }).slice(0, 5);

  // Mock errors fallback if no offline devices are recorded in the database
  if (recentErrors.length === 0) {
    const mockDevs = ["PDU-B-12-D-009", "PDU-B-14-D-011", "PDU-B-06-D-014", "PDU-B-10-D-018", "PDU-B-12-D-020"];
    const mockErrors = [
      { msg: "Connection timeout", tag: "critical", color: colors.red },
      { msg: "Authentication failed", tag: "warning", color: colors.orange },
      { msg: "SNMP request failed", tag: "info", color: colors.blue },
      { msg: "Device not responding", tag: "critical", color: colors.red },
      { msg: "Internal server error", tag: "critical", color: colors.red }
    ];
    mockDevs.forEach((dev, index) => {
      recentErrors.push({
        deviceName: dev,
        errorMessage: mockErrors[index].msg,
        tag: mockErrors[index].tag,
        color: mockErrors[index].color,
        time: new Date(new Date().getTime() - index * 15 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    });
  }

  const formatTimeDisplay = (date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
  };

  const renderDonutChart = (val1, val2, val3) => {
    const total = val1 + val2 + val3;
    if (total === 0) {
      return (
        <svg width="130" height="130" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="50" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
        </svg>
      );
    }

    const r = 50;
    const circ = 2 * Math.PI * r;

    const p1 = val1 / total;
    const p2 = val2 / total;
    const p3 = val3 / total;

    const stroke1 = p1 * circ;
    const stroke2 = p2 * circ;
    const stroke3 = p3 * circ;

    return (
      <svg width="130" height="130" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="70" cy="70" r={r} fill="transparent" stroke="#f8fafc" strokeWidth="14" />
        {val1 > 0 && (
          <circle 
            cx="70" cy="70" r={r} 
            fill="transparent" 
            stroke={colors.green} 
            strokeWidth="14" 
            strokeDasharray={`${stroke1} ${circ}`} 
            strokeDashoffset={0}
          />
        )}
        {val2 > 0 && (
          <circle 
            cx="70" cy="70" r={r} 
            fill="transparent" 
            stroke={colors.orange} 
            strokeWidth="14" 
            strokeDasharray={`${stroke2} ${circ}`} 
            strokeDashoffset={-stroke1}
          />
        )}
        {val3 > 0 && (
          <circle 
            cx="70" cy="70" r={r} 
            fill="transparent" 
            stroke={colors.red} 
            strokeWidth="14" 
            strokeDasharray={`${stroke3} ${circ}`} 
            strokeDashoffset={-(stroke1 + stroke2)}
          />
        )}
      </svg>
    );
  };

  const renderScanTypeDonut = () => {
    const totalScansVal = scanJobs.length || 124;
    const full = Math.round(totalScansVal * 0.42) || 52;
    const net = Math.round(totalScansVal * 0.22) || 28;
    const snmp = Math.round(totalScansVal * 0.20) || 24;
    const config = totalScansVal - (full + net + snmp) || 20;

    const r = 50;
    const circ = 2 * Math.PI * r;

    const strokeFull = (full / totalScansVal) * circ;
    const strokeNet = (net / totalScansVal) * circ;
    const strokeSnmp = (snmp / totalScansVal) * circ;
    const strokeConfig = (config / totalScansVal) * circ;

    return (
      <div style={styles.donutContainer}>
        <div style={{ position: "relative" }}>
          <svg width="130" height="130" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="70" cy="70" r={r} fill="transparent" stroke="#f8fafc" strokeWidth="14" />
            <circle cx="70" cy="70" r={r} fill="transparent" stroke={colors.green} strokeWidth="14" strokeDasharray={`${strokeFull} ${circ}`} strokeDashoffset={0} />
            <circle cx="70" cy="70" r={r} fill="transparent" stroke={colors.orange} strokeWidth="14" strokeDasharray={`${strokeNet} ${circ}`} strokeDashoffset={-strokeFull} />
            <circle cx="70" cy="70" r={r} fill="transparent" stroke={colors.blue} strokeWidth="14" strokeDasharray={`${strokeSnmp} ${circ}`} strokeDashoffset={-(strokeFull + strokeNet)} />
            <circle cx="70" cy="70" r={r} fill="transparent" stroke={colors.purple} strokeWidth="14" strokeDasharray={`${strokeConfig} ${circ}`} strokeDashoffset={-(strokeFull + strokeNet + strokeSnmp)} />
          </svg>
          <div style={styles.donutInnerLabel}>
            <span style={styles.donutInnerText}>{totalScansVal}</span>
            <span style={styles.donutInnerSubtext}>Total Scans</span>
          </div>
        </div>

        <div style={styles.donutLegends}>
          <div style={styles.donutLegendItem}>
            <div style={styles.legendDotLabel}>
              <span style={styles.legendDot(colors.green)} />
              <span>Full Scan</span>
            </div>
            <span style={styles.legendValue}>{full} ({Math.round(full / totalScansVal * 100)}%)</span>
          </div>

          <div style={styles.donutLegendItem}>
            <div style={styles.legendDotLabel}>
              <span style={styles.legendDot(colors.orange)} />
              <span>Network Scan</span>
            </div>
            <span style={styles.legendValue}>{net} ({Math.round(net / totalScansVal * 100)}%)</span>
          </div>

          <div style={styles.donutLegendItem}>
            <div style={styles.legendDotLabel}>
              <span style={styles.legendDot(colors.blue)} />
              <span>SNMP Scan</span>
            </div>
            <span style={styles.legendValue}>{snmp} ({Math.round(snmp / totalScansVal * 100)}%)</span>
          </div>

          <div style={styles.donutLegendItem}>
            <div style={styles.legendDotLabel}>
              <span style={styles.legendDot(colors.purple)} />
              <span>Config Scan</span>
            </div>
            <span style={styles.legendValue}>{config} ({Math.round(config / totalScansVal * 100)}%)</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.appShell}>
      {/* Toast notification with improved styling */}
      {toast.show && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          background: toast.type === "success"
            ? 'linear-gradient(135deg, #22c55e, #16a34a)'
            : 'linear-gradient(135deg, #f87171, #dc2626)',
          color: "#ffffff",
          padding: "16px 24px",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          fontWeight: "600",
          animation: "fadeInUp 0.3s ease-out",
          backdropFilter: "blur(10px)",
        }}>
          <span style={{ fontSize: "20px" }}>
            {toast.type === "success" ? "✅" : "⚠️"}
          </span>
          {toast.message}
        </div>
      )}

      <Sidebar />
      <main style={styles.mainContent(isCollapsed)}>

        {/* Header with improved styling */}
        <section style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '20px',
                fontWeight: '700',
                boxShadow: '0 8px 24px rgba(34, 197, 94, 0.25)',
              }}>
                ⚡
              </div>
              <div>
                <h1 style={{
                  fontSize: "24px",
                  margin: 0,
                  fontWeight: "800",
                  color: colors.textPrimary,
                  letterSpacing: "-0.02em",
                }}>
                  Dashboard Overview
                </h1>
                <p style={{
                  fontSize: "13px",
                  color: colors.textSecondary,
                  margin: 0,
                  fontWeight: "500",
                }}>
                  Real-time fleet monitoring & analytics
                </p>
              </div>
            </div>
          </div>

          <div style={styles.headerRight}>
            <div style={{
              ...styles.searchBarContainer,
              background: '#ffffff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <span style={styles.searchIcon}><SearchIcon /></span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fleet devices..."
                style={styles.searchBar}
              />
            </div>

            <div style={{
              ...styles.timeDisplay,
              background: '#ffffff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <CalendarIcon />
              <span>{formatTimeDisplay(currentTime)}</span>
            </div>

            <div style={styles.dropdownContainer} ref={dropdownRef}>
              <button
                type="button"
                style={{
                  ...styles.reportBtn,
                  background: 'linear-gradient(135deg, #22c55e, #15803d)',
                  boxShadow: '0 4px 16px rgba(34, 197, 94, 0.3)',
                }}
                onClick={() => setShowReportDropdown(!showReportDropdown)}
              >
                <span>📊</span>
                Export Report
                <span style={{ marginLeft: '4px' }}><ChevronDownIcon /></span>
              </button>
              {showReportDropdown && (
                <div style={{
                  ...styles.dropdownMenu,
                  background: '#ffffff',
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                }}>
                  <button
                    type="button"
                    style={styles.dropdownItem}
                    onClick={handleExportPDF}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f0fdf4';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <span>📄</span> PDF Summary Report
                  </button>
                  <button
                    type="button"
                    style={styles.dropdownItem}
                    onClick={handleExportExcel}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f0fdf4';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <span>📈</span> Excel Device Database
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              style={{
                ...styles.refreshBtn,
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
              onClick={fetchData}
              disabled={loading}
              title="Refresh data"
            >
              {loading ? <LoadingSpinner /> : <span style={{ fontSize: "16px" }}>🔄</span>}
            </button>
          </div>
        </section>

        {/* TWO-COLUMN DASHBOARD GRID */}
        <section style={styles.dashboardGrid}>
          {/* LEFT-CENTER COLUMN */}
          <div style={styles.leftColumn}>

            {/* Premium Fleet Card */}
            <div style={{
              ...styles.fleetCard,
              background: 'linear-gradient(135deg, #0f172a, #1e293b)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-10%',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.05)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-30%',
                left: '-5%',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.03)',
                pointerEvents: 'none',
              }} />

              <div style={styles.fleetCardHeader}>
                <span style={styles.fleetCardLogo}>⚡ VoltControl Fleet</span>
                <div style={styles.fleetCardChip}></div>
              </div>
              <div style={styles.fleetCardNumber}>•••• •••• •••• 2026</div>
              <div style={styles.fleetCardFooter}>
                <div style={styles.fleetCardMeta}>
                  <span style={styles.fleetCardLabel}>Registered Devices</span>
                  <span style={styles.fleetCardVal}>{totalCount}</span>
                </div>
                <div style={styles.fleetCardMeta}>
                  <span style={styles.fleetCardLabel}>Active Scans</span>
                  <span style={styles.fleetCardVal}>{activeScansCount}</span>
                </div>
                <div style={styles.fleetCardMeta}>
                  <span style={styles.fleetCardLabel}>System Status</span>
                  <span style={{
                    ...styles.fleetCardVal,
                    color: colors.green,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}>
                    <span style={{
                      display: "inline-block",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: colors.green,
                      boxShadow: '0 0 12px rgba(34, 197, 94, 0.5)',
                    }} className="animate-pulse-green" />
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Fleet stats */}
            <div style={styles.balanceSection}>
              <div style={styles.balanceHeader}>
                <div style={styles.balanceMeta}>
                  <span style={styles.balanceLabel}>Total Registered Devices</span>
                  <h2 style={styles.balanceValue}>{totalCount}</h2>
                </div>
                <div style={styles.balanceStats}>
                  <div style={{
                    ...styles.balanceStatItem,
                    color: colors.greenText,
                    background: '#f0fdf4',
                    padding: '4px 12px',
                    borderRadius: '20px',
                  }}>
                    <span style={{
                      display: "inline-block",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: colors.green
                    }} />
                    <span>{onlineCount} Online ({onlineRate}%)</span>
                  </div>
                  <div style={{
                    ...styles.balanceStatItem,
                    color: colors.orangeText,
                    background: '#ffedd5',
                    padding: '4px 12px',
                    borderRadius: '20px',
                  }}>
                    <span style={{
                      display: "inline-block",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: colors.orange
                    }} />
                    <span>{offlineCount} Offline</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                style={styles.addScanBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.25)';
                }}
                onClick={() => navigate("/scan/create")}
              >
                ➕ Configure new fleet scan job
              </button>
            </div>

            {/* Table: Recent Scan Activity */}
            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <div style={styles.panelTitleRow}>
                  <span style={styles.panelIcon(colors.green)}>⏱️</span>
                  <h3 style={styles.panelTitle}>Recent Scan Activity</h3>
                </div>
                <span
                  style={styles.viewAllLink(colors.green)}
                  onClick={() => navigate("/job/scan")}
                  onMouseEnter={(e) => e.currentTarget.style.color = colors.green}
                  onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
                >
                  View All →
                </span>
              </div>

              <div style={styles.tableWrapper}>
                <table style={styles.table} className="premium-table">
                  <thead>
                    <tr>
                      <th style={styles.th}>Job ID</th>
                      <th style={styles.th}>Scan Type</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Date</th>
                      <th style={styles.th}>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scanJobs.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{
                          ...styles.td,
                          textAlign: "center",
                          color: colors.textSecondary,
                          padding: '32px 0',
                        }}>
                          <div style={{
                            fontSize: '32px',
                            marginBottom: '8px',
                            opacity: 0.3,
                          }}>📡</div>
                          No scan jobs recorded yet
                        </td>
                      </tr>
                    ) : (
                      scanJobs.slice(0, 5).map((job) => (
                        <tr key={job.id}>
                          <td style={{
                            ...styles.td,
                            fontWeight: "700",
                            fontFamily: 'monospace',
                            fontSize: '12px',
                            color: colors.textPrimary,
                          }}>
                            {job.uuid.slice(0, 8).toUpperCase()}
                          </td>
                          <td style={{ ...styles.td, fontWeight: "600" }}>
                            <span style={{
                              display: 'inline-block',
                              padding: '2px 10px',
                              borderRadius: '6px',
                              background: '#f0fdf4',
                              color: '#166534',
                              fontSize: '11px',
                              fontWeight: '600',
                            }}>
                              Network
                            </span>
                          </td>
                          <td style={styles.td}>
                            <span style={styles.statusBadge(job.status || "Completed")}>
                              {job.status || "Completed"}
                            </span>
                          </td>
                          <td style={{ ...styles.td, fontSize: '12px', color: colors.textSecondary }}>
                            {job.startedTimestamp ? new Date(job.startedTimestamp).toLocaleDateString() : new Date().toLocaleDateString()}
                          </td>
                          <td style={{ ...styles.td, fontWeight: "700" }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}>
                              <span style={{ color: colors.green }}>{job.completedDevices}</span>
                              <span style={{ color: colors.textMuted }}>/</span>
                              <span>{job.totalDevices}</span>
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={styles.rightColumn}>

            {/* Compact Metric Cards */}
            <div style={styles.rightMetricsGrid}>
              <div style={styles.metricCard("online")} className="premium-metric-card">
                <div style={styles.metricCardHeader}>
                  <span style={styles.metricCardLabel}>Online</span>
                  <div style={styles.metricIconCircle("rgba(34, 197, 94, 0.12)", colors.greenText)}>
                    <WifiIcon />
                  </div>
                </div>
                <h3 style={styles.metricCardValue}>{onlineCount}</h3>
                <span style={styles.metricCardFooter(colors.greenText)}>
                  Active on network
                </span>
              </div>

              <div style={styles.metricCard("offline")} className="premium-metric-card">
                <div style={styles.metricCardHeader}>
                  <span style={styles.metricCardLabel}>Offline</span>
                  <div style={styles.metricIconCircle("rgba(251, 146, 60, 0.12)", colors.orangeText)}>
                    <WifiOffIcon />
                  </div>
                </div>
                <h3 style={styles.metricCardValue}>{offlineCount}</h3>
                <span style={styles.metricCardFooter(colors.orangeText)}>
                  Connection issue
                </span>
              </div>

              <div style={styles.metricCard("disabled")} className="premium-metric-card">
                <div style={styles.metricCardHeader}>
                  <span style={styles.metricCardLabel}>Disabled</span>
                  <div style={styles.metricIconCircle("rgba(248, 113, 113, 0.12)", colors.redText)}>
                    <BanIcon />
                  </div>
                </div>
                <h3 style={styles.metricCardValue}>{disabledCount}</h3>
                <span style={styles.metricCardFooter(colors.redText)}>
                  Suspended status
                </span>
              </div>

              <div style={styles.metricCard("active")} className="premium-metric-card">
                <div style={styles.metricCardHeader}>
                  <span style={styles.metricCardLabel}>Active Scans</span>
                  <div style={styles.metricIconCircle("rgba(167, 139, 250, 0.12)", colors.purpleText)}>
                    <ActivityIcon />
                  </div>
                </div>
                <h3 style={styles.metricCardValue}>{activeScansCount}</h3>
                <span style={styles.metricCardFooter(colors.purpleText)}>
                  Currently running
                </span>
              </div>
            </div>

            {/* Status Distribution Chart */}
            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <div style={styles.panelTitleRow}>
                  <span style={styles.panelIcon(colors.green)}>🍩</span>
                  <h3 style={styles.panelTitle}>Status Distribution</h3>
                </div>
              </div>

              <div style={styles.donutContainer}>
                <div style={{ position: "relative" }}>
                  {renderDonutChart(onlineCount, offlineCount, disabledCount)}
                  <div style={styles.donutInnerLabel}>
                    <span style={styles.donutInnerText}>{totalCount}</span>
                    <span style={styles.donutInnerSubtext}>DEVICES</span>
                  </div>
                </div>

                <div style={styles.donutLegends}>
                  <div style={styles.donutLegendItem}>
                    <div style={styles.legendDotLabel}>
                      <span style={styles.legendDot(colors.green)} />
                      <span>Online</span>
                    </div>
                    <span style={styles.legendValue}>{onlineCount} ({onlineRate}%)</span>
                  </div>

                  <div style={styles.donutLegendItem}>
                    <div style={styles.legendDotLabel}>
                      <span style={styles.legendDot(colors.orange)} />
                      <span>Offline</span>
                    </div>
                    <span style={styles.legendValue}>{offlineCount} ({offlineRate}%)</span>
                  </div>

                  <div style={styles.donutLegendItem}>
                    <div style={styles.legendDotLabel}>
                      <span style={styles.legendDot(colors.red)} />
                      <span>Disabled</span>
                    </div>
                    <span style={styles.legendValue}>{disabledCount} ({disabledRate}%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Errors */}
            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <div style={styles.panelTitleRow}>
                  <span style={styles.panelIcon(colors.red)}>⚠️</span>
                  <h3 style={styles.panelTitle}>Recent Errors</h3>
                </div>
                <span
                  style={styles.viewAllLink(colors.red)}
                  onClick={() => navigate("/monitoring")}
                  onMouseEnter={(e) => e.currentTarget.style.color = colors.red}
                  onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
                >
                  View All →
                </span>
              </div>

              <div style={styles.alertsStack}>
                {recentErrors.map((err, idx) => (
                  <div key={idx} style={{
                    ...styles.alertRow(err.tag),
                    background: '#fafafa',
                    borderLeft: `4px solid ${err.color}`,
                  }}>
                    <div style={styles.alertLeft}>
                      <div style={styles.alertIcon(err.color)} className={err.tag === "critical" ? "animate-pulse-red" : ""}>
                        {err.tag === "critical" ? "✕" : "!"}
                      </div>
                      <div style={styles.alertMeta}>
                        <span style={styles.alertDeviceName}>{err.deviceName}</span>
                        <span style={styles.alertMsg}>{err.errorMessage}</span>
                      </div>
                    </div>
                    <div style={styles.alertRight}>
                      <span style={styles.alertTime}>{err.time}</span>
                      <span style={styles.alertBadge(err.tag)}>{err.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FULL WIDTH SPLINE GRAPH */}
        <section style={styles.panel}>
          <div style={styles.panelHeader}>
            <div style={styles.panelTitleRow}>
              <span style={styles.panelIcon(colors.green)}>📈</span>
              <h3 style={styles.panelTitle}>Status Distribution Over Time</h3>
            </div>
            <div style={{
              display: 'flex',
              gap: '16px',
              fontSize: '11px',
              fontWeight: '600',
              color: colors.textSecondary,
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: colors.green }} />
                Online
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: colors.orange }} />
                Offline
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: colors.red }} />
                Disabled
              </span>
            </div>
          </div>

          <div style={{ position: "relative", width: "100%", height: "240px", marginTop: "4px" }}>
            <svg viewBox="0 0 1000 200" width="100%" height="100%" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradOnline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={colors.green} stopOpacity="0.2" />
                  <stop offset="100%" stopColor={colors.green} stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="gradOffline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={colors.orange} stopOpacity="0.15" />
                  <stop offset="100%" stopColor={colors.orange} stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="gradDisabled" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={colors.red} stopOpacity="0.1" />
                  <stop offset="100%" stopColor={colors.red} stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="50" y1="20" x2="950" y2="20" stroke="#f1f5f9" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="50" y1="60" x2="950" y2="60" stroke="#f1f5f9" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="50" y1="100" x2="950" y2="100" stroke="#f1f5f9" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="50" y1="140" x2="950" y2="140" stroke="#f1f5f9" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="50" y1="170" x2="950" y2="170" stroke="#f1f5f9" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* Y Axis Labels */}
              <text x="15" y="24" fill="#94a3b8" fontSize="10" fontWeight="700">200</text>
              <text x="15" y="64" fill="#94a3b8" fontSize="10" fontWeight="700">150</text>
              <text x="15" y="104" fill="#94a3b8" fontSize="10" fontWeight="700">100</text>
              <text x="20" y="144" fill="#94a3b8" fontSize="10" fontWeight="700">50</text>
              <text x="25" y="174" fill="#94a3b8" fontSize="10" fontWeight="700">0</text>

              {/* Online Devices Area */}
              <path d="M 50 120 C 150 110, 200 95, 300 85 C 450 70, 550 75, 680 50 C 780 30, 850 40, 950 30 L 950 170 L 50 170 Z" fill="url(#gradOnline)" />
              <path d="M 50 120 C 150 110, 200 95, 300 85 C 450 70, 550 75, 680 50 C 780 30, 850 40, 950 30" fill="none" stroke={colors.green} strokeWidth="3" strokeLinecap="round" />

              {/* Offline Devices Area */}
              <path d="M 50 145 C 150 142, 200 135, 300 132 C 450 128, 550 130, 680 120 C 780 112, 850 118, 950 110 L 950 170 L 50 170 Z" fill="url(#gradOffline)" />
              <path d="M 50 145 C 150 142, 200 135, 300 132 C 450 128, 550 130, 680 120 C 780 112, 850 118, 950 110" fill="none" stroke={colors.orange} strokeWidth="2.5" strokeLinecap="round" />

              {/* Disabled Devices Area */}
              <path d="M 50 162 C 150 162, 200 160, 300 161 C 450 159, 550 161, 680 155 C 780 153, 850 156, 950 150 L 950 170 L 50 170 Z" fill="url(#gradDisabled)" />
              <path d="M 50 162 C 150 162, 200 160, 300 161 C 450 159, 550 161, 680 155 C 780 153, 850 156, 950 150" fill="none" stroke={colors.red} strokeWidth="2" strokeLinecap="round" />

              {/* X Axis Labels */}
              <text x="45" y="192" fill="#94a3b8" fontSize="10" fontWeight="700">22 Jul</text>
              <text x="195" y="192" fill="#94a3b8" fontSize="10" fontWeight="700">23 Jul</text>
              <text x="345" y="192" fill="#94a3b8" fontSize="10" fontWeight="700">24 Jul</text>
              <text x="495" y="192" fill="#94a3b8" fontSize="10" fontWeight="700">25 Jul</text>
              <text x="645" y="192" fill="#94a3b8" fontSize="10" fontWeight="700">26 Jul</text>
              <text x="795" y="192" fill="#94a3b8" fontSize="10" fontWeight="700">27 Jul</text>
              <text x="945" y="192" fill="#94a3b8" fontSize="10" fontWeight="700">28 Jul</text>
            </svg>
          </div>
        </section>

        {/* BOTTOM METRICS GRID */}
        <section style={styles.bottomMetricsGrid}>
          <div style={styles.bottomMiniCard("scans")} className="premium-card">
            <div style={styles.bottomMiniMeta}>
              <span style={styles.bottomMiniLabel}>Total Scans Run</span>
              <h4 style={styles.bottomMiniVal}>{scanJobs.length || 124}</h4>
              <span style={styles.bottomMiniSub(colors.blueText)}>↑ 18.3% vs last 7 days</span>
            </div>
            <div style={styles.bottomMiniIconCircle("rgba(59, 130, 246, 0.12)", colors.blueText)}>📈</div>
          </div>

          <div style={styles.bottomMiniCard("success")} className="premium-card">
            <div style={styles.bottomMiniMeta}>
              <span style={styles.bottomMiniLabel}>Successful Scans</span>
              <h4 style={styles.bottomMiniVal}>{completedScansCount || 110}</h4>
              <span style={styles.bottomMiniSub(colors.greenText)}>88.71% success rate</span>
            </div>
            <div style={styles.bottomMiniIconCircle("rgba(34, 197, 94, 0.12)", colors.greenText)}>✓</div>
          </div>

          <div style={styles.bottomMiniCard("failed")} className="premium-card">
            <div style={styles.bottomMiniMeta}>
              <span style={styles.bottomMiniLabel}>Failed Scans</span>
              <h4 style={styles.bottomMiniVal}>{failedScansCount || 14}</h4>
              <span style={styles.bottomMiniSub(colors.redText)}>↓ 12.5% vs last 7 days</span>
            </div>
            <div style={styles.bottomMiniIconCircle("rgba(248, 113, 113, 0.12)", colors.redText)}>✕</div>
          </div>

          <div style={styles.bottomMiniCard("duration")} className="premium-card">
            <div style={styles.bottomMiniMeta}>
              <span style={styles.bottomMiniLabel}>Avg. Scan Duration</span>
              <h4 style={styles.bottomMiniVal}>04:32</h4>
              <span style={styles.bottomMiniSub(colors.yellowText)}>minutes per scan</span>
            </div>
            <div style={styles.bottomMiniIconCircle("rgba(234, 179, 8, 0.12)", colors.yellowText)}>⏱</div>
          </div>
        </section>

        <footer style={styles.footerNote}>
          <span>🕐 All times are shown in Asia/Kolkata (IST)</span>
          <span>📊 Data last updated: Just now</span>
        </footer>
      </main>
    </div>
  );
};

export default OverAllDashboard;