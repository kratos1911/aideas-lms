import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { PlayCircle, FileText, ChevronDown, ChevronRight, CheckCircle } from 'lucide-react';

const CoursePlayer = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [expandedModules, setExpandedModules] = useState({});

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await api.get(`courses/${id}/`);
                setCourse(response.data);
                // Set first lesson as active by default
                if (response.data.modules.length > 0 && response.data.modules[0].lessons.length > 0) {
                    setActiveLesson(response.data.modules[0].lessons[0]);
                    setExpandedModules({ [response.data.modules[0].id]: true });
                }
            } catch (error) {
                console.error("Failed to fetch course details", error);
            }
        };
        fetchCourse();
    }, [id]);

    const toggleModule = (moduleId) => {
        setExpandedModules(prev => ({
            ...prev,
            [moduleId]: !prev[moduleId]
        }));
    };

    if (!course) return <div className="loading">Loading course...</div>;

    return (
        <div className="course-player">
            <div className="player-sidebar">
                <div className="player-sidebar-header">
                    <h3>Course Content</h3>
                </div>
                <div className="modules-list">
                    {course.modules.map(module => (
                        <div key={module.id} className="module-item">
                            <div
                                className="module-header"
                                onClick={() => toggleModule(module.id)}
                            >
                                {expandedModules[module.id] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                <span>{module.title}</span>
                            </div>
                            {expandedModules[module.id] && (
                                <div className="lessons-list">
                                    {module.lessons.map(lesson => (
                                        <div
                                            key={lesson.id}
                                            className={`lesson-item ${activeLesson?.id === lesson.id ? 'active' : ''}`}
                                            onClick={() => setActiveLesson(lesson)}
                                        >
                                            {lesson.lesson_type === 'video' ? <PlayCircle size={16} /> : <FileText size={16} />}
                                            <span>{lesson.title}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="player-content">
                {activeLesson ? (
                    <div className="content-wrapper">
                        <div className="lesson-header">
                            <h2>{activeLesson.title}</h2>
                        </div>

                        {activeLesson.lesson_type === 'video' && activeLesson.video_url ? (
                            <div className="video-container">
                                <iframe
                                    src={activeLesson.video_url.replace('watch?v=', 'embed/')}
                                    title={activeLesson.title}
                                    allowFullScreen
                                    frameBorder="0"
                                ></iframe>
                            </div>
                        ) : (
                            <div className="notes-container">
                                <div className="note-content">
                                    {activeLesson.content || "No content available for this lesson."}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="no-lesson-selected">
                        Select a lesson to start learning
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursePlayer;
