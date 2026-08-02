import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styles, colors, statusColors } from "../../styles/ScanJobDashboard";
import Sidebar from "../Sidebar";
import voltlogo from "../../assets/voltlog1.png";

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

const RefreshCwIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
);


const NAV_ITEMS = ["Overview", "Scan Jobs", "Devices", "Results", "Reports"];

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

const formatTimestamp = (tsStr) => {
    if (!tsStr) return "N/A";
    try {
        const date = new Date(tsStr);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    } catch (e) {
        return tsStr;
    }
};

const getRelativeTime = (tsStr) => {
    if (!tsStr) return "N/A";
    try {
        const date = new Date(tsStr);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.round(diffMs / 60000);
        if (diffMins < 1) return "Just now";
        if (diffMins === 1) return "1 min ago";
        if (diffMins < 60) return `${diffMins} mins ago`;
        const diffHours = Math.round(diffMins / 60);
        if (diffHours === 1) return "1 hr ago";
        if (diffHours < 24) return `${diffHours} hrs ago`;
        return date.toLocaleDateString();
    } catch (e) {
        return tsStr;
    }
};

const ScanningDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [userData, setUserData] = useState({ username: "", profileImage: "", officeEmail: "", joiningDate: "", role: "" });
    const [scanJobs, setScanJobs] = useState([]);
    const [recentResults, setRecentResults] = useState([]);
    const [resultsDatabase, setResultsDatabase] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Overview");

    const empId = localStorage.getItem("loggedInEmpId");
    const role = location.state?.role || localStorage.getItem("loggedInRole") || "User";
    const selectedUuids = location.state?.selectedUuids || [];

    const fetchScanJobs = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/scan-jobs");
            if (response.ok) {
                const data = await response.json();
                setScanJobs(data);
            }
        } catch (error) {
            console.error("Network communication error with scan-jobs endpoint:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRecentResults = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/scan-jobs/recent-results");
            if (response.ok) {
                const data = await response.json();
                setRecentResults(data);
            }
        } catch (error) {
            console.error("Error fetching recent scan results:", error);
        }
    };

    const fetchResultsDatabase = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/scan-jobs/results");
            if (response.ok) {
                const data = await response.json();
                setResultsDatabase(data);
            }
        } catch (error) {
            console.error("Error fetching results database:", error);
        }
    };

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
                    console.error("Network communication error with backend user controller:", error);
                }
            };
            fetchProfileData();
        }
        fetchScanJobs();
        fetchRecentResults();
        fetchResultsDatabase();
    }, [location, empId]);

    // SSE EventSource for real-time progress stream (FR-14)
    useEffect(() => {
        const activeJob = scanJobs.find(j =>
            ['Running', 'Queued', 'In Progress', 'RUNNING', 'QUEUED'].includes(j.status)
        );

        if (!activeJob) return;

        const url = `http://localhost:8080/api/scan-jobs/${activeJob.uuid}/progress`;
        const eventSource = new EventSource(url);

        eventSource.addEventListener("progress", (event) => {
            try {
                const progressData = JSON.parse(event.data);
                setScanJobs(prev => prev.map(job =>
                    job.uuid === progressData.uuid
                        ? { ...job, status: progressData.status, completedDevices: progressData.completedDevices, totalDevices: progressData.totalDevices }
                        : job
                ));
                fetchRecentResults();
            } catch (e) {
                console.error("Error parsing progress SSE event:", e);
            }
        });

        eventSource.addEventListener("completed", (event) => {
            try {
                const progressData = JSON.parse(event.data);
                setScanJobs(prev => prev.map(job =>
                    job.uuid === progressData.uuid
                        ? { ...job, status: progressData.status, completedDevices: progressData.completedDevices, totalDevices: progressData.totalDevices }
                        : job
                ));
                fetchRecentResults();
                fetchScanJobs();
                fetchResultsDatabase();
                eventSource.close();
            } catch (e) {
                console.error("Error parsing completed SSE event:", e);
                eventSource.close();
            }
        });

        eventSource.addEventListener("error", (event) => {
            console.error("SSE connection error or closed:", event);
            eventSource.close();
        });

        eventSource.addEventListener("heartbeat", (event) => {
            console.log("SSE Heartbeat received:", event.data);
        });

        return () => {
            eventSource.close();
        };
    }, [scanJobs]);

    // Fallback interval in case SSE is blocked/not loaded
    useEffect(() => {
        const hasActiveJobs = scanJobs.some(j =>
            ['Running', 'Queued', 'In Progress', 'RUNNING', 'QUEUED'].includes(j.status)
        );

        if (!hasActiveJobs) return;

        const interval = setInterval(() => {
            fetchScanJobs();
            fetchRecentResults();
        }, 3000);

        return () => clearInterval(interval);
    }, [scanJobs]);

    const openDetailsModal = (result) => {
        setSelectedResult(result);
        setIsModalOpen(true);
    };

    const closeDetailsModal = () => {
        setSelectedResult(null);
        setIsModalOpen(false);
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    };

    const firstName = userData.username ? userData.username.split(" ")[0] : "Admin";
    const greeting = getGreeting();

    // Compute dynamic statistics
    const totalJobs = scanJobs.length;
    const runningJobs = scanJobs.filter(j => j.status === 'RUNNING' || j.status === 'QUEUED' || j.status === 'In Progress').length;
    const completedJobs = scanJobs.filter(j => j.status === 'COMPLETED' || j.status === 'Completed').length;
    const failedJobs = scanJobs.filter(j => j.status === 'FAILED' || j.status === 'Failed').length;
    const successRate = totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 0;

    const dynamicStatCards = [
        { key: "total", label: "Total Scan Jobs", value: String(totalJobs), trend: "Live", trendLabel: "from database", positive: true, icon: ClipboardIcon },
        { key: "running", label: "Running/Queued", value: String(runningJobs), trendLabel: `${runningJobs} active jobs`, highlighted: true, icon: PlayIcon },
        { key: "completed", label: "Completed Jobs", value: String(completedJobs), trend: `${successRate}%`, trendLabel: "completion rate", positive: true, icon: CheckIcon },
        { key: "failed", label: "Failed Jobs", value: String(failedJobs), trendLabel: "failed attempts", positive: false, icon: XCircleIcon },
        { key: "success", label: "Success Rate", value: `${successRate}%`, trendLabel: "successful scans", positive: true, icon: TrendUpIcon },
    ];

    const completedPercent = totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 0;
    const runningPercent = totalJobs > 0 ? Math.round((runningJobs / totalJobs) * 100) : 0;
    const failedPercent = totalJobs > 0 ? (100 - completedPercent - runningPercent) : 0;

    const donutSegments = totalJobs > 0 ? [
        { label: "Completed", value: completedJobs, percent: completedPercent, color: statusColors.Completed.dot },
        { label: "Running/Queued", value: runningJobs, percent: runningPercent, color: statusColors.Running.dot },
        { label: "Failed", value: failedJobs, percent: failedPercent, color: statusColors.Failed.dot },
    ] : [
        { label: "No Jobs", value: 0, percent: 100, color: colors.gray },
    ];

    // Find the latest job for progress panel
    const latestJob = scanJobs.length > 0 ? scanJobs[0] : null;
    const displayProgress = latestJob ? {
        jobId: latestJob.uuid.slice(0, 8).toUpperCase(),
        uuid: latestJob.uuid,
        status: latestJob.status,
        percent: latestJob.totalDevices > 0 ? Math.round((latestJob.completedDevices / latestJob.totalDevices) * 100) : 0,
        completedDevices: latestJob.completedDevices,
        totalDevices: latestJob.totalDevices,
        createdBy: latestJob.createdByEmpId,
        lastUpdated: "Just now"
    } : null;

    const handleCreateClick = () => {
        navigate("/scan/create", { state: { ...location.state, selectedUuids } });
    };

    const handleCancelJob = async (uuid) => {
        try {
            const response = await fetch(`http://localhost:8080/api/scan-jobs/${uuid}/cancel`, {
                method: "POST"
            });
            if (response.ok) {
                fetchScanJobs();
            } else {
                console.error("Failed to cancel job:", response.statusText);
            }
        } catch (error) {
            console.error("Error cancelling scan job:", error);
        }
    };

    const handleContinueJob = async (uuid) => {
        try {
            const response = await fetch(`http://localhost:8080/api/scan-jobs/${uuid}/continue`, {
                method: "POST"
            });
            if (response.ok) {
                fetchScanJobs();
            } else {
                console.error("Failed to continue job:", response.statusText);
            }
        } catch (error) {
            console.error("Error continuing scan job:", error);
        }
    };

    const handleScanAgain = async (uuid) => {
        try {
            const response = await fetch(`http://localhost:8080/api/scan-jobs/${uuid}/scan-again`, {
                method: "POST"
            });
            if (response.ok) {
                fetchScanJobs();
            } else {
                console.error("Failed to start scan again:", response.statusText);
            }
        } catch (error) {
            console.error("Error running scan again:", error);
        }
    };

    const renderModal = () => {
        if (!isModalOpen || !selectedResult) return null;

        let resultData = null;
        try {
            if (selectedResult.scanResultData) {
                resultData = JSON.parse(selectedResult.scanResultData);
            }
        } catch (e) {
            console.error("Failed to parse scan result data JSON:", e);
        }

        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(23, 23, 23, 0.4)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '20px'
            }}>
                <div style={{
                    backgroundColor: colors.white,
                    borderRadius: '24px',
                    width: '100%',
                    maxWidth: '800px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                    border: `1px solid ${colors.border}`,
                    boxSizing: 'border-box'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '24px 32px',
                        borderBottom: `1px solid ${colors.border}`,
                        backgroundColor: '#FCFCFD',
                        borderTopLeftRadius: '24px',
                        borderTopRightRadius: '24px'
                    }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: colors.textPrimary }}>
                                Scan Details: {selectedResult.deviceName}
                            </h3>
                            <span style={{ fontSize: '12px', color: colors.textSecondary, fontFamily: 'monospace' }}>
                                Job UUID: {selectedResult.jobUuid}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={closeDetailsModal}
                            style={{
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                padding: '8px',
                                color: colors.textSecondary,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                backgroundColor: colors.grayLight,
                                width: '32px',
                                height: '32px',
                            }}
                        >
                            <XCircleIcon />
                        </button>
                    </div>

                    <div style={{ padding: '32px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
                            <div style={{ backgroundColor: colors.bgPage, padding: '16px', borderRadius: '16px' }}>
                                <div style={{ fontSize: '12px', color: colors.textSecondary }}>Connection Result</div>
                                <div style={{ fontSize: '15px', fontWeight: 600, color: colors.textPrimary, marginTop: '4px' }}>
                                    {resultData?.connectionResult || (selectedResult.status === "Succeeded" ? "Connected" : "Failed")}
                                </div>
                            </div>
                            <div style={{ backgroundColor: colors.bgPage, padding: '16px', borderRadius: '16px' }}>
                                <div style={{ fontSize: '12px', color: colors.textSecondary }}>Status</div>
                                <span style={{ ...styles.statusPill(selectedResult.status), display: 'inline-block', marginTop: '6px' }}>
                                    {selectedResult.status}
                                </span>
                            </div>
                            <div style={{ backgroundColor: colors.bgPage, padding: '16px', borderRadius: '16px' }}>
                                <div style={{ fontSize: '12px', color: colors.textSecondary }}>Scanned At</div>
                                <div style={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary, marginTop: '4px' }}>
                                    {formatTimestamp(selectedResult.timestamp)}
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                            <h4 style={{ fontSize: '14px', fontWeight: 700, color: colors.textPrimary, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                                Device Identification
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${colors.border}`, paddingBottom: '8px' }}>
                                    <span style={{ fontSize: '13px', color: colors.textSecondary }}>Asset ID</span>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: colors.textPrimary }}>{resultData?.deviceIdentification || "N/A"}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${colors.border}`, paddingBottom: '8px' }}>
                                    <span style={{ fontSize: '13px', color: colors.textSecondary }}>IP Address</span>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: colors.textPrimary }}>{selectedResult.ipAddress}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${colors.border}`, paddingBottom: '8px' }}>
                                    <span style={{ fontSize: '13px', color: colors.textSecondary }}>Model</span>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: colors.textPrimary }}>{resultData?.model || selectedResult.model || "N/A"}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${colors.border}`, paddingBottom: '8px' }}>
                                    <span style={{ fontSize: '13px', color: colors.textSecondary }}>Serial Number</span>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: colors.textPrimary }}>{resultData?.serialNumber || "N/A"}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${colors.border}`, paddingBottom: '8px', gridColumn: 'span 2' }}>
                                    <span style={{ fontSize: '13px', color: colors.textSecondary }}>Firmware Version</span>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: colors.textPrimary }}>{resultData?.firmwareVersion || "N/A"}</span>
                                </div>
                            </div>
                        </div>

                        {selectedResult.errorMessage && (
                            <div style={{ backgroundColor: colors.redLight, border: `1px solid ${colors.red}22`, borderRadius: '16px', padding: '16px', marginBottom: '32px' }}>
                                <div style={{ fontSize: '13px', fontWeight: 600, color: colors.red }}>Error Message</div>
                                <div style={{ fontSize: '13px', color: colors.red, marginTop: '4px', fontFamily: 'monospace' }}>
                                    {selectedResult.errorMessage}
                                </div>
                            </div>
                        )}

                        {resultData?.outlets && (
                            <div style={{ marginBottom: '32px' }}>
                                <h4 style={{ fontSize: '14px', fontWeight: 700, color: colors.textPrimary, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                                    Outlet Information
                                </h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                                    {resultData.outlets.map((outlet) => (
                                        <div key={outlet.id} style={{
                                            border: `1px solid ${colors.border}`,
                                            borderRadius: '12px',
                                            padding: '12px 16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            backgroundColor: colors.bgPage
                                        }}>
                                            <span style={{ fontSize: '13px', fontWeight: 600, color: colors.textPrimary }}>{outlet.name}</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <span style={{ fontSize: '12px', color: colors.textSecondary }}>Load: {outlet.load}</span>
                                                <span style={{
                                                    fontSize: '11px',
                                                    fontWeight: 700,
                                                    color: outlet.status === "ON" ? colors.green : colors.red,
                                                    backgroundColor: outlet.status === "ON" ? colors.greenLight : colors.redLight,
                                                    padding: '2px 8px',
                                                    borderRadius: '999px'
                                                }}>
                                                    {outlet.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {resultData?.electrical && (
                            <div style={{ marginBottom: '32px' }}>
                                <h4 style={{ fontSize: '14px', fontWeight: 700, color: colors.textPrimary, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                                    Electrical Information
                                </h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                                    <div style={{ border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                                        <div style={{ fontSize: '11px', color: colors.textSecondary }}>Voltage</div>
                                        <div style={{ fontSize: '15px', fontWeight: 700, color: colors.textPrimary, marginTop: '4px' }}>{resultData.electrical.voltage}</div>
                                    </div>
                                    <div style={{ border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                                        <div style={{ fontSize: '11px', color: colors.textSecondary }}>Current</div>
                                        <div style={{ fontSize: '15px', fontWeight: 700, color: colors.textPrimary, marginTop: '4px' }}>{resultData.electrical.current}</div>
                                    </div>
                                    <div style={{ border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                                        <div style={{ fontSize: '11px', color: colors.textSecondary }}>Active Power</div>
                                        <div style={{ fontSize: '15px', fontWeight: 700, color: colors.textPrimary, marginTop: '4px' }}>{resultData.electrical.activePower}</div>
                                    </div>
                                    <div style={{ border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                                        <div style={{ fontSize: '11px', color: colors.textSecondary }}>Frequency</div>
                                        <div style={{ fontSize: '15px', fontWeight: 700, color: colors.textPrimary, marginTop: '4px' }}>{resultData.electrical.frequency}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {resultData?.rawDeviceData && (
                            <div>
                                <h4 style={{ fontSize: '14px', fontWeight: 700, color: colors.textPrimary, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                                    Raw SNMP/Adapter Data
                                </h4>
                                <pre style={{
                                    backgroundColor: colors.bgPage,
                                    border: `1px solid ${colors.border}`,
                                    borderRadius: '12px',
                                    padding: '16px',
                                    fontSize: '12px',
                                    color: colors.textPrimary,
                                    fontFamily: 'monospace',
                                    whiteSpace: 'pre-wrap',
                                    margin: 0,
                                    overflowX: 'auto'
                                }}>
                                    {resultData.rawDeviceData}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={styles.page} className="main-content-shift">
            <Sidebar />

            <header style={styles.header}>
                <div style={styles.logoSection}>
                    <div style={styles.logoBadge}>
                        <img src={voltlogo} alt="VoltControl" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                    </div>
                    <span style={styles.logoText}>PDU Scan</span>
                </div>

                <nav style={styles.navPills}>
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item}
                            type="button"
                            style={styles.navPill(item === activeTab)}
                            onClick={() => {
                                if (item === "Devices") {
                                    navigate(role === "Admin" ? "/admin/dashboard" : "/user/dashboard", { state: location.state });
                                } else {
                                    setActiveTab(item);
                                    if (item === "Results") {
                                        fetchResultsDatabase();
                                    }
                                }
                            }}
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

            <div style={styles.greetingRow}>
                <div style={styles.greetingLeft}>
                    <div style={styles.sunBadge}><SunIcon /></div>
                    <div>
                        <h1 style={styles.greetingTitle}>{greeting}, {firstName}</h1>
                        <p style={styles.greetingSubtitle}>Monitor your scan jobs, track progress, and review results.</p>
                    </div>
                </div>

                {role === "Admin" ? (
                    <button type="button" style={styles.createButton} onClick={handleCreateClick}>
                        <PlusIcon /> Create Scan Job
                    </button>
                ) : (
                    <div style={{ color: colors.textSecondary, fontSize: "14px", fontStyle: "italic" }}>
                        View-Only Access
                    </div>
                )}
            </div>

            <div style={styles.statRow}>
                {dynamicStatCards.map((card) => {
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

            {activeTab === "Overview" ? (
                <>
                    <div style={styles.gridTwoUneven}>
                        <div style={styles.panel}>
                            <div style={styles.panelHeaderRow}>
                                <h2 style={styles.panelTitle}>Latest Scan Progress</h2>
                                {displayProgress && displayProgress.status === "QUEUED" && (
                                    <span style={styles.liveBadge}><span style={styles.liveDot} /> Queued</span>
                                )}
                                {displayProgress && (displayProgress.status === "RUNNING" || displayProgress.status === "In Progress") && (
                                    <span style={styles.liveBadge}><span style={styles.liveDot} /> Live</span>
                                )}
                            </div>

                            {displayProgress ? (
                                <>
                                    <div style={styles.progressJobRow}>
                                        <span style={styles.progressJobId}>
                                            Job ID: <strong style={{ fontFamily: 'monospace' }} title={displayProgress.uuid}>{displayProgress.jobId}</strong>
                                        </span>
                                        <span style={styles.statusPill(displayProgress.status)}>{displayProgress.status}</span>
                                    </div>

                                    <div style={styles.progressPercentRow}>
                                        <span style={styles.progressPercent}>{displayProgress.percent}%</span>
                                        <span style={styles.progressDeviceCount}>
                                            {displayProgress.completedDevices} / {displayProgress.totalDevices} devices completed
                                        </span>
                                    </div>

                                    <div style={styles.progressTrack}>
                                        <div style={styles.progressFill(displayProgress.percent)} />
                                    </div>

                                    <div style={styles.currentDeviceCard}>
                                        <div style={styles.currentDeviceLeft}>
                                            <div style={styles.currentDeviceIcon}><DeviceIcon /></div>
                                            <div>
                                                <div style={styles.currentDeviceName}>Initiated By</div>
                                                <div style={styles.currentDeviceStatus}>
                                                    Employee ID: {displayProgress.createdBy}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={styles.currentDeviceMeta}>
                                            Last updated
                                            <br />
                                            {displayProgress.lastUpdated}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '180px', color: colors.textSecondary }}>
                                    No scan jobs available.
                                </div>
                            )}
                        </div>

                        <div style={styles.panel}>
                            <div style={styles.panelHeaderRow}>
                                <h2 style={styles.panelTitle}>Scan Job Status</h2>
                            </div>

                            <div style={styles.donutWrap}>
                                <div style={styles.donutChart(buildDonutGradient(donutSegments))}>
                                    <div style={styles.donutCenter}>
                                        <span style={styles.donutCenterValue}>{totalJobs}</span>
                                        <span style={styles.donutCenterLabel}>Total Jobs</span>
                                    </div>
                                </div>

                                <div style={styles.legendList}>
                                    {donutSegments.map((seg) => (
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
                                <button type="button" style={styles.viewAllLink} onClick={() => setActiveTab("Scan Jobs")}>
                                    View all <ArrowRightIcon />
                                </button>
                            </div>

                            <div style={styles.tableGrid}>
                                <div style={styles.tableHeaderRow}>Job ID</div>
                                <div style={styles.tableHeaderRow}>Devices</div>
                                <div style={styles.tableHeaderRow}>Progress</div>
                                <div style={styles.tableHeaderRow}>Status</div>
                                <div style={styles.tableHeaderRow}>Created By</div>
                                <div style={styles.tableHeaderRow}>Started At</div>
                                <div style={styles.tableHeaderRow}>Actions</div>

                                {scanJobs.slice(0, 3).map((job) => {
                                    const c = statusColors[job.status] || statusColors.Cancelled;
                                    const percent = job.totalDevices > 0 ? Math.round((job.completedDevices / job.totalDevices) * 100) : 0;
                                    const isNotAdmin = role !== "Admin";
                                    return (
                                        <React.Fragment key={job.uuid}>
                                            <div style={styles.tableRow}>
                                                <span style={styles.jobIdCell}>
                                                    <span style={styles.statusDotSmall(c.dot)} />
                                                    <span style={{ fontFamily: 'monospace' }} title={job.uuid}>{job.uuid.slice(0, 8).toUpperCase()}</span>
                                                </span>
                                            </div>
                                            <div style={styles.tableRow}>{job.totalDevices}</div>
                                            <div style={styles.tableRow}>
                                                <div style={styles.miniProgressTrack}>
                                                    <div style={styles.miniProgressFill(percent, c.dot)} />
                                                </div>
                                                <div style={styles.progressPercentText}>{percent}%</div>
                                            </div>
                                            <div style={styles.tableRow}>
                                                <span style={styles.statusPill(job.status)}>{job.status}</span>
                                            </div>
                                            <div style={styles.tableRow}>{job.createdByEmpId}</div>
                                            <div style={styles.tableRow}>{formatTimestamp(job.createdTimestamp)}</div>
                                            <div style={styles.tableRow}>
                                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                                    {['RUNNING', 'QUEUED', 'In Progress'].includes(job.status) && (
                                                        <button
                                                            type="button"
                                                            style={styles.actionBtn("cancel", isNotAdmin)}
                                                            disabled={isNotAdmin}
                                                            onClick={() => handleCancelJob(job.uuid)}
                                                            title={isNotAdmin ? "Requires Admin Role" : "Cancel Scan Job"}
                                                        >
                                                            <XCircleIcon /> Cancel
                                                        </button>
                                                    )}
                                                    {['FAILED', 'CANCELLED'].includes(job.status) && (
                                                        <>
                                                            <button
                                                                type="button"
                                                                style={styles.actionBtn("continue", isNotAdmin)}
                                                                disabled={isNotAdmin}
                                                                onClick={() => handleContinueJob(job.uuid)}
                                                                title={isNotAdmin ? "Requires Admin Role" : "Continue Scan"}
                                                            >
                                                                <PlayIcon /> Continue
                                                            </button>
                                                            <button
                                                                type="button"
                                                                style={styles.actionBtn("again", isNotAdmin)}
                                                                disabled={isNotAdmin}
                                                                onClick={() => handleScanAgain(job.uuid)}
                                                                title={isNotAdmin ? "Requires Admin Role" : "Scan Again"}
                                                            >
                                                                <RefreshCwIcon /> Retry
                                                            </button>
                                                        </>
                                                    )}
                                                    {['COMPLETED'].includes(job.status) && (
                                                        <button
                                                            type="button"
                                                            style={styles.actionBtn("again", isNotAdmin)}
                                                            disabled={isNotAdmin}
                                                            onClick={() => handleScanAgain(job.uuid)}
                                                            title={isNotAdmin ? "Requires Admin Role" : "Scan Again"}
                                                        >
                                                            <RefreshCwIcon /> Restart
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                                {scanJobs.length === 0 && (
                                    <div style={{ gridColumn: 'span 7', textAlign: 'center', padding: '20px 0', color: colors.textSecondary }}>
                                        No active jobs.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div style={styles.panel}>
                            <div style={styles.panelHeaderRow}>
                                <h2 style={styles.panelTitle}>Recent Scan Results</h2>
                            </div>

                            {recentResults && recentResults.length > 0 ? (
                                recentResults.map((result, idx) => (
                                    <div key={`${result.device}-${idx}`} style={styles.resultRow}>
                                        <div style={styles.resultLeft}>
                                            <div style={styles.resultStatusIcon(result.status)}>
                                                {result.status === "COMPLETED" || result.status === "Completed" ? (
                                                    <CheckIcon />
                                                ) : result.status === "FAILED" || result.status === "Failed" ? (
                                                    <XCircleIcon />
                                                ) : (
                                                    <PlayIcon />
                                                )}
                                            </div>
                                            <div>
                                                <div style={styles.resultDeviceName}>{result.device}</div>
                                                <div style={styles.resultDeviceIp}>{result.ip}</div>
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <div style={styles.resultRight}>
                                                <div style={styles.resultModel}>{result.model}</div>
                                                {result.errorMessage && (
                                                    <div style={{ ...styles.resultFirmware, color: colors.red, fontSize: '11px' }} title={result.errorMessage}>
                                                        {result.errorMessage.length > 25 ? `${result.errorMessage.slice(0, 25)}...` : result.errorMessage}
                                                    </div>
                                                )}
                                            </div>
                                            <span style={styles.resultTimestamp}>{getRelativeTime(result.timestamp)}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '180px', color: colors.textSecondary }}>
                                    No scan results yet.
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : activeTab === "Scan Jobs" ? (
                <div style={styles.panel}>
                    <div style={styles.panelHeaderRow}>
                        <h2 style={styles.panelTitle}>Scan Jobs Database ({totalJobs})</h2>
                    </div>

                    <div style={styles.tableGrid}>
                        <div style={styles.tableHeaderRow}>Job UUID</div>
                        <div style={styles.tableHeaderRow}>Devices</div>
                        <div style={styles.tableHeaderRow}>Progress</div>
                        <div style={styles.tableHeaderRow}>Status</div>
                        <div style={styles.tableHeaderRow}>Created By</div>
                        <div style={styles.tableHeaderRow}>Created At</div>
                        <div style={styles.tableHeaderRow}>Actions</div>

                        {scanJobs.map((job) => {
                            const c = statusColors[job.status] || statusColors.Cancelled;
                            const percent = job.totalDevices > 0 ? Math.round((job.completedDevices / job.totalDevices) * 100) : 0;
                            const isNotAdmin = role !== "Admin";
                            return (
                                <React.Fragment key={job.uuid}>
                                    <div style={styles.tableRow}>
                                        <span style={styles.jobIdCell}>
                                            <span style={styles.statusDotSmall(c.dot)} />
                                            <span style={{ fontFamily: 'monospace', fontSize: '12px' }} title={job.uuid}>
                                                {job.uuid}
                                            </span>
                                        </span>
                                    </div>
                                    <div style={styles.tableRow}>{job.totalDevices}</div>
                                    <div style={styles.tableRow}>
                                        <div style={styles.miniProgressTrack}>
                                            <div style={styles.miniProgressFill(percent, c.dot)} />
                                        </div>
                                        <div style={styles.progressPercentText}>{percent}% ({job.completedDevices}/{job.totalDevices})</div>
                                    </div>
                                    <div style={styles.tableRow}>
                                        <span style={styles.statusPill(job.status)}>{job.status}</span>
                                    </div>
                                    <div style={styles.tableRow}>{job.createdByEmpId}</div>
                                    <div style={styles.tableRow}>{formatTimestamp(job.createdTimestamp)}</div>
                                    <div style={styles.tableRow}>
                                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                            {['RUNNING', 'QUEUED', 'In Progress'].includes(job.status) && (
                                                <button
                                                    type="button"
                                                    style={styles.actionBtn("cancel", isNotAdmin)}
                                                    disabled={isNotAdmin}
                                                    onClick={() => handleCancelJob(job.uuid)}
                                                    title={isNotAdmin ? "Requires Admin Role" : "Cancel Scan Job"}
                                                >
                                                    <XCircleIcon /> Cancel
                                                </button>
                                            )}
                                            {['FAILED', 'CANCELLED'].includes(job.status) && (
                                                <>
                                                    <button
                                                        type="button"
                                                        style={styles.actionBtn("continue", isNotAdmin)}
                                                        disabled={isNotAdmin}
                                                        onClick={() => handleContinueJob(job.uuid)}
                                                        title={isNotAdmin ? "Requires Admin Role" : "Continue Scan"}
                                                    >
                                                        <PlayIcon /> Continue
                                                    </button>
                                                    <button
                                                        type="button"
                                                        style={styles.actionBtn("again", isNotAdmin)}
                                                        disabled={isNotAdmin}
                                                        onClick={() => handleScanAgain(job.uuid)}
                                                        title={isNotAdmin ? "Requires Admin Role" : "Scan Again"}
                                                    >
                                                        <RefreshCwIcon /> Retry
                                                    </button>
                                                </>
                                            )}
                                            {['COMPLETED'].includes(job.status) && (
                                                <button
                                                    type="button"
                                                    style={styles.actionBtn("again", isNotAdmin)}
                                                    disabled={isNotAdmin}
                                                    onClick={() => handleScanAgain(job.uuid)}
                                                    title={isNotAdmin ? "Requires Admin Role" : "Scan Again"}
                                                >
                                                    <RefreshCwIcon /> Restart
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                        {scanJobs.length === 0 && (
                            <div style={{ gridColumn: 'span 7', textAlign: 'center', padding: '30px 0', color: colors.textSecondary }}>
                                No scan jobs registered in the database.
                            </div>
                        )}
                    </div>
                </div>
            ) : activeTab === "Results" ? (
                <div style={styles.panel}>
                    <div style={styles.panelHeaderRow}>
                        <h2 style={styles.panelTitle}>Scan Results Database ({resultsDatabase.length})</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1fr 1fr 1fr 1fr 1.2fr 1fr', alignItems: 'center', gap: '8px' }}>
                        <div style={styles.tableHeaderRow}>Job ID</div>
                        <div style={styles.tableHeaderRow}>Device</div>
                        <div style={styles.tableHeaderRow}>IP Address</div>
                        <div style={styles.tableHeaderRow}>Model</div>
                        <div style={styles.tableHeaderRow}>Status</div>
                        <div style={styles.tableHeaderRow}>Scanned At</div>
                        <div style={styles.tableHeaderRow}>Action</div>

                        {resultsDatabase.map((result) => {
                            const c = statusColors[result.status] || statusColors.Cancelled;
                            return (
                                <React.Fragment key={result.id}>
                                    <div style={styles.tableRow}>
                                        <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                                            {result.jobUuid ? result.jobUuid.slice(0, 8).toUpperCase() : "N/A"}
                                        </span>
                                    </div>
                                    <div style={{ ...styles.tableRow, fontWeight: 600 }}>{result.deviceName}</div>
                                    <div style={styles.tableRow}>{result.ipAddress}</div>
                                    <div style={styles.tableRow}>{result.model || "N/A"}</div>
                                    <div style={styles.tableRow}>
                                        <span style={styles.statusPill(result.status)}>{result.status}</span>
                                    </div>
                                    <div style={styles.tableRow}>{formatTimestamp(result.timestamp)}</div>
                                    <div style={styles.tableRow}>
                                        <button
                                            type="button"
                                            onClick={() => openDetailsModal(result)}
                                            style={{
                                                ...styles.actionBtn("continue", false),
                                                padding: '4px 10px',
                                                fontSize: '11px'
                                            }}
                                        >
                                            <EyeIcon /> View Details
                                        </button>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {resultsDatabase.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: colors.textSecondary }}>
                            No device scan results stored in the database.
                        </div>
                    )}
                </div>
            ) : (
                <div style={styles.panel}>
                    <div style={{ textAlign: 'center', padding: '40px 0', color: colors.textSecondary }}>
                        The <strong>{activeTab}</strong> tab is currently empty or under development.
                    </div>
                </div>
            )}
            {renderModal()}
        </div>
    );
};

export default ScanningDashboard;