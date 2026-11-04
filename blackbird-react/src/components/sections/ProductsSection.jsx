import { Link } from 'react-router-dom';
import { quoteMailto } from '../../data/collection';

export default function ProductsSection() {
  return (
    <section className="products-section" id="products">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Our Products</span>
          <h2 className="section-title">Choose the right protection for your needs</h2>
          <p className="section-description">
            From smart wristbands and SOS buttons to pendants and smartphones — we have protection options for every situation.
          </p>
        </div>

        <div className="products-grid">
          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="/images/products/x5-wristband.png" alt="Black Bird X5 Smart Wristband" className="product-image" />
            </div>
            <div className="product-info">
              <h3 className="product-name">Black Bird "X5" Smart Wristband</h3>
              <p className="product-subtitle">BTE (Bluetooth Edition)</p>
              <div className="product-features">
                <span className="product-feature">GPS Tracking</span>
                <span className="product-feature">Fall Detection</span>
                <span className="product-feature">SOS Button</span>
              </div>
              <div className="product-price">
                <span className="price-amount">Get a quote</span>
              </div>
              <Link to="/products/watches" className="btn btn-primary product-btn">See details</Link>
            </div>
          </div>

          <div className="product-card featured">
            <div className="product-badge">Most Popular</div>
            <div className="product-image-wrapper">
              <img src="/images/Pendant.PNG" alt="Black Bird Pendant V45" className="product-image product-image-fill" />
            </div>
            <div className="product-info">
              <h3 className="product-name">LTE Smart Blackbird Pendant (Bold)</h3>
              <p className="product-subtitle">LTE/Nano SIM</p>
              <div className="product-features">
                <span className="product-feature">LTE Cellular</span>
                <span className="product-feature">GPS Tracking</span>
                <span className="product-feature">Health Monitor</span>
                <span className="product-feature">SOS Button</span>
                <span className="product-feature">Touchscreen</span>
              </div>
              <p className="product-compat">Compatible with <strong>SpeedTalk</strong> (T-Mobile Network)</p>
              <div className="product-price">
                <span className="price-amount">Get a quote</span>
              </div>
              <Link to="/products/pendant" className="btn btn-primary product-btn">See details</Link>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="/images/products/qr-sleeve.png" alt="QR Code Medical ID Sleeve" className="product-image" />
            </div>
            <div className="product-info">
              <h3 className="product-name">QR Code Medical ID Sleeve</h3>
              <p className="product-subtitle">ID Card Protection</p>
              <div className="product-features">
                <span className="product-feature">QR Code Access</span>
                <span className="product-feature">Medical Info</span>
                <span className="product-feature">Waterproof</span>
              </div>
              <div className="product-price">
                <span className="price-amount">Get a quote</span>
              </div>
              <a href={quoteMailto('QR Code Medical ID Sleeve')} className="btn btn-primary product-btn">Email us for a quote</a>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="/images/Button.PNG" alt="Black Bird Protective Button" className="product-image" />
            </div>
            <div className="product-info">
              <h3 className="product-name">Black Bird Protective Button</h3>
              <p className="product-subtitle">Emergency info, close at hand</p>
              <div className="product-features">
                <span className="product-feature">Tap or Scan for Medical ID</span>
                <span className="product-feature">Discreet Design</span>
                <span className="product-feature">Clip-On</span>
              </div>
              <div className="product-price">
                <span className="price-amount">Get a quote</span>
              </div>
              <Link to="/products/buttons" className="btn btn-primary product-btn">See details</Link>
            </div>
          </div>

          <div className="product-card featured">
            <div className="product-badge">New</div>
            <div className="product-image-wrapper">
              <img src="/images/Phone.PNG" alt="Black Bird Blaze" className="product-image product-image-fill" />
            </div>
            <div className="product-info">
              <h3 className="product-name">Black Bird Blaze</h3>
              <p className="product-subtitle">5G / Black Bird OS</p>
              <div className="product-features">
                <span className="product-feature">5G Connectivity</span>
                <span className="product-feature">Built-in SOS</span>
                <span className="product-feature">GPS Tracking</span>
                <span className="product-feature">BB App Suite</span>
              </div>
              <div className="product-price">
                <span className="price-amount">Coming Soon</span>
              </div>
              <Link to="/products/more" className="btn btn-primary product-btn">Join the waitlist</Link>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image-wrapper">
              <img src="/images/plush-gigapixel-standard v2-2x.jpeg" alt="Black Bird Buddy" className="product-image" />
            </div>
            <div className="product-info">
              <h3 className="product-name">Black Bird Buddy</h3>
              <p className="product-subtitle">Comfort Companion</p>
              <div className="product-features">
                <span className="product-feature">Soft &amp; Cuddly</span>
                <span className="product-feature">Kid Friendly</span>
                <span className="product-feature">Collectible</span>
              </div>
              <div className="product-price">
                <span className="price-amount">$29.99</span>
              </div>
              <Link to="/products/stuffies" className="btn btn-primary product-btn">Join the waitlist</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
