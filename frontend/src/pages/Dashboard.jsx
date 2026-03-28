import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';

const Dashboard = () => {
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get('courses/dashboard/');
                setEnrollments(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard", error);
            }
        };
        fetchDashboard();
    }, []);

    return (
        <div className="dashboard-container">
            <h1>Student Dashboard</h1>
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Enrolled Courses</h3>
                    <p className="stat-value">{enrollments.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Completed</h3>
                    <p className="stat-value">{enrollments.filter(e => e.progress === 100).length}</p>
                </div>
            </div>

            <h2>My Courses</h2>
            <div className="courses-grid">
                {enrollments.map((enrollment) => (
                    <div key={enrollment.id} className="course-card">
                        {enrollment.course.thumbnail && (
                            <img src={enrollment.course.thumbnail} alt={enrollment.course.title} className="course-thumbnail" />
                        )}
                        <div className="course-info">
                            <h3>{enrollment.course.title}</h3>
                            <p className="instructor">Instructor: {enrollment.course.instructor_name}</p>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${enrollment.progress}%` }}
                                ></div>
                            </div>
                            <p className="progress-text">{enrollment.progress}% Complete</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
