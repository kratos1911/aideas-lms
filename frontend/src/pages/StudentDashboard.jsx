import React from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, FolderClock, Clock, Award, PlayCircle, Trophy, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../components/StudentStyles.css';

const StudentDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="student-dashboard">
            {/* Hero Section */}
            <div className="student-hero-banner">
                <div className="hero-text">
                    <h1>Welcome back, {user?.username || 'Student'}! 👋</h1>
                    <p>Ready to continue your learning journey today?</p>
                </div>
                <div style={{opacity: 0.9}}>
                    <Target size={48} color="rgba(255,255,255,0.8)" />
                </div>
            </div>

            {/* Metrics Row */}
            <div className="activity-metrics-row mb-8" style={{marginBottom: '2rem'}}>
                <div className="metric-box">
                    <div className="metric-icon-wrap" style={{background: '#e0e7ff', color: '#4f46e5'}}>
                        <FolderClock size={20} />
                    </div>
                    <div>
                        <p>Hours Learned</p>
                        <h3>14.5 Hrs</h3>
                    </div>
                </div>
                <div className="metric-box">
                    <div className="metric-icon-wrap" style={{background: '#fef3c7', color: '#d97706'}}>
                        <Trophy size={20} />
                    </div>
                    <div>
                        <p>Courses Completed</p>
                        <h3>2</h3>
                    </div>
                </div>
                <div className="metric-box">
                    <div className="metric-icon-wrap" style={{background: '#dcfce7', color: '#16a34a'}}>
                        <BookOpen size={20} />
                    </div>
                    <div>
                        <p>Active Courses</p>
                        <h3>3</h3>
                    </div>
                </div>
                <div className="metric-box">
                    <div className="metric-icon-wrap" style={{background: '#fce7f3', color: '#db2777'}}>
                        <Award size={20} />
                    </div>
                    <div>
                        <p>Certificates Earned</p>
                        <h3>1</h3>
                    </div>
                </div>
            </div>

            <div className="student-dashboard-grid">
                {/* Main Content (Left) */}
                <div className="dashboard-main-left">
                    <div className="section-header">
                        <h2>My Learning</h2>
                        <a href="/courses" className="view-all-link" onClick={(e) => { e.preventDefault(); navigate('/courses'); }}>View All</a>
                    </div>
                    
                    <div className="learning-scroll-row">
                        {/* Mock Active Course 1 */}
                        <div className="learning-card" onClick={() => navigate('/courses')} style={{cursor: 'pointer'}}>
                            <div className="learning-card-header">
                                <div className="l-card-thumb" style={{backgroundImage: 'linear-gradient(135deg, #f59e0b, #3b82f6)'}}></div>
                                <div>
                                    <h3 className="l-card-title">Python Backend</h3>
                                    <p className="l-card-org">AiDEAS Institute</p>
                                </div>
                            </div>
                            <div className="learning-progress-block">
                                <div className="progress-meta">
                                    <span>Progress</span>
                                    <span>45%</span>
                                </div>
                                <div className="progress-bar-bg">
                                    <div className="progress-bar-fill" style={{width: '45%'}}></div>
                                </div>
                            </div>
                        </div>

                        {/* Mock Active Course 2 */}
                        <div className="learning-card" onClick={() => navigate('/courses')} style={{cursor: 'pointer'}}>
                            <div className="learning-card-header">
                                <div className="l-card-thumb" style={{backgroundImage: 'linear-gradient(135deg, #0ea5e9, #0284c7)'}}></div>
                                <div>
                                    <h3 className="l-card-title">Java Backend</h3>
                                    <p className="l-card-org">AiDEAS Institute</p>
                                </div>
                            </div>
                            <div className="learning-progress-block">
                                <div className="progress-meta">
                                    <span>Progress</span>
                                    <span>10%</span>
                                </div>
                                <div className="progress-bar-bg">
                                    <div className="progress-bar-fill" style={{width: '10%'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Widgets (Right) */}
                <div className="dashboard-widgets-right">
                    <div className="student-widget-card">
                        <h3 className="widget-title">Upcoming Schedule</h3>
                        <div className="widget-list">
                            <div className="schedule-list-item">
                                <div className="sch-date-badge">
                                    <span>FEB</span>
                                    26
                                </div>
                                <div className="sch-item-info">
                                    <h4>Advanced Hooks in React</h4>
                                    <p>10:00 AM - 11:30 AM</p>
                                </div>
                            </div>
                            <div className="schedule-list-item">
                                <div className="sch-date-badge" style={{background: '#fef3c7', color: '#d97706'}}>
                                    <span>MAR</span>
                                    02
                                </div>
                                <div className="sch-item-info">
                                    <h4>Django ORM Masterclass</h4>
                                    <p>02:00 PM - 04:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
