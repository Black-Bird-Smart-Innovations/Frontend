import '../css/legal.css';

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-meta">Effective Date: January 18, 2023</p>
        </header>
        <div className="legal-content">
          {/* Introduction */}
          <section className="legal-section">
            <p className="legal-intro">At Black Bird Smart Innovations, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our medical safety wristband and associated mobile application.</p>
          </section>

          {/* Company Contact Information */}
          <section className="legal-section">
            <h2>Company Contact Information</h2>
            <div className="contact-card">
              <p><strong>Black Bird Smart Innovations</strong></p>
              <p>230 West Route 59 #1047</p>
              <p>Nanuet, NY 10954</p>
              <p>Email: <a href="mailto:Blackbird_tech@yahoo.com">Blackbird_tech@yahoo.com</a></p>
              <p>Phone: <a href="tel:917-977-0949">917-977-0949</a></p>
            </div>
          </section>

          {/* Personal Information We Collect */}
          <section className="legal-section">
            <h2>Personal Information We Collect</h2>
            <h3>Basic Information</h3>
            <ul>
              <li>Names</li>
              <li>Phone numbers</li>
              <li>Email addresses</li>
              <li>Usernames and passwords</li>
              <li>Contact preferences</li>
              <li>Billing addresses</li>
            </ul>
            <h3>Payment Information</h3>
            <p>Payment card information is processed securely by our external payment providers. We do not store your complete payment card details on our servers.</p>
            <h3>Health &amp; Sensitive Data</h3>
            <p>To provide our safety monitoring services, we may collect:</p>
            <ul>
              <li>Health information (heart rate, activity levels, fall detection data)</li>
              <li>Location data for emergency response</li>
              <li>Genetic data (if provided for medical alert purposes)</li>
            </ul>
            <h3>Device &amp; Technical Data</h3>
            <ul>
              <li>IP addresses</li>
              <li>Device identifiers</li>
              <li>Geolocation data</li>
              <li>Browser information</li>
            </ul>
            <h3>Mobile App Permissions</h3>
            <p>Our mobile application may request access to:</p>
            <ul>
              <li><strong>Geolocation:</strong> For location sharing and for the location sent with SOS and fall alerts</li>
              <li><strong>Bluetooth:</strong> To connect with your Black Bird wristband</li>
              <li><strong>Camera:</strong> For QR code scanning and profile photos</li>
              <li><strong>Contacts:</strong> To set up emergency contact lists</li>
              <li><strong>Microphone:</strong> For two-way communication features</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="legal-section">
            <h2>How We Use Your Information</h2>
            <ol>
              <li><strong>Account Management:</strong> To create and authenticate your account</li>
              <li><strong>Safety Services:</strong> To provide GPS tracking, emergency alerts, and health monitoring</li>
              <li><strong>Customer Support:</strong> To respond to your inquiries and requests</li>
              <li><strong>Order Fulfillment:</strong> To process orders and manage payments</li>
              <li><strong>Communications:</strong> To send service updates and marketing (with consent)</li>
              <li><strong>Security:</strong> To prevent fraud and protect our services</li>
              <li><strong>Improvements:</strong> To analyze usage and improve our products</li>
            </ol>
          </section>

          {/* Data Sharing */}
          <section className="legal-section">
            <h2>Data Sharing</h2>
            <h3>Third-Party Services</h3>
            <p>We may share data with trusted third parties including:</p>
            <ul>
              <li>Google Maps Platform APIs (for location services)</li>
              <li>Payment processors (for secure transactions)</li>
              <li>Your Care Team and emergency contacts (when an SOS or fall alert is sent)</li>
              <li>Healthcare providers (with your consent)</li>
            </ul>
            <h3>Business Transfers</h3>
            <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</p>
          </section>

          {/* Your Rights */}
          <section className="legal-section">
            <h2>Your Rights</h2>
            <h3>For Users in Canada, EEA, UK, and Switzerland</h3>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Rectify inaccurate data</li>
              <li>Request erasure of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
              <li>Unsubscribe from marketing communications</li>
            </ul>
            <h3>California Residents</h3>
            <p>California residents have additional rights under the "Shine The Light" legislation and the California Consumer Privacy Act (CCPA). Contact us to exercise these rights.</p>
          </section>

          {/* Security & Data Retention */}
          <section className="legal-section">
            <h2>Security &amp; Data Retention</h2>
            <p>We implement technical and organizational security measures to protect your personal information. These include encryption, secure servers, and access controls.</p>
            <p>Your data is retained only as long as necessary to fulfill the purposes outlined in this policy, or as required by law.</p>
            <div className="legal-notice">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6V10M10 14V14.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              <p>Please note: No electronic transmission over the Internet can be guaranteed to be 100% secure. While we strive to protect your information, we cannot guarantee absolute security.</p>
            </div>
          </section>

          {/* Changes to This Policy */}
          <section className="legal-section">
            <h2>Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Effective Date" at the top.</p>
          </section>

          {/* Contact Us */}
          <section className="legal-section">
            <h2>Contact Us</h2>
            <p>If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:</p>
            <div className="contact-card">
              <p>Email: <a href="mailto:Blackbird_tech@yahoo.com">Blackbird_tech@yahoo.com</a></p>
              <p>Phone: <a href="tel:917-977-0949">917-977-0949</a></p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
