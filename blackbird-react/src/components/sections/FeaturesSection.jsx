export default function FeaturesSection() {
  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Features</span>
          <h2 className="section-title">Everything needed to protect those who matter most</h2>
          <p className="section-description">
            Advanced technology wrapped in a simple, comfortable wristband.
            Because safety should never be complicated.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card feature-large">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
                  <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2" />
                  <circle cx="16" cy="16" r="2" fill="currentColor" />
                  <path d="M16 2V6M16 26V30M2 16H6M26 16H30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <h3 className="feature-title">Real-Time GPS Tracking</h3>
            <p className="feature-description">
              See where your loved one is on a map.
              Set safe zones and get an alert when they leave one.
              Location history keeps you informed even when you can't be there.
            </p>
            <div className="feature-visual gps-visual">
              <div className="map-placeholder">
                <div className="map-dot"></div>
                <div className="map-pulse"></div>
                <div className="map-ring"></div>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon health">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M28 12H22L18 24L14 8L10 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <h3 className="feature-title">Health Monitoring</h3>
            <p className="feature-description">
              See temperature and other readings from the band, and set medicine reminders.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="6" y="4" width="20" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 8H20M12 12H20M12 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="16" cy="23" r="2" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <h3 className="feature-title">Mobile App</h3>
            <p className="feature-description">
              iOS and Android apps let caregivers monitor, communicate, and manage settings from anywhere.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4C10 4 4 8 4 16C4 24 10 28 16 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M16 4C22 4 28 8 28 16C28 24 22 28 16 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
                  <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <h3 className="feature-title">47 Languages</h3>
            <p className="feature-description">
              English, Spanish, Chinese, Russian, Hebrew, Arabic, Haitian Creole, Korean and many more.
              Coming to iPhone and Android in the next app update.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
