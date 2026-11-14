import { useState, useEffect } from 'react';
import { useParams, Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';
import { loginPath } from '../lib/shop';
import '../css/shop.css';

const STATUS_MAP = {
  0: { label: 'Pending', className: 'pending' },
  1: { label: 'In Transit', className: 'transit' },
  2: { label: 'Delivered', className: 'delivered' },
  3: { label: 'Cancelled', className: 'cancelled' },
  4: { label: 'Returned', className: 'returned' },
};

export default function OrderDetailPage() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { user, backendToken, backendLoading, loading: authLoading } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState('');
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    if (!backendToken) {
      if (!backendLoading) setLoading(false);
      return;
    }
    setLoading(true);
    apiFetch(`/user/order/details/${id}`, { token: backendToken })
      .then(res => setOrder(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, backendToken, backendLoading]);

  if (authLoading) return null;
  if (!user) return <Navigate to={loginPath(pathname)} replace />;

  const handleAction = async (action) => {
    setActionLoading(action);
    setActionMsg('');
    try {
      const res = await apiFetch(`/user/order/${action}/${id}`, { token: backendToken });
      setActionMsg(res.message || `Order ${action}led successfully.`);
      const updated = await apiFetch(`/user/order/details/${id}`, { token: backendToken });
      setOrder(updated.data);
    } catch (err) {
      setActionMsg(err.message);
    } finally {
      setActionLoading('');
    }
  };

  if (loading) return <div className="shop-page"><div className="shop-container"><div className="shop-loading"><div className="spinner" /><p>Loading order...</p></div></div></div>;
  if (error) return <div className="shop-page"><div className="shop-container"><div className="shop-empty"><p>{error}</p><Link to="/orders" className="btn btn-primary">Back to Orders</Link></div></div></div>;
  if (!order) return null;

  const s = STATUS_MAP[order.status] || { label: 'Unknown', className: '' };
  const getImage = () => order.product?.images?.[0]?.image_url || '/images/placeholder.png';

  return (
    <div className="shop-page">
      <div className="shop-container shop-container-narrow">
        <nav className="breadcrumb">
          <Link to="/orders">Orders</Link>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <span>Order #{order.id}</span>
        </nav>

        <div className="od-header">
          <div>
            <h1 className="shop-title">Order #{order.id}</h1>
            <p className="shop-subtitle">Placed on {order.created_at}</p>
          </div>
          <span className={`order-status-badge ${s.className} large`}>{s.label}</span>
        </div>

        {actionMsg && <div className="shop-alert">{actionMsg}</div>}

        <div className="od-cards">
          <div className="od-card">
            <h3 className="od-card-title">Product</h3>
            <div className="od-product">
              <img src={getImage()} alt={order.product?.name} />
              <div>
                <Link to={`/products/${order.product_id}`} className="od-product-name">{order.product?.name}</Link>
                <p>Qty: {order.quantity}{order.color ? ` | Color: ${order.color.name}` : ''}</p>
                <p className="od-product-price">${Number(order.price).toFixed(2)} each</p>
              </div>
            </div>
          </div>

          <div className="od-card">
            <h3 className="od-card-title">Price Breakdown</h3>
            <div className="cart-totals">
              <div className="cart-total-row"><span>Subtotal</span><span>${Number(order.subtotal).toFixed(2)}</span></div>
              <div className="cart-total-row"><span>Tax ({order.tax}%)</span><span>${Number(order.tax_amount).toFixed(2)}</span></div>
              <div className="cart-total-row"><span>Shipping ({order.shipping_handling}%)</span><span>${Number(order.shipping_handling_amount).toFixed(2)}</span></div>
              <div className="cart-total-row total"><span>Total</span><span>${Number(order.total).toFixed(2)}</span></div>
            </div>
          </div>

          {order.address && (
            <div className="od-card">
              <h3 className="od-card-title">Delivery Address</h3>
              <p className="od-address">
                <strong>{order.address.name}</strong><br />
                {order.address.street}{order.address.flat_no ? `, ${order.address.flat_no}` : ''}<br />
                {order.address.city}{order.address.state ? `, ${order.address.state}` : ''} {order.address.zipcode}<br />
                {order.address.country}<br />
                {order.address.phone && <span>Phone: {order.address.phone}</span>}
              </p>
            </div>
          )}

          {order.ups_shipping_number && (
            <div className="od-card">
              <h3 className="od-card-title">Tracking</h3>
              <p>UPS Tracking: <strong>{order.ups_shipping_number}</strong></p>
            </div>
          )}

          {order.order_status?.length > 0 && (
            <div className="od-card">
              <h3 className="od-card-title">Order Timeline</h3>
              <div className="od-timeline">
                {order.order_status.map((os, i) => (
                  <div key={i} className={`od-timeline-item${i === 0 ? ' active' : ''}`}>
                    <div className="od-timeline-dot" />
                    <div>
                      <p className="od-timeline-status">{os.status_description || os.status || os.type}</p>
                      {os.status_date && <span className="od-timeline-date">{os.status_date}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="od-actions">
          {(order.status === 0 || order.status === 1) && (
            <button className="btn btn-outline" onClick={() => handleAction('cancel')} disabled={!!actionLoading}>
              {actionLoading === 'cancel' ? 'Cancelling...' : 'Cancel Order'}
            </button>
          )}
          {order.status === 2 && (
            <button className="btn btn-outline" onClick={() => handleAction('return')} disabled={!!actionLoading}>
              {actionLoading === 'return' ? 'Requesting...' : 'Return Order'}
            </button>
          )}
          {order.invoice_url && (
            <a href={order.invoice_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              View Invoice
            </a>
          )}
          <Link to="/orders" className="btn btn-outline">Back to Orders</Link>
        </div>
      </div>
    </div>
  );
}
