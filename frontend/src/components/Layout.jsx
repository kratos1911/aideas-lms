import React from 'react';
import Sidebar from './Sidebar';
import './StudentStyles.css';

const Layout = ({ children }) => {
    return (
        <div className="student-portal-body student-layout-wrapper">
            <Sidebar />
            <main className="student-main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
