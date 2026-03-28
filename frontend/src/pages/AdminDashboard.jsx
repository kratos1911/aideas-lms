import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  BookOpen, Users, Video, GraduationCap, Clock, MonitorPlay, Book, Users2 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalStudents: 0,
        liveClasses: 0,
        totalTrainers: 0
    });

    // Currently no endpoints exist for these, so initializing as empty to reflect real database state
    const barData = [];
    const pieData = [];
    const liveSessions = [];
    const upcomingSchedule = [];

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('admin/stats/');
                setStats({
                    totalCourses: response.data.total_courses || 0,
                    totalStudents: response.data.total_students || 0,
                    liveClasses: 0, // No endpoint for live classes yet
                    totalTrainers: response.data.total_teachers || 0
                });
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            }
        };
        fetchStats();
    }, []);
    return (
        <div className="admin-dashboard-new">
            <div className="dashboard-metrics-row">
                <div className="metric-card outline-purple">
                    <div className="metric-icon" style={{color: '#8b5cf6'}}>
                        <GraduationCap size={24} />
                    </div>
                    <div className="metric-details">
                        <span className="metric-badge badge-purple">+12 this month</span>
                        <span className="metric-label">Total Courses</span>
                        <span className="metric-value">{stats.totalCourses}</span>
                    </div>
                </div>
                
                <div className="metric-card outline-orange">
                    <div className="metric-icon" style={{color: '#f59e0b'}}>
                        <BookOpen size={24} />
                    </div>
                    <div className="metric-details">
                        <span className="metric-badge badge-gray">+12 this month</span>
                        <span className="metric-label">Total Students</span>
                        <span className="metric-value">{stats.totalStudents}</span>
                    </div>
                </div>

                <div className="metric-card outline-blue">
                    <div className="metric-icon" style={{color: '#3b82f6'}}>
                        <MonitorPlay size={24} />
                    </div>
                    <div className="metric-details">
                        <span className="metric-badge badge-gray">Ongoing now</span>
                        <span className="metric-label">Live Classes</span>
                        <span className="metric-value">0{stats.liveClasses}</span>
                    </div>
                </div>

                <div className="metric-card outline-green">
                    <div className="metric-icon" style={{color: '#10b981'}}>
                        <Users size={24} />
                    </div>
                    <div className="metric-details">
                        <span className="metric-badge badge-gray">+5 this month</span>
                        <span className="metric-label">Total Trainers</span>
                        <span className="metric-value">0{stats.totalTrainers}</span>
                    </div>
                </div>
            </div>

            <div className="dashboard-grid-main">
                <div className="dashboard-card">
                    <div className="card-header">
                        <h3 className="card-title">Live Sessions</h3>
                        {liveSessions.length > 0 && <button className="card-action">View all</button>}
                    </div>
                    {liveSessions.length > 0 ? (
                        liveSessions.map((session, i) => (
                            <div key={i} className="live-session-block">
                                <div className="live-badge">Live</div>
                                <div className="live-video-icon">
                                    <Video size={32} />
                                </div>
                                <div className="live-info">
                                    <h4>{session.title}</h4>
                                    <p>{session.topic}<br/>By prof. {session.instructor}</p>
                                    <div className="live-meta">
                                        <span><Clock size={14} style={{display:'inline', marginBottom:'-2px'}}/> {session.time}</span>
                                        <span><Users2 size={14} style={{display:'inline', marginBottom:'-2px'}}/> {session.joined} joined</span>
                                    </div>
                                </div>
                                <button className="join-btn">
                                    <MonitorPlay size={16}/> Join
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="placeholder-text" style={{margin: '1rem 0'}}>No live sessions currently scheduled.</p>
                    )}
                </div>

                <div className="dashboard-card">
                    <div className="card-header">
                        <h3 className="card-title">Upcoming Schedule</h3>
                        {upcomingSchedule.length > 0 && <button className="card-action">View all</button>}
                    </div>
                    {upcomingSchedule.length > 0 ? (
                        <div className="schedule-list">
                            {upcomingSchedule.map((item, i) => (
                                <div key={i} className="schedule-item">
                                    <div className="schedule-icon"><Book size={20}/></div>
                                    <div className="schedule-text">
                                        <h4>{item.title}</h4>
                                        <p>{item.topic}</p>
                                    </div>
                                    <span className="schedule-time">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="placeholder-text">No upcoming schedules found.</p>
                    )}
                </div>
            </div>

            <div className="graphs-row">
                <div className="dashboard-card">
                    <div className="card-header">
                        <h3 className="card-title">Assessments Graph</h3>
                    </div>
                    <div style={{ width: '100%', height: 300 }}>
                        {barData.length > 0 ? (
                            <ResponsiveContainer>
                                <BarChart data={barData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                                    <Tooltip cursor={{fill: '#f8fafc'}} />
                                    <Legend iconType="square" align="center" verticalAlign="top" wrapperStyle={{paddingBottom: '20px'}}/>
                                    <Bar dataKey="NewBatch" name="New Batch" stackId="a" fill="#2563eb" barSize={20} radius={[0, 0, 4, 4]} />
                                    <Bar dataKey="OldBatch" name="Old Batch" stackId="a" fill="#e2e8f0" barSize={20} radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                                <p className="placeholder-text">Not enough tracking data available.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-header">
                        <h3 className="card-title">LSRW</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', height: '300px' }}>
                        {pieData.length > 0 ? (
                            <>
                                <div style={{ width: '50%', height: '100%' }}>
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                innerRadius={60}
                                                outerRadius={90}
                                                paddingAngle={5}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="custom-legend" style={{ width: '50%', paddingLeft: '10px' }}>
                                    {pieData.map((item, i) => (
                                        <div className="legend-item" key={i}>
                                            <div className="legend-color" style={{backgroundColor: item.color}}></div>
                                            <span>{item.name}</span>
                                            <span className="legend-percent">({item.value}%)</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div style={{width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                                <p className="placeholder-text">Awaiting diagnostic assessments.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
