import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { styles } from '../styles/files/SignupStyles';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    empId: '',
    role: 'User',
    officeEmail: '',
    phoneNumber: '',
    joiningDate: '',
    password: '',
    confirmPassword: ''
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    setShowPasswordModal(true);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if(formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if(response.ok) {
        alert("Sign up successful! Please check dashboard routing.");
        setShowPasswordModal(false);

        localStorage.setItem("loggedInEmpId", formData.empId);

        navigate("/dashboard", {
          state: {
            username: data.id.username,
            role: data.role,
            joiningDate: data.joiningDate,
            officeEmail: data.officeMail
          }
        });

      } else {
        const errorMsg = await response.text();
        alert(errorMsg);
      }
    } catch (error) {
      console.error("Error during setup submission connection:", error);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSignup} style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Create Your Account</h1>
          <p style={styles.subtitle}>Join your team with an elegant onboarding flow designed for premium workflows.</p>
        </div>
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

        <div style={styles.noteText}>
          <span>Already have an account? </span>
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </div>
      </form>

      {showPasswordModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3 style={{...styles.title, fontSize: '24px', textAlign: 'center', marginBottom: '10px'}}>Set Your Password</h3>
 
            <form onSubmit={handleFinalSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Password:</label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  style={styles.input} 
                  required 
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Confirm Password:</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  style={styles.input} 
                  required 
                />
              </div>

              <div style={styles.modalButtonGroup}>
                <button
                  type="submit"
                  style={{ ...styles.button, ...styles.smallButtonPrimary }}
                >
                  CONFIRM & SIGN UP
                </button>

                <button 
                  type="button" 
                  onClick={() => setShowPasswordModal(false)} 
                  style={{ ...styles.button, ...styles.smallButtonCancel }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;