import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styles } from "../../styles/Adminviewstyles";

const AdminDetailView = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { userData = {}, devices = [] } = location.state || {};
    const [searchUsername, setSearchUsername] = useState('');
    const [messageText, setMessageText] = useState('');

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

                    {devices.lenght === 0 ? (
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