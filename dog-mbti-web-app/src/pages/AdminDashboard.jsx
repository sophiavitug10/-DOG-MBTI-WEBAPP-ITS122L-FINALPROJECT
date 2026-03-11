//admin dashboard page for the admin to manage the users and the dog breeds
import React from 'react';
import { Link } from 'react-router-dom'; 

const AdminDashboard = () => {
  // Hardcoded stats to save you time during the demo
  const summaryStats = [
    { id: 1, title: 'Total Breeds', count: 42, icon: '🐶' },
    { id: 2, title: 'Total Questions', count: 20, icon: '📝' },
    { id: 3, title: 'Total Users', count: 156, icon: '👥' },
    { id: 4, title: 'Pending Inquiries', count: 8, icon: '📩' },
  ];

  return (
    <div style={styles.dashboardContainer}>
      
      {/* SIDEBAR NAVIGATION */}
      <aside style={styles.sidebar}>
        <h2 style={{ color: 'white' }}>Admin Panel</h2>
        <nav style={styles.nav}>
          {/* Ensure these 'to' paths match your App.js route definitions */}
          <Link to="/admin" style={styles.link}>Dashboard Home</Link>
          <Link to="/admin/breeds" style={styles.link}>Manage Breeds</Link>
          <Link to="/admin/questions" style={styles.link}>Manage Questions</Link>
          <Link to="/admin/users" style={styles.link}>Manage Users</Link>
          <Link to="/admin/inquiries" style={styles.link}>Adoption Inquiries</Link>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={styles.mainContent}>
        <h1>Welcome back, Admin</h1>
        <p>Here is your system overview for Pawsonality Match.</p>

        {/* SUMMARY CARDS GRID */}
        <div style={styles.cardsGrid}>
          {summaryStats.map((stat) => (
            <div key={stat.id} style={styles.card}>
              <div style={{ fontSize: '2rem' }}>{stat.icon}</div>
              <h3>{stat.title}</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '10px 0' }}>
                {stat.count}
              </p>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
};

// Quick inline styles so it doesn't look broken immediately. 
// You can move these to a separate CSS file later if you have time.
const styles = {
  dashboardContainer: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#2c3e50',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
    gap: '15px',
  },
  link: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '10px',
    borderRadius: '5px',
    transition: 'background 0.3s',
  },
  mainContent: {
    flex: 1,
    padding: '40px',
    backgroundColor: '#f4f6f9',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '30px',
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
  }
};

export default AdminDashboard;