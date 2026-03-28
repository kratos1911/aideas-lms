import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminStyles.css';

const AdminTopNav = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="admin-topnav">
            <div className="topnav-logo">
                <div className="logo-icon-wrapper">
                    <span className="logo-icon-nodes">🧠</span>
                </div>
                <span className="logo-text">
                    <span className="logo-text-bold">Ai</span>DEAS
                </span>
            </div>

            <nav className="topnav-links">
                <NavLink to="/admin/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Dashboard</NavLink>
                <NavLink to="/admin/courses" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Courses</NavLink>
                <NavLink to="/admin/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Users</NavLink>
                <NavLink to="/admin/instructors" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Instructors</NavLink>
                <NavLink to="/admin/enrollments" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Enrollments</NavLink>
                <NavLink to="/admin/assessments" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Assessments</NavLink>
            </nav>

            <div className="topnav-profile">
                <div className="profile-info">
                    <img 
                        src={`https://ui-avatars.com/api/?name=${user?.username || 'admin1911'}&background=random`}
                        alt={user?.username || 'admin1911'}
                        className="profile-avatar" 
                    />
                    <span className="profile-name">{user?.username || 'admin1911'}</span>
                    <button className="dropdown-arrow" onClick={handleLogout} title="Logout">▼</button>
                </div>
            </div>
        </header>
    );
};

const AdminLayout = ({ children }) => {
    return (
        <div className="app-layout admin-theme-new">
            <AdminTopNav />
            <main className="main-content-top-nav">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
