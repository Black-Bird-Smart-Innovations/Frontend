/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';
import '../css/shop.css';

export default function ProductsPage() {
  const { user, backendToken, backendLoading, loading: authLoading } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!backendToken) {
      if (!backendLoading) setLoading(false);
      return;
    }
    setLoading(true);
    apiFetch('/user/product', { token: backendToken })
      .then(res => setProducts(res.data || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [backendToken, backendLoading]);

  if (authLoading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const filtered = search
    ? products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand?.toLowerCase().includes(search.toLowerCase()))
    : products;

  const getImage = (product) => {
    if (product.images?.length) return product.images[0].image_url || product.images[0].url;
    if (product.banner) return typeof product.banner === 'string' ? product.banner : product.banner.image_url;
    return '/images/placeholder.png';
  };

  return (
    <div className="shop-page">
      <div className="shop-container">
        <div className="shop-header">
          <div>
            <h1 className="shop-title">Products</h1>
            <p className="shop-subtitle">Browse our collection of smart safety devices</p>
          </div>
          <div className="shop-search">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {loading ? (
          <div className="shop-loading">
            <div className="spinner" />
            <p>Loading products...</p>
          </div>
        ) : error ? (
          <div className="shop-empty">
            <p>{error}</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="shop-empty">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2"/><path d="M6 18H42" stroke="currentColor" strokeWidth="2"/><circle cx="24" cy="30" r="4" stroke="currentColor" strokeWidth="2"/></svg>
            <p>{search ? 'No products match your search.' : 'No products available.'}</p>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map(product => (
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
                    {product.average_rating > 0 && (
                      <div className="product-card-rating">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--color-warning)"><path d="M8 1.5L9.8 5.2L14 5.8L11 8.6L11.7 12.8L8 10.8L4.3 12.8L5 8.6L2 5.8L6.2 5.2L8 1.5Z"/></svg>
                        <span>{product.average_rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
