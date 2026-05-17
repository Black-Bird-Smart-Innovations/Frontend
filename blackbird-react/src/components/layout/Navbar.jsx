import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../ui/ThemeToggle';

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, backendUser, logout } = useAuth();
  const isHome = pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const handleToggle = () => {
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    navToggle?.classList.toggle('active');
    mobileMenu?.classList.toggle('active');
    document.body.style.overflow = mobileMenu?.classList.contains('active') ? 'hidden' : '';
  };

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate('/');
  };

  const getInitials = (name, email) => {
    if (name) {
      const parts = name.trim().split(' ');
      return parts.length > 1
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : parts[0].slice(0, 2).toUpperCase();
    }
    return email ? email[0].toUpperCase() : '?';
  };

  const isDefaultProfilePhoto = (url) => {
    if (!url) return true;
    const normalized = url.toLowerCase();
    return normalized.includes('/default_images/')
      || normalized.includes('customer.jpg')
      || normalized.includes('user-profile.png')
      || normalized.includes('profileplaceholder');
  };

  const backendPhoto = backendUser?.profile_picture;
  const avatarUrl = backendPhoto && !isDefaultProfilePhoto(backendPhoto)
    ? backendPhoto
    : user?.photoURL;

  return (
    <nav className="nav" id="nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img className="logo-icon" src="/images/main-logo.png" alt="Black Bird Logo" />
          <span>lack Bird Smart Innovations<sup>TM</sup></span>
        </Link>

        <div className="nav-links">
          {isHome ? (
            <>
              <a href="#features" className="nav-link">Features</a>
              <a href="#products" className="nav-link">Products</a>
              <a href="#how-it-works" className="nav-link">How It Works</a>
              <a href="#pricing" className="nav-link">Pricing</a>
            </>
          ) : (
            <>
              <Link to="/#features" className="nav-link">Features</Link>
              <Link to="/#products" className="nav-link">Products</Link>
              <Link to="/#how-it-works" className="nav-link">How It Works</Link>
              <Link to="/#pricing" className="nav-link">Pricing</Link>
            </>
          )}
          <Link to="/about" className={`nav-link${pathname === '/about' ? ' active' : ''}`}>About</Link>
        </div>

        <div className="nav-actions">
          <Link to="/products" className="nav-link search-link" title="Browse Products">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2"/>
              <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </Link>
          {user && (
            <Link to="/cart" className="nav-link search-link" title="Cart">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6 6H3L1 18H19L17 6H14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M6 6V4C6 2.34315 7.34315 1 9 1H11C12.6569 1 14 2.34315 14 4V6" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </Link>
          )}
          <ThemeToggle />
          {user ? (
            <div className="user-menu" ref={menuRef}>
              <button
                className="user-menu-trigger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
              >
                <span className="user-avatar">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="" className="user-avatar-img" referrerPolicy="no-referrer" />
                  ) : (
                    <span className="user-avatar-initials">{getInitials(user.displayName, user.email)}</span>
                  )}
                </span>
                <span className="user-menu-name">{user.displayName || user.email?.split('@')[0]}</span>
                <svg className={`user-menu-chevron${menuOpen ? ' open' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {menuOpen && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <span className="user-dropdown-name">{user.displayName || 'User'}</span>
                    <span className="user-dropdown-email">{user.email}</span>
                  </div>
                  <div className="user-dropdown-divider" />
                  <Link to="/profile" className="user-dropdown-item" onClick={() => setMenuOpen(false)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M2.5 14C2.5 11.5 4.96 9.5 8 9.5C11.04 9.5 13.5 11.5 13.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    My Profile
                  </Link>
                  <Link to="/orders" className="user-dropdown-item" onClick={() => setMenuOpen(false)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M5 6H11M5 8.5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Orders
                  </Link>
                  <Link to="/addresses" className="user-dropdown-item" onClick={() => setMenuOpen(false)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2C5.23858 2 3 4.23858 3 7C3 10.5 8 15 8 15C8 15 13 10.5 13 7C13 4.23858 10.7614 2 8 2Z" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="8" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    Addresses
                  </Link>
                  <Link to="/notifications" className="user-dropdown-item" onClick={() => setMenuOpen(false)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1.5C5.51472 1.5 3.5 3.51472 3.5 6V9.29289L2.64645 10.1464C2.41055 10.3823 2.35224 10.7417 2.50076 11.0401C2.64929 11.3385 2.97596 11.5 3.29289 11.5H12.7071C13.024 11.5 13.3507 11.3385 13.4992 11.0401C13.6478 10.7417 13.5895 10.3823 13.3536 10.1464L12.5 9.29289V6C12.5 3.51472 10.4853 1.5 8 1.5Z" stroke="currentColor" strokeWidth="1.25"/>
                      <path d="M6.5 11.5V12C6.5 12.8284 7.17157 13.5 8 13.5C8.82843 13.5 9.5 12.8284 9.5 12V11.5" stroke="currentColor" strokeWidth="1.25"/>
                    </svg>
                    Notifications
                  </Link>
                  <div className="user-dropdown-divider" />
                  <button className="user-dropdown-item user-dropdown-logout" onClick={handleLogout}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 2H4C2.89543 2 2 2.89543 2 4V12C2 13.1046 2.89543 14 4 14H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M10.5 11L14 8L10.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-link login-link">Log In</Link>
              {isHome ? (
                <a href="#pricing" className="btn btn-primary">Get Started</a>
              ) : (
                <Link to="/#pricing" className="btn btn-primary">Get Started</Link>
              )}
            </>
          )}
        </div>

        <button className="nav-toggle" id="navToggle" aria-label="Toggle menu" onClick={handleToggle}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
