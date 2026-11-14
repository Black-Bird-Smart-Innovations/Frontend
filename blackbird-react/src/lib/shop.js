// Shop helpers that let people browse, keep a cart and join a waitlist without signing in.
// Only checkout asks for sign-in, and it sends the person back to where they were.
import { apiFetch } from './api.js';

export const GUEST_CART_KEY = 'bb_guest_cart_v1';
export const GUEST_CART_EVENT = 'bb-guest-cart-change';
const MAX_QTY = 99;

function defaultStorage() {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

// ---------- Return path after sign-in ----------

// Only same-site paths ("/cart"), never "//evil.com", "https://..." or the auth pages themselves.
export function safeNextPath(raw, fallback = '/') {
  if (typeof raw !== 'string') return fallback;
  const value = raw.trim();
  if (!value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) return fallback;
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\\]/.test(value)) return fallback;
  if (/^\/(login|register|forgot-password)(?:[/?#]|$)/.test(value)) return fallback;
  return value;
}

export function loginPath(next, page = '/login') {
  const safe = safeNextPath(next, '');
  return safe && safe !== '/' ? `${page}?next=${encodeURIComponent(safe)}` : page;
}

// ---------- Guest cart (kept in this browser until checkout) ----------

export function guestItemKey(productId, colorId) {
  return `${productId}:${colorId ?? ''}`;
}

function clampQty(value) {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(n, MAX_QTY);
}

function isValidItem(item) {
  return item && typeof item === 'object' && item.product_id != null && typeof item.key === 'string';
}

function notifyChange() {
  try {
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new Event(GUEST_CART_EVENT));
    }
  } catch {
    // Nothing to tell.
  }
}

export function readGuestCart(storage = defaultStorage()) {
  if (!storage) return [];
  try {
    const parsed = JSON.parse(storage.getItem(GUEST_CART_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter(isValidItem) : [];
  } catch {
    return [];
  }
}

function writeGuestCart(items, storage) {
  if (!storage) return false;
  try {
    if (items.length) storage.setItem(GUEST_CART_KEY, JSON.stringify(items));
    else storage.removeItem(GUEST_CART_KEY);
    notifyChange();
    return true;
  } catch {
    return false;
  }
}

// entry: { product_id, color_id, quantity, name, price, image, color_name, color_hex }
// Returns the new cart, or null when this browser can't store it (private mode, blocked storage).
export function addToGuestCart(entry, storage = defaultStorage()) {
  const items = readGuestCart(storage);
  const key = guestItemKey(entry.product_id, entry.color_id);
  const qty = clampQty(entry.quantity);
  const existing = items.find((item) => item.key === key);
  if (existing) {
    existing.quantity = clampQty(existing.quantity + qty);
  } else {
    items.push({
      key,
      product_id: entry.product_id,
      color_id: entry.color_id ?? null,
      quantity: qty,
      name: String(entry.name || ''),
      price: Number(entry.price) || 0,
      image: entry.image || '',
      color_name: entry.color_name || null,
      color_hex: entry.color_hex || null,
    });
  }
  return writeGuestCart(items, storage) ? items : null;
}

export function setGuestCartQuantity(key, quantity, storage = defaultStorage()) {
  const items = readGuestCart(storage).map((item) => (item.key === key ? { ...item, quantity: clampQty(quantity) } : item));
  writeGuestCart(items, storage);
  return items;
}

export function removeFromGuestCart(key, storage = defaultStorage()) {
  const items = readGuestCart(storage).filter((item) => item.key !== key);
  writeGuestCart(items, storage);
  return items;
}

export function guestCartSubtotal(items) {
  return items.reduce((sum, item) => sum + (Number(item.price) || 0) * clampQty(item.quantity), 0);
}

export function guestCartCount(items) {
  return items.reduce((sum, item) => sum + clampQty(item.quantity), 0);
}

// After sign-in: move the guest cart into the account cart. Each item leaves the guest cart as soon
// as the server accepts it, so a reload or a second call never adds it twice.
let mergeInFlight = null;
export function mergeGuestCartIntoServer(token, { storage = defaultStorage(), request = apiFetch } = {}) {
  if (mergeInFlight) return mergeInFlight;
  mergeInFlight = (async () => {
    const items = readGuestCart(storage);
    const failed = [];
    for (const item of items) {
      try {
        const res = await request('/user/cart/add', {
          token,
          method: 'POST',
          body: { product_id: item.product_id, quantity: clampQty(item.quantity), color_id: item.color_id ?? null },
        });
        if (res && res.status === false) throw new Error(res.message || 'Could not add this item.');
        removeFromGuestCart(item.key, storage);
      } catch (err) {
        failed.push({ name: item.name, message: err?.message || 'Could not add this item.' });
      }
    }
    return { merged: items.length - failed.length, failed };
  })().finally(() => {
    mergeInFlight = null;
  });
  return mergeInFlight;
}

// ---------- Catalog ----------

function productList(res) {
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.data?.products)) return res.data.products;
  return [];
}

// Products that can be ordered online. Signed-out visitors get them only if the server allows it;
// otherwise they still see the Collection, so a failure here is not an error for them.
export async function fetchStoreProducts(token, request = apiFetch) {
  try {
    const res = await request('/user/product', token ? { token } : {});
    return productList(res);
  } catch (err) {
    if (!token) return [];
    throw err;
  }
}

export async function fetchStoreProduct(id, token, request = apiFetch) {
  const res = await request(`/user/product/detail/${encodeURIComponent(id)}`, token ? { token } : {});
  return res?.data?.product || res?.data || null;
}

// ---------- Waitlist ----------

export function validateWaitlistContact(email, phone) {
  const e = (email || '').trim();
  const p = (phone || '').trim();
  if (!e && !p) return 'Enter an email or a phone number.';
  if (e && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return 'Check the email address.';
  if (p && p.replace(/\D/g, '').length < 7) return 'Check the phone number.';
  return '';
}

// Works signed in or out. When the server can't take it (not signed in, not available yet, offline),
// the caller offers an email to the shop instead, so the person is never sent to a sign-in page.
export async function joinWaitlist({ productId, email, phone, token }, request = apiFetch) {
  const body = { product_id: productId };
  if (email && email.trim()) body.email = email.trim();
  if (phone && phone.trim()) body.phone = phone.trim();
  try {
    const res = await request('/shop/waitlist', { token: token || undefined, method: 'POST', body });
    if (res && res.status === false) return { ok: false, status: null, message: res.message || '' };
    return { ok: true };
  } catch (err) {
    return { ok: false, status: err?.status ?? null, message: err?.message || '' };
  }
}
