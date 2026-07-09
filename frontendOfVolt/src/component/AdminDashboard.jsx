import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styles } from "../styles/files/AdminDashboardStyles";

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

      fetchDevices();

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

  const [currentPage, setCurrentPage] =  useState(0);
  const [pageSize,setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [pendingChanges, setPendingChanges] = useState({});

  const [passwordModalDevice, setPasswordModalDevice] = useState(null);
  const [passwordModalValue, setPasswordModalValue] = useState('');
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [currentPasswordVerified, setCurrentPasswordVerified] = useState(false);

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
    password: '',
  })

  const handleStatusChange = (deviceId, field, value) => {
    const targetIds = selectedDevices.includes(deviceId) ? selectedDevices : [deviceId];

    setDevices(prev => prev.map(device =>
      targetIds.includes(device.id) ? { ...device, [field]: value } : device
    ));

    setPendingChanges(prev => {
      const updated = { ...prev };
      targetIds.forEach(id => {
        updated[id] = { ...(updated[id] || {}), [field]: value };
      });

      return updated;
    });
  };

  const toggleSelectDevice = (id) => {
    setSelectedDevices(prev => 
      prev.includes(id) 
        ? prev.filter(deviceId => deviceId !== id)
        : [...prev, id]
    );
  };

  // To select everything
  const isAllSelected = devices.length > 0 && devices.every(device => selectedDevices.includes(device.id));

  const handleSelectAllToggle = () => {
    if(isAllSelected) {
      const currentIds = devices.map(d => d.id);
      setSelectedDevices(prev => prev.filter(id => !currentIds.includes(id)));
    } else {
      const currentIds = devices.map(d => d.id);
      setSelectedDevices(prev => {
        const distinctIds = new Set([...prev, ...currentIds]);
        return Array.from(distinctIds);
      });
    }
  };

  const toggleDevice = (id) => {
    setExpandedDevice(expandedDevice === id ? null : id);
    if(expandedDevice !== id) {
      setEditingDevice(null);
    }
  }

  const handleBulkStatusChange = (field, value) => {
    setDevices(prev => prev.map(device =>
      selectedDevices.includes(device.id) ? { ...device, [field]: value } : device
    ));

    setPendingChanges(prev => {
      const updated = { ...prev };
      selectedDevices.forEach(id => {
        updated[id] = { ...(updated[id] || {}), [field]: value };
      });

      return updated;
    })
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

  const handleOpenPasswordModal = (device) => {
    setPasswordModalDevice(device);
    setPasswordModalValue('');
    setCurrentPasswordInput('');
    setPasswordMismatchError(false);
    setCurrentPasswordVerified(!device.hasPassword);
  };

  const handleClosePasswordModal = () => {
    setPasswordModalDevice(null);
    setPasswordModalValue('');
    setCurrentPasswordInput('');
    setPasswordMismatchError(false);
    setCurrentPasswordVerified(false);
  };

  const generateModalPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    const array = new Uint32Array(14);
    window.crypto.getRandomValues(array);
    let pwd = '';

    for (let i = 0; i < 14; i++) {
      pwd += chars[array[i] % chars.length];
    }
    setPasswordModalValue(pwd);
  };

  const handleSavePassword = async () => {
    if (!passwordModalDevice || !currentPasswordVerified) return;

    await fetch(`http://localhost:8080/api/devices/${passwordModalDevice.dbId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...passwordModalDevice, password: passwordModalValue })
    });

    await fetchDevices();
    handleClosePasswordModal();
  }

  const handleVerifyCurrentPassword = async () => {
    const res = await fetch(`http://localhost:8080/api/devices/${passwordModalDevice.dbId}/verify-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: currentPasswordInput })
    });
    const { matches } = await res.json();

    if(matches) {
      setCurrentPasswordVerified(true);
      setPasswordMismatchError(false);
    } else {
      setPasswordMismatchError(true);
    }
  }

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
      password: '',
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
    await fetchDevices();
    setShowCreateModal(false);
  };

  const handleNewDeviceChange = (field, value) => {
    setNewDeviceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateDevicePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let pwd = '';
    const array = new Uint32Array(14);
    window.crypto.getRandomValues(array);

    for(let i = 0; i < 14; i++) {
      pwd += chars[array[i] % chars.length];
    }

    handleNewDeviceChange('password', pwd);
  }

  const handleDeleteSelected = async () => {
    if (selectedDevices.length === 0) return;

    if (!window.confirm(`Are you sure you want to delete ${selectedDevices.length} device(s)?`)) return;

    const toDelete = devices.filter(d => selectedDevices.includes(d.id));

    await Promise.all(
        toDelete.map(device =>
            fetch(`http://localhost:8080/api/devices/${device.dbId}`, { method: 'DELETE' })
        )
    );

    await fetchDevices();
    if (selectedDevices.includes(expandedDevice)) setExpandedDevice(null);
    setSelectedDevices([]);
  }

  const handleScan = () => {
    navigate('/job/scan');
  };

  const fetchDevices = async () => {
    const params = new URLSearchParams({
      page: currentPage,
      size: pageSize,
    });

    if(searchQuery) {
      params.append('search', searchQuery);
      params.append('searchField', searchField);
    }
    if (filterOperationalStatus !== 'None')
      params.append('operationalStatus', filterOperationalStatus);
    if (filterEnabledStatus !== 'None')
      params.append('enabledStatus', filterEnabledStatus);

    const res = await fetch(`http://localhost:8080/api/devices?${params.toString()}`);
    const data = await res.json();

    if (data.totalPages > 0 && currentPage >= data.totalPages) {
      setCurrentPage(data.totalPages - 1);
      return;
    }

    const mapped = data.content.map((d, i) => ({
      ...d,
      id: (currentPage * pageSize + i + 1).toString().padStart(2, '0'),
      dbId: d.id
    }));

    setDevices(mapped);
    setTotalPages(data.totalPages);
    setTotalItems(data.totalItems);
  };

  useEffect(() => {
    fetchDevices();
  }, [currentPage, pageSize, searchQuery, searchField, filterOperationalStatus, filterEnabledStatus]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(0);
  };

  const handleSaveChanges = async () => {
    const idsToSave = Object.keys(pendingChanges);
    if (idsToSave.length === 0) return;

    try {
      await Promise.all(
        idsToSave.map(id => {
          const device = devices.find(d => d.id === id);
          if (!device) return Promise.resolve();

          return fetch(`http://localhost:8080/api/devices/${device.dbId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(device)
          });
        })
      );
      setPendingChanges({});
      await fetchDevices();
    } catch (error) {
      console.error("Failed to save changes:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleDiscardChanges = async () => {
    setPendingChanges({});
    await fetchDevices();
  }

  const handleImport = () => {
    navigate('/admin/import');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInEmpId');
    navigate('/login');
  }

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


  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logoSection}>
          <div style={styles.logoBadge}>𝝯</div>
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
            <span style={styles.adminAvatar}>
              {userData.username ? userData.username.charAt(0).toUpperCase() : 'A'}
            </span>
            Hi {userData.username || 'Admin'}!
          </button>

          <button
            style={styles.logoutButtonStyle}
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
                {totalItems.toString().padStart(2, '0')}
              </span>
            </div>
          </div>

        </div>

        <div style={styles.controlsSection}>
          <div style={styles.actionButtons}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <input
                type="text"
                placeholder="Search devices..."
                style={styles.searchInput}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            <label style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
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
            <label style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
              <select
                value={selectedDevices.length > 0 ? '' : filterOperationalStatus}
                onChange={(e) => {
                  if(selectedDevices.length > 0) {
                    handleBulkStatusChange('operationalStatus', e.target.value);
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
            <label style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
              <select
                value={selectedDevices.length > 0 ? '' : filterEnabledStatus}
                onChange={(e) => {
                  if(selectedDevices.length > 0) {
                    handleBulkStatusChange('enabledStatus', e.target.value);
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
              style={styles.iconButton}
              onClick={handleCreateDevice}
              title="Create Device"
            >
              +
            </button>

            <button style={styles.primaryActionButton} onClick={handleScan}>
              Scan
            </button>

            <button style={styles.actionButton} onClick={handleImport}>
              Import
            </button>

            {selectedDevices.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                style={styles.deleteSelectedBtn}
              >
                🗑 Delete ({selectedDevices.length})
              </button>
            )}

            {Object.keys(pendingChanges).length > 0 && (
              <>
                <button style={styles.actionButton} onClick={handleSaveChanges}>
                  💾 Save Changes ({Object.keys(pendingChanges).length})
                </button>

                <button style={styles.cancelButton} onClick={handleDiscardChanges}>
                  Discard
                </button>
              </>
            )}
          </div>

        </div>

        <div style={styles.assetPanel}>
          <div style={styles.paginationBar}>
            <div style={styles.selectALLButton}>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAllToggle}
                style={{ ...styles.checkbox, cursor: 'pointer' }}
                title="Select all on this page"
              />
            </div>

            <div style={styles.paginationInfo}>
              Showing {devices.length === 0 ? 0 : currentPage * pageSize + 1}–
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
            {devices.length === 0 ? (
              <div style={styles.emptyState}>No devices found.</div>
            ) : devices.map((device, index) => (
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

                  <button
                    style={styles.actionButton}
                    onClick={(e) => { e.stopPropagation(); handleOpenPasswordModal(device); }}
                    title={device.password ? 'Edit Password' : 'Create Password'}
                  >
                    {device.hasPassword ? '🔑 Edit Password' : '🔑 Create Password'}
                  </button>

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
                          <input type="text" value={editedData.uuid || ''} onChange={(e) => handleEditChange('uuid', e.target.value)} style={{ ...styles.editInput, ...styles.mono }} />
                        ) : (
                          <span style={{ ...styles.detailValue, ...styles.mono }}>{device.uuid}</span>
                        )}
                      </div>
                    </div>
                  </div>

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
                        {editingDevice === device.id ? (
                          <input type="text" value={editedData.ipAddress || ''} onChange={(e) => handleEditChange('ipAddress', e.target.value)} style={{ ...styles.editInput, ...styles.mono }} />
                        ) : (
                          <span style={{ ...styles.detailValue, ...styles.mono }}>{device.ipAddress}</span>
                        )}
                      </div>
                      <div style={styles.detailItem}>
                        <label style={styles.detailLabel}>Hostname</label>
                        {editingDevice === device.id ? (
                          <input type="text" value={editedData.hostname || ''} onChange={(e) => handleEditChange('hostname', e.target.value)} style={{ ...styles.editInput, ...styles.mono }} />
                        ) : (
                          <span style={{ ...styles.detailValue, ...styles.mono }}>{device.hostname}</span>
                        )}
                      </div>
                    </div>
                  </div>

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
                        {editingDevice === device.id ? (
                          <input type="text" value={editedData.serialNumber || ''} onChange={(e) => handleEditChange('serialNumber', e.target.value)} style={{ ...styles.editInput, ...styles.mono }} />
                        ) : (
                          <span style={{ ...styles.detailValue, ...styles.mono }}>{device.serialNumber}</span>
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

                  <div style={styles.section}>
                    <div style={styles.sectionTitle}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 12h4l3 8 4-16 3 8h4" />
                      </svg>
                      Status Control
                    </div>
                    <div style={styles.statusRow}>
                      <div style={styles.statusField}>
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

                      <div style={styles.statusField}>
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

        {showCreateModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>Create New Device</h2>
                <button
                  style={styles.modalClose}
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
                    <label style={styles.modalLabel}>Password *</label>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input
                        type="text"
                        value={newDeviceData.password}
                        onChange={(e) => handleNewDeviceChange('password', e.target.value)}
                        style={{ ...styles.modalInput, flex: 1 }}
                        placeholder="Enter device password"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={generateDevicePassword}
                        style={styles.iconButton}
                        title="Generate password"
                      >
                        🎲
                      </button>
                    </div>
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

        {passwordModalDevice  && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>
                  {passwordModalDevice.hasPassword ? 'Edit Password' : 'Create Password'} — {passwordModalDevice.deviceName}
                </h2>
                <button style={styles.modalClose} onClick={handleClosePasswordModal}>
                  ✕
                </button>
              </div>

              <div style={styles.modalBody}>
                {passwordModalDevice.hasPassword && !currentPasswordVerified && (
                  <div style={styles.modalField}>
                    <label style={styles.modalLabel}>Current Password *</label>
                    <input
                      type="text"
                      value={currentPasswordInput}
                      onChange={(e) => { setCurrentPasswordInput(e.target.value); setPasswordMismatchError(false); }}
                      style={styles.modalInput}
                      placeholder="Enter current password to continue"
                      autoComplete="off"
                    />
                    {passwordMismatchError && (
                      <span style={{ color: 'red', fontSize: '12px' }}>Current password is incorrect.</span>
                    )}
                    <button
                      type="button"
                      style={{ ...styles.actionButton, marginTop: '8px' }}
                      onClick={handleVerifyCurrentPassword}
                    >
                      Verify
                    </button>
                  </div>
                )}

                {currentPasswordVerified && (
                  <div style={styles.modalField}>
                    <label style={styles.modalLabel}>{passwordModalDevice.hasPassword ? 'New Password *' : 'Password *'}</label>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input
                        type="text"
                        value={passwordModalValue}
                        onChange={(e) => setPasswordModalValue(e.target.value)}
                        style={{ ...styles.modalInput, flex: 1 }}
                        placeholder="Enter password"
                        autoComplete="new-password"
                      />
                      <button type="button" onClick={generateModalPassword} style={styles.iconButton} title="Generate password">
                        🎲
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div style={styles.modalFooter}>
                <button style={styles.modalCancel} onClick={handleClosePasswordModal}>Cancel</button>
                <button
                  style={styles.modalCreate}
                  onClick={handleSavePassword}
                  disabled={!currentPasswordVerified || !passwordModalValue.trim()}
                >
                  Save Password
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
