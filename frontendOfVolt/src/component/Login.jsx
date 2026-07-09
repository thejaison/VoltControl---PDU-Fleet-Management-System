import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { styles } from "../styles/files/LoginStyles";

const Login = () => {
    const navigate = useNavigate();
    const[formData, setFormData] = useState({
        username: '',
        empId: '',
        password: '',
    });

    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: formData.username,
                empId: formData.empId,
                password: formData.password
            }),
        });

        if(response.ok) {
            const data = await response.json();

            localStorage.setItem("loggedInEmpId", formData.empId);

            if(data.role === "Admin") {
                navigate("/admin/dashboard", {
                    state: {
                        username: data.id.username,
                        joiningDate: data.joiningDate,
                        officeEmail: data.officeMail
                    }
                });
            } else {
                navigate("/user/dashboard", {
                    state: {
                        username: data.id.username,
                        joiningDate: data.joiningDate,
                        officeEmail: data.officeMail
                    }
                });
            }
        } else {
            const msg = await response.text();
            alert(msg);
        }
    } catch (error) {
        console.error("Login connection error instance:", error);
        alert("Backend server is not running!"); // change these in future
    }
  };

  return (
    <div style={styles.container}>
        <form onSubmit={handleLogin} style={styles.card}>
            <div style={styles.header}>
              <h1 style={styles.title}>Welcome Back</h1>
              <p style={styles.subtitle}>Securely sign in to continue to your dashboard and enjoy warm, refined productivity.</p>
            </div>
            <div style={styles.formGroup}>
                <label style={styles.label}>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
            </div>

            <div style={styles.formGroup}>
                <label style={styles.label}>Emp_Id</label>
                <input
                    type="text"
                    name="empId"
                    value={formData.empId}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
            </div>

            <div style={styles.formGroup}>
                <label style={styles.label}>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
            </div>

            <button type="submit" style={styles.button}>LOGIN</button>

            <div style={styles.noteText}>
                <span>Don't have an account? </span>
                <Link to="/signup" style={styles.link}>
                    Sign Up
                </Link>
            </div>
        </form>
    </div>
  );
};

export default Login;