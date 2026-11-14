// Every line here must be true today, or say "next update". Black Bird alerts the people the wearer
// chooses; it does not contact 911, dispatch centers, police or fire departments.
export default function EmergencySection() {
  return (
    <section className="emergency-section" id="emergency">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Critical Safety</span>
          <h2 className="section-title">When every second counts</h2>
          <p className="section-description">
            SOS and fall alerts reach your Care Team and emergency contacts with your location,
            and your Medical ID helps whoever is with you. In a life-threatening emergency, always call 911.
          </p>
        </div>

        {/* Medical Professional Portal */}
        <div className="frc-hero">
          <div className="frc-hero-bg">
            <div className="frc-grid-lines"></div>
          </div>
          <div className="frc-hero-content">
            <div className="frc-hero-text">
              <div className="frc-badge-row">
                <div className="frc-live-badge">
                  <span className="frc-live-dot"></span>
                  <span>NEW · NEXT APP UPDATE</span>
                </div>
              </div>
              <h3 className="frc-hero-title">Medical Professional<br /><span className="gradient-text">Portal</span></h3>
              <p className="frc-hero-desc">
                EMS and hospital staff can scan your Medical QR or Protective Button. With a professional access code,
                they see what you chose to share: allergies, medicines, conditions and who to call. They can also send
                your family updates like "Transporting" and "Arrived".
              </p>
              <div className="frc-hero-stats">
                <div className="frc-stat">
                  <span className="frc-stat-value">You</span>
                  <span className="frc-stat-label">Choose what it shows</span>
                </div>
                <div className="frc-stat">
                  <span className="frc-stat-value">Who</span>
                  <span className="frc-stat-label">Opened your Medical ID</span>
                </div>
                <div className="frc-stat">
                  <span className="frc-stat-value">1 tap</span>
                  <span className="frc-stat-label">Call 911 from the app</span>
                </div>
              </div>
            </div>
            <div className="frc-hero-visual">
              {/* SOS Button with Rings */}
              <div className="sos-visual-large">
                <div className="sos-ring sos-ring-1"></div>
                <div className="sos-ring sos-ring-2"></div>
                <div className="sos-ring sos-ring-3"></div>
                <div className="sos-ring sos-ring-4"></div>
                <div className="sos-btn-core">
                  <span className="sos-btn-text">SOS</span>
                  <span className="sos-btn-sub">PRESS &amp; HOLD</span>
                </div>
              </div>
              {/* Who an SOS reaches */}
              <div className="sos-service-node node-police">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M2 17C2.5 13.8 4.5 12 7 12C9.5 12 11.5 13.8 12 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="14" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" /><path d="M13.5 12.2C15.8 12.4 17.4 14 18 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                <span>Family</span>
              </div>
              <div className="sos-service-node node-fire">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 17C10 17 3 12.8 3 8C3 5.8 4.8 4 7 4C8.3 4 9.4 4.7 10 5.7C10.6 4.7 11.7 4 13 4C15.2 4 17 5.8 17 8C17 12.8 10 17 10 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                <span>Caregivers</span>
              </div>
              <div className="sos-service-node node-ems">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 3H7.5L9 7L7 8.3C7.9 10.2 9.4 11.7 11.3 12.6L12.6 10.6L16.5 12.2V15.6C16.5 16.1 16.1 16.5 15.6 16.5C8.9 16.5 3.5 11.1 3.5 4.4C3.5 3.9 3.9 3.5 4.4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                <span>Emergency contacts</span>
              </div>
              <div className="sos-service-node node-dispatch">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 18C10 18 16 11.8 16 8C16 4.7 13.3 2 10 2C6.7 2 4 4.7 4 8C4 11.8 10 18 10 18Z" stroke="currentColor" strokeWidth="1.5" /><circle cx="10" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.5" /></svg>
                <span>Your location</span>
              </div>
            </div>
          </div>
        </div>

        {/* What the Medical Professional Portal shows */}
        <div className="frc-profile-section">
          <div className="frc-profile-header">
            <h4 className="frc-profile-title">What EMS and hospital staff can see</h4>
            <p className="frc-profile-subtitle">Only what you choose to share, after they scan your Medical ID with a professional access code. Everything is patient-reported.</p>
          </div>
          <div className="frc-profile-grid">
            <div className="frc-profile-card">
              <div className="frc-card-icon frc-icon-medical">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14 4V8M14 20V24M4 14H8M20 14H24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h5 className="frc-card-title">Medical Conditions</h5>
              <p className="frc-card-desc">Allergies, current medications, blood type, chronic conditions, surgical history</p>
              <div className="frc-card-tags">
                <span className="frc-tag">Allergies</span>
                <span className="frc-tag">Blood Type</span>
                <span className="frc-tag">Medications</span>
              </div>
            </div>
            <div className="frc-profile-card">
              <div className="frc-card-icon frc-icon-gps">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2" />
                  <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="2" />
                  <path d="M14 2V6M14 22V26M2 14H6M22 14H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h5 className="frc-card-title">Location</h5>
              <p className="frc-card-desc">Your live or last known location and street address, only if you allow it</p>
              <div className="frc-card-tags">
                <span className="frc-tag">Map</span>
                <span className="frc-tag">Address</span>
                <span className="frc-tag">You choose</span>
              </div>
            </div>
            <div className="frc-profile-card">
              <div className="frc-card-icon frc-icon-contacts">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="9" r="5" stroke="currentColor" strokeWidth="2" />
                  <path d="M5 24C5 19.5817 8.58172 16 13 16H15C19.4183 16 23 19.5817 23 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h5 className="frc-card-title">Emergency Contacts</h5>
              <p className="frc-card-desc">Family members, caregivers and who to call, with a call button</p>
              <div className="frc-card-tags">
                <span className="frc-tag">Family</span>
                <span className="frc-tag">Caregivers</span>
                <span className="frc-tag">Call</span>
              </div>
            </div>
            <div className="frc-profile-card">
              <div className="frc-card-icon frc-icon-care">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="4" y="3" width="20" height="22" rx="3" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 8H19M9 12H19M9 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h5 className="frc-card-title">Care Instructions</h5>
              <p className="frc-card-desc">Special needs, preferred language, communication notes and how to help</p>
              <div className="frc-card-tags">
                <span className="frc-tag">Special Needs</span>
                <span className="frc-tag">Language</span>
                <span className="frc-tag">Care Notes</span>
              </div>
            </div>
            <div className="frc-profile-card">
              <div className="frc-card-icon frc-icon-id">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="3" y="6" width="22" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 12H20M8 16H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h5 className="frc-card-title">Recent Events</h5>
              <p className="frc-card-desc">Recent SOS and fall alerts, and a handoff note for the hospital</p>
              <div className="frc-card-tags">
                <span className="frc-tag">SOS</span>
                <span className="frc-tag">Falls</span>
                <span className="frc-tag">Handoff</span>
              </div>
            </div>
            <div className="frc-profile-card">
              <div className="frc-card-icon frc-icon-device">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="6" y="4" width="16" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 8H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="14" cy="19" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <h5 className="frc-card-title">Device &amp; Health</h5>
              <p className="frc-card-desc">Band battery and recent health readings, if you share them</p>
              <div className="frc-card-tags">
                <span className="frc-tag">Battery</span>
                <span className="frc-tag">Temperature</span>
                <span className="frc-tag">You choose</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fall Detection + SOS Grid */}
        <div className="emergency-grid">
          {/* Fall Detection */}
          <div className="emergency-card emergency-fall">
            <div className="emergency-card-header">
              <div className="emergency-icon-badge fall-badge">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 16L8 28M20 16L24 28M16 14V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M10 20L22 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="emergency-label">Fall Detection</span>
            </div>
            <h3 className="emergency-title">Falls detected.<br />Your Care Team alerted.</h3>
            <p className="emergency-description">
              The band's motion sensors watch for hard falls. When one is detected, you get a moment to cancel.
              If you don't, your Care Team and emergency contacts are alerted with your location — no button press needed.
              Keep your phone nearby with Bluetooth on.
            </p>

            <div className="fall-timeline">
              <h4 className="fall-timeline-title">What happens when a fall is detected</h4>
              <div className="timeline-steps">
                <div className="timeline-step">
                  <div className="timeline-marker">
                    <div className="timeline-dot active"></div>
                    <div className="timeline-line"></div>
                  </div>
                  <div className="timeline-content">
                    <span className="timeline-time">Fall</span>
                    <span className="timeline-event">The band senses a hard fall</span>
                  </div>
                </div>
                <div className="timeline-step">
                  <div className="timeline-marker">
                    <div className="timeline-dot"></div>
                    <div className="timeline-line"></div>
                  </div>
                  <div className="timeline-content">
                    <span className="timeline-time">Countdown</span>
                    <span className="timeline-event">You get a moment to cancel. Next update: a full-screen, loud countdown with a big "I'm OK" button</span>
                  </div>
                </div>
                <div className="timeline-step">
                  <div className="timeline-marker">
                    <div className="timeline-dot"></div>
                    <div className="timeline-line"></div>
                  </div>
                  <div className="timeline-content">
                    <span className="timeline-time">Alert</span>
                    <span className="timeline-event">Your Care Team and emergency contacts are alerted with your location</span>
                  </div>
                </div>
                <div className="timeline-step">
                  <div className="timeline-marker">
                    <div className="timeline-dot"></div>
                  </div>
                  <div className="timeline-content">
                    <span className="timeline-time">No answer?</span>
                    <span className="timeline-event">Next update: Black Bird alerts again, then phones your emergency contacts</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="sensor-stats">
              <div className="sensor-stat">
                <span className="sensor-value">Cancel</span>
                <span className="sensor-label">If you're OK</span>
              </div>
              <div className="sensor-stat">
                <span className="sensor-value">GPS</span>
                <span className="sensor-label">Live or last known</span>
              </div>
              <div className="sensor-stat">
                <span className="sensor-value">Phone</span>
                <span className="sensor-label">Keep it nearby</span>
              </div>
            </div>
          </div>

          {/* One-Touch SOS */}
          <div className="emergency-card emergency-sos">
            <div className="emergency-card-glow"></div>
            <div className="emergency-card-header">
              <div className="emergency-icon-badge sos-badge">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4V8M16 24V28M4 16H8M24 16H28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2.5" />
                </svg>
              </div>
              <span className="emergency-label">One-Touch SOS</span>
            </div>
            <h3 className="emergency-title">One press.<br />Your people alerted.</h3>
            <p className="emergency-description">
              A single press alerts your Care Team and emergency contacts by push and text, with your location.
              Call 911 with one tap from the same screen.
            </p>

            <div className="sos-flow">
              <div className="sos-flow-step">
                <div className="sos-flow-num">1</div>
                <div className="sos-flow-content">
                  <strong>SOS Sent</strong>
                  <span>Press SOS in the app or on your band</span>
                </div>
              </div>
              <div className="sos-flow-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="sos-flow-step">
                <div className="sos-flow-num">2</div>
                <div className="sos-flow-content">
                  <strong>Care Team Alerted</strong>
                  <span>Push alerts and texts with your location</span>
                </div>
              </div>
              <div className="sos-flow-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="sos-flow-step">
                <div className="sos-flow-num">3</div>
                <div className="sos-flow-content">
                  <strong>Help Is on the Way</strong>
                  <span>Next update: family taps "I'm on my way" and you see who is coming</span>
                </div>
              </div>
              <div className="sos-flow-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="sos-flow-step">
                <div className="sos-flow-num">4</div>
                <div className="sos-flow-content">
                  <strong>Call 911</strong>
                  <span>One tap from the SOS screen, any time you need it</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
