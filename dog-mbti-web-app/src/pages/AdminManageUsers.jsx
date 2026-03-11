import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { fetchAdminUsers } from '../services/adminService';
import '../styles/AdminPages.css';

const AdminManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      setError('');
      setIsLoading(true);
      try {
        const rows = await fetchAdminUsers();
        setUsers(rows);
      } catch (err) {
        setError(err.message || 'Failed to load users.');
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-hero">
        <h2>Manage Users</h2>
        <p>View registered users and their Pawsonality MBTI results.</p>
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-table-wrap">
        {isLoading ? (
          <p className="admin-empty">Loading users...</p>
        ) : (
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
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminManageUsers;