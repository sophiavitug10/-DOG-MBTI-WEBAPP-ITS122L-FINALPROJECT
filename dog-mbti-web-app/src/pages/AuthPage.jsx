//sign up and login form in one page for the user to access their account or create a new one
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggles between Login and Signup
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in with:", email, password);
      // TODO: Add actual login authentication logic here
      navigate('/home'); 
    } else {
      console.log("Signing up:", name, email, password);
      // TODO: Add actual signup logic here
      setIsLogin(true); // Switch to the login view after successful signup
    }
  };

  return (
    /* Notice: <NavBar /> is intentionally missing here so it doesn't show up! */
    <div className="auth-container">
      <div className="form-card">
        
        {/* Toggle Header - Inspired by your 2nd image */}
        <div className="auth-toggle" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <h2 
            onClick={() => setIsLogin(false)} 
            style={{ cursor: 'pointer', color: !isLogin ? '#ff6b6b' : 'gray' }}
          >
            Sign Up
          </h2>
          <h2 
            onClick={() => setIsLogin(true)} 
            style={{ cursor: 'pointer', color: isLogin ? '#ff6b6b' : 'gray' }}
          >
            Login
          </h2>
        </div>

        <p>{isLogin ? 'Log in to take the Dog MBTI Test and find your perfect match.' : 'Ready to discover your ideal dog breed?'}</p>
        
        <form onSubmit={handleSubmit}>
          {/* Only show "Full Name" if we are on the Sign Up tab */}
          {!isLogin && (
            <div className="input-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
          )}

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
          
          <button type="submit" className="primary-btn">
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}