import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styles, colors } from "../styles/ScanJobDashboard";
import Sidebar from "./Sidebar";
import voltlogo from "../assets/voltlog1.png";

// SVG Icons matching the clean modern design
const ActivityIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const DatabaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </svg>
);

const RedisIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const SearchIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" />
  </svg>
);

const BellIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10 21a2 2 0 0 0 4 0" />
  </svg>
);

const HelpIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9a2.5 2.5 0 1 1 3.4 2.3c-.9.4-1.4 1-1.4 2" /><line x1="12" y1="17" x2="12" y2="17.01" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const RefreshCwIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
  </svg>
);

const CpuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="15" x2="23" y2="15" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="15" x2="4" y2="15" />
  </svg>
);

const CpuIconSmall = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
  </svg>
);

const formatUptime = (seconds) => {
  if (!seconds) return "0s";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
};

const formatBytes = (bytes) => {
  if (!bytes || bytes === 0) return "0 MB";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
};

// SVG Telemetry Graph Component
const TelemetryChart = ({ data, title, color, unit, maxVal }) => {
  const width = 450;
  const height = 160;
  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  if (!data || data.length === 0) {
    return (
      <div style={{ display: "flex", height: "140px", alignItems: "center", justifyContent: "center", backgroundColor: "#f8fafc", borderRadius: "12px" }}>
        <span style={{ fontSize: "14px", color: colors.textSecondary }}>Awaiting data stream...</span>
      </div>
    );
  }

  const min = 0;
  const max = maxVal || Math.max(...data, 10);
  const range = max - min === 0 ? 1 : max - min;

  const points = data.map((val, idx) => {
    const x = padding + (idx / Math.max(1, data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((val - min) / range) * chartHeight;
    return { x, y };
  });

  const pathD = points.length > 0 
    ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
    : '';

  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
    : '';

  const gradientId = `grad-${title.replace(/\s+/g, '')}`;

  return (
    <div style={styles.panel}>
      <div style={styles.panelHeaderRow}>
        <h2 style={styles.panelTitle}>{title}</h2>
        <span style={{ fontSize: "18px", fontWeight: 800, color }}>
          {data[data.length - 1]?.toFixed(1)}{unit}
        </span>
      </div>
      <div style={{ position: "relative", width: "100%", height: "140px", marginTop: "12px" }}>
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = padding + ratio * chartHeight;
            return (
              <line 
                key={i}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#edf0f5"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
            );
          })}

          {/* Gradient Area */}
          {areaD && (
            <path 
              d={areaD} 
              fill={`url(#${gradientId})`}
            />
          )}

          {/* Line Path */}
          {pathD && (
            <path 
              d={pathD} 
              fill="none" 
              stroke={color} 
              strokeWidth="2.5" 
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Marker Dot */}
          {points.length > 0 && (
            <circle
              cx={points[points.length - 1].x}
              cy={points[points.length - 1].y}
              r={4}
              fill={color}
              stroke="#ffffff"
              strokeWidth="2"
            />
          )}
        </svg>
      </div>
    </div>
  );
};

const SystemMonitoring = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const empId = location.state?.empId || localStorage.getItem("loggedInEmpId");

  const [activeTab, setActiveTab] = useState("Overview");
  const [userData, setUserData] = useState({ username: "", profileImage: "", officeEmail: "", joiningDate: "", role: "" });
  const [healthData, setHealthData] = useState(null);
  const [readinessData, setReadinessData] = useState(null);
  const [metricsData, setMetricsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [error, setError] = useState(null);

  const [history, setHistory] = useState({
    memory: [],
    threads: [],
    cpu: []
  });

  const [logs, setLogs] = useState([
    { id: 1, time: new Date().toLocaleTimeString(), message: "System Telemetry and Telemetry Channel initialized.", type: "info" }
  ]);

  const countdownIntervalRef = useRef(null);

  // Load User Data
  useEffect(() => {
    if (location.state?.username) {
      setUserData({
        username: location.state.username || "",
        profileImage: location.state.profileImage || "",
        officeEmail: location.state.officeEmail || "",
        joiningDate: location.state.joiningDate || "",
        role: location.state.role || ""
      });
    } else if (empId) {
      const fetchProfileData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/users/${empId}`);
          if (response.ok) {
            const databaseUser = await response.json();
            setUserData({
              username: databaseUser.username || "",
              profileImage: databaseUser.profileImage || "",
              officeEmail: databaseUser.officeEmail || "",
              joiningDate: databaseUser.joiningDate || "",
              role: databaseUser.role || ""
            });
          }
        } catch (error) {
          console.error("Network communication error with user endpoint:", error);
        }
      };
      fetchProfileData();
    }
  }, [location, empId]);

  // Fetch Telemetry Function
  const fetchTelemetry = async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      // 1. Health
      const healthRes = await fetch("http://localhost:8080/api/monitor/health");
      if (!healthRes.ok) throw new Error("Health check failed");
      const health = await healthRes.json();

      // 2. Readiness
      const readinessRes = await fetch("http://localhost:8080/api/monitor/readiness");
      if (!readinessRes.ok) throw new Error("Readiness check failed");
      const readiness = await readinessRes.json();

      // 3. Metrics
      const metricsRes = await fetch("http://localhost:8080/api/monitor/metrics");
      if (!metricsRes.ok) throw new Error("Metrics collection failed");
      const metrics = await metricsRes.json();

      setHealthData(health);
      setReadinessData(readiness);
      setMetricsData(metrics);

      const nowTime = new Date().toLocaleTimeString();

      // Update History
      setHistory(prev => {
        const memPercentage = metrics.memory?.usedPercentage || 0;
        const threadCount = metrics.system?.threadCount || 0;
        const cpuLoad = (metrics.system?.systemLoadAverage || 0) * 100;

        return {
          memory: [...prev.memory, memPercentage].slice(-15),
          threads: [...prev.threads, threadCount].slice(-15),
          cpu: [...prev.cpu, cpuLoad].slice(-15)
        };
      });

      // Write Logs
      const newLogs = [
        {
          id: Date.now() + 1,
          time: nowTime,
          message: `Readiness State: ${readiness.status} | PostgreSQL: ${readiness.database?.status} | Redis: ${readiness.redis?.status}`,
          type: readiness.status === "UP" ? "success" : "warning"
        },
        {
          id: Date.now() + 2,
          time: nowTime,
          message: `JVM heap memory usage: ${formatBytes(metrics.memory?.usedBytes)} of ${formatBytes(metrics.memory?.totalBytes)} (${metrics.memory?.usedPercentage?.toFixed(1)}%)`,
          type: "info"
        }
      ];

      setLogs(prev => [...newLogs, ...prev].slice(0, 40));
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Cannot establish telemetry link. Verify backend process status.");
      setLogs(prev => [
        {
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
          message: `Connection Failure: ${err.message}`,
          type: "error"
        },
        ...prev
      ].slice(0, 40));
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  // Initial Fetch & cleanup
  useEffect(() => {
    fetchTelemetry();
    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  // Poll Controller
  useEffect(() => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    if (!isAutoRefresh) return;

    setCountdown(3);

    countdownIntervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          fetchTelemetry(true);
          return 3;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownIntervalRef.current);
  }, [isAutoRefresh]);

  const handleManualRefresh = () => {
    fetchTelemetry(false);
    if (isAutoRefresh) setCountdown(3);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const firstName = userData.username ? userData.username.split(" ")[0] : "Admin";
  const greeting = getGreeting();

  const handleNavClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={styles.page} className="main-content-shift">
      <Sidebar />

      {/* Main Theme Header matches ScanningDashboard exactly */}
      <header style={styles.header}>
        <div style={styles.logoSection}>
          <div style={styles.logoBadge}>
            <img src={voltlogo} alt="VoltControl" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
          </div>
          <span style={styles.logoText}>System Monitor</span>
        </div>

        <nav style={styles.navPills}>
          {["Overview", "Endpoints", "Console Logs"].map((item) => (
            <button
              key={item}
              type="button"
              style={styles.navPill(item === activeTab)}
              onClick={() => handleNavClick(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div style={styles.headerRight}>
          <div style={styles.iconCircle}><SearchIcon /></div>
          <div style={styles.iconCircle}>
            <BellIcon />
            <span style={styles.notificationDot} />
          </div>
          <div style={styles.iconCircle}><HelpIcon /></div>
          <div 
            style={{ ...styles.profilePill, cursor: 'pointer' }}
            onClick={() => navigate('/admin/detail', {
              state: {
                userData,
                empId: localStorage.getItem('loggedInEmpId')
              }
            })}
          >
            <span style={{ ...styles.avatarCircle, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {userData.profileImage ? (
                <img src={userData.profileImage} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                firstName.charAt(0).toUpperCase()
              )}
            </span>
            <span style={styles.profileName}>{firstName}</span>
            <ChevronDownIcon />
          </div>
        </div>
      </header>

      {/* Greeting Banner */}
      <div style={styles.greetingRow}>
        <div style={styles.greetingLeft}>
          <div style={{
            ...styles.sunBadge,
            backgroundColor: readinessData?.status === "UP" ? "rgba(16, 185, 129, 0.08)" : "rgba(239, 68, 68, 0.08)",
            color: readinessData?.status === "UP" ? "#10b981" : "#ef4444"
          }}>
            <ActivityIcon />
          </div>
          <div>
            <h1 style={styles.greetingTitle}>{greeting}, {firstName}</h1>
            <p style={styles.greetingSubtitle}>Track basic health endpoint, readiness, database pooling and cache server connectivity.</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {isAutoRefresh && (
            <div style={{ fontSize: "13px", color: colors.textSecondary, backgroundColor: "#f1f5f9", padding: "8px 14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              Refreshing in <strong>{countdown}s</strong>
            </div>
          )}
          <button
            type="button"
            style={{
              ...styles.createButton,
              background: isAutoRefresh ? "linear-gradient(135deg, #34d399, #10b981)" : "#f1f5f9",
              color: isAutoRefresh ? "#ffffff" : colors.textSecondary,
              boxShadow: isAutoRefresh ? "0 6px 16px rgba(16, 185, 129, 0.2)" : "none",
              border: isAutoRefresh ? "none" : "1px solid #e2e8f0",
              padding: "10px 16px",
              fontSize: "13px"
            }}
            onClick={() => setIsAutoRefresh(!isAutoRefresh)}
          >
            Auto Refresh: {isAutoRefresh ? "ON" : "OFF"}
          </button>
          <button
            type="button"
            style={{ ...styles.createButton, padding: "10px 16px", fontSize: "13px" }}
            onClick={handleManualRefresh}
            disabled={isLoading}
          >
            <RefreshCwIcon /> {isLoading ? "Checking..." : "Force Check"}
          </button>
        </div>
      </div>

      {/* Telemetry Offline Warning Banner */}
      {error && (
        <div style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          backgroundColor: "rgba(239, 68, 68, 0.06)",
          border: `1px solid rgba(239, 68, 68, 0.15)`,
          color: "#ef4444",
          borderRadius: "16px",
          padding: "14px 20px",
          marginBottom: "20px",
          fontSize: "14px",
          textAlign: "left"
        }}>
          <span style={{ fontSize: "18px" }}>⚠️</span>
          <span><strong>Telemetry Offline:</strong> {error}</span>
        </div>
      )}

      {/* Render based on selected Navigation Tab */}
      {activeTab === "Overview" && (
        <>
          {/* Stat Cards matching style */}
          <div style={{ ...styles.statRow, gridTemplateColumns: "repeat(3, 1fr)" }}>
            {/* Liveness Card */}
            <div style={styles.statCard(false)}>
              <div style={styles.statIconWrap(false, "rgba(16, 185, 129, 0.08)")}>
                <ActivityIcon />
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.statLabel(false)}>Basic Health (Liveness)</div>
                <div style={styles.statValue(false)}>
                  {healthData?.status || "UNKNOWN"}
                  <span style={styles.statTrend(false, healthData?.status === "UP")}>
                    {healthData?.status === "UP" ? "ONLINE" : "OFFLINE"}
                  </span>
                </div>
                <div style={styles.statTrendLabel(false)}>
                  Uptime: {healthData ? formatUptime(healthData.uptimeSeconds) : "Awaiting data"}
                </div>
              </div>
            </div>

            {/* Postgres Connection Card */}
            <div style={styles.statCard(false)}>
              <div style={{
                ...styles.statIconWrap(false, "rgba(16, 185, 129, 0.08)"),
                backgroundColor: readinessData?.database?.status === "UP" ? "rgba(16, 185, 129, 0.08)" : "rgba(239, 68, 68, 0.08)",
                color: readinessData?.database?.status === "UP" ? "#10b981" : "#ef4444"
              }}>
                <DatabaseIcon />
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.statLabel(false)}>Database connectivity (PostgreSQL)</div>
                <div style={styles.statValue(false)}>
                  {readinessData?.database?.status || "UNKNOWN"}
                  {readinessData?.database?.latencyMs !== undefined && (
                    <span style={styles.statTrend(false, readinessData.database.status === "UP")}>
                      {readinessData.database.latencyMs} ms
                    </span>
                  )}
                </div>
                <div style={styles.statTrendLabel(false)}>
                  {readinessData?.database?.details || "Checking database credentials"}
                </div>
              </div>
            </div>

            {/* Redis Connection Card */}
            <div style={styles.statCard(false)}>
              <div style={{
                ...styles.statIconWrap(false, "rgba(16, 185, 129, 0.08)"),
                backgroundColor: readinessData?.redis?.status === "UP" ? "rgba(16, 185, 129, 0.08)" : "rgba(239, 68, 68, 0.08)",
                color: readinessData?.redis?.status === "UP" ? "#10b981" : "#ef4444"
              }}>
                <RedisIcon />
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.statLabel(false)}>Cache store connectivity (Redis)</div>
                <div style={styles.statValue(false)}>
                  {readinessData?.redis?.status || "UNKNOWN"}
                  {readinessData?.redis?.latencyMs !== undefined && (
                    <span style={styles.statTrend(false, readinessData.redis.status === "UP")}>
                      {readinessData.redis.latencyMs} ms
                    </span>
                  )}
                </div>
                <div style={styles.statTrendLabel(false)}>
                  {readinessData?.redis?.details || "Checking memory store ping"}
                </div>
              </div>
            </div>
          </div>

          {/* Double Column Graphs Grid */}
          <div style={styles.gridTwoUneven}>
            <TelemetryChart 
              data={history.memory} 
              title="JVM Heap Memory Percentage" 
              color="#10b981" 
              unit="%" 
              maxVal={100}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <TelemetryChart 
                data={history.cpu} 
                title="System CPU Load" 
                color="#3b82f6" 
                unit="%" 
                maxVal={100}
              />
              <TelemetryChart 
                data={history.threads} 
                title="Active JVM Thread Count" 
                color="#f43f5e" 
                unit=" threads" 
                maxVal={100}
              />
            </div>
          </div>
        </>
      )}

      {activeTab === "Endpoints" && (
        <div style={styles.panel}>
          <div style={styles.panelHeaderRow}>
            <h2 style={styles.panelTitle}>Available Monitor Endpoints</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "10px" }}>
            <div style={{ border: `1px solid ${colors.border}`, borderRadius: "12px", padding: "16px", backgroundColor: "#fafafa" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: "700", fontFamily: "monospace" }}>GET /api/monitor/health</span>
                <span style={{ backgroundColor: colors.greenLight, color: colors.green, padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700" }}>ACTIVE</span>
              </div>
              <p style={{ fontSize: "13px", color: colors.textSecondary, marginTop: "8px", marginBottom: 0 }}>
                Basic application liveness checker. Always returns status <code>UP</code> if the Java virtual machine is operational. Used for K8s liveness probes.
              </p>
            </div>

            <div style={{ border: `1px solid ${colors.border}`, borderRadius: "12px", padding: "16px", backgroundColor: "#fafafa" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: "700", fontFamily: "monospace" }}>GET /api/monitor/readiness</span>
                <span style={{ backgroundColor: colors.greenLight, color: colors.green, padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700" }}>ACTIVE</span>
              </div>
              <p style={{ fontSize: "13px", color: colors.textSecondary, marginTop: "8px", marginBottom: 0 }}>
                Full system readiness checker. Evaluates active connection health to internal databases and external caching systems.
              </p>
            </div>

            <div style={{ border: `1px solid ${colors.border}`, borderRadius: "12px", padding: "16px", backgroundColor: "#fafafa" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: "700", fontFamily: "monospace" }}>GET /api/monitor/metrics</span>
                <span style={{ backgroundColor: colors.greenLight, color: colors.green, padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700" }}>ACTIVE</span>
              </div>
              <p style={{ fontSize: "13px", color: colors.textSecondary, marginTop: "8px", marginBottom: 0 }}>
                Exposes JVM memory allocation bytes, OS load levels, and processing thread diagnostics for graphical monitoring agents.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Console Logs" && (
        <div style={{
          backgroundColor: "#0f172a",
          borderRadius: "24px",
          padding: "24px",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
          border: "1px solid #1e293b",
          textAlign: "left"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #1e293b",
            paddingBottom: "16px",
            marginBottom: "16px"
          }}>
            <span style={{ color: "#f8fafc", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10b981", boxShadow: "0 0 8px #10b981" }} />
              Live Telemetry Streams
            </span>
            <button
              onClick={() => setLogs([])}
              style={{ background: "transparent", border: "none", color: "#64748b", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}
            >
              Clear Logs
            </button>
          </div>

          <div style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: "12px",
            color: "#cbd5e1",
            maxHeight: "360px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            lineHeight: "1.6"
          }}>
            {logs.map((log) => {
              let typeColor = "#38bdf8";
              if (log.type === "success") typeColor = "#4ade80";
              if (log.type === "error") typeColor = "#f87171";
              if (log.type === "warning") typeColor = "#fbbf24";

              return (
                <div key={log.id}>
                  <span style={{ color: "#475569", marginRight: "8px" }}>[{log.time}]</span>
                  <span style={{ color: typeColor, fontWeight: "700", marginRight: "8px" }}>{log.type.toUpperCase()}</span>
                  <span style={{ color: "#e2e8f0" }}>{log.message}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemMonitoring;
