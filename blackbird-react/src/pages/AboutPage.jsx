import '../css/about.css';

export default function AboutPage() {
  return (
    <>
      {/* About Hero */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <span className="section-tag">About Us</span>
            <h1 className="about-title">
              Technology that cares.
              <span className="gradient-text"> People who protect.</span>
            </h1>
            <p className="about-subtitle">
              We're on a mission to support vulnerable individuals by combining innovative wearable
              technology with a protective community network — because everyone deserves to feel safe.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2 className="section-title">Our Mission</h2>
              <p className="mission-statement">
                "To support vulnerable individuals by providing critical information stored in
                the mobile application and utilize the individual's protective community and
                link all caring supports through our technology system."
              </p>
              <p className="mission-description">
                Black Bird Smart Innovations was founded with a simple belief: that modern technology should serve
                those who need it most. For families caring for elderly parents, children with
                special needs, or individuals with cognitive concerns, peace of mind shouldn't
                be a luxury — it should be a given.
              </p>
            </div>
            <div className="mission-visual">
              <div className="mission-image-wrapper">
                <img src="/images/Our-Smart-Wristband-bb.png" alt="Black Bird Smart Wristband" className="mission-image" />
                <div className="mission-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Values</span>
            <h2 className="section-title">What drives everything we do</h2>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon"><svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 5L5 12.5V20C5 28.5 11.4 36.3 20 38.5C28.6 36.3 35 28.5 35 20V12.5L20 5Z" stroke="currentColor" strokeWidth="2"/><path d="M14 20L18 24L26 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              <h3 className="value-title">Safety First</h3>
              <p className="value-description">Every decision we make starts with one question: does this make our users safer? We never compromise on the features that protect lives.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="12" r="6" stroke="currentColor" strokeWidth="2"/><path d="M10 34C10 27.4 14.5 22 20 22C25.5 22 30 27.4 30 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="32" cy="18" r="4" stroke="currentColor" strokeWidth="2"/><path d="M35 30C35 26.4 33.2 23.5 31 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="8" cy="18" r="4" stroke="currentColor" strokeWidth="2"/><path d="M5 30C5 26.4 6.8 23.5 9 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></div>
              <h3 className="value-title">Community Care</h3>
              <p className="value-description">Protection works best when it's shared. We bring the wearer, family members and caregivers together in one Care Team, so the right people hear about it when something happens.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="8" y="5" width="24" height="30" rx="3" stroke="currentColor" strokeWidth="2"/><circle cx="20" cy="28" r="3" stroke="currentColor" strokeWidth="2"/><path d="M14 10H26M14 15H26M14 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></div>
              <h3 className="value-title">Simple Technology</h3>
              <p className="value-description">Advanced doesn't mean complicated. We hide complexity behind intuitive interfaces that anyone can use — regardless of technical experience.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="2"/><path d="M12 20L18 26L28 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              <h3 className="value-title">Reliability</h3>
              <p className="value-description">We say plainly what Black Bird does and doesn't do. Black Bird alerts the people you choose. In a life-threatening emergency, always call 911 yourself.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="product-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">The Device</span>
            <h2 className="section-title">What you get with Black Bird Smart Innovations</h2>
            <p className="section-description">A lightweight, comfortable wristband packed with protective technology.</p>
          </div>
          <div className="product-features">
            <div className="product-showcase">
              <div className="showcase-image-wrapper">
                <img src="/images/About-Us-Watch-Image.png" alt="Black Bird Device" className="showcase-image" />
                <div className="showcase-glow"></div>
              </div>
            </div>
            <div className="product-specs">
              <div className="spec-group">
                <h3 className="spec-group-title">Core Features</h3>
                <div className="spec-list">
                  <div className="spec-item">
                    <div className="spec-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/><path d="M12 2V4M12 20V22M2 12H4M20 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></div>
                    <div className="spec-content"><h4>GPS Location Tracking</h4><p>Real-time monitoring with geofencing capabilities</p></div>
                  </div>
                  <div className="spec-item">
                    <div className="spec-icon sos"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4V8M12 16V20M4 12H8M16 12H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/></svg></div>
                    <div className="spec-content"><h4>One-Touch SOS</h4><p>One press alerts your Care Team and emergency contacts with your location</p></div>
                  </div>
                  <div className="spec-item">
                    <div className="spec-icon health"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 10H16L14 18L10 6L8 10H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                    <div className="spec-content"><h4>Body Temperature Monitoring</h4><p>Real-time health tracking and alerts</p></div>
                  </div>
                  <div className="spec-item">
                    <div className="spec-icon fall"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="3" stroke="currentColor" strokeWidth="2"/><path d="M9 12L6 20M15 12L18 20M12 10V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M8 14H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></div>
                    <div className="spec-content"><h4>Fall Detection</h4><p>Accelerometer + gyroscope for reliable fall alerts</p></div>
                  </div>
                </div>
              </div>
              <div className="spec-group">
                <h3 className="spec-group-title">Advanced Capabilities</h3>
                <div className="spec-list">
                  <div className="spec-item">
                    <div className="spec-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 15V16C21 18.2091 19.2091 20 17 20H7C4.79086 20 3 18.2091 3 16V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M12 4V14M12 14L8 10M12 14L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                    <div className="spec-content"><h4>Push &amp; Text Alerts</h4><p>Alerts go to your Care Team and emergency contacts</p></div>
                  </div>
                  <div className="spec-item">
                    <div className="spec-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4C12 4 15.5 4 17 5.5C18.5 7 18.5 10.5 18.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M12 8C12 8 13.5 8 14.5 9C15.5 10 15.5 11.5 15.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="2" fill="currentColor"/><rect x="4" y="10" width="6" height="10" rx="1" stroke="currentColor" strokeWidth="2"/></svg></div>
                    <div className="spec-content"><h4>Bluetooth Connectivity</h4><p>Seamless pairing with iOS and Android apps</p></div>
                  </div>
                  <div className="spec-item">
                    <div className="spec-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 7V12L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></div>
                    <div className="spec-content"><h4>Medication Reminders</h4><p>Customized voice alerts for medications</p></div>
                  </div>
                  <div className="spec-item">
                    <div className="spec-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></div>
                    <div className="spec-content"><h4>47 Languages</h4><p>Spanish, Chinese, Arabic, Russian, Hebrew &amp; many more, in the next app update</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <span className="section-tag">Get in Touch</span>
              <h2 className="section-title">We'd love to hear from you</h2>
              <p className="contact-description">Have questions about Black Bird Smart Innovations? Want to learn more about how we can help protect your loved ones? Reach out — we're here to help.</p>
              <div className="contact-methods">
                <a href="tel:917-977-0949" className="contact-method">
                  <div className="method-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 5.5C3 4.67157 3.67157 4 4.5 4H7.37163C7.73999 4 8.06662 4.23053 8.18994 4.57655L9.28324 7.85607C9.42225 8.24584 9.26178 8.68036 8.89897 8.8842L7.17899 9.85034C8.08984 11.8541 9.64593 13.4102 11.6497 14.321L12.6158 12.601C12.8196 12.2382 13.2542 12.0778 13.6439 12.2168L16.9234 13.3101C17.2695 13.4334 17.5 13.76 17.5 14.1284V17C17.5 17.8284 16.8284 18.5 16 18.5H15C8.37258 18.5 3 13.1274 3 6.5V5.5Z" stroke="currentColor" strokeWidth="1.5"/></svg></div>
                  <div className="method-content"><span className="method-label">Phone</span><span className="method-value">917-977-0949</span></div>
                </a>
                <a href="mailto:blackbird_tech@yahoo.com" className="contact-method">
                  <div className="method-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="1.5"/></svg></div>
                  <div className="method-content"><span className="method-label">Email</span><span className="method-value">blackbird_tech@yahoo.com</span></div>
                </a>
                <div className="contact-method">
                  <div className="method-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 19 13.5 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 13.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.5"/></svg></div>
                  <div className="method-content"><span className="method-label">Address</span><span className="method-value">230 West Route 59 #1047<br />Nanuet, NY 10954</span></div>
                </div>
              </div>
            </div>
            <div className="contact-cta">
              <div className="cta-card">
                <h3>Ready to get started?</h3>
                <p>Call or email us and we'll help you choose the right setup for your family.</p>
                <a href="/#pricing" className="btn btn-primary btn-large">
                  <span>View Pricing</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
