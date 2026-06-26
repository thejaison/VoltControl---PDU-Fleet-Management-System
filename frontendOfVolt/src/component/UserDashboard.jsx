import React, { useState, useEffect } from "react";
import { styles } from "../styles/DashboardStyles";
import "../styles/DashboardStyles.css";
import { useNavigate, useLocation } from "react-router-dom";

const UserDashboard = () => {
  const [userData, setUserData] = useState({
    username: '',
    joiningDate: '',
    officeEmail: ''
  });

  const [devices, setDevices] = useState([]);
  const [expandedDevice, setExpandedDevice] = useState(null);
  const [sortBasis, setSortBasis] = useState('name');
  const [filterOperationalStatus, setFilterOperationalStatus] = useState('None');
  const [filterEnabledStatus, setFilterEnabledStatus] = useState('None');

  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('deviceName');

  const navigate = useNavigate();
  const location = useLocation();

  // Just loading google fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    if(location.state?.username) {
      setUserData({
        username: location.state.username || '',
        joiningDate: location.state.joiningDate || '',
        officeEmail: location.state.officeEmail || ''
      });
      return;
    }

    const empId = localStorage.getItem('loggedInEmpId');
    if(!empId) {
      console.error("No employee identity tracked! Redirecting or handling default state.");
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${empId}`);
        if(response.ok) {
          const databaseUser = await response.json();
          setUserData({
            username: databaseUser.username || '',
            joiningDate: databaseUser.joiningDate || '',
            officeEmail: databaseUser.officeEmail || ''
          });
        }
      } catch (error) {
        console.error("Network communication error with backend controller:", error);
      }
    };

    fetchProfileData();
  }, [location]);

  useEffect(() => {
    fetch('http://localhost:8080/api/devices')
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((d, i) => ({
          ...d,
          id: (i + 1).toString().padStart(2, '0'),
          dbId: d.id
        }));
        setDevices(mapped);
      });
  }, []);

  const filteredDevices = devices.filter(device => {
    const matchesOperational = filterOperationalStatus === 'None' || device.operationalStatus === filterOperationalStatus;
    const matchesEnabled = filterEnabledStatus === 'None' || device.enabledStatus === filterEnabledStatus;

    const matchesSearch = searchQuery === '' ||
      (device[searchField] || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesOperational && matchesEnabled && matchesSearch;
  });

  const toggleDevice = (id) => {
    setExpandedDevice(expandedDevice === id ? null : id);
  };

  const handleScan = () => {
    alert('Scan functionality will be implemented in the backend.');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header} className="dvc-header">
        <div style={styles.logoSection}>
          <div className="dvc-logo-badge">𝝯</div>
          <span style={styles.metaText}>
            {userData.username || 'User'} • 
            {userData.joiningDate ? new Date(userData.joiningDate).toLocaleDateString() : 'N/A'} • 
            {userData.officeEmail || 'user@email.com'}
          </span>
        </div>

        <div style={styles.navSection}>
          <button className="dvc-nav-btn is-active">Devices</button>
          <button className="dvc-nav-btn">Studio</button>
          <button 
            className="dvc-admin-chip"
            onClick={() => navigate('/AccountView/UserDetailView.jsx', {
              state: {
                userData,
                empId: localStorage.getItem('loggedInEmpId')
              }
            })}
          >
            <span className="dvc-admin-avatar">
              {userData.username ? userData.username.charAt(0).toUpperCase() : 'U'}
            </span>
            Hi {userData.username || 'User'}!
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
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Dropdown Selection Criteria */}
            <label className="dvc-sort-select" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
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
            <label className="dvc-sort-select" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <select
                value={filterOperationalStatus}
                onChange={(e) => setFilterOperationalStatus(e.target.value)}
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
            <label className="dvc-sort-select" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <select
                value={filterEnabledStatus}
                onChange={(e) => setFilterEnabledStatus(e.target.value)}
                style={{ ...styles.selectDropdown, ...styles.statusSelectBorder('Fine') }}
              >
                <option value="None">None</option>
                <option value="Enabled">Enabled</option>
                <option value="Disabled">Disabled</option>
              </select>
            </label>

            {/* Functional Mock Scan Action */}
            <button className="dvc-scan-btn" style={styles.actionButton} onClick={handleScan}>
              Scan
            </button>
          </div>
        </div>

        {/* Device Structural Grid List */}
        <div style={styles.deviceList}>
          {filteredDevices.map((device) => (
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

              {/* View Only Profile Properties Details */}
              {expandedDevice === device.id && (
                <div style={styles.deviceDetails}>
                  <div style={styles.detailsHeader}>
                    <span style={styles.detailsTitle}>Device Configuration</span>
                  </div>

                  {/* Identity Grid Section */}
                  <div className="dvc-section">
                    <div className="dvc-section-title">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <circle cx="9" cy="10" r="2" />
                        <path d="M5 17c0-2 2-3 4-3s4 1 4 3" />
                        <line x1="15" y1="9" x2="19" y2="9" /><line x1="15" y1="13" x2="19" y2="13" />
                      </svg>
                      Identity
                    </div>

                    <div className="dvc-section-grid">
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
                        <span style={styles.detailValue} className="dvc-mono">{device.uuid}</span>
                      </div>
                    </div>
                  </div>

                  {/* Location Grid Section */}
                  <div className="dvc-section">
                    <div className="dvc-section-title">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                      Location
                    </div>

                    <div className="dvc-section-grid">
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

                  {/* Network Grid Section */}
                  <div className="dvc-section">
                    <div className="dvc-section-title">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" />
                        <rect x="9" y="14" width="6" height="6" rx="1" />
                        <path d="M7 10v2a2 2 0 0 0 2 2M17 10v2a2 2 0 0 1-2 2" />
                      </svg>
                      Network
                    </div>

                    <div className="dvc-section-grid">
                      <div style={styles.detailItem}>
                        <label style={styles.detailLabel}>IP Address</label>
                        <span style={styles.detailValue} className="dvc-mono">{device.ipAddress}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <label style={styles.detailLabel}>Hostname</label>
                        <span style={styles.detailValue} className="dvc-mono">{device.hostname}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hardware Grid Section */}
                  <div className="dvc-section">
                    <div className="dvc-section-title">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="6" y="6" width="12" height="12" rx="2" />
                        <line x1="9" y1="2" x2="9" y2="6" /><line x1="15" y1="2" x2="15" y2="6" />
                        <line x1="9" y1="18" x2="9" y2="22" /><line x1="15" y1="18" x2="15" y2="22" />
                        <line x1="2" y1="9" x2="6" y2="9" /><line x1="2" y1="15" x2="6" y2="15" />
                        <line x1="18" y1="9" x2="22" y2="9" /><line x1="18" y1="15" x2="22" y2="15" />
                      </svg>
                      Hardware
                    </div>

                    <div className="dvc-section-grid">
                      <div style={styles.detailItem}>
                        <label style={styles.detailLabel}>Serial Number</label>
                        <span style={styles.detailValue} className="dvc-mono">{device.serialNumber}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <label style={styles.detailLabel}>Adapter Type</label>
                        <span style={styles.detailValue}>{device.adapterType}</span>
                      </div>
                    </div>
                  </div>


                  {/* Static Status Displays */}
                  <div className="dvc-section">
                    <div className="dvc-section-title">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 12h4l3 8 4-16 3 8h4" />
                      </svg>
                      Status Display
                    </div>

                    <div className="dvc-status-row">
                      <div className="dvc-status-field">
                        <label style={styles.detailLabel}>Enabled Status</label>
                        <span style={{ ...styles.badge(device.enabledStatus), marginTop: '4px' }}>
                          ● {device.enabledStatus}
                        </span>
                      </div>

                      <div className="dvc-status-field">
                        <label style={styles.detailLabel}>Operational Status</label>
                        <span style={{ ...styles.badge(device.operationalStatus), marginTop: '4px' }}>
                          ● {device.operationalStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Operational Audit Timestamps */}
                  <div className="dvc-timestamp-bar">
                    <span className="dvc-timestamp-chip">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 16 14" />
                      </svg>
                      Last seen <strong>{device.lastSeen}</strong>
                    </span>

                    <span className="dvc-timestamp-sep" />
                    <span className="dvc-timestamp-chip">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 16 14" />
                      </svg>
                      Created <strong>{device.createdTimestamp}</strong>
                    </span>

                    <span className="dvc-timestamp-sep" />
                    <span className="dvc-timestamp-chip">
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
      </main>
    </div>
  );
};

export default UserDashboard;