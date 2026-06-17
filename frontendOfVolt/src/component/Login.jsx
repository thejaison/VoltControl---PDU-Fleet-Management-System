import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { styles } from "../styles/SignupStyles";

const Login = () => {
    const navigate = useNavigate();
    const[formData, setFormData] = useState({
        username: '',
        empId: '',
    });

    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // form the db logic this data fetches from the postgresql and tells whether the login is user or admin
    navigate("/user-dashboard");
  };

  return (
    <div style={styles.container}>
        <form onSubmit={handleLogin} style={styles.card}>
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

            <button type="submit" style={styles.button}>LOGIN</button>

            <div style={{ textAlign: "center", marginTop: "15px", fontSize: "14px", fontFamily: "sans-serif" }}>
                <span>Don't have an account? </span>
                <Link to="/signup" style={{ color: "#000000", fontWeight: "bold", textDecoration: "none" }}>
                    Sign Up
                </Link>
            </div>
        </form>
    </div>
  );
};

export default Login;