import React from 'react';
import '../components/StudentStyles.css';
import { Target } from 'lucide-react';

const StudentPractice = () => {
    return (
        <div className="courses-page-student">
            <div className="library-header-actions">
                <h1 style={{margin: 0, fontSize: '1.75rem', color: '#0f172a', fontWeight: '700'}}>Practice Arena</h1>
            </div>
            <div className="loading-screen" style={{ flexDirection: 'column', gap: '1rem', minHeight: '60vh' }}>
                <Target size={48} color="#94a3b8" />
                <p className="placeholder-text text-lg">Hone your skills with practice materials mapped to your enrolled courses.</p>
            </div>
        </div>
    );
};

export default StudentPractice;
