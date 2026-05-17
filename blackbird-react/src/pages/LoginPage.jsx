import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, signInWithGoogle } from '../firebase';
import { useAuth } from '../context/AuthContext';
import AmbientBackground from '../components/layout/AmbientBackground';
import '../css/auth.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { syncBackend } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/invalid-credential': return 'Invalid email or password.';
      case 'auth/user-not-found': return 'No account found with this email.';
      case 'auth/wrong-password': return 'Incorrect password.';
      case 'auth/too-many-requests': return 'Too many attempts. Please try again later.';
      case 'auth/invalid-email': return 'Please enter a valid email address.';
      case 'auth/unauthorized-domain': return 'This domain is not authorized for sign-in. Check Firebase Auth settings.';
      case 'auth/operation-not-allowed': return 'Google sign-in is not enabled. Enable it in Firebase Console.';
      case 'auth/popup-blocked': return 'Popup was blocked by the browser. Please allow popups.';
      case 'auth/popup-closed-by-user': return 'Sign-in popup was closed. Please try again.';
      default: return `Error (${code}). Please try again.`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await syncBackend(user);
      navigate('/');
    } catch (err) {
      setError(err.code ? getErrorMessage(err.code) : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result?.user) {
        await syncBackend(result.user, { throwOnError: true });
        navigate('/');
      }
      // If null, redirect is happening — page will reload
    } catch (err) {
      console.error('Google sign-in error:', err.code, err.message, err);
      setError(err.code ? getErrorMessage(err.code) : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <AmbientBackground orbCount={2} />
      <div className="auth-container">
        <div className="auth-branding">
          <Link to="/" className="auth-logo">
            <img className="logo-icon" src="/images/main-logo.png" alt="Black Bird Logo" />
            <span>lack Bird Smart Innovations<sup>TM</sup></span>
          </Link>
          <div className="branding-content">
            <h1 className="branding-title">Welcome back</h1>
            <p className="branding-description">Access your dashboard to monitor your loved ones, manage alerts, and stay connected with your protective community.</p>
            <div className="branding-features">
              <div className="branding-feature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>Real-time GPS tracking</span>
              </div>
              <div className="branding-feature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>Instant emergency alerts</span>
              </div>
              <div className="branding-feature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>Health monitoring data</span>
              </div>
            </div>
          </div>
          <div className="branding-footer"><p>&copy; {new Date().getFullYear()} Black Bird Smart Innovations. All rights reserved.</p></div>
        </div>

        <div className="auth-form-wrapper">
          <div className="auth-form-container">
            <div className="auth-header">
              <h2 className="auth-title">Log in to your account</h2>
              <p className="auth-subtitle">Don't have an account? <Link to="/register" className="auth-link">Sign up</Link></p>
            </div>

            {error && <div style={{ background: 'rgba(236,28,36,0.1)', border: '1px solid rgba(236,28,36,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1rem', color: 'var(--color-primary)', fontSize: '0.875rem' }}>{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email address</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 6L10 11L18 6" stroke="currentColor" strokeWidth="1.5"/></svg>
                  <input type="email" id="email" className="form-input" placeholder="you@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <div className="form-label-row">
                  <label htmlFor="password" className="form-label">Password</label>
                  <Link to="/forgot-password" className="form-link">Forgot password?</Link>
                </div>
                <div className="input-wrapper">
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="4" y="8" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 8V5C7 3.34315 8.34315 2 10 2C11.6569 2 13 3.34315 13 5V8" stroke="currentColor" strokeWidth="1.5"/><circle cx="10" cy="13" r="1.5" fill="currentColor"/></svg>
                  <input type={showPassword ? 'text' : 'password'} id="password" className="form-input" placeholder="Enter your password" required value={password} onChange={e => setPassword(e.target.value)} />
                  <button type="button" className="password-toggle" aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <svg className="eye-closed" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 3L17 17M10 4C4 4 1 10 1 10C1 10 2.5 12.5 5 14.5M10 16C16 16 19 10 19 10C19 10 17.5 7.5 15 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    ) : (
                      <svg className="eye-open" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4C4 4 1 10 1 10C1 10 4 16 10 16C16 16 19 10 19 10C19 10 16 4 10 4Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-wrapper">
                  <input type="checkbox" className="checkbox-input" />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">Remember me for 30 days</span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-large btn-full" disabled={loading}>
                <span>{loading ? 'Signing in...' : 'Sign in'}</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </form>

            <div className="auth-divider"><span>Or continue with</span></div>

            <div className="social-buttons">
              <button type="button" className="social-btn" onClick={handleGoogle}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M18.1713 8.36788H17.5V8.33329H10V11.6666H14.6096C13.9054 13.607 12.1138 15 10 15C7.23877 15 5.00002 12.7612 5.00002 9.99996C5.00002 7.23871 7.23877 4.99996 10 4.99996C11.2746 4.99996 12.4342 5.48079 13.3171 6.26621L15.6742 3.90913C14.1858 2.52204 12.195 1.66663 10 1.66663C5.39794 1.66663 1.66669 5.39788 1.66669 9.99996C1.66669 14.602 5.39794 18.3333 10 18.3333C14.6021 18.3333 18.3334 14.602 18.3334 9.99996C18.3334 9.44121 18.2758 8.89579 18.1713 8.36788Z" fill="#FFC107"/>
                  <path d="M2.62744 6.12121L5.36536 8.12913C6.10619 6.29496 7.90036 4.99996 9.99994 4.99996C11.2745 4.99996 12.4341 5.48079 13.317 6.26621L15.6741 3.90913C14.1858 2.52204 12.1949 1.66663 9.99994 1.66663C6.79911 1.66663 4.02327 3.47371 2.62744 6.12121Z" fill="#FF3D00"/>
                  <path d="M10 18.3333C12.1525 18.3333 14.1083 17.5096 15.5871 16.17L13.008 13.9875C12.1432 14.6452 11.0865 15.0009 10 15C7.89583 15 6.11083 13.6179 5.40041 11.6892L2.58124 13.7829C3.96041 16.4817 6.76124 18.3333 10 18.3333Z" fill="#4CAF50"/>
                  <path d="M18.1713 8.36796H17.5V8.33337H10V11.6667H14.6096C14.2721 12.5902 13.6596 13.3972 12.8667 13.9879L12.8683 13.987L15.4475 16.1695C15.2625 16.3354 18.3333 14.1667 18.3333 10C18.3333 9.44129 18.2758 8.89587 18.1713 8.36796Z" fill="#1976D2"/>
                </svg>
                <span>Google</span>
              </button>
              <button type="button" className="social-btn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15 1.66663H12.5C11.395 1.66663 10.3352 2.10561 9.55376 2.88701C8.77236 3.66842 8.33337 4.72822 8.33337 5.83329V8.33329H5.83337V11.6666H8.33337V18.3333H11.6667V11.6666H14.1667L15 8.33329H11.6667V5.83329C11.6667 5.61228 11.7545 5.40032 11.9108 5.24404C12.0671 5.08776 12.279 4.99996 12.5 4.99996H15V1.66663Z" fill="#1877F2"/></svg>
                <span>Facebook</span>
              </button>
            </div>

            <p className="auth-footer-text">By signing in, you agree to our <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
