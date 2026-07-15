import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styles, statusColors } from "../../styles/ScanJobDashboard";
import Sidebar from "../Sidebar";

const SunIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
const ClipboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="6" y="4" width="12" height="17" rx="2" />
    <rect x="9" y="2" width="6" height="4" rx="1" />
    <line x1="9" y1="11" x2="15" y2="11" /><line x1="9" y1="15" x2="15" y2="15" />
  </svg>
);
const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <polygon points="10 8 16 12 10 16" fill="currentColor" stroke="none" />
  </svg>
);
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" /><polyline points="8 12.5 11 15.5 16 9" />
  </svg>
);
const XCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" /><line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" />
  </svg>
);
const TrendUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 17 9 11 13 15 21 6" /><polyline points="15 6 21 6 21 12" />
  </svg>
);
const SearchIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" />
  </svg>
);
const BellIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10 21a2 2 0 0 0 4 0" />
  </svg>
);
const HelpIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9a2.5 2.5 0 1 1 3.4 2.3c-.9.4-1.4 1-1.4 2" /><line x1="12" y1="17" x2="12" y2="17.01" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const DotsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
  </svg>
);
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const DeviceIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="4" width="16" height="12" rx="2" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="16" x2="12" y2="20" />
  </svg>
);


const NAV_ITEMS = ["Overview", "Scan Jobs", "Devices", "Results", "Reports"];

const STAT_CARDS = [
  { key: "total", label: "Total Scan Jobs", value: "24", trend: "↑ 20%", trendLabel: "this week", positive: true, icon: ClipboardIcon },
  { key: "running", label: "Running Jobs", value: "3", trendLabel: "2 started recently", highlighted: true, icon: PlayIcon },
  { key: "completed", label: "Completed Jobs", value: "18", trend: "↑ 12%", trendLabel: "this week", positive: true, icon: CheckIcon },
  { key: "failed", label: "Failed Jobs", value: "2", trend: "↑ 1", trendLabel: "this week", positive: false, icon: XCircleIcon },
  { key: "success", label: "Success Rate", value: "90%", trend: "↑ 8%", trendLabel: "this week", positive: true, icon: TrendUpIcon },
];


const CURRENT_PROGRESS = {
  jobId: "SJ-00024",
  status: "Running",
  percent: 64,
  completedDevices: 16,
  totalDevices: 25,
  currentDevice: { name: "PDU-005", ip: "192.168.1.25", activity: "Collecting outlet information..." },
  lastUpdated: "2 sec ago",
};


const DONUT_SEGMENTS = [
  { label: "Completed", value: 18, percent: 75, color: statusColors.Completed.dot },
  { label: "Running", value: 3, percent: 12.5, color: statusColors.Running.dot },
  { label: "Failed", value: 2, percent: 8.3, color: statusColors.Failed.dot },
  { label: "Cancelled", value: 1, percent: 4.2, color: statusColors.Cancelled.dot },
];
 
const ACTIVE_SCAN_JOBS = [
  { jobId: "SJ-00024", devices: 25, progress: 64, status: "Running", startedAt: "17 Apr, 10:30 AM" },
  { jobId: "SJ-00022", devices: 18, progress: 100, status: "Completed", startedAt: "17 Apr, 09:45 AM" },
  { jobId: "SJ-00021", devices: 10, progress: 100, status: "Failed", startedAt: "16 Apr, 04:20 PM" },
];
 
const RECENT_RESULTS = [
  { device: "PDU-001", ip: "192.168.1.10", model: "APC AP7953", firmware: "Firmware 6.5.1", time: "17 Apr, 10:32 AM", status: "Completed" },
  { device: "PDU-002", ip: "192.168.1.11", model: "Eaton ePDU G3", firmware: "Firmware 2.3.4", time: "17 Apr, 10:31 AM", status: "Completed" },
  { device: "PDU-003", ip: "192.168.1.12", model: "In Progress", firmware: "", time: "17 Apr, 10:30 AM", status: "In Progress" },
];

const buildDonutGradient = (segments) => {
  let cursor = 0;
  const stops = segments.map((seg) => {
    const start = cursor;
    const end = cursor + seg.percent;
    cursor = end;
    return `${seg.color} ${start}% ${end}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
};

const ScanningDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [userData, setUserData] = useState({ username: "" });

    useEffect(() => {
        if (location.state?.username) {
            setUserData({ username: location.state.username });
            return;
        }

        const empId = localStorage.getItem("loggedInEmpId");
        if (!empId) return;

        const fetchProfileData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/users/${empId}`);
                if(response.ok) {
                    const databaseUser = await response.json();
                    setUserData({ username: databaseUser.username || "" });
                }
            } catch (error) {
                console.error("Network communication error with backend controller:", error);
            }
        };

        fetchProfileData();
    }, [location]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    };

    const firstName = userData.username ? userData.username.split(" ")[0] : "Admin";
    const greeting = getGreeting();

    return (
        <div style={styles.page}>
            <Sidebar/>

            <header style={styles.header}>
                <div style={styles.logoSection}>
                <div style={styles.logoBadge}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 2 3 14h7l-1 8 11-14h-7l1-6z" />
                    </svg>
                </div>
                <span style={styles.logoText}>PDU Scan</span>
                </div>
        
                <nav style={styles.navPills}>
                {NAV_ITEMS.map((item) => (
                    <button key={item} type="button" style={styles.navPill(item === "Overview")}>
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
                <div style={styles.profilePill}>
                    <span style={styles.avatarCircle}>{firstName.charAt(0).toUpperCase()}</span>
                    <span style={styles.profileName}>{firstName}</span>
                    <ChevronDownIcon />
                </div>
                </div>
            </header>

            <div style={styles.greetingRow}>
                <div style={styles.greetingLeft}>
                <div style={styles.sunBadge}><SunIcon /></div>
                <div>
                    <h1 style={styles.greetingTitle}>{greeting}, {firstName}</h1>
                    <p style={styles.greetingSubtitle}>Monitor your scan jobs, track progress, and review results.</p>
                </div>
                </div>
        
                <button type="button" style={styles.createButton} onClick={() => navigate("/scan/create")}>
                <PlusIcon /> Create Scan Job
                </button>
            </div>

            <div style={styles.statRow}>
                {STAT_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                    <div key={card.key} style={styles.statCard(card.highlighted)}>
                    <div style={styles.statIconWrap(card.highlighted, "#FFEDE3")}>
                        <Icon />
                    </div>
                    <div>
                        <div style={styles.statLabel(card.highlighted)}>{card.label}</div>
                        <div style={styles.statValue(card.highlighted)}>
                        {card.value}
                        {card.trend && (
                            <span style={styles.statTrend(card.highlighted, card.positive)}>{card.trend}</span>
                        )}
                        </div>
                        <div style={styles.statTrendLabel(card.highlighted)}>{card.trendLabel}</div>
                    </div>
                    </div>
                );
                })}
            </div>

            <div style={styles.gridTwoUneven}>
                <div style={styles.panel}>
                    <div style={styles.panelHeaderRow}>
                        <h2 style={styles.panelTitle}>Current Scan Progress</h2>
                        <span style={styles.liveBadge}><span style={styles.liveDot} /> Live</span>
                    </div>

                    <div style={styles.progressJobRow}>
                        <span style={styles.progressJobId}>
                        Job ID: <strong>{CURRENT_PROGRESS.jobId}</strong>
                        </span>
                        <span style={styles.statusPill(CURRENT_PROGRESS.status)}>{CURRENT_PROGRESS.status}</span>
                    </div>

                    <div style={styles.progressPercentRow}>
                        <span style={styles.progressPercent}>{CURRENT_PROGRESS.percent}%</span>
                        <span style={styles.progressDeviceCount}>
                        {CURRENT_PROGRESS.completedDevices} / {CURRENT_PROGRESS.totalDevices} devices completed
                        </span>
                    </div>

                    <div style={styles.progressTrack}>
                        <div style={styles.progressFill(CURRENT_PROGRESS.percent)} />
                    </div>

                    <div style={styles.currentDeviceCard}>
                        <div style={styles.currentDeviceLeft}>
                        <div style={styles.currentDeviceIcon}><DeviceIcon /></div>
                        <div>
                            <div style={styles.currentDeviceName}>Current Device</div>
                            <div style={styles.currentDeviceStatus}>
                            {CURRENT_PROGRESS.currentDevice.name} ({CURRENT_PROGRESS.currentDevice.ip})
                            </div>
                            <div style={styles.currentDeviceStatus}>{CURRENT_PROGRESS.currentDevice.activity}</div>
                        </div>
                        </div>
                        <div style={styles.currentDeviceMeta}>
                        Last updated
                        <br />
                        {CURRENT_PROGRESS.lastUpdated}
                        </div>
                    </div>
                </div>

                <div style={styles.panel}>
                    <div style={styles.panelHeaderRow}>
                        <h2 style={styles.panelTitle}>Scan Job Status</h2>
                    </div>

                    <div style={styles.donutWrap}>
                         <div style={styles.donutChart(buildDonutGradient(DONUT_SEGMENTS))}>
                            <div style={styles.donutCenter}>
                                <span style={styles.donutCenterValue}>24</span>
                                <span style={styles.donutCenterLabel}>Total Jobs</span>
                            </div>
                        </div>

                        <div style={styles.legendList}>
                            {DONUT_SEGMENTS.map((seg) => (
                                <div key={seg.label} style={styles.legendRow}>
                                <span style={styles.legendLeft}>
                                    <span style={styles.legendDot(seg.color)} />
                                    {seg.label}
                                </span>
                                <span style={styles.legendValue}>
                                    {seg.value} ({seg.percent}%)
                                </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div style={styles.gridTwoUneven}>
                <div style={styles.panel}>
                    <div style={styles.panelHeaderRow}>
                        <h2 style={styles.panelTitle}>Active Scan Jobs</h2>
                        <button type="button" style={styles.viewAllLink}>
                        View all <ArrowRightIcon />
                        </button>
                    </div>

                    <div style={styles.tableGrid}>
                        <div style={styles.tableHeaderRow}>Job ID</div>
                        <div style={styles.tableHeaderRow}>Devices</div>
                        <div style={styles.tableHeaderRow}>Progress</div>
                        <div style={styles.tableHeaderRow}>Status</div>
                        <div style={styles.tableHeaderRow}>Started At</div>
                        <div style={styles.tableHeaderRow}>Actions</div>

                        {ACTIVE_SCAN_JOBS.map((job) => {
                            const c = statusColors[job.status] || statusColors.Cancelled;
                            return (
                                <React.Fragment key={job.jobId}>
                                <div style={styles.tableRow}>
                                    <span style={styles.jobIdCell}>
                                    <span style={styles.statusDotSmall(c.dot)} />
                                    {job.jobId}
                                    </span>
                                </div>
                                <div style={styles.tableRow}>{job.devices}</div>
                                <div style={styles.tableRow}>
                                    <div style={styles.miniProgressTrack}>
                                    <div style={styles.miniProgressFill(job.progress, c.dot)} />
                                    </div>
                                    <div style={styles.progressPercentText}>{job.progress}%</div>
                                </div>
                                <div style={styles.tableRow}>
                                    <span style={styles.statusPill(job.status)}>{job.status}</span>
                                </div>
                                <div style={styles.tableRow}>{job.startedAt}</div>
                                <div style={styles.tableRow}>
                                    <span style={styles.actionIcons}>
                                    <span style={styles.actionIconBtn}><EyeIcon /></span>
                                    <span style={styles.actionIconBtn}><DotsIcon /></span>
                                    </span>
                                </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                <div style={styles.panel}>
                    <div style={styles.panelHeaderRow}>
                        <h2 style={styles.panelTitle}>Recent Scan Results</h2>
                        <button type="button" style={styles.viewAllLink}>
                        View all <ArrowRightIcon />
                        </button>
                    </div>

                    {RECENT_RESULTS.map((result) => (
                        <div key={result.device} style={styles.resultRow}>
                        <div style={styles.resultLeft}>
                            <div style={styles.resultStatusIcon(result.status)}>
                            {result.status === "Completed" ? <CheckIcon /> : <PlayIcon />}
                            </div>
                            <div>
                            <div style={styles.resultDeviceName}>{result.device}</div>
                            <div style={styles.resultDeviceIp}>{result.ip}</div>
                            </div>
                        </div>
            
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={styles.resultRight}>
                            <div style={styles.resultModel}>{result.model}</div>
                            {result.firmware && <div style={styles.resultFirmware}>{result.firmware}</div>}
                            </div>
                            <span style={styles.resultTimestamp}>{result.time}</span>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScanningDashboard;