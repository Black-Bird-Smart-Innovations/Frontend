import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img className="logo-icon" src="/images/main-logo.png" alt="Black Bird Logo" />
              <span>lack Bird Smart Innovations<sup>TM</sup></span>
            </Link>
            <p className="footer-tagline">
              Protective technology for vulnerable individuals.
              Keeping families connected, keeping loved ones safe.
            </p>
            <div className="footer-contact">
              <a href="tel:+19179770949" className="contact-item">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2.5 3.5C2.5 2.67157 3.17157 2 4 2H6.5C6.86836 2 7.19499 2.23053 7.31831 2.57655L8.28324 5.85607C8.42225 6.24584 8.26178 6.68036 7.89897 6.8842L6.17899 7.85034C7.08984 9.85409 8.64593 11.4102 10.6497 12.321L11.6158 10.601C11.8196 10.2382 12.2542 10.0778 12.6439 10.2168L15.9234 11.3101C16.2695 11.4334 16.5 11.76 16.5 12.1284V15C16.5 15.8284 15.8284 16.5 15 16.5H14C7.37258 16.5 2.5 11.6274 2.5 5V3.5Z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                917-977-0949
              </a>
              <a href="mailto:blackbird_tech@yahoo.com" className="contact-item">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 6L9 10L16 6" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                blackbird_tech@yahoo.com
              </a>
            </div>
          </div>

          <div className="footer-links-group">
            <div className="footer-column">
              <h4 className="footer-heading">Product</h4>
              <Link to="/#features" className="footer-link">Features</Link>
              <Link to="/#products" className="footer-link">Products</Link>
              <Link to="/#pricing" className="footer-link">Pricing</Link>
              <Link to="/#how-it-works" className="footer-link">How It Works</Link>
            </div>
            <div className="footer-column">
              <h4 className="footer-heading">Company</h4>
              <Link to="/about" className="footer-link">About Us</Link>
              <a href="mailto:blackbird_tech@yahoo.com?subject=Black%20Bird%20website%20inquiry" className="footer-link">Contact</a>
              <a href="mailto:blackbird_tech@yahoo.com?subject=Black%20Bird%20career%20inquiry" className="footer-link">Careers</a>
              <a href="https://www.newswire.com/news/black-bird-smart-innovations-llc-launches-medicaid-approved-smart-22613798" className="footer-link" target="_blank" rel="noreferrer">Press</a>
            </div>
            <div className="footer-column">
              <h4 className="footer-heading">Legal</h4>
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
              <Link to="/terms" className="footer-link">Terms of Service</Link>
              <Link to="/terms" className="footer-link">EULA</Link>
              <Link to="/privacy" className="footer-link">HIPAA Notice</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">&copy; {new Date().getFullYear()} Black Bird Smart Innovations. All rights reserved.</p>
          <a href="mailto:blackbird_tech@yahoo.com" className="footer-link">Get in touch</a>
        </div>
      </div>
    </footer>
  );
}
