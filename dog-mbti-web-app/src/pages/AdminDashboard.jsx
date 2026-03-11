import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { fetchAdminStats } from '../services/adminService';
import '../styles/AdminPages.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    breedCount: 0,
    questionCount: 0,
    userCount: 0,
    pendingInquiryCount: 0
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      setError('');
      try {
        const next = await fetchAdminStats();
        setStats(next);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard stats.');
      }
    };

    loadStats();
  }, []);

  const summaryStats = [
    { id: 1, title: 'Total Breeds', count: stats.breedCount, icon: '🐶' },
    { id: 2, title: 'Total Questions', count: stats.questionCount, icon: '📝' },
    { id: 3, title: 'Total Users', count: stats.userCount, icon: '👥' },
    { id: 4, title: 'Pending Inquiries', count: stats.pendingInquiryCount, icon: '📩' }
  ];

  return (
    <AdminLayout>
      <div className="admin-hero">
        <h1>Welcome back, Admin</h1>
        <p>Here is your system overview for Pawsonality Match.</p>
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-cards">
        {summaryStats.map((stat) => (
          <div key={stat.id} className="admin-card">
            <div style={{ fontSize: '2rem' }}>{stat.icon}</div>
            <h3>{stat.title}</h3>
            <strong>{stat.count}</strong>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;