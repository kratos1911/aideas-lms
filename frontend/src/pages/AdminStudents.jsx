import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AdminStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get('admin/students/');
                setStudents(response.data);
            } catch (error) {
                console.error("Failed to fetch students", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    if (loading) return <div>Loading students...</div>;

    return (
        <div className="admin-page">
            <h1 className="page-title">Manage Students</h1>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Date Joined</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id}>
                                <td>{student.username}</td>
                                <td>{student.email}</td>
                                <td>{new Date(student.date_joined).toLocaleDateString()}</td>
                                <td>
                                    <button className="action-btn edit">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {students.length === 0 && <p className="no-data">No students found.</p>}
            </div>
        </div>
    );
};

export default AdminStudents;
