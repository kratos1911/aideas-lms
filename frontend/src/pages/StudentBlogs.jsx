import React from 'react';
import '../components/StudentStyles.css';
import { BookOpenText } from 'lucide-react';

const StudentBlogs = () => {
    return (
        <div className="courses-page-student">
            <div className="library-header-actions">
                <h1 style={{margin: 0, fontSize: '1.75rem', color: '#0f172a', fontWeight: '700'}}>Learning Blogs</h1>
            </div>
            <div className="loading-screen" style={{ flexDirection: 'column', gap: '1rem', minHeight: '60vh' }}>
                <BookOpenText size={48} color="#94a3b8" />
                <p className="placeholder-text text-lg">Read the latest insights and course supplements from our instructors.</p>
            </div>
        </div>
    );
};

export default StudentBlogs;
