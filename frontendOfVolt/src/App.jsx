import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from "./component/Signup";
import Login from "./component/Login";
import AdminDashboard from "./component/AdminDashboard";
import UserDashboard from "./component/UserDashboard";
import ImportingCsvData from "./component/Csvimports/ImportingCsvData";
import AdminDetailView from "./component/AccountView/AdminDetailView";
import ScanningDashboard from "./component/ScanJobTasks/ScanningDashboard";
import OverAllDashboard from "./component/OverAllDashboard";
import ManageUsers from "./component/UsersManage/ManageUsers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<OverAllDashboard/>}/>

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />

        <Route path="/admin/import" element={<ImportingCsvData />} />
        <Route path="/admin/detail" element={<AdminDetailView />} />

        <Route path="/job/scan" element={<ScanningDashboard/>}/>
        <Route path="/manage/users" element={<ManageUsers/>}/>

        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </Router>
  );
}

export default App;