import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styles } from "../../styles/files/AdminDetailViewStyles";

const AdminDetailView = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { userData = {}, empId = '' } = location.state || {};
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [searchUsername, setSearchUsername] = useState('');
    const [messageText, setMessageText] = useState('');

    const [users, setUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(true);
    const [updatingKey, setUpdatingKey] = useState(null);

    useEffect(() => {

        if(!empId) return;

        fetch(`http://localhost:8080/api/devices/by-admin/${empId}`)
            .then(res => res.json())
            .then(data => {
                const mapped = data.map((d, i) => ({
                    ...d,
                    id: (i + 1).toString().padStart(2, '0'),
                    dbId: d.id
                }));
                setDevices(mapped);
            })
            .catch(err => console.error("Failed to fetch admin devices:", err))
            .finally(() => setLoading(false));
    }, [empId]);

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.profileSection}>
                    <div style={styles.avatarCircle}>
                        {userData.username ? userData.username.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <div>
                        <div style={styles.username}>{userData.username || 'Admin'}</div>
                        <div style={styles.empId}>{userData.officeEmail || 'N/A'}</div>
                    </div>
                </div>

                <div style={styles.notificationBar}>
                    Notifications and Status
                </div>

                <div style={styles.joiningInfo}>
                    <div>{userData.joiningDate ? new Date(userData.joiningDate).toLocaleDateString() : 'N/A'}</div>
                    <div>{userData.joiningDate ? new Date(userData.joiningDate).toLocaleDateString() : 'N/A'}</div>
                </div>
            </header>

            <button style={styles.backBtn} onClick={() => navigate(-1)}>
                ← Back to Dashboard
            </button>

            <div style={styles.mainGrid}>
                <div style={styles.devicesPanel}>
                    <div style={styles.devicesPanelTitle}>DEVICES ADDED</div>

                    {loading ? (
                        <div style={styles.noDevices}>Loading...</div>
                    ) : devices.length === 0 ? (
                        <div style={styles.noDevices}>No devices added yet.</div>
                    ) : (
                        devices.map(device => (
                            <div key={device.uuid} style={styles.deviceRow}>
                                <span style={styles.deviceRowId}>{device.id}</span>
                                <span style={styles.deviceRowName}>{device.deviceName}</span>
                                <span style={styles.deviceRowAsset}>{device.assetId}</span>
                                <span style={{
                                    ...styles.deviceRowStatus,
                                    color: device.operationalStatus === 'Online' ? '#22c55e'
                                        : device.operationalStatus === 'Warning' ? '#f97316'
                                        : device.operationalStatus === 'Offline' ? '#ef4444'
                                        : '#888'
                                    }}>
                                    ● {device.operationalStatus}
                                </span>
                            </div>
                        ))
                    )}
                </div>

                <div style={styles.messagePanel}>
                    <input
                        type="text"
                        placeholder="Search Username"
                        value={searchUsername}
                        onChange={(e) => setSearchUsername(e.target.value)}
                        style={styles.searchInput}
                    />

                    <div style={styles.chatBox}>
                        {/* Future: chat messages go here */}
                    </div>

                    {searchUsername && (
                        <input
                            type="text"
                            placeholder={`Send a message to ${searchUsername}`}
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            style={styles.messageInput}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDetailView;