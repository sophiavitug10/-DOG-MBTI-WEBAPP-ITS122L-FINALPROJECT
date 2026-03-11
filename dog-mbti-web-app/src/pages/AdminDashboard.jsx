import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/AdminPages.css';

const AdminDashboard = () => {
  const summaryStats = [
    { id: 1, title: 'Total Breeds', count: 42, icon: '🐶' },
    { id: 2, title: 'Total Questions', count: 20, icon: '📝' },
    { id: 3, title: 'Total Users', count: 156, icon: '👥' },
    { id: 4, title: 'Pending Inquiries', count: 8, icon: '📩' },
  ];

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">Admin Panel</div>
        <nav className="admin-nav">
          <NavLink to="/admin" end className={({ isActive }) => `admin-link ${isActive ? 'active' : ''}`}>Dashboard Home</NavLink>
          <NavLink to="/admin/breeds" className={({ isActive }) => `admin-link ${isActive ? 'active' : ''}`}>Manage Breeds</NavLink>
          <NavLink to="/admin/questions" className={({ isActive }) => `admin-link ${isActive ? 'active' : ''}`}>Manage Questions</NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => `admin-link ${isActive ? 'active' : ''}`}>Manage Users</NavLink>
          <NavLink to="/admin/inquiries" className={({ isActive }) => `admin-link ${isActive ? 'active' : ''}`}>Adoption Inquiries</NavLink>
          <Link to="/home" className="admin-link">Back to Site</Link>
        </nav>
      </aside>

      <main className="admin-main">
        <div className="admin-hero">
          <h1>Welcome back, Admin</h1>
          <p>Here is your system overview for Pawsonality Match.</p>
        </div>

        <div className="admin-cards">
          {summaryStats.map((stat) => (
            <div key={stat.id} className="admin-card">
              <div style={{ fontSize: '2rem' }}>{stat.icon}</div>
              <h3>{stat.title}</h3>
              <strong>{stat.count}</strong>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;