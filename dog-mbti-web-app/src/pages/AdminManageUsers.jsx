import React, { useState } from 'react';

const AdminManageUsers = () => {
  // Mock user data
  const [users] = useState([
    { id: 'USR-001', name: 'Juan Dela Cruz', email: 'juan@email.com', mbtiResult: 'ISTP' },
    { id: 'USR-002', name: 'Maria Santos', email: 'maria@email.com', mbtiResult: 'ENFJ' },
    { id: 'USR-003', name: 'Carlos Gomez', email: 'carlos@email.com', mbtiResult: 'Not Taken' },
    { id: 'USR-004', name: 'Alex Reyes', email: 'alex.r@email.com', mbtiResult: 'ISFP' }
  ]);

  return (
    <div style={styles.container}>
      <h2>Manage Users</h2>
      <p>View registered users and their Pawsonality MBTI results.</p>

      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={{ padding: '10px' }}>User ID</th>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Email</th>
            <th style={{ padding: '10px' }}>Pawsonality Match</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={styles.tableRow}>
              <td style={{ padding: '10px', color: '#7f8c8d' }}>{user.id}</td>
              <td style={{ padding: '10px' }}><strong>{user.name}</strong></td>
              <td style={{ padding: '10px' }}>{user.email}</td>
              <td style={{ padding: '10px' }}>
                <span style={{ 
                  backgroundColor: user.mbtiResult === 'Not Taken' ? '#ecf0f1' : '#f39c12',
                  color: user.mbtiResult === 'Not Taken' ? '#7f8c8d' : 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.9em',
                  fontWeight: 'bold'
                }}>
                  {user.mbtiResult}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  tableHeader: { backgroundColor: '#2c3e50', color: 'white', textAlign: 'left' },
  tableRow: { borderBottom: '1px solid #ddd' }
};

export default AdminManageUsers;