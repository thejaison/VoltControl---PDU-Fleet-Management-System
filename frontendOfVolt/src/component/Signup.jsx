import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { styles } from '../styles/SignupStyles';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        empId: '',
        role: 'User',
        officeEmail: '',
        phoneNumber: '',
        joiningDate: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (formData.role === 'Admin') {
            navigate('/admin-dashboard');
        } else {
            navigate('/user-dashboard');
        }
    };

    return (
    <div style={styles.container}>
      <form onSubmit={handleSignup} style={styles.card}>
        <div style={styles.rowGroup}>
          <div style={styles.column}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Username:</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} style={styles.input} required />
            </div>
          </div>
          <div style={styles.column}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Emp_id:</label>
              <input type="text" name="empId" value={formData.empId} onChange={handleChange} style={styles.input} required />
            </div>
          </div>
        </div>

        <div style={styles.rowGroup}>
          <div style={styles.column}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Admin / User:</label>
              <select name="role" value={formData.role} onChange={handleChange} style={styles.select}>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
          <div style={styles.column}>
            <div style={styles.formGroup}>
              <label style={styles.label}>officemail:</label>
              <input type="email" name="officeEmail" value={formData.officeEmail} onChange={handleChange} style={styles.input} required />
            </div>
          </div>
        </div>

        <div style={styles.rowGroup}>
          <div style={styles.column}>
            <div style={styles.formGroup}>
              <label style={styles.label}>phonenumber:</label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} style={styles.input} required />
            </div>
          </div>
          <div style={styles.column}>
            <div style={styles.formGroup}>
              <label style={styles.label}>joiningDate:</label>
              <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} style={styles.input} required />
            </div>
          </div>
        </div>

        <button type="submit" style={styles.button}>SIGN UP</button>

        <div style={{ textAlign: "center", marginTop: "15px", fontSize: "14px", fontFamily: "sans-serif" }}>
          <span>Already have an account? </span>
          <Link to="/login" style={{ color: "#000000", fontWeight: "bold", textDecoration: "none" }}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;