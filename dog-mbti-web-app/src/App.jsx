import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import BreedProfiles from './pages/BreedProfiles';
import ResultsPage from './pages/ResultsPage';
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
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/breeds" element={<BreedProfiles />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
