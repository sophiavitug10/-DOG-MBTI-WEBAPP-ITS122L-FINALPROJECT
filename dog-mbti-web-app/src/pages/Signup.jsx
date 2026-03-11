//sign up page for the user to create an account

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signing up:", name, email, password);
    navigate('/login');
  };

  return (
    <>
      <NavBar />
      <div className="signup-container">
        <div className="form-card">
          <h2>Create an Account ??</h2>
          <p>Ready to discover your ideal dog breed?</p>
          
          <form onSubmit={handleSignup}>
            <div className="input-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>

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
            
            <button type="submit" className="primary-btn">Sign Up</button>
          </form>
          
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </>
  );
}
