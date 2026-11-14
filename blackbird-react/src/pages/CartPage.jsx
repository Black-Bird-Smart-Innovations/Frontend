import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';
import {
  guestCartCount,
  guestCartSubtotal,
  loginPath,
  mergeGuestCartIntoServer,
  readGuestCart,
  removeFromGuestCart,
  setGuestCartQuantity,
} from '../lib/shop';
import '../css/shop.css';
import '../css/shop-public.css';

const PLACEHOLDER_IMAGE = '/images/collection/more.png';

const trashIcon = <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 5H15M6 5V3.5C6 2.67157 6.67157 2 7.5 2H10.5C11.3284 2 12 2.67157 12 3.5V5M7.5 8V13.5M10.5 8V13.5M4.5 5L5.25 15C5.25 15.8284 5.92157 16.5 6.75 16.5H11.25C12.0784 16.5 12.75 15.8284 12.75 15L13.5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>;

function EmptyCart() {
  return (
    <div className="shop-empty">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M14 14H8L4 42H44L40 14H34" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M14 14V10C14 5.58172 17.5817 2 22 2H26C30.4183 2 34 5.58172 34 10V14" stroke="currentColor" strokeWidth="2"/></svg>
      <p>Your cart is empty.</p>
      <Link to="/products" className="btn btn-primary">Browse the shop</Link>
    </div>
  );
}

function Loading() {
  return <div className="shop-page"><div className="shop-container"><div className="shop-loading"><div className="spinner" /><p>Loading cart...</p></div></div></div>;
}

// Signed in: the account cart. Signed out: a cart kept in this browser, with sign-in only at checkout.
export default function CartPage() {
  const { user, loading: authLoading } = useAuth();
  if (authLoading) return <Loading />;
  return user ? <AccountCart /> : <GuestCart />;
}

function GuestCart() {
  const navigate = useNavigate();
  const [items, setItems] = useState(() => readGuestCart());
  const count = guestCartCount(items);

  return (
    <div className="shop-page">
      <div className="shop-container">
        <div className="shop-header">
          <div>
            <h1 className="shop-title">Shopping Cart</h1>
            <p className="shop-subtitle">{count} item{count !== 1 ? 's' : ''}</p>
          </div>
          <Link to="/products" className="btn btn-outline btn-sm">Continue Shopping</Link>
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map(item => (
                <div key={item.key} className="cart-item">
                  <img src={item.image || PLACEHOLDER_IMAGE} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <Link to={`/products/${item.product_id}`} className="cart-item-name">{item.name}</Link>
                    {item.color_name && (
                      <span className="cart-item-color">
                        <span className="color-dot" style={{ background: item.color_hex || undefined }} />
                        {item.color_name}
                      </span>
                    )}
                    <span className="cart-item-price">${Number(item.price).toFixed(2)}</span>
                  </div>
                  <div className="cart-item-actions">
                    <div className="qty-control">
                      <button onClick={() => setItems(setGuestCartQuantity(item.key, item.quantity - 1))} disabled={item.quantity <= 1} aria-label={`One fewer ${item.name}`}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => setItems(setGuestCartQuantity(item.key, item.quantity + 1))} aria-label={`One more ${item.name}`}>+</button>
                    </div>
                    <button className="cart-item-remove" onClick={() => setItems(removeFromGuestCart(item.key))} title="Remove" aria-label={`Remove ${item.name}`}>
                      {trashIcon}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2 className="cart-summary-title">Order Summary</h2>
              <div className="cart-totals">
                <div className="cart-total-row total">
                  <span>Subtotal</span>
                  <span>${guestCartSubtotal(items).toFixed(2)}</span>
                </div>
              </div>
              <p className="wl-note">Tax, shipping and your delivery address come at checkout.</p>
              <button className="btn btn-primary btn-large btn-full" onClick={() => navigate(loginPath('/cart'))}>
                Sign in to check out
              </button>
              <p className="wl-note shop-center">
                New to Black Bird? <Link to={loginPath('/cart', '/register')}>Create an account</Link>
              </p>
              <p className="wl-note">Your cart is saved in this browser and moves to your account when you sign in. You'll come right back here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AccountCart() {
  const navigate = useNavigate();
  const { backendToken, backendLoading } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [ordering, setOrdering] = useState(false);
  const [orderError, setOrderError] = useState('');

  const fetchCart = useCallback(async () => {
    try {
      const res = await apiFetch('/user/cart/details', { token: backendToken });
      setCart(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [backendToken]);

  useEffect(() => {
    if (!backendToken) {
      if (!backendLoading) setLoading(false);
      return undefined;
    }
    let cancelled = false;
    (async () => {
      // Items picked before signing in move into the account cart first.
      if (readGuestCart().length) {
        const result = await mergeGuestCartIntoServer(backendToken);
        if (!cancelled && result.failed.length) {
          setError(`Some items from before you signed in couldn't be added: ${result.failed.map((f) => `${f.name} (${f.message})`).join(', ')}`);
        }
      }
      if (!cancelled) await fetchCart();
    })();
    apiFetch('/user/addresses', { token: backendToken })
      .then(res => {
        if (cancelled) return;
        const addrs = res.data || [];
        setAddresses(addrs);
        const def = addrs.find(a => a.is_default);
        if (def) setSelectedAddress(def.id);
        else if (addrs.length) setSelectedAddress(addrs[0].id);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [backendToken, backendLoading, fetchCart]);

  const items = cart?.cart_products || [];

  const handleQty = async (cartProductId, type) => {
    setUpdating(cartProductId);
    try {
      await apiFetch('/user/cart/update', {
        token: backendToken,
        method: 'POST',
        body: { cart_products_id: cartProductId, type },
      });
      await fetchCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (cartProductId) => {
    setUpdating(cartProductId);
    try {
      await apiFetch('/user/cart/item/delete', {
        token: backendToken,
        method: 'POST',
        body: { cart_products_id: cartProductId },
      });
      await fetchCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(null);
    }
  };

  const handleCheckout = async () => {
    if (!selectedAddress) {
      setOrderError('Please select a delivery address.');
      return;
    }
    setOrdering(true);
    setOrderError('');
    try {
      const res = await apiFetch('/user/order/add', {
        token: backendToken,
        method: 'POST',
        body: { address_id: selectedAddress },
      });
      if (res.status === false) {
        setOrderError(res.message || 'Failed to place order.');
        return;
      }
      navigate('/orders');
    } catch (err) {
      setOrderError(err.message);
    } finally {
      setOrdering(false);
    }
  };

  const getImage = (item) => item.product?.images?.[0]?.image_url || PLACEHOLDER_IMAGE;

  if (loading) return <Loading />;

  return (
    <div className="shop-page">
      <div className="shop-container">
        <div className="shop-header">
          <div>
            <h1 className="shop-title">Shopping Cart</h1>
            <p className="shop-subtitle">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
          <Link to="/products" className="btn btn-outline btn-sm">Continue Shopping</Link>
        </div>

        {error && <div className="shop-alert error">{error}</div>}

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={getImage(item)} alt={item.product?.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <Link to={`/products/${item.product_id}`} className="cart-item-name">{item.product?.name}</Link>
                    {item.color && (
                      <span className="cart-item-color">
                        <span className="color-dot" style={{ background: item.color.hex_code }} />
                        {item.color.name}
                      </span>
                    )}
                    <span className="cart-item-price">${Number(item.price).toFixed(2)}</span>
                  </div>
                  <div className="cart-item-actions">
                    <div className="qty-control">
                      <button onClick={() => handleQty(item.id, 0)} disabled={updating === item.id || item.quantity <= 1}>-</button>
                      <span>{updating === item.id ? '...' : item.quantity}</span>
                      <button onClick={() => handleQty(item.id, 1)} disabled={updating === item.id}>+</button>
                    </div>
                    <button className="cart-item-remove" onClick={() => handleDelete(item.id)} disabled={updating === item.id} title="Remove">
                      {trashIcon}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2 className="cart-summary-title">Order Summary</h2>

              {addresses.length > 0 && (
                <div className="cart-address-section">
                  <label className="pd-label">Delivery Address</label>
                  <select
                    className="cart-address-select"
                    value={selectedAddress || ''}
                    onChange={e => setSelectedAddress(Number(e.target.value))}
                  >
                    {addresses.map(a => (
                      <option key={a.id} value={a.id}>
                        {a.name} - {a.street}, {a.city}{a.state ? `, ${a.state}` : ''} {a.zipcode}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {addresses.length === 0 && (
                <div className="cart-no-address">
                  <p>No delivery address found.</p>
                  <Link to="/addresses?next=%2Fcart" className="btn btn-outline btn-sm">Add Address</Link>
                </div>
              )}

              <div className="cart-totals">
                <div className="cart-total-row">
                  <span>Subtotal</span>
                  <span>${Number(cart?.subtotal || 0).toFixed(2)}</span>
                </div>
                <div className="cart-total-row">
                  <span>Tax</span>
                  <span>${Number(cart?.tax || 0).toFixed(2)}</span>
                </div>
                <div className="cart-total-row">
                  <span>Shipping</span>
                  <span>${Number(cart?.shipping_handling || 0).toFixed(2)}</span>
                </div>
                <div className="cart-total-row total">
                  <span>Total</span>
                  <span>${Number(cart?.total || 0).toFixed(2)}</span>
                </div>
              </div>

              {orderError && <div className="shop-alert error" style={{ marginBottom: 'var(--space-md)' }}>{orderError}</div>}

              <button
                className="btn btn-primary btn-large btn-full"
                onClick={handleCheckout}
                disabled={ordering || items.length === 0 || !selectedAddress}
              >
                {ordering ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
