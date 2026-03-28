import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Courses from './pages/Courses';
import CoursePlayer from './pages/CoursePlayer';
import StudentDashboard from './pages/StudentDashboard';
import StudentAssessment from './pages/StudentAssessment';
import StudentPractice from './pages/StudentPractice';
import StudentBlogs from './pages/StudentBlogs';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminStudents from './pages/AdminStudents';
import AdminCourses from './pages/AdminCourses';
import AdminCourseDetails from './pages/AdminCourseDetails';
import AdminUsers from './pages/AdminUsers';
import AdminInstructors from './pages/AdminInstructors';
import AdminEnrollments from './pages/AdminEnrollments';
import AdminAssessments from './pages/AdminAssessments';
import './index.css';
import './components/AdminStyles.css';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? (
    <Layout>
      {children}
    </Layout>
  ) : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  // For simplicity, checking if role is admin or teacher, or username is 'admin'
  const isAdmin = user && (user.role === 'admin' || user.is_staff || user.username === 'admin');
  return isAdmin ? (
    <AdminLayout>
      {children}
    </AdminLayout>
  ) : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Student Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <StudentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <PrivateRoute>
                <Courses />
              </PrivateRoute>
            }
          />
          <Route
            path="/course/:id"
            element={
              <PrivateRoute>
                <CoursePlayer />
              </PrivateRoute>
            }
          />
          <Route
            path="/assessment"
            element={
              <PrivateRoute>
                <StudentAssessment />
              </PrivateRoute>
            }
          />
          <Route
            path="/practice"
            element={
              <PrivateRoute>
                <StudentPractice />
              </PrivateRoute>
            }
          />
          <Route
            path="/blogs"
            element={
              <PrivateRoute>
                <StudentBlogs />
              </PrivateRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/students" element={<AdminRoute><AdminStudents /></AdminRoute>} />
          <Route path="/admin/courses" element={<AdminRoute><AdminCourses /></AdminRoute>} />
          <Route path="/admin/courses/:courseId" element={<AdminRoute><AdminCourseDetails /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/admin/instructors" element={<AdminRoute><AdminInstructors /></AdminRoute>} />
          <Route path="/admin/enrollments" element={<AdminRoute><AdminEnrollments /></AdminRoute>} />
          <Route path="/admin/assessments" element={<AdminRoute><AdminAssessments /></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><div className="p-8"><h2>Settings (Coming Soon)</h2></div></AdminRoute>} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
