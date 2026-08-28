import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styles } from "../styles/sidebarStyles";
import apiRequest from "../api/apiClient";
import voltlogo from "../assets/voltlog1.png";

import homeIcon from "../icons/home.png";
import deviceIcon from "../icons/device.png";
import scanIcon from "../icons/scan.png";
import userIcon from "../icons/user.png";
import reportIcon from "../icons/report.png";
import settingsIcon from "../icons/settings.png";
import monitorIcon from "../icons/monitor.png";

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: homeIcon, section: "Core Options" },
  { key: "device", label: "Device Management", icon: deviceIcon, section: "Core Options" },
  { key: "scan", label: "Scan Management", icon: scanIcon, section: "Core Options" },
  { key: "user", label: "User Management", icon: userIcon, adminOnly: true, section: "Core Options" },
  
  { key: "reports", label: "Reports", icon: reportIcon, section: "System & Tools" },
  { key: "monitoring", label: "System Monitoring", icon: monitorIcon, section: "System & Tools" },
  { key: "settings", label: "Settings", icon: settingsIcon, section: "System & Tools" },
];

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Retrieve role and userName from state or localStorage
    const role = location.state?.role || localStorage.getItem("loggedInRole") || "User";
    const userName = location.state?.username || localStorage.getItem("loggedInUsername") || "PDU Operator";

    const [profileImage, setProfileImage] = useState(localStorage.getItem("loggedInProfileImage") || null);
    const [displayName, setDisplayName] = useState(userName);
    const [displayRole, setDisplayRole] = useState(role);

    useEffect(() => {
        const empId = localStorage.getItem("loggedInEmpId");
        if (!empId) return;

        apiRequest(`/api/users/${empId}`)
            .then(res => {
                if (res && res.ok) return res.json();
                throw new Error("Failed to fetch");
            })
            .then(data => {
                if (!data) return;
                if (data.profileImage) {
                    setProfileImage(data.profileImage);
                    localStorage.setItem("loggedInProfileImage", data.profileImage);
                } else {
                    setProfileImage(null);
                    localStorage.removeItem("loggedInProfileImage");
                }
                if (data.username) {
                    setDisplayName(data.username);
                    localStorage.setItem("loggedInUsername", data.username);
                }
                if (data.role) {
                    setDisplayRole(data.role);
                    localStorage.setItem("loggedInRole", data.role);
                }
            })
            .catch(err => console.error("Error fetching sidebar user details:", err));
    }, []);

    // Collapsed state
    const [isCollapsed, setIsCollapsed] = useState(
        localStorage.getItem("sidebarCollapsed") === "true"
    );

    // Upgrade card visibility state
    const [showUpgrade, setShowUpgrade] = useState(
        localStorage.getItem("hideUpgradeCard") !== "true"
    );

    // Handle shift styling on body tag when state changes
    useEffect(() => {
        if (isCollapsed) {
            document.body.classList.add("sidebar-collapsed");
        } else {
            document.body.classList.remove("sidebar-collapsed");
        }
    }, [isCollapsed]);

    const toggleSidebar = () => {
        const nextState = !isCollapsed;
        setIsCollapsed(nextState);
        localStorage.setItem("sidebarCollapsed", String(nextState));
    };

    const handleDismissUpgrade = (e) => {
        e.stopPropagation();
        setShowUpgrade(false);
        localStorage.setItem("hideUpgradeCard", "true");
    };

    const handleNavClick = (key, locked) => {
        if (locked) {
            alert("Access Denied: User Management is locked for your account level.");
            return;
        }

        switch (key) {
            case "home":
                navigate("/dashboard", { state: location.state });
                break;
        
            case "device":
                if (role === "Admin") {
                    navigate("/admin/dashboard", { state: location.state });
                } else {
                    navigate("/user/dashboard", { state: location.state });
                }
                break;
        
            case "scan":
                navigate("/job/scan", { state: location.state });
                break;

            case "user":
                if (role === "Admin") {
                    navigate("/manage/users", { state: location.state });
                } else {
                    alert("Access denied. Admins only.");
                }
                break;

            case "monitoring":
                navigate("/monitoring", { state: location.state });
                break;
        
            case "reports":
                navigate("/reports", { state: location.state });
                break;

            default:
                break;
        }
    };

    // Group items by section
    const groupedItems = {};
    NAV_ITEMS.forEach(item => {
        if (!groupedItems[item.section]) {
            groupedItems[item.section] = [];
        }
        groupedItems[item.section].push(item);
    });

    return (
        <>
            {/* Floating Burger Menu Button when Collapsed */}
            {isCollapsed && (
                <button
                    type="button"
                    style={styles.floatingOpenBtn}
                    onClick={toggleSidebar}
                    title="Show Sidebar"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
            )}

            <aside style={styles.sidebar(isCollapsed)}>
                {/* Logo Brand Header */}
                <div style={styles.sidebarLogoRow}>
                    <div style={styles.sidebarLogoBadge}>
                        <img src={voltlogo} alt="VoltControl" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                    </div>
                    {!isCollapsed && <span style={styles.sidebarLogoText}>VoltControl</span>}
                    
                    {/* Sidebar Collapse Toggle Button */}
                    <button
                        type="button"
                        style={{
                            ...styles.collapseBtn,
                            position: "absolute",
                            right: isCollapsed ? "-14px" : "16px",
                            top: "28px",
                            zIndex: 1010,
                            borderRadius: "50%",
                            alignSelf: "auto",
                            margin: 0,
                        }}
                        onClick={toggleSidebar}
                        title={isCollapsed ? "Show Sidebar" : "Hide Sidebar"}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            {isCollapsed ? (
                                <polyline points="9 18 15 12 9 6" />
                            ) : (
                                <polyline points="15 18 9 12 15 6" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Profile Pill inside Sidebar (Jeremy Toe style from image 2) */}
                <div 
                    style={{
                        ...styles.sidebarProfile,
                        justifyContent: isCollapsed ? "center" : "flex-start",
                        padding: isCollapsed ? "10px 0" : "12px 14px",
                        margin: isCollapsed ? "0 0 16px" : "0 8px 24px"
                    }} 
                    onClick={() => navigate("/admin/detail")}
                    title={displayName}
                >
                    <div style={{ ...styles.sidebarProfileAvatar, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {profileImage ? (
                            <img src={profileImage} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            displayName.slice(0, 2).toUpperCase()
                        )}
                    </div>
                    {!isCollapsed && (
                        <div style={styles.sidebarProfileMeta}>
                            <span style={styles.sidebarProfileName}>{displayName}</span>
                            <span style={styles.sidebarProfileRole}>{displayRole === "Admin" ? "Administrator" : "PDU Operator"}</span>
                        </div>
                    )}
                </div>
        
                {/* Dynamic Navigation Sections */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1, overflowY: "auto", paddingRight: "4px", width: "100%", boxSizing: "border-box" }}>
                    {Object.keys(groupedItems).map((sectionName) => (
                        <div key={sectionName} style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
                            {!isCollapsed && <h4 style={styles.sectionHeader}>{sectionName}</h4>}
                            <ul style={styles.navList}>
                                {groupedItems[sectionName].map((item) => {
                                    const isActive = location.pathname.includes(item.key) || 
                                        (item.key === "home" && location.pathname === "/dashboard") ||
                                        (item.key === "device" && (location.pathname.startsWith("/admin/dashboard") || location.pathname.startsWith("/user/dashboard")));
                                    const isLocked = item.adminOnly && role !== "Admin";
                                    
                                    return (
                                        <li key={item.key}>
                                            <button
                                                type="button"
                                                className={`sidebar-nav-btn ${isActive ? "sidebar-nav-btn-active" : ""}`}
                                                style={styles.navItemButton(isActive, isLocked, isCollapsed)}
                                                onClick={() => handleNavClick(item.key, isLocked)}
                                                title={isLocked ? "Admins only" : (isCollapsed ? item.label : undefined)}
                                            >
                                                <img
                                                    src={item.icon}
                                                    alt={item.label}
                                                    style={styles.navIcon(isActive, isLocked)}
                                                />
                                                {!isCollapsed && (
                                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                        <span>{item.label}</span>
                                                        {isLocked && <span style={{ fontSize: '12px', marginLeft: 'auto', opacity: 0.75 }}>🔒</span>}
                                                    </span>
                                                )}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Upgrade Banner Card */}
                {showUpgrade && !isCollapsed && (
                    <div style={styles.upgradeCard}>
                        {/* Dismiss Upgrade button */}
                        <button
                            type="button"
                            style={styles.dismissUpgradeBtn}
                            onClick={handleDismissUpgrade}
                            title="Dismiss Card"
                        >
                            &times;
                        </button>

                        <svg
                            style={{
                                position: "absolute",
                                right: "-12px",
                                bottom: "8px",
                                opacity: 0.12,
                                zIndex: 1,
                                transform: "rotate(-15deg)",
                                color: "#ffffff"
                            }}
                            width="88"
                            height="88"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4.5 16.5c-1.5 1.26-2.5 3.19-2.5 5.5h20c0-2.31-1-4.24-2.5-5.5M12 2C7.57 2 4 5.57 4 10c0 4.13 2.1 7.79 5.25 9.5.37.2.75.5 1.15.5h3.2c.4 0 .78-.3 1.15-.5C17.9 17.79 20 14.13 20 10c0-4.43-3.57-8-8-8z" />
                            <line x1="12" y1="15" x2="12" y2="15" />
                            <line x1="12" y1="11" x2="12" y2="11" />
                        </svg>
                        <h3 style={styles.upgradeTitle}>Upgrade to Pro</h3>
                        <p style={styles.upgradeSubtitle}>Upgrade your account for a fuller experience.</p>
                        <button
                            type="button"
                            style={styles.upgradeButton}
                            onClick={() => alert("Upgrade feature coming soon!")}
                        >
                            Upgrade Now
                        </button>
                    </div>
                )}

                {/* Bottom Navigation Links: Support & Logout */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "14px", marginBottom: "8px" }}>
                    <button
                        type="button"
                        style={{ ...styles.navItemButton(false, false, isCollapsed), padding: isCollapsed ? "12px 0" : "12px 16px", justifyContent: isCollapsed ? "center" : "flex-start" }}
                        onClick={() => alert("Support channels: support@voltcontrol.com")}
                        className="sidebar-nav-btn"
                        title={isCollapsed ? "Support" : undefined}
                    >
                        <span style={{ fontSize: "16px", display: "flex", alignItems: "center" }}>💬</span>
                        {!isCollapsed && <span>Support</span>}
                    </button>
                    <button
                        type="button"
                        style={{ 
                            ...styles.navItemButton(false, false, isCollapsed), 
                            padding: isCollapsed ? "12px 0" : "12px 16px", 
                            justifyContent: isCollapsed ? "center" : "flex-start",
                            color: "#f87171" 
                        }}
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = "/login";
                        }}
                        className="sidebar-nav-btn"
                        title={isCollapsed ? "Log Out" : undefined}
                    >
                        <span style={{ fontSize: "16px", display: "flex", alignItems: "center", color: "#f87171" }}>🚪</span>
                        {!isCollapsed && <span>Log Out</span>}
                    </button>
                </div>
        
                <div style={styles.sidebarFooter}>{!isCollapsed && "VoltControl v1.0"}</div>
            </aside>
        </>
    );
};

export default Sidebar;