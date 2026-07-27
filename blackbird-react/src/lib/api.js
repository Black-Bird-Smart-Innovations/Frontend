const BACKEND_URL = import.meta.env?.VITE_BACKEND_URL || 'https://blackbird-backend-hfrticvala-ue.a.run.app';

let unauthorizedHandler = null;

export class ApiError extends Error {
  constructor(message, { status, code, requestId } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.requestId = requestId;
  }
}

export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = typeof handler === 'function' ? handler : null;

  return () => {
    if (unauthorizedHandler === handler) {
      unauthorizedHandler = null;
    }
  };
}

function apiErrorFromResponse(payload, status) {
  const details = payload?.error;
  const message = details?.message || payload?.message || `Request failed (${status})`;

  return new ApiError(message, {
    status,
    code: details?.code,
    requestId: details?.request_id,
  });
}

async function request(path, { token, method = 'GET', body } = {}, hasRetried = false) {
  const headers = { 'Accept': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  if (body && !isFormData) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${BACKEND_URL}/api${path}`, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  if (res.status === 401 && token && unauthorizedHandler && !hasRetried) {
    const refreshedToken = await unauthorizedHandler();
    if (refreshedToken) {
      return request(path, { token: refreshedToken, method, body }, true);
    }
  }

  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw apiErrorFromResponse(payload, res.status);
  }

  return res.json();
}

export async function apiFetch(path, options = {}) {
  return request(path, options);
}
