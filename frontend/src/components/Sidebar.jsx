import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, LogOut, Library, ClipboardList, Target, BookOpenText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="modern-sidebar">
            <div className="sidebar-brand">
                <BookOpen size={28} color="#4f46e5" />
                <h2>AiDEAS</h2>
            </div>

            <nav className="nav-links">
                <NavLink to="/" className={({ isActive }) => `student-nav-item ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/courses" className={({ isActive }) => `student-nav-item ${isActive ? 'active' : ''}`}>
                    <Library size={18} />
                    <span>Courses</span>
                </NavLink>
                <NavLink to="/assessment" className={({ isActive }) => `student-nav-item ${isActive ? 'active' : ''}`}>
                    <ClipboardList size={18} />
                    <span>Assessment</span>
                </NavLink>
                <NavLink to="/practice" className={({ isActive }) => `student-nav-item ${isActive ? 'active' : ''}`}>
                    <Target size={18} />
                    <span>Practice</span>
                </NavLink>
                <NavLink to="/blogs" className={({ isActive }) => `student-nav-item ${isActive ? 'active' : ''}`}>
                    <BookOpenText size={18} />
                    <span>Blogs</span>
                </NavLink>
            </nav>

            <div className="sidebar-footer-modern">
                <div className="student-profile-badge">
                    <img 
                        src={`https://ui-avatars.com/api/?name=${user?.username || 'Student'}&background=e0e7ff&color=4f46e5`}
                        alt={user?.username || 'Student'}
                        className="student-avatar-img" 
                    />
                    <div className="student-info">
                        <h4>{user?.username || 'Student User'}</h4>
                        <p>{user?.role || 'Learner'}</p>
                    </div>
                </div>
                <button onClick={handleLogout} className="student-logout-btn">
                    <LogOut size={16} />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
