import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function MobileMenu() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const isHome = pathname === '/';

  const closeMenu = () => {
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    navToggle?.classList.remove('active');
    mobileMenu?.classList.remove('active');
    document.body.style.overflow = '';
  };

  return (
    <div className="mobile-menu" id="mobileMenu">
      <div className="mobile-menu-content">
        {isHome ? (
          <>
            <a href="#features" className="mobile-link" onClick={closeMenu}>Features</a>
            <a href="#products" className="mobile-link" onClick={closeMenu}>Products</a>
            <a href="#how-it-works" className="mobile-link" onClick={closeMenu}>How It Works</a>
            <a href="#pricing" className="mobile-link" onClick={closeMenu}>Pricing</a>
          </>
        ) : (
          <>
            <Link to="/#features" className="mobile-link" onClick={closeMenu}>Features</Link>
            <Link to="/#products" className="mobile-link" onClick={closeMenu}>Products</Link>
            <Link to="/#how-it-works" className="mobile-link" onClick={closeMenu}>How It Works</Link>
            <Link to="/#pricing" className="mobile-link" onClick={closeMenu}>Pricing</Link>
          </>
        )}
        <Link to="/about" className="mobile-link" onClick={closeMenu}>About</Link>
        <Link to="/products" className="mobile-link" onClick={closeMenu}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ verticalAlign: 'middle', marginRight: 8 }}>
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2"/>
            <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Shop
        </Link>
        {!user && <Link to="/cart" className="mobile-link" onClick={closeMenu}>Cart</Link>}

        {user && (
          <div className="mobile-account-grid">
            <Link to="/profile" className="mobile-account-item" onClick={closeMenu}>
              <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2.5 14C2.5 11.5 4.96 9.5 8 9.5C11.04 9.5 13.5 11.5 13.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Profile</span>
            </Link>
            <Link to="/orders" className="mobile-account-item" onClick={closeMenu}>
              <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5 6H11M5 8.5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Orders</span>
            </Link>
            <Link to="/cart" className="mobile-account-item" onClick={closeMenu}>
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                <path d="M6 6H3L1 18H19L17 6H14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M6 6V4C6 2.34315 7.34315 1 9 1H11C12.6569 1 14 2.34315 14 4V6" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span>Cart</span>
            </Link>
            <Link to="/addresses" className="mobile-account-item" onClick={closeMenu}>
              <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
                <path d="M8 2C5.23858 2 3 4.23858 3 7C3 10.5 8 15 8 15C8 15 13 10.5 13 7C13 4.23858 10.7614 2 8 2Z" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="8" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span>Addresses</span>
            </Link>
            <Link to="/notifications" className="mobile-account-item" onClick={closeMenu}>
              <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5C5.51472 1.5 3.5 3.51472 3.5 6V9.29289L2.64645 10.1464C2.41055 10.3823 2.35224 10.7417 2.50076 11.0401C2.64929 11.3385 2.97596 11.5 3.29289 11.5H12.7071C13.024 11.5 13.3507 11.3385 13.4992 11.0401C13.6478 10.7417 13.5895 10.3823 13.3536 10.1464L12.5 9.29289V6C12.5 3.51472 10.4853 1.5 8 1.5Z" stroke="currentColor" strokeWidth="1.25"/>
                <path d="M6.5 11.5V12C6.5 12.8284 7.17157 13.5 8 13.5C8.82843 13.5 9.5 12.8284 9.5 12V11.5" stroke="currentColor" strokeWidth="1.25"/>
              </svg>
              <span>Alerts</span>
            </Link>
          </div>
        )}

        <div className="mobile-menu-actions">
          {user ? (
            <>
              <button onClick={() => { logout(); closeMenu(); }} className="btn btn-primary btn-full">Log Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary" onClick={closeMenu}>Log In</Link>
              {isHome ? (
                <a href="#pricing" className="btn btn-primary" onClick={closeMenu}>Get Started</a>
              ) : (
                <Link to="/#pricing" className="btn btn-primary" onClick={closeMenu}>Get Started</Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
