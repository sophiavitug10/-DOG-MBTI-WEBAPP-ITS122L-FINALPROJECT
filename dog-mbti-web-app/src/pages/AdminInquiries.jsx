import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { fetchAdminInquiries, updateInquiryStatus } from '../services/adminService';
import '../styles/AdminPages.css';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadInquiries = async () => {
      setError('');
      setIsLoading(true);
      try {
        const rows = await fetchAdminInquiries();
        setInquiries(
          rows.map((row) => ({
            id: row.id,
            name: row.full_name,
            contact: row.contact_info,
            breed: row.breed_name,
            date: row.created_at,
            status: row.status
          }))
        );
      } catch (err) {
        setError(err.message || 'Failed to load inquiries.');
      } finally {
        setIsLoading(false);
      }
    };

    loadInquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setError('');
    const previous = inquiries;
    setInquiries(inquiries.map((inquiry) => (inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry)));

    try {
      await updateInquiryStatus(id, newStatus);
    } catch (err) {
      setInquiries(previous);
      setError(err.message || 'Failed to update inquiry status.');
    }
  };

  return (
    <AdminLayout>
      <div className="admin-hero">
        <h2>Adoption Inquiries</h2>
        <p>Manage adoption requests from users who have completed the Pawsonality test.</p>
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-table-wrap">
        {isLoading ? (
          <p className="admin-empty">Loading inquiries...</p>
        ) : (
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
                  <td>{new Date(inq.date).toLocaleDateString()}</td>
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
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminInquiries;