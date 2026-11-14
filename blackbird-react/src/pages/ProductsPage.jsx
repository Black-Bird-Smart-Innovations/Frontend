/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchStoreProducts } from '../lib/shop';
import { COLLECTION, SHOP_EMAIL, SHOP_PHONE } from '../data/collection';
import '../css/shop.css';
import '../css/shop-public.css';

const PLACEHOLDER_IMAGE = '/images/collection/more.png';

// Open to everyone. Signed-out visitors see the whole Collection; only checkout asks for sign-in.
export default function ProductsPage() {
  const { user, backendToken, backendLoading, loading: authLoading } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  // Wait until we know whether someone is signed in, so a signed-in shopper gets their own catalog.
  const waitingForAccount = authLoading || (Boolean(user) && !backendToken && backendLoading);

  useEffect(() => {
    if (waitingForAccount) return undefined;
    let cancelled = false;
    setLoading(true);
    setError('');
    fetchStoreProducts(backendToken)
      .then((list) => { if (!cancelled) setProducts(list); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [backendToken, waitingForAccount, reloadKey]);

  const query = search.trim().toLowerCase();
  const matches = (...fields) => !query || fields.some((f) => f?.toLowerCase().includes(query));
  const storeProducts = products.filter((p) => matches(p.name, p.brand, p.short_description));
  const collection = COLLECTION.filter((item) => matches(item.name, item.description));

  const getImage = (product) => {
    if (product.images?.length) return product.images[0].image_url || product.images[0].url;
    if (product.banner) return typeof product.banner === 'string' ? product.banner : product.banner.image_url;
    return PLACEHOLDER_IMAGE;
  };

  return (
    <div className="shop-page">
      <div className="shop-container">
        <div className="shop-header">
          <div>
            <h1 className="shop-title">Shop</h1>
            <p className="shop-subtitle">Browse Black Bird devices and gear. No account needed to look around or join a waitlist.</p>
          </div>
          <div className="shop-search">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <input type="text" placeholder="Search the shop..." aria-label="Search the shop" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {(loading || waitingForAccount) && user ? (
          <div className="shop-loading">
            <div className="spinner" />
            <p>Loading products...</p>
          </div>
        ) : error ? (
          <div className="shop-alert error shop-public-alert">
            <span>We couldn't load online ordering right now.</span>
            <button type="button" className="btn btn-outline btn-sm" onClick={() => setReloadKey((k) => k + 1)}>Try again</button>
          </div>
        ) : storeProducts.length > 0 ? (
          <section className="shop-public-section" aria-labelledby="shop-order-online">
            <h2 className="shop-public-heading" id="shop-order-online">Order online</h2>
            <p className="shop-public-sub">Add items to your cart now. You'll sign in only when you check out.</p>
            <div className="products-grid">
              {storeProducts.map(product => (
                <Link to={`/products/${product.id}`} key={product.id} className="product-card-shop">
                  <div className="product-card-image">
                    <img src={getImage(product)} alt={product.name} loading="lazy" />
                    {product.previous_price && product.previous_price > product.price && (
                      <span className="product-badge-sale">Sale</span>
                    )}
                  </div>
                  <div className="product-card-body">
                    {product.brand && <span className="product-card-brand">{product.brand}</span>}
                    <h3 className="product-card-name">{product.name}</h3>
                    <p className="product-card-desc">{product.short_description}</p>
                    <div className="product-card-footer">
                      <div className="product-card-price">
                        <span className="price-current">${Number(product.price).toFixed(2)}</span>
                        {product.previous_price && product.previous_price > product.price && (
                          <span className="price-old">${Number(product.previous_price).toFixed(2)}</span>
                        )}
                      </div>
                      <span className="shop-card-cta">See details</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="shop-public-section" aria-labelledby="shop-collection">
          <h2 className="shop-public-heading" id="shop-collection">The Black Bird Collection</h2>
          <p className="shop-public-sub">Ask us for a quote, or join the waitlist for anything that isn't ready yet.</p>
          {collection.length === 0 ? (
            <div className="shop-empty"><p>Nothing matches your search.</p></div>
          ) : (
            <div className="products-grid">
              {collection.map(item => (
                <Link to={`/products/${item.id}`} key={item.id} className="product-card-shop">
                  <div className="product-card-image">
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </div>
                  <div className="product-card-body">
                    <span className="product-card-brand">{item.action === 'quote' ? 'Price on request' : 'Coming soon'}</span>
                    <h3 className="product-card-name">{item.name}</h3>
                    <p className="product-card-desc">{item.description}</p>
                    <div className="product-card-footer">
                      <span className="shop-card-cta">{item.action === 'quote' ? 'Get a quote' : 'Join the waitlist'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <p className="shop-help">
          Questions? Call <a href={`tel:+1${SHOP_PHONE.replace(/\D/g, '')}`}>{SHOP_PHONE}</a> or email <a href={`mailto:${SHOP_EMAIL}`}>{SHOP_EMAIL}</a>.
        </p>
      </div>
    </div>
  );
}
