import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, Lock, ArrowRight, Loader2 } from 'lucide-react';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const userData = await login(username, password);
            if (userData.role === 'admin' || userData.is_staff || userData.username === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError('Invalid username or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-modern-container">
            <div className="login-modern-left">
                <div className="login-left-overlay"></div>
                <div className="login-left-content">
                    <div className="login-brand-logo">
                        <BookOpen size={48} className="text-white" />
                    </div>
                    <h1 className="login-heading">Elevate Your<br/>Learning Journey</h1>
                    <p className="login-description">
                        Unlock a world of knowledge. Access your courses, track your progress, and achieve your goals with our modern learning platform.
                    </p>
                    <div className="login-glass-stats">
                        <div className="glass-stat">
                            <h3>100+</h3>
                            <span>Courses</span>
                        </div>
                        <div className="glass-stat">
                            <h3>50k+</h3>
                            <span>Students</span>
                        </div>
                        <div className="glass-stat">
                            <h3>4.9/5</h3>
                            <span>Rating</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="login-modern-right">
                <div className="login-modern-card">
                    <div className="login-mobile-brand">
                        <BookOpen size={32} className="text-primary" />
                        <span>Aideas LMS</span>
                    </div>
                    
                    <div className="login-header">
                        <h2>Welcome Back ✨</h2>
                        <p>Please enter your details to sign in.</p>
                    </div>

                    {error && (
                        <div className="login-error-toast">
                            <div className="error-icon">!</div>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-modern-form">
                        <div className="modern-form-group">
                            <label>Username</label>
                            <div className="input-wrapper">
                                <User size={20} className="input-icon" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    required
                                    className={error ? 'input-error' : ''}
                                />
                            </div>
                        </div>
                        
                        <div className="modern-form-group">
                            <div className="label-row">
                                <label>Password</label>
                                <a href="#" className="forgot-password">Forgot password?</a>
                            </div>
                            <div className="input-wrapper">
                                <Lock size={20} className="input-icon" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className={error ? 'input-error' : ''}
                                />
                            </div>
                        </div>
                        
                        <button type="submit" className="login-modern-btn" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="spinner" size={20} />
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight size={20} className="btn-icon" />
                                </>
                            )}
                        </button>
                    </form>
                    
                    <div className="login-footer">
                        <p>Don't have an account? <a href="#">Contact admin</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
