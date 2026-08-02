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

  // Checkbox Selection & Details Popup States
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [activeDetailsDevice, setActiveDetailsDevice] = useState(null);
  const [verifyPasswordDevice, setVerifyPasswordDevice] = useState(null);
  const [verifyPasswordInput, setVerifyPasswordInput] = useState('');
  const [verifyPasswordError, setVerifyPasswordError] = useState(false);
  const [showBulkDetailsModal, setShowBulkDetailsModal] = useState(false);
  const [bulkUnlocked, setBulkUnlocked] = useState({});
  const [bulkPasswordInputs, setBulkPasswordInputs] = useState({});
  const [bulkPasswordErrors, setBulkPasswordErrors] = useState({});

  const handleInitiateViewDetails = (device) => {
    if (device.hasPassword) {
      setVerifyPasswordDevice(device);
      setVerifyPasswordInput('');
      setVerifyPasswordError(false);
    } else {
      setActiveDetailsDevice(device);
    }
  };

  const handleVerifyPasswordSubmit = async () => {
    if (!verifyPasswordDevice) return;
    try {
      const res = await fetch(`http://localhost:8080/api/devices/${verifyPasswordDevice.dbId}/verify-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: verifyPasswordInput })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.matches) {
          setActiveDetailsDevice(verifyPasswordDevice);
          setVerifyPasswordDevice(null);
          setVerifyPasswordInput('');
          setVerifyPasswordError(false);
        } else {
          setVerifyPasswordError(true);
        }
      } else {
        setVerifyPasswordError(true);
      }
    } catch (err) {
      console.error("Verification error:", err);
      setVerifyPasswordError(true);
    }
  };

  const handleUnlockBulkDevice = async (device) => {
    const inputPassword = bulkPasswordInputs[device.id] || '';
    try {
      const res = await fetch(`http://localhost:8080/api/devices/${device.dbId}/verify-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: inputPassword })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.matches) {
          setBulkUnlocked(prev => ({ ...prev, [device.id]: true }));
          setBulkPasswordErrors(prev => ({ ...prev, [device.id]: false }));
        } else {
          setBulkPasswordErrors(prev => ({ ...prev, [device.id]: true }));
        }
      } else {
        setBulkPasswordErrors(prev => ({ ...prev, [device.id]: true }));
      }
    } catch (err) {
      console.error("Bulk unlock error:", err);
      setBulkPasswordErrors(prev => ({ ...prev, [device.id]: true }));
    }
  };

  const toggleSelectDevice = (id) => {
    setSelectedDevices(prev => 
      prev.includes(id) 
        ? prev.filter(deviceId => deviceId !== id)
        : [...prev, id]
    );
  };

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
    const style = document.createElement('style');
    style.textContent = `
      @keyframes modalPopUp {
        0% { transform: scale(0.95) translateY(20px); opacity: 0; }
        100% { transform: scale(1) translateY(0); opacity: 1; }
      }
      .animate-modal-pop {
        animation: modalPopUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      }
      @keyframes cardPopUp {
        0% { transform: scale(0.96) translateY(15px); opacity: 0; }
        100% { transform: scale(1) translateY(0); opacity: 1; }
      }
      .animate-card-pop {
        animation: cardPopUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      }
      .shake-effect {
        animation: shake 0.4s ease-in-out;
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-6px); }
        75% { transform: translateX(6px); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
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

            {selectedDevices.length > 0 && (
              <button
                onClick={() => {
                  setShowBulkDetailsModal(true);
                  setBulkUnlocked({});
                  setBulkPasswordInputs({});
                  setBulkPasswordErrors({});
                }}
                style={{ ...styles.viewSelectedBtn, marginRight: '10px' }}
              >
                👁️ View ({selectedDevices.length})
              </button>
            )}
            <button style={styles.primaryActionButton} onClick={handleScan}>
              Scan
            </button>
          </div>
        </div>

        <div style={styles.assetPanel}>
          <div style={styles.paginationBar}>
            <div style={styles.selectALLButton}>
              <input
                type="checkbox"
                checked={paginatedDevices.length > 0 && paginatedDevices.every(d => selectedDevices.includes(d.id))}
                onChange={() => {
                  const isAllOnPageSelected = paginatedDevices.every(d => selectedDevices.includes(d.id));
                  if (isAllOnPageSelected) {
                    setSelectedDevices(prev => prev.filter(id => !paginatedDevices.map(pd => pd.id).includes(id)));
                  } else {
                    setSelectedDevices(prev => [...new Set([...prev, ...paginatedDevices.map(pd => pd.id)])]);
                  }
                }}
                style={{ ...styles.checkbox, cursor: 'pointer' }}
                title="Select all on this page"
              />
            </div>

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
                <div 
                  style={{ ...styles.deviceHeader, cursor: 'pointer' }}
                  onClick={() => handleInitiateViewDetails(device)}
                >
                  <div style={styles.deviceHeaderLeft}>
                    <input 
                      type="checkbox"
                      checked={selectedDevices.includes(device.id)}
                      onChange={() => toggleSelectDevice(device.id)}
                      onClick={(e) => e.stopPropagation()}
                      style={{ ...styles.checkbox, marginRight: '10px' }}
                    />
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

                    <button
                      type="button"
                      style={{
                        ...styles.expandIcon,
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        color: '#10b981',
                        background: 'rgba(16, 185, 129, 0.04)',
                        cursor: 'pointer'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInitiateViewDetails(device);
                      }}
                      title="View Details"
                    >
                      👁️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* NEW CODE: Password Verification Dialog */}
        {verifyPasswordDevice && (
          <div style={styles.detailsModalOverlay}>
            <div 
              style={styles.verifyModal} 
              className={`animate-modal-pop ${verifyPasswordError ? 'shake-effect' : ''}`}
            >
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>🔒 Password Required</h2>
                <button
                  style={styles.modalClose}
                  onClick={() => setVerifyPasswordDevice(null)}
                >
                  ✕
                </button>
              </div>
              <div style={styles.modalBody}>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '14px', textAlign: 'left' }}>
                  Please enter the password for device <strong>{verifyPasswordDevice.deviceName}</strong>.
                </p>
                <div style={styles.modalField}>
                  <label style={styles.modalLabel}>Device Password</label>
                  <input
                    type="password"
                    value={verifyPasswordInput}
                    onChange={(e) => {
                      setVerifyPasswordInput(e.target.value);
                      setVerifyPasswordError(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleVerifyPasswordSubmit();
                    }}
                    style={styles.lockInput}
                    placeholder="Enter password"
                    autoFocus
                  />
                  {verifyPasswordError && (
                    <span style={styles.lockError}>❌ Mismatch password. Please try again.</span>
                  )}
                </div>
              </div>
              <div style={{ ...styles.modalFooter, marginTop: '8px' }}>
                <button style={styles.modalCancel} onClick={() => setVerifyPasswordDevice(null)}>Cancel</button>
                <button
                  style={styles.unlockButton}
                  onClick={handleVerifyPasswordSubmit}
                  disabled={!verifyPasswordInput.trim()}
                >
                  Verify & View
                </button>
              </div>
            </div>
          </div>
        )}

        {/* NEW CODE: Device Details Modal Popup */}
        {activeDetailsDevice && (
          <div style={styles.detailsModalOverlay}>
            <div style={styles.detailsModal} className="animate-modal-pop">
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>👁️ Device Details: {activeDetailsDevice.deviceName}</h2>
                <button
                  style={styles.modalClose}
                  onClick={() => setActiveDetailsDevice(null)}
                >
                  ✕
                </button>
              </div>

              <div style={styles.modalBody}>
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
                      <span style={styles.detailValue}>{activeDetailsDevice.deviceName}</span>
                    </div>

                    <div style={styles.detailItem}>
                      <label style={styles.detailLabel}>Asset ID</label>
                      <span style={styles.detailValue}>{activeDetailsDevice.assetId}</span>
                    </div>

                    <div style={styles.detailItem}>
                      <label style={styles.detailLabel}>Model</label>
                      <span style={styles.detailValue}>{activeDetailsDevice.model}</span>
                    </div>

                    <div style={styles.detailItem}>
                      <label style={styles.detailLabel}>UUID</label>
                      <span style={{ ...styles.detailValue, ...styles.mono }}>{activeDetailsDevice.uuid}</span>
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
                      <span style={styles.detailValue}>{activeDetailsDevice.site}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <label style={styles.detailLabel}>Location</label>
                      <span style={styles.detailValue}>{activeDetailsDevice.location}</span>
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
                      <span style={{ ...styles.detailValue, ...styles.mono }}>{activeDetailsDevice.ipAddress}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <label style={styles.detailLabel}>Hostname</label>
                      <span style={{ ...styles.detailValue, ...styles.mono }}>{activeDetailsDevice.hostname}</span>
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
                      <span style={{ ...styles.detailValue, ...styles.mono }}>{activeDetailsDevice.serialNumber}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <label style={styles.detailLabel}>Adapter Type</label>
                      <span style={styles.detailValue}>{activeDetailsDevice.adapterType}</span>
                    </div>
                  </div>
                </div>

                {/* Status Details Section */}
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
                      <span style={{ ...styles.badge(activeDetailsDevice.enabledStatus), marginTop: '8px', display: 'inline-block' }}>
                        ● {activeDetailsDevice.enabledStatus}
                      </span>
                    </div>

                    <div style={styles.statusField}>
                      <label style={styles.detailLabel}>Operational Status</label>
                      <span style={{ ...styles.badge(activeDetailsDevice.operationalStatus), marginTop: '8px', display: 'inline-block' }}>
                        ● {activeDetailsDevice.operationalStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timestamps */}
                <div style={styles.timestampBar}>
                  <span style={styles.timestampChip}>Last seen <strong>{activeDetailsDevice.lastSeen}</strong></span>
                  <span style={styles.timestampSep} />
                  <span style={styles.timestampChip}>Created <strong>{activeDetailsDevice.createdTimestamp}</strong></span>
                  <span style={styles.timestampSep} />
                  <span style={styles.timestampChip}>Updated <strong>{activeDetailsDevice.updatedTimestamp}</strong></span>
                </div>
              </div>

              <div style={{ ...styles.modalFooter, marginTop: '20px' }}>
                <button
                  style={styles.modalCancel}
                  onClick={() => setActiveDetailsDevice(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* NEW CODE: Bulk Details Modal popup */}
        {showBulkDetailsModal && (
          <div style={styles.detailsModalOverlay}>
            <div style={styles.bulkModal} className="animate-modal-pop">
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>👁️ Bulk Selected Devices ({selectedDevices.length})</h2>
                <button
                  style={styles.modalClose}
                  onClick={() => setShowBulkDetailsModal(false)}
                >
                  ✕
                </button>
              </div>

              <div style={{ ...styles.modalBody, maxHeight: '72vh', overflowY: 'auto' }}>
                <div style={styles.bulkGrid}>
                  {devices
                    .filter(device => selectedDevices.includes(device.id))
                    .map((device, idx) => {
                      const isLocked = device.hasPassword && !bulkUnlocked[device.id];
                      return (
                        <div
                          key={device.uuid}
                          style={styles.bulkCard}
                          className={`animate-card-pop ${bulkPasswordErrors[device.id] ? 'shake-effect' : ''}`}
                          style={{
                            ...styles.bulkCard,
                            animationDelay: `${idx * 0.05}s`
                          }}
                        >
                          {isLocked && (
                            <div style={styles.lockOverlay}>
                              <div style={styles.lockIcon}>🔒</div>
                              <h3 style={{ margin: 0, fontSize: '15px', color: '#111015' }}>Password Protected</h3>
                              <p style={{ margin: 0, fontSize: '12px', color: '#64748b', textAlign: 'center' }}>
                                Details for <strong>{device.deviceName}</strong> are encrypted.
                              </p>
                              <input
                                type="password"
                                value={bulkPasswordInputs[device.id] || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setBulkPasswordInputs(prev => ({ ...prev, [device.id]: val }));
                                  setBulkPasswordErrors(prev => ({ ...prev, [device.id]: false }));
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleUnlockBulkDevice(device);
                                }}
                                style={styles.lockInput}
                                placeholder="Enter password"
                              />
                              {bulkPasswordErrors[device.id] && (
                                <span style={styles.lockError}>❌ Mismatch password.</span>
                              )}
                              <button
                                style={styles.unlockButton}
                                onClick={() => handleUnlockBulkDevice(device)}
                              >
                                Decrypt & View
                              </button>
                            </div>
                          )}

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '700', color: '#10b981', fontSize: '12px' }}>{device.id}</span>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <span style={styles.badge(device.operationalStatus)}>● {device.operationalStatus}</span>
                              <span style={styles.badge(device.enabledStatus)}>● {device.enabledStatus}</span>
                            </div>
                          </div>

                          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#111015', textAlign: 'left' }}>{device.deviceName}</h3>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                              <span style={{ color: '#64748b', fontWeight: '600' }}>Asset ID</span>
                              <span style={{ color: '#111015', fontWeight: '700' }}>{device.assetId}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                              <span style={{ color: '#64748b', fontWeight: '600' }}>Model</span>
                              <span style={{ color: '#111015' }}>{device.model}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                              <span style={{ color: '#64748b', fontWeight: '600' }}>IP Address</span>
                              <span style={{ color: '#111015', fontFamily: 'monospace' }}>{device.ipAddress}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                              <span style={{ color: '#64748b', fontWeight: '600' }}>Hostname</span>
                              <span style={{ color: '#111015', fontFamily: 'monospace' }}>{device.hostname}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                              <span style={{ color: '#64748b', fontWeight: '600' }}>Site</span>
                              <span style={{ color: '#111015' }}>{device.site}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                              <span style={{ color: '#64748b', fontWeight: '600' }}>Location</span>
                              <span style={{ color: '#111015' }}>{device.location}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                              <span style={{ color: '#64748b', fontWeight: '600' }}>Serial No</span>
                              <span style={{ color: '#111015', fontFamily: 'monospace' }}>{device.serialNumber}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ color: '#64748b', fontWeight: '600' }}>Last Seen</span>
                              <span style={{ color: '#64748b', fontSize: '11px' }}>{device.lastSeen}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div style={styles.modalFooter}>
                <button
                  style={styles.modalCancel}
                  onClick={() => setShowBulkDetailsModal(false)}
                >
                  Close Grid
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;