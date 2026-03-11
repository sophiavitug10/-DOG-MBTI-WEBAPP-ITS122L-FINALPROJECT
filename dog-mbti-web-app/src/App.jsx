import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

// User Pages
import AuthPage from './pages/AuthPage'; // Imported your new combined page
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import BreedProfiles from './pages/BreedProfiles';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminManageBreeds from './pages/AdminManageBreeds';
import AdminManageQuestions from './pages/AdminManageQuestions';
import AdminManageUsers from './pages/AdminManageUsers';
import AdminInquiries from './pages/AdminInquiries';

import './App.css'; 

function App() {
  const NotFound = () => (
    <div className="form-card">
      <h2>Page not found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <p>
        <Link to="/login">Go to Login / Sign Up</Link>
      </p>
    </div>
  );

  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Combined Auth Route - Maps both /login and /signup to the same component */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<Navigate to="/login" />} /> 

          {/* User Routes */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/breeds" element={<BreedProfiles />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/breeds" element={<AdminManageBreeds />} />
          <Route path="/admin/questions" element={<AdminManageQuestions />} />
          <Route path="/admin/users" element={<AdminManageUsers />} />
          <Route path="/admin/inquiries" element={<AdminInquiries />} />

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;