/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';
import '../css/shop.css';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'completed', label: 'Delivered' },
  { key: 'cancelled', label: 'Cancelled' },
  { key: 'returned', label: 'Returned' },
];

const STATUS_MAP = {
  0: { label: 'Pending', className: 'pending' },
  1: { label: 'In Transit', className: 'transit' },
  2: { label: 'Delivered', className: 'delivered' },
  3: { label: 'Cancelled', className: 'cancelled' },
  4: { label: 'Returned', className: 'returned' },
};

export default function OrdersPage() {
  const { user, backendToken, backendLoading, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (!backendToken) {
      if (!backendLoading) setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    apiFetch(`/user/order/list/${activeTab}`, { token: backendToken })
      .then(res => setOrders(res.data || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [backendToken, backendLoading, activeTab]);

  if (authLoading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const getImage = (order) => order.product?.images?.[0]?.image_url || '/images/placeholder.png';

  const getStatus = (status) => STATUS_MAP[status] || { label: 'Unknown', className: '' };

  return (
    <div className="shop-page">
      <div className="shop-container">
        <div className="shop-header">
          <div>
            <h1 className="shop-title">My Orders</h1>
            <p className="shop-subtitle">Track and manage your orders</p>
          </div>
        </div>

        <div className="order-tabs">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`order-tab${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="shop-loading"><div className="spinner" /><p>Loading orders...</p></div>
        ) : error ? (
          <div className="shop-empty"><p>{error}</p></div>
        ) : orders.length === 0 ? (
          <div className="shop-empty">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2"/><path d="M16 18H32M16 24H28M16 30H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            <p>No orders found.</p>
            <Link to="/products" className="btn btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => {
              const s = getStatus(order.status);
              return (
                <Link to={`/orders/${order.id}`} key={order.id} className="order-card">
                  <div className="order-card-header">
                    <div className="order-card-meta">
                      <span className={`order-status-badge ${s.className}`}>{s.label}</span>
                      <span className="order-card-date">{order.created_at}</span>
                    </div>
                    <span className="order-card-total">${Number(order.total).toFixed(2)}</span>
                  </div>
                  <div className="order-card-body">
                    <img src={getImage(order)} alt={order.product?.name} className="order-card-img" />
                    <div className="order-card-info">
                      <h3>{order.product?.name}</h3>
                      <p>Qty: {order.quantity}{order.color ? ` | ${order.color.name}` : ''}</p>
                      {order.order_address && <p className="order-card-address">{order.order_address}</p>}
                    </div>
                    <svg className="order-card-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
