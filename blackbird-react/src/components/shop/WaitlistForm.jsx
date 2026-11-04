import { useId, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { joinWaitlist, validateWaitlistContact } from '../../lib/shop';
import { SHOP_EMAIL, waitlistMailto } from '../../data/collection';

// Join a waitlist without an account. If the server can't take it, offer a ready-made email instead.
export default function WaitlistForm({ productId, productName }) {
  const { user, backendToken } = useAuth();
  const fieldId = useId();
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | joined | fallback
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const problem = validateWaitlistContact(email, phone);
    setError(problem);
    if (problem) return;
    setStatus('sending');
    const result = await joinWaitlist({ productId, email, phone, token: backendToken });
    setStatus(result.ok ? 'joined' : 'fallback');
  };

  if (status === 'joined') {
    return (
      <div className="wl-box wl-done" role="status">
        <strong>You're on the waitlist for {productName}.</strong>
        <p>We saved how to reach you about this item. No account needed.</p>
      </div>
    );
  }

  if (status === 'fallback') {
    const contact = [email.trim(), phone.trim()].filter(Boolean).join(' / ');
    return (
      <div className="wl-box" role="status">
        <strong>We couldn't save that online just now.</strong>
        <p>Send us a quick email instead and we'll add you to the waitlist for {productName}.</p>
        <a className="btn btn-primary btn-full" href={waitlistMailto(productName, contact)}>Email us to join the waitlist</a>
        <p className="wl-note">This opens your email app with a message to {SHOP_EMAIL}. Press Send to finish.</p>
        <button type="button" className="wl-link" onClick={() => setStatus('idle')}>Try again</button>
      </div>
    );
  }

  return (
    <form className="wl-box" onSubmit={handleSubmit} noValidate>
      <strong className="wl-title">Join the waitlist</strong>
      <p className="wl-note">Leave an email or a phone number. You don't need an account.</p>
      <label className="pd-label" htmlFor={`${fieldId}-email`}>Email</label>
      <input
        id={`${fieldId}-email`}
        className="wl-input"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="pd-label" htmlFor={`${fieldId}-phone`}>Phone (optional)</label>
      <input
        id={`${fieldId}-phone`}
        className="wl-input"
        type="tel"
        autoComplete="tel"
        placeholder="917-555-0100"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      {error && <div className="pd-cart-msg error" role="alert">{error}</div>}
      <button type="submit" className="btn btn-primary btn-full" disabled={status === 'sending'}>
        {status === 'sending' ? 'Joining...' : 'Join the waitlist'}
      </button>
    </form>
  );
}
