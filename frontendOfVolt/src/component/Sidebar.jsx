import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styles } from "../styles/sidebarStyles";

import homeIcon from "../icons/home.png";
import deviceIcon from "../icons/device.png";
import scanIcon from "../icons/scan.png";
import userIcon from "../icons/user.png";
import reportIcon from "../icons/report.png";
import settingsIcon from "../icons/settings.png";
import monitorIcon from "../icons/monitor.png";

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: homeIcon },
  { key: "device", label: "Device Management", icon: deviceIcon },
  { key: "scan", label: "Scan Management", icon: scanIcon },
  { key: "user", label: "User Management", icon: userIcon },
  { key: "reports", label: "Reports", icon: reportIcon },
  { key: "settings", label: "Settings", icon: settingsIcon },
  { key: "monitoring", label: "System Monitoring", icon: monitorIcon },
];

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const role = location.state?.role;

    const [isOpen, setIsOpen] = useState(false);

    const handleNavClick = (key) => {
        setIsOpen(false);

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
        
            default:
                break;
        }
    };

    return (
        <>
            <div
                style={styles.hoverTrigger}
                onMouseEnter={() => setIsOpen(true)}
            />

            <div style={styles.overlay(isOpen)} onClick={() => setIsOpen(false)} />

            <aside
                style={styles.sidebar(isOpen)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <div style={styles.sidebarLogoRow}>
                <div style={styles.sidebarLogoBadge}>V</div>
                <span style={styles.sidebarLogoText}>VoltControl</span>
                </div>
        
                <ul style={styles.navList}>
                {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname.includes(item.key);
                    return (
                    <li key={item.key}>
                        <button
                        type="button"
                        style={styles.navItemButton(isActive)}
                        onClick={() => handleNavClick(item.key)}
                        >
                        <img
                            src={item.icon}
                            alt={item.label}
                            style={styles.navIcon(isActive)}
                        />
                        <span style={styles.navLabel(isActive)}>{item.label}</span>
                        </button>
                    </li>
                    );
                })}
                </ul>
        
                <div style={styles.sidebarFooter}>VoltControl v1.0</div>
            </aside>
        </>
    );
};

export default Sidebar;