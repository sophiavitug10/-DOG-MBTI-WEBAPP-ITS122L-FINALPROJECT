//sign up and login form in one page for the user to access their account or create a new one
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'; // Make sure to import the CSS file!

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
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
      setIsLogin(true);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-card">
        
        {/* Updated Toggle Header */}
        <div className="auth-toggle-wrapper">
          <div className="auth-toggle">
            <button 
              type="button"
              className={`toggle-btn ${!isLogin ? 'active' : ''}`} 
              onClick={() => setIsLogin(false)}
            >
              sign up
            </button>
            <button 
              type="button"
              className={`toggle-btn ${isLogin ? 'active' : ''}`} 
              onClick={() => setIsLogin(true)}
            >
              login
            </button>
            {/* The sliding orange line */}
            <div className={`toggle-indicator ${isLogin ? 'right' : 'left'}`}></div>
          </div>
        </div>

        <p className="auth-subtitle">
          {isLogin ? 'Log in to take the Dog MBTI Test and find your perfect match.' : 'Ready to discover your ideal dog breed?'}
        </p>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label>name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
          )}

          <div className="input-group">
            <label>e-mail</label>
            <input 
              type="email" 
              placeholder="example@email.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="input-group">
            <label>password</label>
            <input 
              type="password" 
              placeholder={isLogin ? "enter your password" : "confirm"}
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          <button type="submit" className="primary-btn submit-btn">
            {isLogin ? 'log in' : 'sign up'}
          </button>
        </form>
      </div>
    </div>
  );
}