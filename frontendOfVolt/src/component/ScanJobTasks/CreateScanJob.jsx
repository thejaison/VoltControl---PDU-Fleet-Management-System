import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";
import { styles, colors, statusColors } from "../../styles/ScanJobDashboard";
import voltlogo from "../../assets/voltlog1.png";

const ArrowLeftIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
);

const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" />
    </svg>
);

const CreateScanJob = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const empId = localStorage.getItem("loggedInEmpId");
    const role = location.state?.role || localStorage.getItem("loggedInRole") || "User";

    const [devices, setDevices] = useState([]);
    const [selectedUuids, setSelectedUuids] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [manualUuids, setManualUuids] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllDevices = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/devices?size=1000");
                if (res.ok) {
                    const data = await res.json();
                    setDevices(data.content || []);
                }
            } catch (e) {
                console.error("Error loading device fleet:", e);
                setError("Could not load device database from server.");
            } finally {
                setLoading(false);
            }
        };
        fetchAllDevices();
    }, []);

    // Set selected devices passed from AdminDashboard
    useEffect(() => {
        if (location.state?.selectedUuids && location.state.selectedUuids.length > 0) {
            setSelectedUuids(location.state.selectedUuids);
        }
    }, [location]);

    const filteredDevices = devices.filter(d =>
        (d.deviceName && d.deviceName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (d.ipAddress && d.ipAddress.includes(searchQuery)) ||
        (d.site && d.site.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (d.model && d.model.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const toggleSelectDevice = (uuid) => {
        setSelectedUuids(prev =>
            prev.includes(uuid)
                ? prev.filter(id => id !== uuid)
                : [...prev, uuid]
        );
    };

    const isAllSelected = filteredDevices.length > 0 && filteredDevices.every(d => selectedUuids.includes(d.uuid));

    const handleSelectAllToggle = () => {
        if (isAllSelected) {
            const filteredUuids = filteredDevices.map(d => d.uuid);
            setSelectedUuids(prev => prev.filter(id => !filteredUuids.includes(id)));
        } else {
            const filteredUuids = filteredDevices.map(d => d.uuid);
            setSelectedUuids(prev => Array.from(new Set([...prev, ...filteredUuids])));
        }
    };

    const handleStartScanJob = async () => {
        // Collect manual UUIDs if present
        let finalUuids = [...selectedUuids];
        if (manualUuids.trim()) {
            const extra = manualUuids.split(",")
                .map(id => id.trim())
                .filter(id => id.length > 0);
            finalUuids = Array.from(new Set([...finalUuids, ...extra]));
        }

        if (finalUuids.length === 0) {
            setError("At least one device must be selected or entered manually.");
            return;
        }

        if (role !== "Admin") {
            setError("Permission Denied: Only Administrators are allowed to initialize scan jobs.");
            return;
        }

        try {
            setSubmitting(true);
            setError("");
            const response = await fetch("http://localhost:8080/api/scan-jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    deviceUuids: finalUuids,
                    createdByEmpId: empId
                })
            });

            if (response.ok) {
                navigate("/job/scan", { state: location.state });
            } else {
                const text = await response.text();
                try {
                    const parsed = JSON.parse(text);
                    setError(parsed.message || "Failed to create scan job.");
                } catch (e) {
                    setError(text || "Failed to create scan job.");
                }
            }
        } catch (err) {
            console.error("Error creating scan job:", err);
            setError("Backend server communication failed. Please check your network.");
        } finally {
            setSubmitting(false);
        }
    };

    const isAdmin = role === "Admin";

    return (
        <div style={styles.page} className="main-content-shift">
            <Sidebar />

            <header style={styles.header}>
                <div style={styles.logoSection}>
                    <div style={styles.logoBadge}>
                        <img src={voltlogo} alt="VoltControl" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                    </div>
                    <span style={styles.logoText}>VoltControl</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                        type="button"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'none',
                            border: `1px solid ${colors.border}`,
                            padding: '8px 14px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: colors.textPrimary,
                            backgroundColor: colors.white
                        }}
                        onClick={() => navigate("/job/scan", { state: location.state })}
                    >
                        <ArrowLeftIcon /> Back to Monitor
                    </button>
                </div>
            </header>

            <div style={{ ...styles.greetingRow, marginBottom: '24px' }}>
                <div>
                    <h1 style={styles.greetingTitle}>Initialize PDU Fleet Scan</h1>
                    <p style={styles.greetingSubtitle}>Select target devices or input UUIDs to start a connection diagnostic scan.</p>
                </div>
            </div>

            {error && (
                <div style={{
                    backgroundColor: colors.redLight,
                    color: colors.red,
                    padding: '14px 20px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '20px',
                    borderLeft: `5px solid ${colors.red}`,
                }}>
                    {error}
                </div>
            )}

            {!isAdmin && (
                <div style={{
                    backgroundColor: colors.orangeLight,
                    color: colors.orange,
                    padding: '14px 20px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '20px',
                    borderLeft: `5px solid ${colors.orange}`,
                }}>
                    ⚠️ <strong>Permission Warning:</strong> Your account role is set as <strong>{role}</strong>. Only <strong>Admin</strong> users are authorized to submit scan requests.
                </div>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '24px',
                alignItems: 'start'
            }}>
                <div style={styles.panel}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '16px',
                        flexWrap: 'wrap',
                        gap: '12px'
                    }}>
                        <h2 style={styles.panelTitle}>Target Device Selector</h2>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            border: `1px solid ${colors.border}`,
                            padding: '8px 12px',
                            borderRadius: '10px',
                            width: '280px',
                            backgroundColor: colors.bgPage
                        }}>
                            <SearchIcon />
                            <input
                                type="text"
                                placeholder="Search by name, IP, model, site..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    border: 'none',
                                    outline: 'none',
                                    background: 'none',
                                    width: '100%',
                                    fontSize: '13px'
                                }}
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: colors.textSecondary }}>
                            Loading fleet devices...
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                                <thead>
                                    <tr style={{ borderBottom: `1px solid ${colors.border}`, textAlign: 'left' }}>
                                        <th style={{ padding: '12px 8px' }}>
                                            <input
                                                type="checkbox"
                                                checked={isAllSelected}
                                                onChange={handleSelectAllToggle}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </th>
                                        <th style={{ padding: '12px 8px', color: colors.textSecondary }}>Device Name</th>
                                        <th style={{ padding: '12px 8px', color: colors.textSecondary }}>IP Address</th>
                                        <th style={{ padding: '12px 8px', color: colors.textSecondary }}>Model</th>
                                        <th style={{ padding: '12px 8px', color: colors.textSecondary }}>Site / Location</th>
                                        <th style={{ padding: '12px 8px', color: colors.textSecondary }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDevices.map(d => {
                                        const isSelected = selectedUuids.includes(d.uuid);
                                        const isEnabled = d.enabledStatus === "Enabled" || d.enabledStatus === "ENABLED";
                                        return (
                                            <tr
                                                key={d.uuid}
                                                style={{
                                                    borderBottom: `1px solid ${colors.border}`,
                                                    backgroundColor: isSelected ? 'rgba(255, 90, 31, 0.04)' : 'transparent',
                                                    transition: 'background-color 0.15s ease'
                                                }}
                                            >
                                                <td style={{ padding: '12px 8px' }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggleSelectDevice(d.uuid)}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </td>
                                                <td style={{ padding: '12px 8px', fontWeight: 600 }}>{d.deviceName}</td>
                                                <td style={{ padding: '12px 8px', fontFamily: 'monospace' }}>{d.ipAddress}</td>
                                                <td style={{ padding: '12px 8px' }}>{d.model || 'N/A'}</td>
                                                <td style={{ padding: '12px 8px' }}>{d.site} ({d.location || 'N/A'})</td>
                                                <td style={{ padding: '12px 8px' }}>
                                                    <span style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        fontSize: '11px',
                                                        fontWeight: 600,
                                                        padding: '3px 8px',
                                                        borderRadius: '999px',
                                                        backgroundColor: isEnabled ? colors.greenLight : colors.redLight,
                                                        color: isEnabled ? colors.green : colors.red
                                                    }}>
                                                        <span style={{
                                                            width: '6px',
                                                            height: '6px',
                                                            borderRadius: '50%',
                                                            backgroundColor: isEnabled ? colors.green : colors.red
                                                        }} />
                                                        {d.enabledStatus}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {filteredDevices.length === 0 && (
                                        <tr>
                                            <td colSpan={6} style={{ textAlign: 'center', padding: '30px 0', color: colors.textSecondary }}>
                                                No matching devices found in your fleet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={styles.panel}>
                        <h3 style={{ ...styles.panelTitle, marginBottom: '14px' }}>Scan Dispatch Summary</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${colors.border}`, paddingBottom: '8px' }}>
                                <span style={{ color: colors.textSecondary }}>Logged in User:</span>
                                <strong style={{ color: colors.textPrimary }}>{empId || "N/A"}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${colors.border}`, paddingBottom: '8px' }}>
                                <span style={{ color: colors.textSecondary }}>User Role:</span>
                                <strong style={{ color: isAdmin ? colors.green : colors.red }}>{role}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${colors.border}`, paddingBottom: '8px' }}>
                                <span style={{ color: colors.textSecondary }}>Selected Fleet PDUs:</span>
                                <strong style={{ color: colors.orange, fontSize: '15px' }}>{selectedUuids.length}</strong>
                            </div>
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: colors.textSecondary, marginBottom: '6px' }}>
                                Manual UUID Targets (comma-separated):
                            </label>
                            <textarea
                                placeholder="Paste UUIDs directly, e.g. a8b9-c123, d4e5-f678"
                                value={manualUuids}
                                onChange={(e) => setManualUuids(e.target.value)}
                                style={{
                                    width: '100%',
                                    height: '80px',
                                    borderRadius: '10px',
                                    border: `1px solid ${colors.border}`,
                                    padding: '8px 10px',
                                    boxSizing: 'border-box',
                                    fontSize: '12px',
                                    outline: 'none',
                                    fontFamily: 'monospace',
                                    resize: 'none',
                                    backgroundColor: colors.bgPage
                                }}
                            />
                        </div>

                        <button
                            type="button"
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                border: 'none',
                                cursor: (submitting || !isAdmin) ? 'not-allowed' : 'pointer',
                                backgroundColor: isAdmin ? colors.orange : colors.gray,
                                color: colors.white,
                                fontSize: '14px',
                                fontWeight: 600,
                                padding: '14px',
                                borderRadius: '12px',
                                marginTop: '24px',
                                boxShadow: isAdmin ? "0 6px 16px rgba(255,90,31,0.24)" : "none",
                                opacity: (submitting || !isAdmin) ? 0.7 : 1,
                                transition: 'all 0.15s ease'
                            }}
                            onClick={handleStartScanJob}
                            disabled={submitting || !isAdmin}
                        >
                            {submitting ? "Dispatching..." : "Start Connection Scan"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateScanJob;
