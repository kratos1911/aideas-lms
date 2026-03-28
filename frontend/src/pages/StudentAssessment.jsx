import React from 'react';
import '../components/StudentStyles.css';
import { ClipboardList } from 'lucide-react';

const StudentAssessment = () => {
    return (
        <div className="courses-page-student">
            <div className="library-header-actions">
                <h1 style={{margin: 0, fontSize: '1.75rem', color: '#0f172a', fontWeight: '700'}}>Assessments</h1>
            </div>
            <div className="loading-screen" style={{ flexDirection: 'column', gap: '1rem', minHeight: '60vh' }}>
                <ClipboardList size={48} color="#94a3b8" />
                <p className="placeholder-text text-lg">Your upcoming and completed assessments will appear here.</p>
            </div>
        </div>
    );
};

export default StudentAssessment;
