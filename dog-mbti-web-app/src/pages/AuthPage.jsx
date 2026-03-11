import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'; // This imports the CSS file below

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
      navigate('/home'); 
    } else {
      console.log("Signing up:", name, email, password);
      setIsLogin(true);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="split-card">
        
        {/* LEFT SIDE: Graphic/Image Area */}
        <div className="split-left">
          <h2 className="split-title">{isLogin ? 'LOG IN' : 'SIGN UP'}</h2>
          <p className="split-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          {/* You can add your actual sphere image here as an <img> tag later */}
        </div>

        {/* RIGHT SIDE: The Form */}
        <div className="split-right">
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
              <div className={`toggle-indicator ${isLogin ? 'right' : 'left'}`}></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="input-field">
                <label>name &#9656;</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
            )}

            <div className="input-field">
              <label>e-mail &#9656;</label>
              <input 
                type="email" 
                placeholder="example@email.com"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            
            <div className="input-field">
              <label>password &#9656;</label>
              <input 
                type="password" 
                placeholder={isLogin ? "enter your password" : "confirm"}
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            
            <button type="submit" className="submit-btn">
              {isLogin ? 'log in' : 'sign up'} &#9656;
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}