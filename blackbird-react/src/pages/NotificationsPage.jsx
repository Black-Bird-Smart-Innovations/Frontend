/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';
import '../css/shop.css';

export default function NotificationsPage() {
  const { user, backendToken, backendLoading, loading: authLoading } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!backendToken) {
      if (!backendLoading) setLoading(false);
      return;
    }
    setLoading(true);
    apiFetch('/user/notifications', { token: backendToken })
      .then(res => setNotifications(res.data || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [backendToken, backendLoading]);

  if (authLoading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const handleClearAll = async () => {
    try {
      await apiFetch('/user/notifications/clear-all', { token: backendToken });
      setNotifications([]);
    } catch (err) {
      setError(err.message);
    }
  };

  const getIcon = (type) => {
    if (type?.includes('order_confirmed') || type?.includes('OrderNotification'))
      return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="2" stroke="var(--color-success)" strokeWidth="1.5"/><path d="M6 10L9 13L14 7" stroke="var(--color-success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    if (type?.includes('cancel'))
      return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="var(--color-primary)" strokeWidth="1.5"/><path d="M7 7L13 13M13 7L7 13" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round"/></svg>;
    return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2C6.68629 2 4 4.68629 4 8V11.5858L3.29289 12.2929C3.00517 12.5806 2.92797 13.0139 3.07612 13.3827C3.22427 13.7516 3.57452 14 3.96353 14H16.0365C16.4255 14 16.7757 13.7516 16.9239 13.3827C17.072 13.0139 16.9948 12.5806 16.7071 12.2929L16 11.5858V8C16 4.68629 13.3137 2 10 2Z" stroke="var(--color-info)" strokeWidth="1.5"/><path d="M8 14V15C8 16.1046 8.89543 17 10 17C11.1046 17 12 16.1046 12 15V14" stroke="var(--color-info)" strokeWidth="1.5"/></svg>;
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="shop-page">
      <div className="shop-container shop-container-narrow">
        <div className="shop-header">
          <div>
            <h1 className="shop-title">Notifications</h1>
            <p className="shop-subtitle">{notifications.length} notification{notifications.length !== 1 ? 's' : ''}</p>
          </div>
          {notifications.length > 0 && (
            <button className="btn btn-outline btn-sm" onClick={handleClearAll}>Clear All</button>
          )}
        </div>

        {loading ? (
          <div className="shop-loading"><div className="spinner" /><p>Loading notifications...</p></div>
        ) : error ? (
          <div className="shop-empty"><p>{error}</p></div>
        ) : notifications.length === 0 ? (
          <div className="shop-empty">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M24 6C17.3726 6 12 11.3726 12 18V25.1716L10.5858 26.5858C10.011 27.1607 9.85594 28.0278 10.1522 28.7654C10.4485 29.503 11.149 30 11.9271 30H36.0729C36.851 30 37.5515 29.503 37.8478 28.7654C38.1441 28.0278 37.989 27.1607 37.4142 26.5858L36 25.1716V18C36 11.3726 30.6274 6 24 6Z" stroke="currentColor" strokeWidth="2"/><path d="M20 30V32C20 34.2091 21.7909 36 24 36C26.2091 36 28 34.2091 28 32V30" stroke="currentColor" strokeWidth="2"/></svg>
            <p>No notifications yet.</p>
          </div>
        ) : (
          <div className="notifications-list">
            {notifications.map(n => (
              <div key={n.id} className="notification-item">
                <div className="notification-icon">{getIcon(n.type)}</div>
                <div className="notification-body">
                  <p className="notification-title">{n.data?.title || 'Notification'}</p>
                  {n.data?.text && <p className="notification-text">{n.data.text}</p>}
                  <span className="notification-date">{formatDate(n.created_at)}</span>
                </div>
                {n.data?.type_id && (
                  <Link to={`/orders/${n.data.type_id}`} className="notification-action">View</Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
