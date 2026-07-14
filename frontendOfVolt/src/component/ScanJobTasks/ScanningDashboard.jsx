import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../../styles/ScanJobDashboard";
import Sidebar from "../Sidebar";

const ScanningDashboard = () => {
    const navigate = useNavigate();

    const [userData] = useState({
        username: 'Admin User',
        officeEmail: 'admin@voltcontrol.com',
    });

    const [devices, setDevices] = useState([]);
    const [selectedDevices, setSelectedDevices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchField, setSearchField] = useState('deviceName');
    const [filterOperationalStatus, setFilterOperationalStatus] = useState('None');
    const [filterEnabledStatus, setFilterEnabledStatus] = useState('None');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchDevices = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ page: currentPage, size: pageSize });
            if (searchQuery) { params.append('search', searchQuery); params.append('searchField', searchField); }
            if (filterOperationalStatus !== 'None') params.append('operationalStatus', filterOperationalStatus);
            if (filterEnabledStatus !== 'None') params.append('enabledStatus', filterEnabledStatus);

            const res = await fetch(`http://localhost:8080/api/devices?${params.toString()}`);
            const data = await res.json();

            const mapped = data.content.map((d, i) => ({
                ...d,
                id: (currentPage * pageSize + i + 1).toString().padStart(2, '0'),
                dbId: d.id,
            }));

            setDevices(mapped);
            setTotalPages(data.totalPages);
            setTotalItems(data.totalItems);
        } catch (error) {
            console.error("Failed to fetch devices", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDevices();
    }, [currentPage, pageSize, searchQuery, searchField, filterOperationalStatus, filterEnabledStatus]);

    return (
        <div style={styles.container}>
            <Sidebar/>
            <header style={styles.header}>
                <div style={styles.logoSection}>
                    <div style={styles.logoBadge}>𝝯</div>
                    <span style={styles.metaText}>
                        {userData.username} • {userData.officeEmail}
                    </span>
                </div>

                <div style={styles.navSection}>
                    <button style={styles.navButton} onClick={() => navigate('/admin/dashboard')}>Devices</button>
                    <button style={{ ...styles.navButton, ...styles.navButtonActive }}>Scan</button>
                    <button style={styles.navButton}>Studio</button>
                    <button style={styles.adminChip}>
                        <span style={styles.adminAvatar}>{userData.username.charAt(0)}</span>
                        Hi {userData.username.split(' ')[0]}!
                    </button>
                </div>
            </header>

            <main style={styles.mainContent}>
                <div style={styles.titleSection}>
                    <h1 style={styles.title}>Scanning</h1>
                    <span style={styles.subTitle}>Manage scan jobs, execute scans, and analyze results</span>
                </div>

                <div style={styles.pageLayout}>
                    <div style={styles.actionSidebar}>
                        <div style={styles.actionCard} onClick={() => navigate('/scan/create')}>
                            <div style={styles.cardIconWrapper}>📄</div>
                            <h3 style={styles.cardTitle}>Create Scan Job</h3>
                            <p style={styles.cardDesc}>Create a new scan job for one or more devices.</p>
                        </div>
                        <div style={styles.actionCard} onClick={() => navigate('/scan/execute')}>
                            <div style={styles.cardIconWrapper}>⚙️</div>
                            <h3 style={styles.cardTitle}>Scan Execution</h3>
                            <p style={styles.cardDesc}>Execute device scans asynchronously.</p>
                        </div>
                        <div style={styles.actionCard} onClick={() => navigate('/scan/status')}>
                            <div style={styles.cardIconWrapper}>📊</div>
                            <h3 style={styles.cardTitle}>Scan Status</h3>
                            <p style={styles.cardDesc}>View and manage scan job statuses in real-time.</p>
                        </div>
                        <div style={styles.actionCard} onClick={() => navigate('/scan/progress')}>
                            <div style={styles.cardIconWrapper}>📡</div>
                            <h3 style={styles.cardTitle}>Scan Progress</h3>
                            <p style={styles.cardDesc}>Monitor real-time scan progress.</p>
                        </div>
                        <div style={styles.actionCard} onClick={() => navigate('/scan/results')}>
                            <div style={styles.cardIconWrapper}>📑</div>
                            <h3 style={styles.cardTitle}>Scan Results</h3>
                            <p style={styles.cardDesc}>View and analyze scan results for each device.</p>
                        </div>
                        <div style={styles.actionCard} onClick={() => navigate('/scan/cancel')}>
                            <div style={styles.cardIconWrapper}>❌</div>
                            <h3 style={styles.cardTitle}>Scan Cancellation</h3>
                            <p style={styles.cardDesc}>Cancel active scan jobs and stop pending tasks.</p>
                        </div>
                    </div>

                    <div style={styles.contentColumn}>
                        <div style={styles.statsRow}>
                            <div style={styles.statBlock}>
                                <span style={styles.statLabel}>💼 Total Scan Jobs</span>
                                <div style={styles.statValue}>128 <span style={styles.statTrendPos}>↑ 12%</span></div>
                            </div>
                            <div style={styles.statBlock}>
                                <span style={styles.statLabel}>▶ Completed Jobs</span>
                                <div style={styles.statValue}>98 <span style={styles.statTrendPos}>↑ 8%</span></div>
                            </div>
                            <div style={styles.statBlock}>
                                <span style={styles.statLabel}>⏱ Running Jobs</span>
                                <div style={styles.statValue}>14 <span style={styles.statTrendNeg}>↓ 3%</span></div>
                            </div>
                            <div style={styles.statBlock}>
                                <span style={styles.statLabel}>⚠️ Failed Jobs</span>
                                <div style={styles.statValue}>16 <span style={styles.statTrendNeg}>↑ 5%</span></div>
                            </div>
                            <div style={styles.statBlock}>
                                <span style={styles.statLabel}>✅ Success Rate</span>
                                <div style={styles.statValue}>87.6% <span style={styles.statTrendPos}>↑ 4%</span></div>
                            </div>
                        </div>
                    </div>
                    <div style={styles.tableContainer}>
                        <div style={styles.tableControls}>
                            <div style={styles.filtersGroup}>
                                <select style={styles.selectDropdown} defaultValue="Status">
                                    <option value="Status" disabled>Status</option>
                                    <option value="Show All">Show All</option>
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                                    <option value="Warning">Warning</option>
                                    <option value="Unknown">Unknown</option>
                                </select>

                                <select style={styles.selectDropdown} defaultValue="Scan Type">
                                    <option value="Operational" disabled>Scan Type</option>
                                    <option value="Show All">Show All</option>
                                    <option value="Enabled">Enabled</option>
                                    <option value="Disabled">Disabled</option>
                                </select>
                            </div>

                            <div style={styles.filtersGroup}>
                                <input
                                    type="text"
                                    placeholder="🔍 Search scan jobs..."
                                    style={styles.searchInput}
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(0); }}
                                />
                                <button
                                    style={styles.primaryActionButton}
                                    onClick={() => navigate('/scan/create')}
                                >
                                    + New Scan Job
                                </button>
                            </div>
                        </div>

                        <div>
                            <div style={styles.tableHeader}>
                                <div><input type="checkbox" /></div>
                                <div>Device Name</div>
                                <div>Asset ID</div>
                                <div>Model</div>
                                <div>IP Address</div>
                                <div>Serial Number</div>
                                <div>Adapter Type</div>
                                <div>Enabled Status</div>
                                <div>Operational Status</div>
                                <div></div>
                            </div>

                            {devices.map((device) => (
                                <div key={device.uuid || device.dbId} style={styles.tableRow}>
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={selectedDevices.includes(device.id)}
                                            onChange={() => setSelectedDevices(prev =>
                                                prev.includes(device.id) ? prev.filter(id => id !== device.id) : [...prev, device.id]
                                            )}
                                        />
                                    </div>

                                    <div>{device.deviceName}</div>
                                    <div style={{ color: '#888' }}>{device.assetId}</div>
                                    <div style={{ color: '#666' }}>{device.model}</div>
                                    <div style={{ fontFamily: 'monospace' }}>{device.ipAddress}</div>
                                    <div style={{ fontFamily: 'monospace' }}>{device.serialNumber}</div>
                                    <div>{device.adapterType}</div>
                                    <div><span style={styles.badge(device.enabledStatus)}>● {device.enabledStatus}</span></div>
                                    <div><span style={styles.badge(device.operationalStatus)}>● {device.operationalStatus}</span></div>
                                    <div style={{ textAlign: 'center', cursor: 'pointer', fontSize: '16px' }}>⋮</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ScanningDashboard;