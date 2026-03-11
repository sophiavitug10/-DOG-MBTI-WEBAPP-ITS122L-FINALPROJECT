import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminPages.css';

const AdminManageUsers = () => {
  // Mock user data
  const [users] = useState([
    { id: 'USR-001', name: 'Juan Dela Cruz', email: 'juan@email.com', mbtiResult: 'ISTP' },
    { id: 'USR-002', name: 'Maria Santos', email: 'maria@email.com', mbtiResult: 'ENFJ' },
    { id: 'USR-003', name: 'Carlos Gomez', email: 'carlos@email.com', mbtiResult: 'Not Taken' },
    { id: 'USR-004', name: 'Alex Reyes', email: 'alex.r@email.com', mbtiResult: 'ISFP' }
  ]);

  return (
    <div className="admin-main">
      <div className="admin-hero">
        <h2>Manage Users</h2>
        <p>View registered users and their Pawsonality MBTI results.</p>
      </div>

      <div className="admin-actions">
        <Link to="/admin" className="admin-link" style={{ background: '#2f3b49', color: '#fff' }}>Back to Dashboard</Link>
      </div>

      <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Pawsonality Match</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td><strong>{user.name}</strong></td>
              <td>{user.email}</td>
              <td>
                <span className={`admin-tag ${user.mbtiResult === 'Not Taken' ? '' : 'orange'}`}>
                  {user.mbtiResult}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AdminManageUsers;