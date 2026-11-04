export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <a href="#new-features" className="hero-badge hero-badge-link">
            <span className="pulse-dot"></span>
            <span>New in Black Bird: see what's coming</span>
          </a>
          <h1 className="hero-title">
            Safety that watches over{' '}
            <span className="gradient-text">your loved ones</span>
          </h1>
          <p className="hero-description">
            Black Bird Smart Innovations is a protective smart wristband designed for vulnerable individuals.
            GPS tracking, emergency SOS, fall detection, and health monitoring —
            all connected to the people who care most.
          </p>
          <div className="hero-cta">
            <a href="#pricing" className="btn btn-primary btn-large">
              <span>Start Protection</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#video" className="btn btn-ghost">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 7L13 10L8 13V7Z" fill="currentColor" />
              </svg>
              <span>Watch the Video</span>
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">1 tap</span>
              <span className="stat-label">SOS alerts your Care Team</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">Falls</span>
              <span className="stat-label">Alerts sent automatically</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">47</span>
              <span className="stat-label">Languages in the next update</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="watch-showcase">
            <div className="watch-glow"></div>
            <div className="watch-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>
            <img src="/images/About-Us-Watch-Image.png" alt="Black Bird Smart Wristband" className="watch-image" />
            <div className="floating-card card-sos">
              <div className="card-icon sos-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="card-text">
                <span className="card-title">SOS Activated</span>
                <span className="card-subtitle">Care Team alerted</span>
              </div>
            </div>
            <div className="floating-card card-location">
              <div className="card-icon location-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21C12 21 19 13.5 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 13.5 12 21 12 21Z" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="card-text">
                <span className="card-title">GPS Active</span>
                <span className="card-subtitle">Location shared</span>
              </div>
            </div>
            <div className="floating-card card-health">
              <div className="card-icon health-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="card-text">
                <span className="card-title">98.6°F</span>
                <span className="card-subtitle">Normal temp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <span>Scroll to explore</span>
        <div className="scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
