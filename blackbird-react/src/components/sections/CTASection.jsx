export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to protect your loved ones?</h2>
          <p className="cta-description">
            Join thousands of families who trust Black Bird Smart Innovations for peace of mind.
          </p>
          <div className="cta-buttons">
            <a href="#pricing" className="btn btn-primary btn-large">Get Started Today</a>
            <a href="tel:+19179770949" className="btn btn-secondary btn-large">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 4.5C3 3.67157 3.67157 3 4.5 3H7.37163C7.73999 3 8.06662 3.23053 8.18994 3.57655L9.28324 6.85607C9.42225 7.24584 9.26178 7.68036 8.89897 7.8842L7.17899 8.85034C8.08984 10.8541 9.64593 12.4102 11.6497 13.321L12.6158 11.601C12.8196 11.2382 13.2542 11.0778 13.6439 11.2168L16.9234 12.3101C17.2695 12.4334 17.5 12.76 17.5 13.1284V16C17.5 16.8284 16.8284 17.5 16 17.5H15C8.37258 17.5 3 12.1274 3 5.5V4.5Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span>Call Us: 917-977-0949</span>
            </a>
          </div>
          <div className="cta-app-buttons">
            <a href="https://apps.apple.com/us/app/black-bird-smart-wrist-band/id6753858321" target="_blank" rel="noopener noreferrer" className="app-store-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" className="store-icon">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="store-text">
                <span className="store-subtitle">Download on the</span>
                <span className="store-title">App Store</span>
              </div>
            </a>
            <a href="https://storage.googleapis.com/blackbird-website-prod-media/releases/android/blackbird-2.1-20.apk" target="_blank" rel="noopener noreferrer" className="app-store-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" className="store-icon">
                <path d="M11 3h2v10.17l3.59-3.58L18 11l-6 6-6-6 1.41-1.41L11 13.17V3ZM5 19h14v2H5v-2Z" />
              </svg>
              <div className="store-text">
                <span className="store-subtitle">Download the</span>
                <span className="store-title">Android app</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
