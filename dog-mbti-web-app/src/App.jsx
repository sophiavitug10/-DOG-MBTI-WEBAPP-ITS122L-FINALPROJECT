import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// User Pages
import AuthPage from './pages/AuthPage'; 
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import BreedProfiles from './pages/BreedProfiles';
import ResultsPage from './pages/ResultsPage';
import ResultDetailPage from './pages/ResultDetailPage';
import ProfilePage from './pages/ProfilePage';

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
    <AuthProvider>
      <QuizProvider>
        <Router>
          <div className="app-wrapper">
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />

              <Route path="/login" element={<AuthPage />} />
              <Route path="/signup" element={<Navigate to="/login" />} />

              <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
              <Route path="/results" element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} />
              <Route path="/results/:resultId" element={<ProtectedRoute><ResultDetailPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/breeds" element={<ProtectedRoute><BreedProfiles /></ProtectedRoute>} />

              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/breeds" element={<AdminRoute><AdminManageBreeds /></AdminRoute>} />
              <Route path="/admin/questions" element={<AdminRoute><AdminManageQuestions /></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><AdminManageUsers /></AdminRoute>} />
              <Route path="/admin/inquiries" element={<AdminRoute><AdminInquiries /></AdminRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;