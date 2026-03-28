import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Grid, List } from 'lucide-react';
import api from '../services/api';
import '../components/AdminStyles.css';

// Fallback gradients if no thumbnail is provided
const FALLBACK_GRADIENTS = [
    "linear-gradient(135deg, #f59e0b, #3b82f6)",
    "linear-gradient(135deg, #0ea5e9, #0284c7)",
    "linear-gradient(135deg, #d946ef, #8b5cf6)",
    "linear-gradient(135deg, #10b981, #14b8a6)",
    "linear-gradient(135deg, #0f172a, #334155)",
    "linear-gradient(135deg, #ec4899, #e11d48)"
];

const AdminCourses = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get('courses/admin/');
                setCourses(response.data);
            } catch (err) {
                console.error("Failed to fetch admin courses", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const handleCourseClick = (courseId) => {
        navigate(`/admin/courses/${courseId}`);
    };

    return (
        <div className="admin-courses-page">
            <div className="courses-header-actions">
                <h1 className="page-title">All Courses</h1>
                <button className="add-course-btn">
                    <Plus size={18} /> Add Course
                </button>
            </div>

            <div className="controls-row">
                <div className="search-input-wrapper">
                    <Search size={18} />
                    <input 
                        type="text" 
                        placeholder="search courses.." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="filter-view-controls">
                    <select className="filter-dropdown">
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                    </select>
                    
                    <div className="view-toggles">
                        <button 
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <Grid size={18} />
                        </button>
                        <button 
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="course-grid">
                {loading ? (
                    <div className="loading-screen" style={{gridColumn: '1 / -1', minHeight: '200px'}}>Loading courses...</div>
                ) : courses.length === 0 ? (
                    <div className="placeholder-text" style={{gridColumn: '1 / -1', minHeight: '200px'}}>
                        No courses found. Create one to get started.
                    </div>
                ) : (
                    courses.map((course, idx) => {
                        const bgGradient = FALLBACK_GRADIENTS[idx % FALLBACK_GRADIENTS.length];
                        const dateObj = new Date(course.created_at);
                        const formattedDate = !isNaN(dateObj) ? `${dateObj.toLocaleDateString()},${dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` : 'Unknown';

                        return (
                            <div 
                                key={course.id} 
                                className="course-card"
                                onClick={() => handleCourseClick(course.id)}
                            >
                                <div 
                                    className="course-thumbnail" 
                                    style={{ 
                                        backgroundImage: course.thumbnail ? `url(${course.thumbnail})` : bgGradient 
                                    }}
                                ></div>
                                <div className="course-body">
                                    <h3 className="course-title">{course.title}</h3>
                                    <p className="course-topic">{course.description ? course.description.substring(0, 50) + '...' : 'No description'}</p>
                                    <div className="course-footer">
                                        <span>Last Update by {course.instructor_name || 'Admin'}</span>
                                        <span>Date: {formattedDate}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default AdminCourses;
