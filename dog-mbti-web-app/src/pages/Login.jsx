//login page for the user to access their account
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
  };

  return (
    <>
      <NavBar />
      <div className="login-container">
        <div className="form-card">
          <h2>Welcome to Paws & Personalities! ??</h2>
          <p>Log in to take the Dog MBTI Test and find your perfect match.</p>
          
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            
            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            
            <button type="submit" className="primary-btn">Log In</button>
          </form>
          
          <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </div>
      </div>
    </>
  );
}
