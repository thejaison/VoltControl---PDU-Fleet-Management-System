import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styles } from "../styles/files/AdminDashboardStyles";
import Sidebar from "./Sidebar";
import voltlogo from "../assets/voltlog1.png";

const UserDashboard = () => {
  const [userData, setUserData] = useState({
    username: '',
    joiningDate: '',
    officeEmail: '',
    profileImage: ''
  });

  const [devices, setDevices] = useState([]);
  const [expandedDevice, setExpandedDevice] = useState(null);
  const [sortBasis, setSortBasis] = useState('name_asc');
  const [filterOperationalStatus, setFilterOperationalStatus] = useState('None');
  const [filterEnabledStatus, setFilterEnabledStatus] = useState('None');

  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('deviceName');

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const empId = localStorage.getItem('loggedInEmpId');
    if (!empId) {
      console.error("No employee identity tracked! Redirecting or handling default state.");
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${empId}`);
        if (response.ok) {
          const databaseUser = await response.json();
          setUserData({
            username: databaseUser.username || '',
            joiningDate: databaseUser.joiningDate || '',
            officeEmail: databaseUser.officeEmail || '',
            profileImage: databaseUser.profileImage || ''
          });
        }
      } catch (error) {
        console.error("Network communication error with backend controller:", error);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/devices?size=1000')
      .then(res => res.json())
      .then(data => {
        const content = data.content || [];
        const mapped = content.map((d, i) => ({
          ...d,
          id: (i + 1).toString().padStart(2, '0'),
          dbId: d.id
        }));
        setDevices(mapped);
      })
      .catch(err => console.error("Error fetching devices in UserDashboard:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInEmpId');
    navigate('/login');
  };

  const filteredDevices = devices.filter(device => {
    const matchesOperational = filterOperationalStatus === 'None' || device.operationalStatus === filterOperationalStatus;
    const matchesEnabled = filterEnabledStatus === 'None' || device.enabledStatus === filterEnabledStatus;

    const matchesSearch = searchQuery === '' ||
      (device[searchField] || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesOperational && matchesEnabled && matchesSearch;
  });

  const sortedDevices = [...filteredDevices].sort((a, b) => {
    let valA, valB;
    if (sortBasis.startsWith('name')) {
      valA = a.deviceName || '';
      valB = b.deviceName || '';
    } else if (sortBasis.startsWith('ip')) {
      valA = a.ipAddress || '';
      valB = b.ipAddress || '';
    } else if (sortBasis.startsWith('asset')) {
      valA = a.assetId || '';
      valB = b.assetId || '';
    } else {
      valA = a.deviceName || '';
      valB = b.deviceName || '';
    }

    valA = valA.toLowerCase();
    valB = valB.toLowerCase();

    const isAsc = sortBasis.endsWith('asc');
    if (valA < valB) return isAsc ? -1 : 1;
    if (valA > valB) return isAsc ? 1 : -1;
    return 0;
  });

  const totalItems = sortedDevices.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
    }
  }, [totalPages, currentPage]);

  const paginatedDevices = sortedDevices.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const getPaginationItems = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const pages = new Set([0, totalPages - 1]);
    for (let page = currentPage - 2; page <= currentPage + 2; page++) {
      if (page > 0 && page < totalPages - 1) {
        pages.add(page);
      }
    }

    const sortedPages = Array.from(pages).sort((a, b) => a - b);
    return sortedPages.reduce((items, page, index) => {
      if (index > 0 && page - sortedPages[index - 1] > 1) {
        items.push(`ellipsis-${page}`);
      }
      items.push(page);
      return items;
    }, []);
  };

  const toggleDevice = (id) => {
    setExpandedDevice(expandedDevice === id ? null : id);
  };

  const handleScan = async () => {
    const enabledUuids = devices
      .filter(d => d.enabledStatus === "Enabled" || d.enabledStatus === "ENABLED")
      .map(d => d.uuid);

    if (enabledUuids.length === 0) {
      alert("No enabled devices available to scan.");
      return;
    }

    const empId = localStorage.getItem('loggedInEmpId');

    try {
      const response = await fetch("http://localhost:8080/api/scan-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceUuids: enabledUuids,
          createdByEmpId: empId
        })
      });

      if (response.ok) {
        navigate('/job/scan', { state: location.state });
      } else {
        const text = await response.text();
        try {
          const parsed = JSON.parse(text);
          alert("Failed to start scan: " + (parsed.message || "Unknown error"));
        } catch (e) {
          alert("Failed to start scan: " + text);
        }
      }
    } catch (err) {
      console.error("Error starting scan:", err);
      alert("Backend server communication failed. Please check your network.");
    }
  };

  return (
    <div style={styles.container} className="main-content-shift">
      <Sidebar />
      <header style={styles.header}>
        <div style={styles.logoSection}>
          <div style={styles.logoBadge}>
            <img src={voltlogo} alt="VoltControl" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
          </div>
          <span style={styles.metaText}>
            {userData.username || 'User'} • 
            {userData.joiningDate ? new Date(userData.joiningDate).toLocaleDateString() : 'N/A'} • 
            {userData.officeEmail || 'user@email.com'}
          </span>
        </div>

        <div style={styles.navSection}>
          <button style={{ ...styles.navButton, ...styles.navButtonActive }}>Devices</button>
          <button style={styles.navButton}>Studio</button>
          <button 
            style={styles.adminChip}
            onClick={() => navigate('/admin/detail', {
              state: {
                userData,
                empId: localStorage.getItem('loggedInEmpId')
              }
            })}
          >
            <span style={{ ...styles.adminAvatar, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {userData.profileImage ? (
                <img src={userData.profileImage} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                userData.username ? userData.username.charAt(0).toUpperCase() : 'U'
              )}
            </span>
            Hi {userData.username || 'User'}!
          </button>
          <button 
            style={{
              ...styles.navButton,
              marginLeft: '10px',
              cursor: 'pointer',
              color: '#a855f7'
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <main style={styles.mainContent}>
        <div style={styles.titleSection}>
          <div>
            <h1 style={styles.title}>VoltControl Asset Center</h1>
            <div style={styles.subTitleSection}>
              <span style={styles.subTitle}>Monitored Infrastructure Nodes</span>
              <span style={styles.countBadge}>
                {filterOperationalStatus === 'None' && filterEnabledStatus === 'None'
                  ? devices.length.toString().padStart(2, '0')
                  : `${filteredDevices.length}/${devices.length}`}
              </span>
            </div>
          </div>

          <div style={styles.actionButtons}>
            {/* Search Input Box */}
            <div className="dvc-search-wrap" style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search devices..."
                className="dvc-search-input"
                style={styles.searchInput}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(0); }}
              />
            </div>

            {/* Dropdown Selection Criteria */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <select
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                style={{ ...styles.selectDropdown, ...styles.statusSelectBorder('Fine') }}
              >
                <option value="deviceName">Device Name</option>
                <option value="ipAddress">IP Address</option>
                <option value="hostname">Hostname</option>
                <option value="assetId">Asset ID</option>
                <option value="serialNumber">Serial No</option>
              </select>
            </label>

            {/* Filter Operational Status */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <select
                value={filterOperationalStatus}
                onChange={(e) => { setFilterOperationalStatus(e.target.value); setCurrentPage(0); }}
                style={{ ...styles.selectDropdown, ...styles.statusSelectBorder('Fine') }}
              >
                <option value="None">None</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Warning">Warning</option>
                <option value="Unknown">Unknown</option>
              </select>
            </label>

            {/* Filter Enabled Status */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <select
                value={filterEnabledStatus}
                onChange={(e) => { setFilterEnabledStatus(e.target.value); setCurrentPage(0); }}
                style={{ ...styles.selectDropdown, ...styles.statusSelectBorder('Fine') }}
              >
                <option value="None">None</option>
                <option value="Enabled">Enabled</option>
                <option value="Disabled">Disabled</option>
              </select>
            </label>

            {/* Sort Criteria */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <select
                value={sortBasis}
                onChange={(e) => { setSortBasis(e.target.value); setCurrentPage(0); }}
                style={{ ...styles.selectDropdown, ...styles.statusSelectBorder('Fine') }}
              >
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
                <option value="ip_asc">IP Address (Asc)</option>
                <option value="ip_desc">IP Address (Desc)</option>
                <option value="asset_asc">Asset ID (Asc)</option>
                <option value="asset_desc">Asset ID (Desc)</option>
              </select>
            </label>

            <button style={styles.primaryActionButton} onClick={handleScan}>
              Scan
            </button>
          </div>
        </div>

        <div style={styles.assetPanel}>
          <div style={styles.paginationBar}>
            <div style={styles.selectALLButton} />

            <div style={styles.paginationInfo}>
              Showing {paginatedDevices.length === 0 ? 0 : currentPage * pageSize + 1}–
              {Math.min((currentPage + 1) * pageSize, totalItems)} of {totalItems}
            </div>

            <div style={styles.paginationControls}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                Show:
                <select
                  value={pageSize}
                  onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(0); }}
                  style={styles.pageSizeSelect}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </label>

              <button
                style={styles.pageNavButton}
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                ← Previous
              </button>

              {getPaginationItems().map(item => (
                typeof item === 'string' ? (
                  <span key={item} style={styles.paginationEllipsis}>...</span>
                ) : (
                  <button
                    key={item}
                    style={item === currentPage ? styles.pageNumberActive : styles.pageNumber}
                    onClick={() => setCurrentPage(item)}
                  >
                    {item + 1}
                  </button>
                )
              ))}

              <button
                style={styles.pageNavButton}
                disabled={currentPage >= totalPages - 1}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                Next →
              </button>
            </div>
          </div>

          <div style={styles.deviceList}>
            {paginatedDevices.length === 0 ? (
              <div style={styles.emptyState}>No devices found.</div>
            ) : paginatedDevices.map((device, index) => (
              <div key={device.uuid} style={styles.deviceCard}>
                <div style={styles.deviceHeader}>
                  <div style={styles.deviceHeaderLeft}>
                    <span style={styles.deviceNumber}>{device.id}</span>
                    <span style={styles.deviceName}>{device.deviceName}</span>
                    <span style={styles.assetIdBadge}>{device.assetId}</span>
                  </div>

                  <div style={styles.deviceHeaderRight}>
                    <span style={styles.badge(device.operationalStatus)}>
                      ● {device.operationalStatus}
                    </span>

                    <span style={styles.badge(device.enabledStatus)}>
                      ● {device.enabledStatus}
                    </span>

                    <span
                      style={styles.expandIcon}
                      onClick={() => toggleDevice(device.id)}  
                    >
                      {expandedDevice === device.id ? '▼' : '▶'}
                    </span>
                  </div>
                </div>

                {expandedDevice === device.id && (
                  <div style={styles.deviceDetails}>
                    <div style={styles.detailsHeader}>
                      <span style={styles.detailsTitle}>Device Configuration</span>
                    </div>

                    {/* Identity Section */}
                    <div style={styles.section}>
                      <div style={styles.sectionTitle}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <circle cx="9" cy="10" r="2" />
                          <path d="M5 17c0-2 2-3 4-3s4 1 4 3" />
                          <line x1="15" y1="9" x2="19" y2="9" /><line x1="15" y1="13" x2="19" y2="13" />
                        </svg>
                        Identity
                      </div>

                      <div style={styles.sectionGrid}>
                        <div style={styles.detailItem}>
                          <label style={styles.detailLabel}>Device Name</label>
                          <span style={styles.detailValue}>{device.deviceName}</span>
                        </div>

                        <div style={styles.detailItem}>
                          <label style={styles.detailLabel}>Asset ID</label>
                          <span style={styles.detailValue}>{device.assetId}</span>
                        </div>

                        <div style={styles.detailItem}>
                          <label style={styles.detailLabel}>Model</label>
                          <span style={styles.detailValue}>{device.model}</span>
                        </div>

                        <div style={styles.detailItem}>
                          <label style={styles.detailLabel}>UUID</label>
                          <span style={{ ...styles.detailValue, ...styles.mono }}>{device.uuid}</span>
                        </div>
                      </div>
                    </div>

                    {/* Location Section */}
                    <div style={styles.section}>
                      <div style={styles.sectionTitle}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z" />
                          <circle cx="12" cy="9" r="2.5" />
                        </svg>
                        Location
                      </div>
                      <div style={styles.sectionGrid}>
                        <div style={styles.detailItem}>
                          <label style={styles.detailLabel}>Site</label>
                          <span style={styles.detailValue}>{device.site}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <label style={styles.detailLabel}>Location</label>
                          <span style={styles.detailValue}>{device.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Network Section */}
                    <div style={styles.section}>
                      <div style={styles.sectionTitle}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" />
                          <rect x="9" y="14" width="6" height="6" rx="1" />
                          <path d="M7 10v2a2 2 0 0 0 2 2M17 10v2a2 2 0 0 1-2 2" />
                        </svg>
                        Network
                      </div>
                      <div style={styles.sectionGrid}>
                        <div style={styles.detailItem}>
                          <label style={styles.detailLabel}>IP Address</label>
                          <span style={{ ...styles.detailValue, ...styles.mono }}>{device.ipAddress}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <label style={styles.detailLabel}>Hostname</label>
                          <span style={{ ...styles.detailValue, ...styles.mono }}>{device.hostname}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hardware Section */}
                    <div style={styles.section}>
                      <div style={styles.sectionTitle}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="6" y="6" width="12" height="12" rx="2" />
                          <line x1="9" y1="2" x2="9" y2="6" /><line x1="15" y1="2" x2="15" y2="6" />
                          <line x1="9" y1="18" x2="9" y2="22" /><line x1="15" y1="18" x2="15" y2="22" />
                          <line x1="2" y1="9" x2="6" y2="9" /><line x1="2" y1="15" x2="6" y2="15" />
                          <line x1="18" y1="9" x2="22" y2="9" /><line x1="18" y1="15" x2="22" y2="15" />
                        </svg>
                        Hardware
                      </div>
                      <div style={styles.sectionGrid}>
                        <div style={styles.detailItem}>
                          <label style={styles.detailLabel}>Serial Number</label>
                          <span style={{ ...styles.detailValue, ...styles.mono }}>{device.serialNumber}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <label style={styles.detailLabel}>Adapter Type</label>
                          <span style={styles.detailValue}>{device.adapterType}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Details */}
                    <div style={styles.section}>
                      <div style={styles.sectionTitle}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 12h4l3 8 4-16 3 8h4" />
                        </svg>
                        Status Details
                      </div>
                      <div style={styles.statusRow}>
                        <div style={styles.statusField}>
                          <label style={styles.detailLabel}>Enabled Status</label>
                          <span style={{ ...styles.badge(device.enabledStatus), marginTop: '8px', display: 'inline-block' }}>
                            ● {device.enabledStatus}
                          </span>
                        </div>

                        <div style={styles.statusField}>
                          <label style={styles.detailLabel}>Operational Status</label>
                          <span style={{ ...styles.badge(device.operationalStatus), marginTop: '8px', display: 'inline-block' }}>
                            ● {device.operationalStatus}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Timestamps */}
                    <div style={styles.timestampBar}>
                      <span style={styles.timestampChip}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 16 14" />
                        </svg>
                        Last seen <strong>{device.lastSeen}</strong>
                      </span>
                      <span style={styles.timestampSep} />
                      <span style={styles.timestampChip}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 16 14" />
                        </svg>
                        Created <strong>{device.createdTimestamp}</strong>
                      </span>
                      <span style={styles.timestampSep} />
                      <span style={styles.timestampChip}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 16 14" />
                        </svg>
                        Updated <strong>{device.updatedTimestamp}</strong>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;