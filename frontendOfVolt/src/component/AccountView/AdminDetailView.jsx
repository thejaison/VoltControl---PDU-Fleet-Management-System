import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styles } from "../../styles/files/AdminDetailViewStyles";
import apiRequest from "../../api/apiClient";

const colors = {
    primary: "#ff7043",
    primaryHover: "#f4511e",
    border: "rgba(24, 24, 22, 0.06)",
    textSecondary: "#70737b",
    green: "#22c55e",
    red: "#ef4444",
};

const AdminDetailView = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { userData: stateUserData = {}, empId: stateEmpId = '' } = location.state || {};
    const empId = stateEmpId || localStorage.getItem("loggedInEmpId") || '';

    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Custom profile states
    const [currentUsername, setCurrentUsername] = useState(stateUserData.username || 'Admin');
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [newUsername, setNewUsername] = useState(stateUserData.username || '');
    const [profileImage, setProfileImage] = useState(null);
    const [officeEmail, setOfficeEmail] = useState(stateUserData.officeEmail || '');
    const [joiningDate, setJoiningDate] = useState(stateUserData.joiningDate || '');
    const [userRole, setUserRole] = useState(stateUserData.role || 'User');

    // Search users states
    const [searchUsername, setSearchUsername] = useState('');
    const [usersList, setUsersList] = useState([]);
    const [usersLoading, setUsersLoading] = useState(true);

    // Notifications states
    const [notifications, setNotifications] = useState([]);
    const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);
    const [displayNotification, setDisplayNotification] = useState("");
    const [notificationTransition, setNotificationTransition] = useState({
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'all 0.3s ease-in-out'
    });
    const [showNotificationsList, setShowNotificationsList] = useState(false);

    const formatTimeAgo = (timestamp) => {
        if (!timestamp) return "";
        const now = new Date();
        const created = new Date(timestamp);
        const diffMs = now - created;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return "just now";
        if (diffMins === 1) return "1 minute ago";
        if (diffMins < 60) return `${diffMins} minutes ago`;

        const diffHours = Math.floor(diffMins / 60);
        if (diffHours === 1) return "1 hour ago";
        if (diffHours < 24) return `${diffHours} hours ago`;

        return created.toLocaleDateString();
    };

    const fetchOtherAdminNotifications = async (allUsers) => {
        try {
            const response = await apiRequest("/api/scan-jobs");
            if (response && response.ok) {
                const jobs = await response.json();
                const otherJobs = jobs.filter(job => job.createdByEmpId && job.createdByEmpId !== empId);

                if (otherJobs.length > 0) {
                    otherJobs.sort((a, b) => new Date(b.createdTimestamp) - new Date(a.createdTimestamp));
                    const latest10 = otherJobs.slice(0, 10);
                    const formatted = latest10.map(job => {
                        const creator = allUsers.find(u => u.empId === job.createdByEmpId);
                        const creatorName = creator ? creator.username : (job.createdByEmpId || "Admin");
                        const timeAgo = formatTimeAgo(job.createdTimestamp);
                        return {
                            id: job.uuid,
                            message: `Admin @${creatorName} has scanned ${timeAgo}`,
                            timestamp: job.createdTimestamp
                        };
                    });
                    setNotifications(formatted);
                } else {
                    setNotifications([]);
                }
            }
        } catch (error) {
            console.error("Error fetching other admin notifications:", error);
        }
    };

    const fetchUsers = () => {
        setUsersLoading(true);
        apiRequest("/api/users")
            .then(res => res && res.json())
            .then(data => {
                if (!data) return;
                setUsersList(data);
                fetchOtherAdminNotifications(data);
            })
            .catch(err => console.error("Failed to fetch users directory:", err))
            .finally(() => setUsersLoading(false));
    };

    useEffect(() => {
        if (!empId) return;

        // Fetch user details to get saved profile picture and username
        apiRequest(`/api/users/${empId}`)
            .then(res => res && res.json())
            .then(data => {
                if (!data) return;
                if (data.profileImage) {
                    setProfileImage(data.profileImage);
                    localStorage.setItem("loggedInProfileImage", data.profileImage);
                }
                if (data.username) {
                    setCurrentUsername(data.username);
                    setNewUsername(data.username);
                    localStorage.setItem("loggedInUsername", data.username);
                }
                if (data.officeEmail) {
                    setOfficeEmail(data.officeEmail);
                }
                if (data.joiningDate) {
                    setJoiningDate(data.joiningDate);
                }
                if (data.role) {
                    setUserRole(data.role);
                    localStorage.setItem("loggedInRole", data.role);
                }
            })
            .catch(err => console.error("Failed to fetch user details:", err));

        // Fetch user's own added devices
        apiRequest(`/api/devices/by-admin/${empId}`)
            .then(res => res && res.json())
            .then(data => {
                if (!data) return;
                const mapped = data.map((d, i) => ({
                    ...d,
                    id: (i + 1).toString().padStart(2, '0'),
                    dbId: d.id
                }));
                setDevices(mapped);
            })
            .catch(err => console.error("Failed to fetch admin devices:", err))
            .finally(() => setLoading(false));

        fetchUsers();
    }, [empId]);

    // Sliding notification transitions
    useEffect(() => {
        if (notifications.length === 0) {
            setDisplayNotification("No recent activity.");
            return;
        }
        setDisplayNotification(notifications[currentNotificationIndex]?.message || "");
    }, [notifications]);

    useEffect(() => {
        if (notifications.length <= 1) return;
        const slideInterval = setInterval(() => {
            // Slide up out
            setNotificationTransition(prev => ({
                ...prev,
                opacity: 0,
                transform: 'translateY(-15px)'
            }));

            setTimeout(() => {
                setCurrentNotificationIndex(prevIndex => {
                    const nextIndex = (prevIndex + 1) % notifications.length;
                    setDisplayNotification(notifications[nextIndex]?.message || "");

                    // Reset position to bottom
                    setNotificationTransition(prev => ({
                        ...prev,
                        transform: 'translateY(15px)'
                    }));

                    setTimeout(() => {
                        // Slide up in
                        setNotificationTransition(prev => ({
                            ...prev,
                            opacity: 1,
                            transform: 'translateY(0)'
                        }));
                    }, 50);

                    return nextIndex;
                });
            }, 300);
        }, 5000);

        return () => clearInterval(slideInterval);
    }, [notifications]);

    // Live refresh of notifications every 10 seconds
    useEffect(() => {
        if (!empId || usersList.length === 0) return;

        const interval = setInterval(() => {
            fetchOtherAdminNotifications(usersList);
        }, 10000);

        return () => clearInterval(interval);
    }, [empId, usersList]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleProfileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64Data = reader.result;
                setProfileImage(base64Data);

                try {
                    const response = await apiRequest(`/api/users/${empId}/update-profile-image`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ profileImage: base64Data })
                    });
                    if (response && response.ok) {
                        localStorage.setItem("loggedInProfileImage", base64Data);
                    } else {
                        console.error("Failed to upload profile image to server");
                    }
                } catch (err) {
                    console.error("Error uploading profile image:", err);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateUsername = async () => {
        if (!newUsername.trim()) return;

        try {
            const response = await apiRequest(`/api/users/${empId}/update-username`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: newUsername })
            });

            if (response && response.ok) {
                const data = await response.json();
                setCurrentUsername(data.username);
                localStorage.setItem("loggedInUsername", data.username);
                setIsEditingUsername(false);
                // Also refresh users list to update mappings
                fetchUsers();
            } else {
                const errText = await response.text();
                alert(errText || "Failed to update username");
            }
        } catch (error) {
            console.error("Error updating username:", error);
            alert("Network error: failed to update username.");
        }
    };

    const handleToggleStatus = async (userEmpId) => {
        try {
            const response = await apiRequest(`/api/users/${userEmpId}/toggle-status`, {
                method: "PUT"
            });

            if (response && response.ok) {
                // Update local list state
                setUsersList(prev => prev.map(u =>
                    u.empId === userEmpId ? { ...u, enabled: !u.enabled } : u
                ));
            } else {
                alert("Failed to toggle user status.");
            }
        } catch (error) {
            console.error("Error toggling user status:", error);
        }
    };

    // Filter directory list by query
    const filteredUsers = usersList.filter(u =>
        u.username.toLowerCase().includes(searchUsername.toLowerCase())
    );

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.profileSection}>
                    <div style={styles.avatarCircle}>
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" style={styles.profileImg} />
                        ) : (
                            currentUsername ? currentUsername.charAt(0).toUpperCase() : 'A'
                        )}
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {isEditingUsername ? (
                                <>
                                    <input
                                        type="text"
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                        style={styles.usernameInput}
                                    />
                                    <button
                                        onClick={handleUpdateUsername}
                                        style={styles.editActionBtn(true)}
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setNewUsername(currentUsername);
                                            setIsEditingUsername(false);
                                        }}
                                        style={styles.editActionBtn(false)}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div style={styles.username}>{currentUsername}</div>
                                    <button
                                        onClick={() => setIsEditingUsername(true)}
                                        style={styles.editIconBtn}
                                        title="Edit Username"
                                    >
                                        ✎
                                    </button>
                                </>
                            )}
                        </div>
                        <div style={styles.empId}>{officeEmail || 'N/A'}</div>
                        <div>
                            <input
                                type="file"
                                id="profile-upload"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleProfileUpload}
                            />
                            <button
                                onClick={() => document.getElementById("profile-upload").click()}
                                style={styles.uploadBtn}
                            >
                                Upload Photo
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    style={{ ...styles.notificationBar, position: 'relative', cursor: 'pointer' }}
                    onClick={() => setShowNotificationsList(!showNotificationsList)}
                >
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#ff7043', letterSpacing: '0.05em', marginBottom: '4px' }}>
                        Live Scan Activity (Click for History)
                    </div>
                    <div style={{
                        opacity: notificationTransition.opacity,
                        transform: notificationTransition.transform,
                        transition: notificationTransition.transition
                    }}>
                        {displayNotification}
                    </div>

                    {showNotificationsList && (
                        <div style={styles.notificationDropdown} onClick={(e) => e.stopPropagation()}>
                            <div style={styles.dropdownHeader}>
                                <span>Recent Activity History</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowNotificationsList(false);
                                    }}
                                    style={styles.closeDropdownBtn}
                                >
                                    ✕
                                </button>
                            </div>
                            <div style={styles.dropdownList}>
                                {notifications.length === 0 ? (
                                    <div style={styles.dropdownEmpty}>No scan jobs recorded.</div>
                                ) : (
                                    notifications.map((n, i) => (
                                        <div key={n.id} style={styles.dropdownItem(i === currentNotificationIndex)}>
                                            <div style={styles.dropdownItemDot} />
                                            <div style={styles.dropdownItemText}>{n.message}</div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                    <div style={styles.joiningInfo}>
                        <div>Joined: {joiningDate ? new Date(joiningDate).toLocaleDateString() : 'N/A'}</div>
                        <div style={{ fontSize: '12px', color: '#ff7043', fontWeight: 'bold' }}>Role: {userRole || 'User'}</div>
                    </div>
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        Logout
                    </button>
                </div>
            </header>

            <button style={styles.backBtn} onClick={() => navigate(-1)}>
                ← Back to Dashboard
            </button>

            <div style={styles.mainGrid}>
                <div style={styles.devicesPanel}>
                    <div style={styles.devicesPanelTitle}>DEVICES ADDED ({devices.length})</div>

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
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#181816', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        User Directory Search
                    </div>
                    <div style={styles.searchRow}>
                        <input
                            type="text"
                            placeholder="Search Username..."
                            value={searchUsername}
                            onChange={(e) => setSearchUsername(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>

                    <div style={styles.searchResultsList}>
                        {usersLoading ? (
                            <div style={{ textAlign: 'center', padding: '20px 0', color: colors.textSecondary }}>
                                Loading user directory...
                            </div>
                        ) : filteredUsers.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '20px 0', color: colors.textSecondary }}>
                                No matching users found.
                            </div>
                        ) : (
                            filteredUsers.map(user => (
                                <div key={user.empId} style={styles.searchResultItem}>
                                    <div style={styles.resultUserMeta}>
                                        <div style={styles.resultUsername}>@{user.username}</div>
                                        <div style={styles.resultSub}>Emp ID: {user.empId} | Role: {user.role}</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={user.enabled ? styles.badgeEnabled : styles.badgeDisabled}>
                                            {user.enabled ? "Enabled" : "Disabled"}
                                        </span>
                                        {user.empId !== empId && (
                                            <button
                                                onClick={() => handleToggleStatus(user.empId)}
                                                style={styles.toggleBtn(user.enabled)}
                                            >
                                                {user.enabled ? "Disable" : "Enable"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDetailView;