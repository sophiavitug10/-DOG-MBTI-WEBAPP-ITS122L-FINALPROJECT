import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css'; 

const OTP_LENGTH = 8;

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [step, setStep] = useState('entry');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [resendSeconds, setResendSeconds] = useState(0);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const {
    requestSignupCode,
    completeSignup,
    login,
    requestPasswordResetCode,
    verifyPasswordResetCode,
    changePassword,
    isAuthenticated,
    isLoading
  } = useAuth();

  const isLogin = mode === 'login';
  const isSignup = mode === 'signup';
  const isForgot = mode === 'forgot';

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (resendSeconds <= 0) {
      return undefined;
    }

    const timer = setInterval(() => {
      setResendSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [resendSeconds]);

  const resetMessages = () => {
    setError('');
    setNotice('');
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setStep('entry');
    setCode('');
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setResendSeconds(0);
    resetMessages();
  };

  const sendVerificationCode = async () => {
    if (isSignup) {
      await requestSignupCode({ email, name });
      setNotice(`We sent a ${OTP_LENGTH}-digit code to your email. Enter it below to finish sign up.`);
      return;
    }

    await requestPasswordResetCode({ email });
    setNotice(`We sent a ${OTP_LENGTH}-digit reset code to your email.`);
  };

  const handleEntrySubmit = async () => {
    if (!email.trim()) {
      throw new Error('Please enter your email.');
    }

    if (isSignup && !name.trim()) {
      throw new Error('Please enter your name.');
    }

    if (isSignup && password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    if (isSignup) {
      await sendVerificationCode();
      setStep('verify');
      setResendSeconds(30);
      return;
    }

    if (isLogin) {
      if (password.length < 6) {
        throw new Error('Please enter your password.');
      }
      await login({ email, password });
      navigate('/home');
      return;
    }

    await sendVerificationCode();
    setStep('verify');
    setResendSeconds(30);
  };

  const handleResendCode = async () => {
    if (resendSeconds > 0) {
      return;
    }

    resetMessages();
    setIsSubmitting(true);

    try {
      await sendVerificationCode();
      setResendSeconds(30);
    } catch (err) {
      setError(err.message || 'Failed to resend code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifySubmit = async () => {
    if (code.trim().length !== OTP_LENGTH) {
      throw new Error(`Please enter the ${OTP_LENGTH}-digit code.`);
    }

    if (isSignup) {
      await completeSignup({ email, code, name, password });
      setNotice('Account verified. You are now logged in.');
      navigate('/home');
      return;
    }

    await verifyPasswordResetCode({ email, code });
    setNotice('Code verified. You can now set a new password.');
    setStep('resetPassword');
  };

  const handleResetPasswordSubmit = async () => {
    if (newPassword.length < 6) {
      throw new Error('New password must be at least 6 characters.');
    }

    if (newPassword !== confirmPassword) {
      throw new Error('Passwords do not match.');
    }

    await changePassword({ newPassword });
    setNotice('Password updated successfully. You can now log in.');
    setMode('login');
    setStep('entry');
    setCode('');
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMessages();
    setIsSubmitting(true);

    try {
      if (step === 'entry') {
        await handleEntrySubmit();
      } else if (step === 'verify') {
        await handleVerifySubmit();
      } else {
        await handleResetPasswordSubmit();
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="auth-page-wrapper">
      <div className="split-card">
        
        {/* LEFT SIDE: Graphic/Image Area (Orange) */}
        <div className="split-left">
          <h2 className="split-title">{isLogin ? 'LOG IN' : 'SIGN UP'}</h2>
          <p className="split-desc">
            Pawsonality helps you find your perfect furry companion based on your lifestyle, activity level, and personality.
          </p>
          {/* You can add your actual sphere image here as an <img> tag later */}
        </div>

        {/* RIGHT SIDE: The Form (White) */}
        <div className="split-right">
          <div className="auth-toggle-wrapper">
            {isForgot ? (
              <h3 className="forgot-header">Forgot Password</h3>
            ) : (
              <div className="auth-toggle">
                <button 
                  type="button"
                  className={`toggle-btn ${isSignup ? 'active' : ''}`} 
                  onClick={() => switchMode('signup')}
                >
                  Sign Up
                </button>
                <button 
                  type="button"
                  className={`toggle-btn ${isLogin ? 'active' : ''}`} 
                  onClick={() => switchMode('login')}
                >
                  Login
                </button>
                <div className={`toggle-indicator ${isLogin ? 'right' : 'left'}`}></div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {isSignup && step === 'entry' && (
              <div className="input-field">
                <label>Name &#9656;</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
            )}

            {step === 'entry' && (
              <>
                <div className="input-field">
                  <label>Email &#9656;</label>
                  <input 
                    type="email" 
                    placeholder="example@email.com"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>

                {(isSignup || isLogin) && (
                  <div className="input-field">
                    <label>Password &#9656;</label>
                    <input 
                      type="password" 
                      placeholder={isSignup ? 'Create a password' : 'Enter your password'}
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                    />
                  </div>
                )}
              </>
            )}

            {step === 'verify' && (
              <>
                <div className="input-field">
                  <label>Code &#9656;</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern={`[0-9]{${OTP_LENGTH}}`}
                    maxLength={OTP_LENGTH}
                    placeholder={`Enter ${OTP_LENGTH}-digit code`}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    required
                  />
                </div>
                <div className="code-actions">
                  <span className="code-status">
                    {resendSeconds > 0
                      ? `Resend available in ${resendSeconds}s`
                      : 'Didn\'t receive a code?'}
                  </span>
                  <button
                    type="button"
                    className="resend-link"
                    onClick={handleResendCode}
                    disabled={resendSeconds > 0 || isSubmitting}
                  >
                    Resend Code
                  </button>
                </div>
              </>
            )}

            {step === 'resetPassword' && (
              <>
                <div className="input-field">
                  <label>New Pass &#9656;</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="input-field">
                  <label>Confirm &#9656;</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            {error && <p className="auth-error">{error}</p>}
            {notice && <p className="auth-notice">{notice}</p>}

            {step === 'entry' && isLogin && (
              <button
                type="button"
                className="forgot-link"
                onClick={() => switchMode('forgot')}
              >
                Forgot Password?
              </button>
            )}

            {isForgot && step !== 'resetPassword' && (
              <button
                type="button"
                className="forgot-link"
                onClick={() => switchMode('login')}
              >
                Back to Login
              </button>
            )}
            
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting
                ? 'Please wait...'
                : step === 'entry'
                  ? isLogin
                    ? 'Login'
                    : 'Send Code'
                  : step === 'verify'
                    ? 'Verify Code'
                    : 'Update Password'} &#9656;
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}