import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

// User Pages
import AuthPage from './pages/AuthPage'; 
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
    <div className="form-card" style={{padding: '50px', textAlign: 'center'}}>
      <h2>Page not found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/login">Go to Login / Sign Up</Link>
    </div>
  );

  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<Navigate to="/login" />} /> 

          <Route path="/home" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/breeds" element={<BreedProfiles />} />
          
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/breeds" element={<AdminManageBreeds />} />
          <Route path="/admin/questions" element={<AdminManageQuestions />} />
          <Route path="/admin/users" element={<AdminManageUsers />} />
          <Route path="/admin/inquiries" element={<AdminInquiries />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;