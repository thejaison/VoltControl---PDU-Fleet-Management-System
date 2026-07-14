// This is for the total view of the things for this PDU
// Total devices
// Online devices
// Offline devices
// Disabled devices
// Active scans
// Failed scans
// Recent scan activity
// Recent errors
// Status distribution chart


import React, { useState } from "react";
import { styles } from "../styles/Overalldashboardstyles";
import Sidebar from "./Sidebar";

const OverAllDashboard = () => {
    

    return (
        <div style={styles.appShell}>
            <Sidebar/>

            <main style={styles.mainContent}>
                <h1 style={styles.pageHeading}>Home</h1>
                <p style={styles.pageSubheading}>
                    This is for the total view of the things for this PDU
                    🔴 - Total devices
                    🔴 - Online devices
                    🔴 - Offline devices
                    🔴 - Disabled devices
                    🔴 - Active scans
                    🔴 - Failed scans
                    🔴 - Recent scan activity
                    🔴 - Recent errors
                    🔴 - Status distribution chart
                </p>
            </main>
        </div>
    );
};

export default OverAllDashboard;