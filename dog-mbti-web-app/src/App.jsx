import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

// User Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import BreedProfiles from './pages/BreedProfiles';

// Admin Pages (Make sure these paths match your folder structure!)
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
        <Link to="/login">Go to Login</Link> or <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );

  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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