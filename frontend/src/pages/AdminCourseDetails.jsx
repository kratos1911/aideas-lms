import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, LayoutGrid, Users, Settings, FolderOpen, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import api from '../services/api';
import '../components/AdminStyles.css';

const AdminCourseDetails = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [activeTab, setActiveTab] = useState('Modules');
    const [expandedModules, setExpandedModules] = useState({});
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await api.get(`courses/admin/${courseId}/`);
                setCourse(response.data);
                // Expand the first module by default if it exists
                if (response.data.modules && response.data.modules.length > 0) {
                    setExpandedModules({ [response.data.modules[0].id]: true });
                }
            } catch (err) {
                console.error("Failed to fetch course details", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [courseId]);

    const toggleModule = (moduleId) => {
        setExpandedModules(prev => ({
            ...prev,
            [moduleId]: !prev[moduleId]
        }));
    };

    if (loading) {
        return <div className="loading-screen">Loading course details...</div>;
    }

    if (!course) {
        return <div className="loading-screen" style={{color: '#ef4444'}}>Course not found.</div>;
    }

    return (
        <div className="course-details-layout">
            
            {/* Context Sidebar */}
            <div className="context-sidebar">
                <div className="back-btn-wrapper">
                    <button className="back-btn" onClick={() => navigate('/admin/courses')}>
                        <ArrowLeft size={16} /> Back
                    </button>
                </div>

                <ul className="context-menu-list">
                    <li className="context-menu-item">
                        <span><LayoutGrid size={16} style={{marginRight: '8px', marginBottom: '-2px', display:'inline-block'}}/> Course Details</span>
                    </li>
                    
                    <li className="context-menu-item active">
                        <span><Users size={16} style={{marginRight: '8px', marginBottom: '-2px', display:'inline-block'}}/> Users</span>
                        <ChevronDown size={16} />
                    </li>
                    <ul className="context-sublist">
                        <li className="context-subitem">Imports Users</li>
                        <li className="context-subitem" style={{color: '#2563eb'}}>Manage User</li>
                    </ul>

                    <li className="context-menu-item">
                        <span><FolderOpen size={16} style={{marginRight: '8px', marginBottom: '-2px', display:'inline-block'}}/> Others</span>
                        <ChevronDown size={16} />
                    </li>
                    <ul className="context-sublist">
                        <li className="context-subitem">File Upload</li>
                    </ul>
                </ul>
            </div>

            {/* Main Area */}
            <div className="course-main-content">
                <div className="course-main-header">
                    <h2>{course.title}/</h2>
                    <div className="breadcrumb">Admin/Courses/Modules</div>
                </div>

                <div className="tabs-row">
                    <div className="tabs-list">
                        {['Details', 'Modules', 'Enrolled By', 'Settings'].map(tab => (
                            <button 
                                key={tab}
                                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    {activeTab === 'Modules' && <button className="add-module-btn">Add New Module</button>}
                </div>

                {activeTab === 'Modules' && (
                    <div className="modules-list">
                        {course.modules && course.modules.length > 0 ? (
                            course.modules.map((module) => {
                                const isExpanded = !!expandedModules[module.id];
                                return (
                                    <div className="module-accordion" key={module.id}>
                                        <div 
                                            className="module-header" 
                                            onClick={() => toggleModule(module.id)}
                                        >
                                            <div>
                                                <h4>{module.title}</h4>
                                                <div className="module-header-date">Added to course</div>
                                            </div>
                                            {isExpanded ? <ChevronUp size={24} color="#64748b"/> : <ChevronDown size={24} color="#64748b"/>}
                                        </div>

                                        {isExpanded && (
                                            <div className="module-body">
                                                <div className="input-group">
                                                    <label className="input-label">Module Title</label>
                                                    <div className="module-title-row">
                                                        <input 
                                                            type="text" 
                                                            className="text-input" 
                                                            defaultValue={module.title}
                                                        />
                                                        <button className="delete-icon-btn">
                                                            <Trash2 size={24} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="topic-list">
                                                    {module.lessons && module.lessons.length > 0 ? (
                                                        module.lessons.map((lesson, idx) => (
                                                            <div className="topic-row" key={lesson.id}>
                                                                <div>
                                                                    <div className="topic-col-label">{idx + 1} # Topic</div>
                                                                    <input type="text" className="text-input" defaultValue={lesson.title} />
                                                                    <button className="add-attachment">+ Add Attachments</button>
                                                                </div>
                                                                <div>
                                                                    <div className="topic-col-label">Link</div>
                                                                    <input type="text" className="text-input" defaultValue={lesson.video_url || lesson.content || ''} />
                                                                </div>
                                                                <div>
                                                                    <div className="topic-col-label" style={{textAlign: 'center'}}>Delete</div>
                                                                    <div style={{textAlign: 'center', paddingTop: '0.5rem'}}>
                                                                        <Trash2 size={24} className="icon-yellow" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="placeholder-text">No topics added to this module yet.</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <p className="placeholder-text" style={{marginTop: '2rem'}}>No modules currently exist for this course.</p>
                        )}
                    </div>
                )}
                
                {activeTab !== 'Modules' && (
                    <div style={{marginTop: '2rem'}}>
                        <p className="placeholder-text">{activeTab} section coming soon.</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default AdminCourseDetails;
