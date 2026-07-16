import React, { useState, useEffect } from "react";
import { styles } from "../../styles/Usermanaging";
import Sidebar from "../Sidebar";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [togglingKey, setTogglingKey] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/api/auth/users?role=user");

            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleToggleStatus = async (user) => {
        const { username, empId } = user;
        const key = `${username}-${empId}`;
        setTogglingKey(key);

        try {
            const response = await fetch(
                `http://localhost:8080/api/auth/users/${username}/${empId}/status`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ enabled: !user.enabled }),
                }
            );

            if(response.ok) {
                const updated = await response.json();
                setUsers((prev) =>
                    prev.map((u) =>
                        u.username === username && u.empId === empId
                            ? { ...u, enabled: updated.enabled }
                            : u
                    )
                );
            } else {
                alert("Failed to update user status. Please try again.");
            }
        } catch (error) {
            console.error("Failed to toggle user status:", error);
            alert("Failed to update user status. Please try again.");
        } finally {
            setTogglingKey(null);
        }
    };

    const filteredUsers = users.filter((user) => {
        if(!searchQuery) return true;

        const q = searchQuery.toLowerCase();
        return (
            (user.username || "").toLowerCase().includes(q) ||
            (user.empId || "").toLowerCase().includes(q) ||
            (user.officeEmail || "").toLowerCase().includes(q) ||
            (user.phoneNumber || "").toLowerCase().includes(q)
        );
    });

    return (
        <div style={styles.page}>
            <Sidebar/>

            <div style={styles.titleSection}>
                <h1 style={styles.title}>User Management</h1>
                <p style={styles.subtitle}>View all users and control who can log in.</p>
            </div>

            <div style={styles.panel}>
                <div style={styles.toolbarRow}>
                    <input
                        type="text"
                        placeholder="Search by name, emp ID, email, or phone..."
                        style={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span style={styles.countBadge}>
                        {filteredUsers.length} {filteredUsers.length === 1 ? "user" : "users"}
                    </span>
                </div>

                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeadRow}>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Emp ID</th>
                        <th style={styles.th}>Phone Number</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={`${user.username}-${user.empId}`}>
                                <td style={styles.td}>
                                    <span style={styles.userNameCell}>
                                        <span style={styles.avatarCircle}>
                                            {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                                        </span>
                                        {user.username}
                                    </span>
                                </td>

                                <td style={{ ...styles.td, ...styles.mutedCell }}>{user.empId}</td>
                                <td style={{ ...styles.td, ...styles.mutedCell }}>{user.phoneNumber || "—"}</td>
                                <td style={{ ...styles.td, ...styles.mutedCell }}>{user.officeEmail || "—"}</td>

                                <td style={styles.td}>
                                    <span style={styles.statusPill(user.enabled)}>
                                        <span style={styles.statusDot(user.enabled)} />
                                        {user.enabled ? "Enabled" : "Disabled"}
                                    </span>
                                </td>

                                <td style={styles.td}>
                                    <div style={styles.actionsCell}>
                                        <button
                                            type="button"
                                            style={styles.toggleSwitch(user.enabled)}
                                            onClick={() => handleToggleStatus(user)}
                                            disabled={togglingKey === `${user.username}-${user.empId}`}
                                            title={user.enabled ? "Disable user" : "Enable user"}
                                        >
                                            <span style={styles.toggleKnob(user.enabled)} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {!loading && filteredUsers.length === 0 && (
                    <div style={styles.emptyState}>No users found.</div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;