import { useState, useEffect, useCallback } from 'react';
import { Link, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';
import { loginPath, safeNextPath } from '../lib/shop';
import '../css/shop.css';

const EMPTY_FORM = { name: '', type: 'home', phone: '', country: '', city: '', state: '', street: '', zipcode: '', flat_no: '', address_name: '' };

export default function AddressesPage() {
  const { pathname, search } = useLocation();
  const [searchParams] = useSearchParams();
  // Came here from checkout: offer a way straight back to the cart.
  const returnTo = safeNextPath(searchParams.get('next'), '');
  const { user, backendToken, backendLoading, loading: authLoading } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchAddresses = useCallback(async () => {
    try {
      const res = await apiFetch('/user/addresses', { token: backendToken });
      setAddresses(res.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [backendToken]);

  useEffect(() => {
    if (!backendToken) {
      if (!backendLoading) setLoading(false);
      return;
    }
    fetchAddresses();
  }, [backendToken, backendLoading, fetchAddresses]);

  if (authLoading) return null;
  if (!user) return <Navigate to={loginPath(pathname + search)} replace />;

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError('');
    setShowModal(true);
  };

  const openEdit = (addr) => {
    setEditingId(addr.id);
    setForm({
      name: addr.name || '',
      type: addr.type || 'home',
      phone: addr.phone || '',
      country: addr.country || '',
      city: addr.city || '',
      state: addr.state || '',
      street: addr.street || '',
      zipcode: addr.zipcode || '',
      flat_no: addr.flat_no || '',
      address_name: addr.address_name || '',
    });
    setFormError('');
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.street || !form.city || !form.country) {
      setFormError('Name, street, city, and country are required.');
      return;
    }
    setSaving(true);
    setFormError('');
    try {
      if (editingId) {
        await apiFetch(`/user/addresses/update/${editingId}`, { token: backendToken, method: 'POST', body: form });
      } else {
        await apiFetch('/user/addresses/create', { token: backendToken, method: 'POST', body: form });
      }
      setShowModal(false);
      await fetchAddresses();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this address?')) return;
    try {
      await apiFetch(`/user/addresses/delete/${id}`, { token: backendToken });
      await fetchAddresses();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await apiFetch(`/user/addresses/default/${id}`, { token: backendToken });
      await fetchAddresses();
    } catch (err) {
      setError(err.message);
    }
  };

  const typeLabel = (t) => ({ home: 'Home', office: 'Office', other: 'Other' }[t] || t);

  return (
    <div className="shop-page">
      <div className="shop-container shop-container-narrow">
        <div className="shop-header">
          <div>
            <h1 className="shop-title">My Addresses</h1>
            <p className="shop-subtitle">Manage your delivery addresses</p>
            {returnTo === '/cart' && <Link to="/cart" className="btn btn-outline btn-sm" style={{ marginTop: 'var(--space-sm)' }}>Back to your cart</Link>}
          </div>
          <button className="btn btn-primary btn-sm" onClick={openAdd}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Add Address
          </button>
        </div>

        {error && <div className="shop-alert error">{error}</div>}

        {loading ? (
          <div className="shop-loading"><div className="spinner" /><p>Loading addresses...</p></div>
        ) : addresses.length === 0 ? (
          <div className="shop-empty">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M24 4C17.3726 4 12 9.37258 12 16C12 26 24 44 24 44C24 44 36 26 36 16C36 9.37258 30.6274 4 24 4Z" stroke="currentColor" strokeWidth="2"/><circle cx="24" cy="16" r="4" stroke="currentColor" strokeWidth="2"/></svg>
            <p>No addresses saved yet.</p>
            <button className="btn btn-primary" onClick={openAdd}>Add Your First Address</button>
          </div>
        ) : (
          <div className="addresses-list">
            {addresses.map(addr => (
              <div key={addr.id} className={`address-card${addr.is_default ? ' default' : ''}`}>
                <div className="address-card-header">
                  <div className="address-card-badges">
                    <span className={`address-type-badge ${addr.type}`}>{typeLabel(addr.type)}</span>
                    {addr.is_default && <span className="address-default-badge">Default</span>}
                  </div>
                  <div className="address-card-actions">
                    {!addr.is_default && (
                      <button className="address-action-btn" onClick={() => handleSetDefault(addr.id)} title="Set as default">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L9.8 5.2L14 5.8L11 8.6L11.7 12.8L8 10.8L4.3 12.8L5 8.6L2 5.8L6.2 5.2L8 1.5Z" stroke="currentColor" strokeWidth="1.25"/></svg>
                      </button>
                    )}
                    <button className="address-action-btn" onClick={() => openEdit(addr)} title="Edit">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/></svg>
                    </button>
                    <button className="address-action-btn delete" onClick={() => handleDelete(addr.id)} title="Delete">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4.5H13M5.5 4.5V3C5.5 2.44772 5.94772 2 6.5 2H9.5C10.0523 2 10.5 2.44772 10.5 3V4.5M6.5 7V12M9.5 7V12M4 4.5L4.5 13.5C4.5 14.0523 4.94772 14.5 5.5 14.5H10.5C11.0523 14.5 11.5 14.0523 11.5 13.5L12 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>
                <h3 className="address-card-name">{addr.name}</h3>
                <p className="address-card-detail">
                  {addr.street}{addr.flat_no ? `, ${addr.flat_no}` : ''}<br />
                  {addr.city}{addr.state ? `, ${addr.state}` : ''} {addr.zipcode}<br />
                  {addr.country}
                </p>
                {addr.phone && <p className="address-card-phone">{addr.phone}</p>}
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingId ? 'Edit Address' : 'Add New Address'}</h2>
                <button className="modal-close" onClick={() => setShowModal(false)}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              </div>
              {formError && <div className="shop-alert error" style={{ margin: '0 0 var(--space-md)' }}>{formError}</div>}
              <form className="modal-form" onSubmit={handleSave}>
                <div className="modal-form-row">
                  <div className="modal-field">
                    <label>Name *</label>
                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="modal-field">
                    <label>Type</label>
                    <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                      <option value="home">Home</option>
                      <option value="office">Office</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="modal-form-row">
                  <div className="modal-field">
                    <label>Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="modal-field">
                    <label>Country *</label>
                    <input type="text" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} required />
                  </div>
                </div>
                <div className="modal-form-row">
                  <div className="modal-field">
                    <label>City *</label>
                    <input type="text" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} required />
                  </div>
                  <div className="modal-field">
                    <label>State</label>
                    <input type="text" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} />
                  </div>
                </div>
                <div className="modal-field">
                  <label>Street *</label>
                  <input type="text" value={form.street} onChange={e => setForm({ ...form, street: e.target.value })} required />
                </div>
                <div className="modal-form-row">
                  <div className="modal-field">
                    <label>Zip Code</label>
                    <input type="text" value={form.zipcode} onChange={e => setForm({ ...form, zipcode: e.target.value })} />
                  </div>
                  <div className="modal-field">
                    <label>Apt / Flat No</label>
                    <input type="text" value={form.flat_no} onChange={e => setForm({ ...form, flat_no: e.target.value })} />
                  </div>
                </div>
                <div className="modal-field">
                  <label>Address Label</label>
                  <input type="text" value={form.address_name} onChange={e => setForm({ ...form, address_name: e.target.value })} placeholder="e.g. My Apartment" />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : (editingId ? 'Update' : 'Add Address')}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
