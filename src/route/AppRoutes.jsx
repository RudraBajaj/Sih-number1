import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page Imports 
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

//Missing pages 
const AlumniDashboard = () => <div><h1>Alumni Dashboard Works! 🎓</h1></div>;
const StudentDashboard = () => <div><h1>Student Dashboard Works! 🎒</h1></div>;
const AdminDashboard = () => <div><h1>Admin Dashboard Works! ⚡</h1></div>;
const Events = () => <div><h1>Events Works! 📅</h1></div>;
const Donations = () => <div><h1>Donations Works! 💰</h1></div>;
const Feedback = () => <div><h1>Feedback Works! 💬</h1></div>;
const NotFound = () => <div><h1>404 - Page Not Found! 🚫</h1></div>;


const AppRoute = () => (
    <Router>
        <Routes>
            {/* public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Dashbaord  */}
            <Route path="/alumni" element={<AlumniDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Features  */}
            <Route path="/directory" element={<AlumniDashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/feedback" element={<Feedback />} />
            {/* 404 Fallback  */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
);

export default AppRoute;