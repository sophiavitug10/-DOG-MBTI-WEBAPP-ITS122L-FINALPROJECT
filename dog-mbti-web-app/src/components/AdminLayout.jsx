import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import '../styles/AdminPages.css';

const AdminLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">Admin Panel</div>
        <nav className="admin-nav">
          <NavLink to="/admin" end className={({ isActive }) => `admin-link ${isActive ? 'active' : ''}`}>
            Dashboard Home
          </NavLink>
          <NavLink to="/admin/breeds" className={({ isActive }) => `admin-link ${isActive ? 'active' : ''}`}>
            Manage Breeds
          </NavLink>
          <NavLink to="/admin/questions" className={({ isActive }) => `admin-link ${isActive ? 'active' : ''}`}>
            Manage Questions
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => `admin-link ${isActive ? 'active' : ''}`}>
            Manage Users
          </NavLink>
          <NavLink to="/admin/inquiries" className={({ isActive }) => `admin-link ${isActive ? 'active' : ''}`}>
            Adoption Inquiries
          </NavLink>
          <Link to="/home" className="admin-link">
            Back to Site
          </Link>
        </nav>
      </aside>

      <main className="admin-main">
        <div key={location.pathname} className="admin-view-transition">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
