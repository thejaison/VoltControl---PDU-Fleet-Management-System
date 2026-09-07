import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styles } from "../styles/files/AdminDashboardStyles";
import Sidebar from "./Sidebar";
import voltlogo from "../assets/voltlog1.png";
import apiRequest from "../api/apiClient";

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
        const response = await apiRequest(`/api/users/${empId}`);
        if(response && response.ok) {
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

  // Verification & Detail Popup States
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
      const res = await apiRequest(`/api/devices/${verifyPasswordDevice.dbId}/verify-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: verifyPasswordInput })
      });
      if (res && res.ok) {
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
      const res = await apiRequest(`/api/devices/${device.dbId}/verify-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: inputPassword })
      });
      if (res && res.ok) {
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

    await apiRequest(`/api/devices/${deviceToUpdate.dbId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedData)
    });
    setDevices(prev => prev.map(d =>
      d.id === editingDevice
        ? { ...d, ...editedData, updatedTimestamp: new Date().toISOString() }
        : d
    ));
    setActiveDetailsDevice(prev => prev ? { ...prev, ...editedData, updatedTimestamp: new Date().toISOString() } : null);
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

    await apiRequest(`/api/devices/${passwordModalDevice.dbId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...passwordModalDevice, password: passwordModalValue })
    });

    await fetchDevices();
    handleClosePasswordModal();
  }

  const handleVerifyCurrentPassword = async () => {
    const res = await apiRequest(`/api/devices/${passwordModalDevice.dbId}/verify-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: currentPasswordInput })
    });
    if (!res) return;
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
    const res = await apiRequest('/api/devices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res) return;
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
            apiRequest(`/api/devices/${device.dbId}`, { method: 'DELETE' })
        )
    );

    await fetchDevices();
    if (selectedDevices.includes(expandedDevice)) setExpandedDevice(null);
    setSelectedDevices([]);
  }

  const handleScan = async () => {
    const selectedUuids = devices
      .filter(d => selectedDevices.includes(d.id))
      .map(d => d.uuid);

    if (selectedUuids.length === 0) {
      alert("Please select at least one device to scan.");
      return;
    }

    const empId = localStorage.getItem('loggedInEmpId');

    try {
      const response = await apiRequest("/api/scan-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceUuids: selectedUuids,
          createdByEmpId: empId
        })
      });

      if (response && response.ok) {
        navigate('/job/scan', { state: { ...location.state, selectedUuids } });
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

    const res = await apiRequest(`/api/devices?${params.toString()}`);
    if (!res) return;
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

          return apiRequest(`/api/devices/${device.dbId}`, {
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
    <div style={styles.container} className="main-content-shift">
      <Sidebar/>
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
            <span style={{ ...styles.adminAvatar, overflow: 'hidden' }}>
              {userData.profileImage ? (
                <img src={userData.profileImage} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                userData.username ? userData.username.charAt(0).toUpperCase() : 'A'
              )}
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
              <>
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
                <button
                  onClick={handleDeleteSelected}
                  style={styles.deleteSelectedBtn}
                >
                  🗑 Delete ({selectedDevices.length})
                </button>
              </>
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
                <div style={{ display: 'flex', gap: '8px' }}>
                  {editingDevice === activeDetailsDevice.id ? (
                    <>
                      <button style={styles.saveButton} onClick={handleSaveEdit}>
                        💾 Save
                      </button>
                      <button style={styles.cancelButton} onClick={handleCancelEdit}>
                        ✕ Cancel
                      </button>
                    </>
                  ) : (
                    <button style={styles.editButton} onClick={() => handleEditClick(activeDetailsDevice)}>
                      ✎ Edit
                    </button>
                  )}
                  <button
                    style={styles.modalClose}
                    onClick={() => {
                      setActiveDetailsDevice(null);
                      setEditingDevice(null);
                      setEditedData({});
                    }}
                  >
                    ✕
                  </button>
                </div>
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
                      {editingDevice === activeDetailsDevice.id ? (
                        <input type="text" value={editedData.deviceName || ''} onChange={(e) => handleEditChange('deviceName', e.target.value)} style={styles.editInput} />
                      ):(
                        <span style={styles.detailValue}>{activeDetailsDevice.deviceName}</span>
                      )}
                    </div>

                    <div style={styles.detailItem}>
                      <label style={styles.detailLabel}>Asset ID</label>
                      {editingDevice === activeDetailsDevice.id ? (
                        <input type="text" value={editedData.assetId || ''} onChange={(e) => handleEditChange('assetId', e.target.value)} style={styles.editInput} />
                      ) : (
                        <span style={styles.detailValue}>{activeDetailsDevice.assetId}</span>
                      )}
                    </div>

                    <div style={styles.detailItem}>
                      <label style={styles.detailLabel}>Model</label>
                      {editingDevice === activeDetailsDevice.id ? (
                        <input type="text" value={editedData.model || ''} onChange={(e) => handleEditChange('model', e.target.value)} style={styles.editInput} />
                      ) : (
                        <span style={styles.detailValue}>{activeDetailsDevice.model}</span>
                      )}
                    </div>

                    <div style={styles.detailItem}>
                      <label style={styles.detailLabel}>UUID</label>
                      {editingDevice === activeDetailsDevice.id ? (
                        <input type="text" value={editedData.uuid || ''} onChange={(e) => handleEditChange('uuid', e.target.value)} style={{ ...styles.editInput, ...styles.mono }} />
                      ) : (
                        <span style={{ ...styles.detailValue, ...styles.mono }}>{activeDetailsDevice.uuid}</span>
                      )}
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
                      {editingDevice === activeDetailsDevice.id ? (
                        <input type="text" value={editedData.site || ''} onChange={(e) => handleEditChange('site', e.target.value)} style={styles.editInput} />
                      ) : (
                        <span style={styles.detailValue}>{activeDetailsDevice.site}</span>
                      )}
                    </div>
                    <div style={styles.detailItem}>
                      <label style={styles.detailLabel}>Location</label>
                      {editingDevice === activeDetailsDevice.id ? (
                        <input type="text" value={editedData.location || ''} onChange={(e) => handleEditChange('location', e.target.value)} style={styles.editInput} />
                      ) : (
                        <span style={styles.detailValue}>{activeDetailsDevice.location}</span>
                      )}
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
                      {editingDevice === activeDetailsDevice.id ? (
                        <input type="text" value={editedData.ipAddress || ''} onChange={(e) => handleEditChange('ipAddress', e.target.value)} style={{ ...styles.editInput, ...styles.mono }} />
                      ) : (
                        <span style={{ ...styles.detailValue, ...styles.mono }}>{activeDetailsDevice.ipAddress}</span>
                      )}
                    </div>
                    <div style={styles.detailItem}>
                      <label style={styles.detailLabel}>Hostname</label>
                      {editingDevice === activeDetailsDevice.id ? (
                        <input type="text" value={editedData.hostname || ''} onChange={(e) => handleEditChange('hostname', e.target.value)} style={{ ...styles.editInput, ...styles.mono }} />
                      ) : (
                        <span style={{ ...styles.detailValue, ...styles.mono }}>{activeDetailsDevice.hostname}</span>
                      )}
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
                      {editingDevice === activeDetailsDevice.id ? (
                        <input type="text" value={editedData.serialNumber || ''} onChange={(e) => handleEditChange('serialNumber', e.target.value)} style={{ ...styles.editInput, ...styles.mono }} />
                      ) : (
                        <span style={{ ...styles.detailValue, ...styles.mono }}>{activeDetailsDevice.serialNumber}</span>
                      )}
                    </div>
                    <div style={styles.detailItem}>
                      <label style={styles.detailLabel}>Adapter Type</label>
                      {editingDevice === activeDetailsDevice.id ? (
                        <input type="text" value={editedData.adapterType || ''} onChange={(e) => handleEditChange('adapterType', e.target.value)} style={styles.editInput} />
                      ) : (
                        <span style={styles.detailValue}>{activeDetailsDevice.adapterType}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Control Section */}
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
                      {editingDevice === activeDetailsDevice.id ? (
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
                          value={activeDetailsDevice.enabledStatus}
                          onChange={(e) => handleStatusChange(activeDetailsDevice.id, 'enabledStatus', e.target.value)}
                          style={{ ...styles.selectDropdown, ...styles.enabledSelectBorder(activeDetailsDevice.enabledStatus) }}
                        >
                          <option value="Enabled">Enabled</option>
                          <option value="Disabled">Disabled</option>
                        </select>
                      )}
                    </div>

                    <div style={styles.statusField}>
                      <label style={styles.detailLabel}>Operational Status</label>
                      {editingDevice === activeDetailsDevice.id ? (
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
                          value={activeDetailsDevice.operationalStatus}
                          onChange={(e) => handleStatusChange(activeDetailsDevice.id, 'operationalStatus', e.target.value)}
                          style={{ ...styles.selectDropdown, ...styles.statusSelectBorder(activeDetailsDevice.operationalStatus) }}
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
                  onClick={() => {
                    setActiveDetailsDevice(null);
                    setEditingDevice(null);
                    setEditedData({});
                  }}
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
                          className={`animate-card-pop ${bulkPasswordErrors[device.id] ? 'shake-effect' : ''}`}
                          style={{
                            ...styles.bulkCard,
                            animationDelay: `${idx * 0.05}s`
                          }}
                        >
                          {isLocked && (
                            <div style={styles.lockOverlay}>
                              <div style={styles.lockIcon}>🔒</div>
                              <h3 style={{ margin: 0, fontSize: '15px', color: '#ffffff' }}>Password Protected</h3>
                              <p style={{ margin: 0, fontSize: '12px', color: '#a1a1aa', textAlign: 'center' }}>
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
                            <span style={{ fontWeight: '700', color: '#22865d', fontSize: '12px' }}>{device.id}</span>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <span style={styles.badge(device.operationalStatus)}>● {device.operationalStatus}</span>
                              <span style={styles.badge(device.enabledStatus)}>● {device.enabledStatus}</span>
                            </div>
                          </div>

                          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#12241b', textAlign: 'left' }}>{device.deviceName}</h3>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e9e1', paddingBottom: '6px' }}>
                              <span style={{ color: '#697a70', fontWeight: '600' }}>Asset ID</span>
                              <span style={{ color: '#12241b', fontWeight: '700' }}>{device.assetId}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e9e1', paddingBottom: '6px' }}>
                              <span style={{ color: '#697a70', fontWeight: '600' }}>Model</span>
                              <span style={{ color: '#12241b' }}>{device.model}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e9e1', paddingBottom: '6px' }}>
                              <span style={{ color: '#697a70', fontWeight: '600' }}>IP Address</span>
                              <span style={{ color: '#12241b', fontFamily: 'monospace' }}>{device.ipAddress}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e9e1', paddingBottom: '6px' }}>
                              <span style={{ color: '#697a70', fontWeight: '600' }}>Hostname</span>
                              <span style={{ color: '#12241b', fontFamily: 'monospace' }}>{device.hostname}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e9e1', paddingBottom: '6px' }}>
                              <span style={{ color: '#697a70', fontWeight: '600' }}>Site</span>
                              <span style={{ color: '#12241b' }}>{device.site}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e9e1', paddingBottom: '6px' }}>
                              <span style={{ color: '#697a70', fontWeight: '600' }}>Location</span>
                              <span style={{ color: '#12241b' }}>{device.location}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e9e1', paddingBottom: '6px' }}>
                              <span style={{ color: '#697a70', fontWeight: '600' }}>Serial No</span>
                              <span style={{ color: '#12241b', fontFamily: 'monospace' }}>{device.serialNumber}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ color: '#697a70', fontWeight: '600' }}>Last Seen</span>
                              <span style={{ color: '#697a70', fontSize: '11px' }}>{device.lastSeen}</span>
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

export default AdminDashboard;
