//admin inquiries page for the admin to view and manage the user inquiries
import React, { useState } from 'react';

const AdminInquiries = () => {
  // Mock data representing adoption inquiries
  const [inquiries, setInquiries] = useState([
    { id: 1, name: 'Juan Dela Cruz', contact: 'juan@email.com', breed: 'Basenji', date: '2026-03-10', status: 'Pending' },
    { id: 2, name: 'Maria Santos', contact: '09123456789', breed: 'Lagotto Romagnolo', date: '2026-03-09', status: 'Contacted' },
    { id: 3, name: 'Alex Reyes', contact: 'alex.r@email.com', breed: 'Greyhound', date: '2026-03-08', status: 'Resolved' }
  ]);

  // Function to handle the status dropdown change
  const handleStatusChange = (id, newStatus) => {
    setInquiries(inquiries.map(inquiry => 
      inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
    ));
  };

  // Helper function to color-code status badges
  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return '#e67e22'; // Orange
      case 'Contacted': return '#3498db'; // Blue
      case 'Resolved': return '#2ecc71'; // Green
      default: return '#95a5a6'; // Gray
    }
  };

  return (
    <div style={styles.container}>
      <h2>Adoption Inquiries</h2>
      <p>Manage adoption requests from users who have completed the Pawsonality test.</p>

      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={{ padding: '10px' }}>Date</th>
            <th style={{ padding: '10px' }}>User Name</th>
            <th style={{ padding: '10px' }}>Contact Info</th>
            <th style={{ padding: '10px' }}>Matched Breed</th>
            <th style={{ padding: '10px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inq) => (
            <tr key={inq.id} style={styles.tableRow}>
              <td style={{ padding: '10px' }}>{inq.date}</td>
              <td style={{ padding: '10px' }}><strong>{inq.name}</strong></td>
              <td style={{ padding: '10px' }}>{inq.contact}</td>
              <td style={{ padding: '10px' }}>{inq.breed}</td>
              <td style={{ padding: '10px' }}>
                {/* Dropdown to change status directly in the table */}
                <select 
                  value={inq.status} 
                  onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                  style={{
                    padding: '5px',
                    borderRadius: '4px',
                    backgroundColor: getStatusColor(inq.status),
                    color: 'white',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Pending" style={{backgroundColor: 'white', color: 'black'}}>Pending</option>
                  <option value="Contacted" style={{backgroundColor: 'white', color: 'black'}}>Contacted</option>
                  <option value="Resolved" style={{backgroundColor: 'white', color: 'black'}}>Resolved</option>
                </select>
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

export default AdminInquiries;