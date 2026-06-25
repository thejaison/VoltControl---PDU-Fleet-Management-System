import React, { useState, useEffect } from "react";
import { styles } from "../styles/DashboardStyles";
import "../styles/DashboardStyles.css"
import { useNavigate, useLocation } from "react-router-dom";

const AdminDashboard = () => {

  const [userData, setUserData] = useState({
    username: '',
    joiningDate: '',
    officeEmail: ''
  })

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location.state?.importSuccess) {

      const count = location.state.importedCount || 0;
      const failed = location.state.failedCount || 0;

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

      alert(`Successfully imported ${count} devices!${failed > 0 ? ` (${failed} failed)` : ''}`);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

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
  }, []);

  const [devices, setDevices] = useState([]); // Changes here

  useEffect(() => {
    fetch('http://localhost:8080/api/devices')
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((d, i) => ({
          ...d,
        id: (i + 1).toString().padStart(2, '0'),
        dbId: d.id  // keep real DB id for update/delete
        }));
        setDevices(mapped);
      })
  }, []);


  const [expandedDevice, setExpandedDevice] = useState(null);
  const [selectedDevices, setSelectedDevices] = useState([]); // Initialize as an empty array to avoid errors
  const [editingDevice, setEditingDevice] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [sortBasis, setSortBasis] = useState('name');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterOperationalStatus, setFilterOperationalStatus] = useState('None');
  const [filterEnabledStatus, setFilterEnabledStatus] = useState('None');

  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('deviceName');

  // The filtering logic
  const filteredDevices = devices.filter(device => {
    const matchesOperational = filterOperationalStatus === 'None' || device.operationalStatus === filterOperationalStatus;
    const matchesEnabled = filterEnabledStatus === 'None' || device.enabledStatus === filterEnabledStatus;

    const matchesSearch = searchQuery === '' ||
      (device[searchField] || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesOperational && matchesEnabled && matchesSearch;
  })

  const [newDeviceData, setNewDeviceData] = useState({
    deviceName: '',
    assetId: '',
    site: '',
    location: '',
    ipAddress: '',
    hostname: '',
    model: '',
    serialNumber: '',
    adapterType: '',
    enabledStatus: 'Enabled',
    operationalStatus: 'Online',
  })

  const handleStatusChange = (deviceId, field, value) => {
    let updatedDevices = [...devices];

    if(selectedDevices.includes(deviceId)) {

      updatedDevices = updatedDevices.map(device => {
        if(selectedDevices.includes(device.id)) {
          return {
            ...device,
            [field]: value,
            updatedTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
          };
        }
        return device;
      });
    } else {
      updatedDevices = updatedDevices.map(device => {
        if(device.id === deviceId) {
          return {
            ...device,
            [field]: value,
            updatedTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
          };
        }
        return device;
      });
    }

    setDevices(updatedDevices);
  };

  const toggleSelectDevice = (id) => {
    setSelectedDevices(prev => 
      prev.includes(id) 
        ? prev.filter(deviceId => deviceId !== id)
        : [...prev, id]
    );
  };

  const toggleDevice = (id) => {
    setExpandedDevice(expandedDevice === id ? null : id);
    if(expandedDevice !== id) {
      setEditingDevice(null);
    }
  }

  const handleEditClick = (device) => {
    setEditingDevice(device.id);
    setEditedData({ ...device });
  }

  const handleEditChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  }

  const handleSaveEdit = async () => {
    const deviceToUpdate = devices.find(d => d.id === editingDevice);

    await fetch(`http://localhost:8080/api/devices/${deviceToUpdate.dbId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedData)
    });
    setDevices(prev => prev.map(d =>
      d.id === editingDevice
        ? { ...d, ...editedData, updatedTimestamp: new Date().toISOString() }
        : d
    ));
    setEditingDevice(null);
    setEditedData({});
  };

  const handleCancelEdit = () => {
    setEditingDevice(null);
    setEditedData({});
  }

  const handleCreateDevice = () => {
    setShowCreateModal(true);
    setNewDeviceData({
      deviceName: '',
      assetId: '',
      site: '',
      location: '',
      ipAddress: '',
      hostname: '',
      model: '',
      serialNumber: '',
      adapterType: '',
      enabledStatus: 'Enabled',
      operationalStatus: 'Online',
    });
  };

  const handleCreateDeviceSubmit = async () => {
    const newUuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16));

    const empId = localStorage.getItem('loggedInEmpId');

    const payload = {
      ...newDeviceData,
      uuid: newUuid,
      operationalDetails: 'New device created',
      lastSeen: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      createdByEmpId: empId,
    };
    const res = await fetch('http://localhost:8080/api/devices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const saved = await res.json();
    setDevices(prev => [...prev, {
      ...saved,
      id: (prev.length + 1).toString().padStart(2, '0'),
      dbId: saved.id
    }]);
    setShowCreateModal(false);
  };

  const handleNewDeviceChange = (field, value) => {
    setNewDeviceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeleteSelected = async () => {
    if (selectedDevices.length === 0) return;

    if (!window.confirm(`Are you sure you want to delete ${selectedDevices.length} device(s)?`)) return;

    const toDelete = devices.filter(d => selectedDevices.includes(d.id));

    await Promise.all(
        toDelete.map(device =>
            fetch(`http://localhost:8080/api/devices/${device.dbId}`, { method: 'DELETE' })
        )
    );

    setDevices(prev => prev.filter(d => !selectedDevices.includes(d.id)));
    if (selectedDevices.includes(expandedDevice)) setExpandedDevice(null);
    setSelectedDevices([]);
  }

  const handleScan = () => {
    alert('Scan functionality will be implemented in the backend.');
  };

  const handleImport = () => {
    navigate('/admin/import');
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
            onClick={() => navigate('/admin/detail', {
              state: {
                userData,
                empId: localStorage.getItem('loggedInEmpId')
              }
            })}
          >
            <span className="dvc-admin-avatar">
              {userData.username ? userData.username.charAt(0).toUpperCase() : 'A'}
            </span>
            Hi {userData.username || 'Admin'}!
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
            <div className="dvc-search-wrap" style={{display: 'flex', alignItems: 'center'}}>
              <input
                type="text"
                placeholder="Search devices..."
                className="dvc-search-input"
                style={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            
            
            <label className="dvc-sort-select" style={{display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '10px'}}>
              <select
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                style={{ ...styles.selectDropdown, ...styles.statusSelectBorder(editedData.operationalStatus || 'Fine') }}
              >
                <option value="deviceName">Device Name</option>
                <option value="ipAddress">IP Address</option>
                <option value="hostname">Hostname</option>
                <option value="assetId">Asset ID</option>
                <option value="serialNumber">Serial No</option>
              </select>
            </label>

            {/* for the filtering stuff */}
            <label className="dvc-sort-select" style={{display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '10px'}}>
              <select
                value={selectedDevices.length > 0 ? '' : filterOperationalStatus}
                onChange={(e) => {
                  if(selectedDevices.length > 0) {
                    setDevices(prev => prev.map(device =>
                      selectedDevices.includes(device.id)
                        ? { ...device, operationalStatus: e.target.value, updatedTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC' }
                        : device
                    ));
                    setFilterOperationalStatus('None');
                  } else {
                    setFilterOperationalStatus(e.target.value);
                  }
                }}
                style={{ ...styles.selectDropdown, ...styles.statusSelectBorder(editedData.operationalStatus || 'Fine') }}
              >
                {selectedDevices.length > 0 ? (
                  <>
                    <option value="" disabled>Change Status</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Warning">Warning</option>
                    <option value="Unknown">Unknown</option>
                  </>
                ) : (
                  <>
                    <option value="None">None</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Warning">Warning</option>
                    <option value="Unknown">Unknown</option>
                  </>
                )}
              </select>
            </label>

            {/* Filter for the Enable status */}
            <label className="dvc-sort-select" style={{display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '10px'}}>
              <select
                value={selectedDevices.length > 0 ? '' : filterEnabledStatus}
                onChange={(e) => {
                  if(selectedDevices.length > 0) {
                    setDevices(prev => prev.map(device =>
                      selectedDevices.includes(device.id)
                        ? { ...device, enabledStatus: e.target.value, updatedTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC' }
                        : device
                    ));
                    setFilterEnabledStatus('None');
                  } else {
                    setFilterEnabledStatus(e.target.value);
                  }
                }}
                style={{ ...styles.selectDropdown, ...styles.statusSelectBorder(editedData.operationalStatus || 'Fine') }}
              >
                {selectedDevices.length > 0 ? (
                  <>
                    <option value="" disabled>Change Status</option>
                    <option value="Enabled">Enabled</option>
                    <option value="Disabled">Disabled</option>
                  </>
                ):(
                  <>
                    <option value="None">None</option>
                    <option value="Enabled">Enabled</option>
                    <option value="Disabled">Disabled</option>
                  </>
                )}
              </select>
            </label>

            
            <button
              className="dvc-icon-btn"
              style={{...styles.iconButton, marginLeft: '5px'}}
              onClick={handleCreateDevice}
              title="Create Device"
            >
              +
            </button>

            <button className="dvc-scan-btn" style={{...styles.actionButton, marginLeft: '5px'}} onClick={handleScan}>
              Scan
            </button>

            <button className="dvc-action-btn" style={{...styles.actionButton, marginLeft: '5px'}} onClick={handleImport}>
              Import
            </button>

            {selectedDevices.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                style={styles.deleteSelectedBtn}
                className="dvc-delete-btn"
              >
                🗑 Delete ({selectedDevices.length})
              </button>
            )}
          </div>
        </div>

        <div style={styles.deviceList}>
          {filteredDevices.map((device, index) => (
            <div key={device.uuid} style={styles.deviceCard}>
              <div style={styles.deviceHeader}>
                <div style={styles.deviceHeaderLeft}>
                  <input 
                    type="checkbox"
                    checked={selectedDevices.includes(device.id)}
                    onChange={() => toggleSelectDevice(device.id)}
                    style={styles.checkbox}
                  />
                  <span style={styles.deviceNumber}>{device.id}</span>
                  <span style={styles.deviceName}>{device.deviceName}</span>
                  <span style={styles.assetIdBadge}>{device.assetId}</span>
                </div>

                <div style={styles.deviceHeaderRight}>
                  <span style={styles.badge(device.operationalStatus)}>
                    ● {device.operationalStatus}
                  </span>

                  {/* We will show the disable enable status */}
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
                    <div style={styles.detailsActions}>
                      {editingDevice === device.id ? (
                        <>
                          <button style={styles.saveButton} onClick={handleSaveEdit}>
                            💾 Save
                          </button>
                          <button style={styles.cancelButton} onClick={handleCancelEdit}>
                            ✕ Cancel
                          </button>
                        </>
                      ) : (
                        <button style={styles.editButton} onClick={() => handleEditClick(device)}>
                          ✎ Edit
                        </button>
                      )}
                    </div>
                  </div>

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
                        {editingDevice === device.id ? (
                          <input type="text" value={editedData.deviceName || ''} onChange={(e) => handleEditChange('deviceName', e.target.value)} style={styles.editInput} />
                        ):(
                          <span style={styles.detailValue}>{device.deviceName}</span>
                        )}
                      </div>

                      <div style={styles.detailItem}>
                        <label style={styles.detailLabel}>Asset ID</label>
                        {editingDevice === device.id ? (
                          <input type="text" value={editedData.assetId || ''} onChange={(e) => handleEditChange('assetId', e.target.value)} style={styles.editInput} />
                        ) : (
                          <span style={styles.detailValue}>{device.assetId}</span>
                        )}
                      </div>

                      <div style={styles.detailItem}>
                        <label style={styles.detailLabel}>Model</label>
                        {editingDevice === device.id ? (
                          <input type="text" value={editedData.model || ''} onChange={(e) => handleEditChange('model', e.target.value)} style={styles.editInput} />
                        ) : (
                          <span style={styles.detailValue}>{device.model}</span>
                        )}
                      </div>

                      <div style={styles.detailItem}>
                        <label style={styles.detailLabel}>UUID</label>
                        {editingDevice === device.id ? (
                          <input type="text" value={editedData.uuid || ''} onChange={(e) => handleEditChange('uuid', e.target.value)} style={styles.editInput} className="dvc-mono" />
                        ) : (
                          <span style={styles.detailValue} className="dvc-mono">{device.uuid}</span>
                        )}
                      </div>
                    </div>
                  </div>

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
                        {editingDevice === device.id ? (
                          <input type="text" value={editedData.site || ''} onChange={(e) => handleEditChange('site', e.target.value)} style={styles.editInput} />
                        ) : (
                          <span style={styles.detailValue}>{device.site}</span>
                        )}
                      </div>
                      <div style={styles.detailItem}>
                        <label style={styles.detailLabel}>Location</label>
                        {editingDevice === device.id ? (
                          <input type="text" value={editedData.location || ''} onChange={(e) => handleEditChange('location', e.target.value)} style={styles.editInput} />
                        ) : (
                          <span style={styles.detailValue}>{device.location}</span>
                        )}
                      </div>
                    </div>
                  </div>

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
                        {editingDevice === device.id ? (
                          <input type="text" value={editedData.ipAddress || ''} onChange={(e) => handleEditChange('ipAddress', e.target.value)} style={styles.editInput} className="dvc-mono" />
                        ) : (
                          <span style={styles.detailValue} className="dvc-mono">{device.ipAddress}</span>
                        )}
                      </div>
                      <div style={styles.detailItem}>
                        <label style={styles.detailLabel}>Hostname</label>
                        {editingDevice === device.id ? (
                          <input type="text" value={editedData.hostname || ''} onChange={(e) => handleEditChange('hostname', e.target.value)} style={styles.editInput} className="dvc-mono" />
                        ) : (
                          <span style={styles.detailValue} className="dvc-mono">{device.hostname}</span>
                        )}
                      </div>
                    </div>
                  </div>

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
                        {editingDevice === device.id ? (
                          <input type="text" value={editedData.serialNumber || ''} onChange={(e) => handleEditChange('serialNumber', e.target.value)} style={styles.editInput} className="dvc-mono" />
                        ) : (
                          <span style={styles.detailValue} className="dvc-mono">{device.serialNumber}</span>
                        )}
                      </div>
                      <div style={styles.detailItem}>
                        <label style={styles.detailLabel}>Adapter Type</label>
                        {editingDevice === device.id ? (
                          <input type="text" value={editedData.adapterType || ''} onChange={(e) => handleEditChange('adapterType', e.target.value)} style={styles.editInput} />
                        ) : (
                          <span style={styles.detailValue}>{device.adapterType}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="dvc-section">
                    <div className="dvc-section-title">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 12h4l3 8 4-16 3 8h4" />
                      </svg>
                      Status Control
                    </div>
                    <div className="dvc-status-row">
                      <div className="dvc-status-field">
                        <label style={styles.detailLabel}>Enabled Status</label>
                        {editingDevice === device.id ? (
                          <select
                            value={editedData.enabledStatus || 'Enabled'}
                            onChange={(e) => handleEditChange('enabledStatus', e.target.value)}
                            style={{ ...styles.selectDropdown, ...styles.enabledSelectBorder(editedData.enabledStatus || 'Enabled') }}
                          >
                            <option value="Enabled">Enabled</option>
                            <option value="Disabled">Disabled</option>
                          </select>
                        ) : (
                          <select
                            value={device.enabledStatus}
                            onChange={(e) => handleStatusChange(device.id, 'enabledStatus', e.target.value)}
                            style={{ ...styles.selectDropdown, ...styles.enabledSelectBorder(device.enabledStatus) }}
                          >
                            <option value="Enabled">Enabled</option>
                            <option value="Disabled">Disabled</option>
                          </select>
                        )}
                      </div>

                      <div className="dvc-status-field">
                        <label style={styles.detailLabel}>Operational Status</label>
                        {editingDevice === device.id ? (
                          <select
                            value={editedData.operationalStatus || 'Fine'}
                            onChange={(e) => handleEditChange('operationalStatus', e.target.value)}
                            style={{ ...styles.selectDropdown, ...styles.statusSelectBorder(editedData.operationalStatus || 'Fine') }}
                          >
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                            <option value="Warning">Warning</option>
                            <option value="Unknown">Unknown</option>
                          </select>
                        ) : (
                          <select
                            value={device.operationalStatus}
                            onChange={(e) => handleStatusChange(device.id, 'operationalStatus', e.target.value)}
                            style={{ ...styles.selectDropdown, ...styles.statusSelectBorder(device.operationalStatus) }}
                          >
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                            <option value="Warning">Warning</option>
                            <option value="Unknown">Unknown</option>
                          </select>
                        )}
                      </div>
                    </div>
                  </div>

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

        {showCreateModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>Create New Device</h2>
                <button
                  style={styles.modalBody}
                  onClick={() => setShowCreateModal(false)}
                >
                  ✕
                </button>
              </div>

              <div style={styles.modalBody}>
                <div style={styles.modalGrid}>
                  <div style={styles.modalField}>
                    <label style={styles.modalLabel}>Device Name *</label>
                    <input
                      type="text"
                      value={newDeviceData.deviceName}
                      onChange={(e) => handleNewDeviceChange('deviceName', e.target.value)}
                      style={styles.modalInput}
                      placeholder="Enter device name"
                    />
                  </div>

                  <div style={styles.modalField}>
                    <label style={styles.modalLabel}>Asset ID *</label>
                    <input
                      type="text"
                      value={newDeviceData.assetId}
                      onChange={(e) => handleNewDeviceChange('assetId', e.target.value)}
                      style={styles.modalInput}
                      placeholder="Enter asset ID"
                    />
                  </div>

                  <div style={styles.modalField}>
                    <label style={styles.modalLabel}>Site *</label>
                    <input
                      type="text"
                      value={newDeviceData.site}
                      onChange={(e) => handleNewDeviceChange('site', e.target.value)}
                      style={styles.modalInput}
                      placeholder="Enter site"
                    />
                  </div>

                  <div style={styles.modalField}>
                    <label style={styles.modalLabel}>Location</label>
                    <input
                      type="text"
                      value={newDeviceData.location}
                      onChange={(e) => handleNewDeviceChange('location', e.target.value)}
                      style={styles.modalInput}
                      placeholder="Enter location"
                    />
                  </div>

                  <div style={styles.modalField}>
                    <label style={styles.modalLabel}>IP Address</label>
                    <input
                      type="text"
                      value={newDeviceData.ipAddress}
                      onChange={(e) => handleNewDeviceChange('ipAddress', e.target.value)}
                      style={styles.modalInput}
                      placeholder="Enter IP address"
                    />
                  </div>

                  <div style={styles.modalField}>
                    <label style={styles.modalLabel}>Hostname</label>
                    <input
                      type="text"
                      value={newDeviceData.hostname}
                      onChange={(e) => handleNewDeviceChange('hostname', e.target.value)}
                      style={styles.modalInput}
                      placeholder="Enter hostname"
                    />
                  </div>

                  <div style={styles.modalField}>
                    <label style={styles.modalLabel}>Model</label>
                    <input
                      type="text"
                      value={newDeviceData.model}
                      onChange={(e) => handleNewDeviceChange('model', e.target.value)}
                      style={styles.modalInput}
                      placeholder="Enter model"
                    />
                  </div>

                  <div style={styles.modalField}>
                    <label style={styles.modalLabel}>Serial Number</label>
                    <input
                      type="text"
                      value={newDeviceData.serialNumber}
                      onChange={(e) => handleNewDeviceChange('serialNumber', e.target.value)}
                      style={styles.modalInput}
                      placeholder="Enter serial number"
                    />
                  </div>

                  <div style={styles.modalField}>
                    <label style={styles.modalLabel}>Adapter Type</label>
                    <input
                      type="text"
                      value={newDeviceData.adapterType}
                      onChange={(e) => handleNewDeviceChange('adapterType', e.target.value)}
                      style={styles.modalInput}
                      placeholder="Enter adapter type"
                    />
                  </div>

                  <div style={styles.modalField}>
                    <label style={styles.modalLabel}>Enabled Status</label>
                    <select
                      value={newDeviceData.enabledStatus}
                      onChange={(e) => handleNewDeviceChange('enabledStatus', e.target.value)}
                      style={styles.modalSelect}
                    >
                      <option value="Enabled">Enabled</option>
                      <option value="Disabled">Disabled</option>
                    </select>
                  </div>

                  <div style={styles.modalField}>
                    <label style={styles.modalLabel}>Operational Status</label>
                    <select
                      value={newDeviceData.operationalStatus}
                      onChange={(e) => handleNewDeviceChange('operationalStatus', e.target.value)}
                      style={styles.modalSelect}
                    >
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                      <option value="Warning">Warning</option>
                      <option value="Unknown">Unknown</option>
                      <option value="Disabled">Disabled</option>
                    </select>
                  </div>
                </div>
              </div>
              <div style={styles.modalFooter}>
                <button style={styles.modalCancel} onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button style={styles.modalCreate} onClick={handleCreateDeviceSubmit}>
                  Create Device
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;