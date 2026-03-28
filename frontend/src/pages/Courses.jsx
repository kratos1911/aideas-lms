import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { PlayCircle, Clock, Search, BookOpen } from 'lucide-react';
import '../components/StudentStyles.css';

// Fallback gradients
const FALLBACK_GRADIENTS = [
    "linear-gradient(135deg, #f59e0b, #3b82f6)",
    "linear-gradient(135deg, #0ea5e9, #0284c7)",
    "linear-gradient(135deg, #d946ef, #8b5cf6)",
    "linear-gradient(135deg, #10b981, #14b8a6)"
];

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get('courses/');
                setCourses(response.data);
            } catch (error) {
                console.error("Failed to fetch courses", error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="courses-page-student">
            <div className="library-header-actions">
                <h1 style={{margin: 0, fontSize: '1.75rem', color: '#0f172a', fontWeight: '700'}}>Course Library</h1>
                
                <div className="library-controls">
                    <div className="student-search">
                        <Search size={18} />
                        <input 
                            type="text" 
                            placeholder="Discover new courses..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="student-library-grid">
                {courses.length === 0 ? (
                    <div className="loading-screen" style={{gridColumn: '1 / -1', minHeight: '300px'}}>Loading courses...</div>
                ) : (
                    courses.map((course, idx) => {
                        const bgGradient = FALLBACK_GRADIENTS[idx % FALLBACK_GRADIENTS.length];
                        const isEnrolled = course.is_enrolled || false; // Mocking enrollment determination if API doesn't provide it
                        
                        return (
                            <Link to={`/course/${course.id}`} key={course.id} className="lib-card">
                                <div 
                                    className="lib-card-hero"
                                    style={{
                                        backgroundImage: course.thumbnail ? `url(${course.thumbnail})` : bgGradient
                                    }}
                                >
                                    <div className="lib-card-badge">
                                        {course.modules?.length || 0} Modules
                                    </div>
                                </div>
                                <div className="lib-card-body">
                                    <h3 className="lib-card-title">{course.title}</h3>
                                    <p className="lib-card-instructor">Instructor: {course.instructor_name || 'AiDEAS Team'}</p>
                                    
                                    <div className="lib-card-footer">
                                        <div className="lib-meta">
                                            <BookOpen size={14} color="#64748b"/>
                                            <span>AiDEAS Certificate</span>
                                        </div>
                                        {isEnrolled ? (
                                            <button className="lib-btn lib-btn-continue">Continue</button>
                                        ) : (
                                            <button className="lib-btn lib-btn-enroll">Overview</button>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Courses;
