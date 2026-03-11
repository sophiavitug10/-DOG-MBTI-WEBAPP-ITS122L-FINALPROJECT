import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminPages.css';

const AdminInquiries = () => {
  // Mock data representing adoption inquiries
  const [inquiries, setInquiries] = useState([
    { id: 1, name: 'Juan Dela Cruz', contact: 'juan@email.com', breed: 'Basenji', date: '2026-03-10', status: 'Pending' },
    { id: 2, name: 'Maria Santos', contact: '09123456789', breed: 'Lagotto Romagnolo', date: '2026-03-09', status: 'Contacted' },
    { id: 3, name: 'Alex Reyes', contact: 'alex.r@email.com', breed: 'Greyhound', date: '2026-03-08', status: 'Resolved' }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setInquiries(inquiries.map(inquiry => 
      inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
    ));
  };

  return (
    <div className="admin-main">
      <div className="admin-hero">
        <h2>Adoption Inquiries</h2>
        <p>Manage adoption requests from users who have completed the Pawsonality test.</p>
      </div>

      <div className="admin-actions">
        <Link to="/admin" className="admin-link" style={{ background: '#2f3b49', color: '#fff' }}>Back to Dashboard</Link>
      </div>

      <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>User Name</th>
            <th>Contact Info</th>
            <th>Matched Breed</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inq) => (
            <tr key={inq.id}>
              <td>{inq.date}</td>
              <td><strong>{inq.name}</strong></td>
              <td>{inq.contact}</td>
              <td>{inq.breed}</td>
              <td>
                <select 
                  value={inq.status} 
                  onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                  className="admin-select"
                >
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AdminInquiries;