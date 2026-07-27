import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { ApiError, apiFetch, setUnauthorizedHandler } from './api.js';

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  setUnauthorizedHandler(null);
});

test('surfaces structured API error details', async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({
    error: {
      code: 'unauthenticated',
      message: 'Authentication is required.',
      request_id: 'request-123',
    },
  }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });

  await assert.rejects(
    apiFetch('/user/protective/profile/view'),
    (error) => {
      assert.ok(error instanceof ApiError);
      assert.equal(error.message, 'Authentication is required.');
      assert.equal(error.status, 401);
      assert.equal(error.code, 'unauthenticated');
      assert.equal(error.requestId, 'request-123');
      return true;
    },
  );
});

test('refreshes an unauthorized session once and retries the request', async () => {
  const authorizationHeaders = [];
  globalThis.fetch = async (_url, options) => {
    authorizationHeaders.push(options.headers.Authorization);

    if (authorizationHeaders.length === 1) {
      return new Response(JSON.stringify({
        error: { code: 'unauthenticated', message: 'Authentication is required.' },
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ status: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };

  let refreshCount = 0;
  setUnauthorizedHandler(async () => {
    refreshCount += 1;
    return 'fresh-token';
  });

  const response = await apiFetch('/user/device-overview', { token: 'stale-token' });

  assert.deepEqual(response, { status: true });
  assert.equal(refreshCount, 1);
  assert.deepEqual(authorizationHeaders, ['Bearer stale-token', 'Bearer fresh-token']);
});

test('does not retry a second unauthorized response', async () => {
  let requestCount = 0;
  globalThis.fetch = async () => {
    requestCount += 1;
    return new Response(JSON.stringify({
      error: { code: 'unauthenticated', message: 'Authentication is required.' },
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  };

  setUnauthorizedHandler(async () => 'fresh-token');

  await assert.rejects(
    apiFetch('/user/device-overview', { token: 'stale-token' }),
    (error) => error instanceof ApiError && error.status === 401,
  );
  assert.equal(requestCount, 2);
});
