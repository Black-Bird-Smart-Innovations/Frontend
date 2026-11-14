import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  GUEST_CART_KEY,
  addToGuestCart,
  fetchStoreProducts,
  guestCartCount,
  guestCartSubtotal,
  joinWaitlist,
  loginPath,
  mergeGuestCartIntoServer,
  readGuestCart,
  removeFromGuestCart,
  safeNextPath,
  setGuestCartQuantity,
  validateWaitlistContact,
} from './shop.js';
import { ApiError } from './api.js';

function memoryStorage() {
  const data = new Map();
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
    raw: data,
  };
}

const brokenStorage = {
  getItem() { throw new Error('blocked'); },
  setItem() { throw new Error('blocked'); },
  removeItem() { throw new Error('blocked'); },
};

test('safeNextPath keeps same-site paths and rejects everything else', () => {
  assert.equal(safeNextPath('/cart'), '/cart');
  assert.equal(safeNextPath('/products/12?x=1#top'), '/products/12?x=1#top');
  assert.equal(safeNextPath('//evil.example'), '/');
  assert.equal(safeNextPath('/\\evil.example'), '/');
  assert.equal(safeNextPath('https://evil.example'), '/');
  assert.equal(safeNextPath('javascript:alert(1)'), '/');
  assert.equal(safeNextPath('/login?next=/cart'), '/');
  assert.equal(safeNextPath('/register'), '/');
  assert.equal(safeNextPath(undefined, '/x'), '/x');
  assert.equal(loginPath('/cart'), '/login?next=%2Fcart');
  assert.equal(loginPath('/'), '/login');
  assert.equal(loginPath('/cart', '/register'), '/register?next=%2Fcart');
});

test('guest cart adds, merges same item, updates and removes', () => {
  const storage = memoryStorage();
  addToGuestCart({ product_id: 7, color_id: 2, quantity: 1, name: 'X5', price: 149 }, storage);
  addToGuestCart({ product_id: 7, color_id: 2, quantity: 2, name: 'X5', price: 149 }, storage);
  addToGuestCart({ product_id: 9, quantity: 1, name: 'Plush', price: '29.99' }, storage);
  let items = readGuestCart(storage);
  assert.equal(items.length, 2);
  assert.equal(items[0].quantity, 3);
  assert.equal(guestCartCount(items), 4);
  assert.equal(Math.round(guestCartSubtotal(items) * 100), 47699);

  items = setGuestCartQuantity(items[0].key, 500, storage);
  assert.equal(items[0].quantity, 99);
  items = removeFromGuestCart('9:', storage);
  assert.equal(items.length, 1);
  removeFromGuestCart(items[0].key, storage);
  assert.equal(storage.raw.has(GUEST_CART_KEY), false);
});

test('guest cart never throws when storage is blocked', () => {
  assert.deepEqual(readGuestCart(brokenStorage), []);
  assert.equal(addToGuestCart({ product_id: 1, quantity: 1 }, brokenStorage), null);
  assert.deepEqual(readGuestCart(null), []);
});

test('merge moves guest items into the account cart once and keeps failures', async () => {
  const storage = memoryStorage();
  addToGuestCart({ product_id: 1, quantity: 2, name: 'A', price: 10 }, storage);
  addToGuestCart({ product_id: 2, quantity: 1, name: 'B', price: 5 }, storage);
  const calls = [];
  const request = async (path, options) => {
    calls.push({ path, options });
    if (options.body.product_id === 2) return { status: false, message: 'Out of stock' };
    return { status: true };
  };
  const [first, second] = await Promise.all([
    mergeGuestCartIntoServer('tok', { storage, request }),
    mergeGuestCartIntoServer('tok', { storage, request }),
  ]);
  assert.equal(first, second, 'concurrent merges share one run');
  assert.equal(calls.length, 2);
  assert.equal(calls[0].path, '/user/cart/add');
  assert.equal(calls[0].options.token, 'tok');
  assert.deepEqual(calls[0].options.body, { product_id: 1, quantity: 2, color_id: null });
  assert.equal(first.merged, 1);
  assert.equal(first.failed[0].message, 'Out of stock');
  assert.deepEqual(readGuestCart(storage).map((i) => i.product_id), [2]);
});

test('store products: signed-out failure is quiet, signed-in failure is reported', async () => {
  const unauthorized = async () => { throw new ApiError('Unauthenticated.', { status: 401 }); };
  assert.deepEqual(await fetchStoreProducts(null, unauthorized), []);
  await assert.rejects(fetchStoreProducts('tok', unauthorized), /Unauthenticated/);
  const list = await fetchStoreProducts(null, async (path, options) => {
    assert.equal(path, '/user/product');
    assert.equal(options.token, undefined);
    return { data: [{ id: 1 }] };
  });
  assert.deepEqual(list, [{ id: 1 }]);
});

test('waitlist reports success or a failure the page can fall back from', async () => {
  let seen;
  const ok = await joinWaitlist({ productId: 'watches', email: ' a@b.co ', phone: '' }, async (path, options) => {
    seen = { path, options };
    return { status: true };
  });
  assert.deepEqual(ok, { ok: true });
  assert.equal(seen.path, '/shop/waitlist');
  assert.equal(seen.options.method, 'POST');
  assert.deepEqual(seen.options.body, { product_id: 'watches', email: 'a@b.co' });

  const failed = await joinWaitlist({ productId: 'watches', phone: '5551234567' }, async () => {
    throw new ApiError('Unauthenticated.', { status: 401 });
  });
  assert.equal(failed.ok, false);
  assert.equal(failed.status, 401);
});

test('waitlist contact validation', () => {
  assert.match(validateWaitlistContact('', ''), /email or a phone/);
  assert.match(validateWaitlistContact('nope', ''), /email/);
  assert.match(validateWaitlistContact('', '12'), /phone/);
  assert.equal(validateWaitlistContact('a@b.co', ''), '');
  assert.equal(validateWaitlistContact('', '(917) 977-0949'), '');
});
