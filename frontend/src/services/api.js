// ─── LAPISAN KOMUNIKASI KE BACKEND ───────────────────────────────────────────
// Semua pemanggilan fetch dikumpulkan di sini supaya komponen React tidak
// perlu tahu detail URL/endpoint backend.

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    throw new Error(data.message || 'Terjadi kesalahan pada server');
  }
  return data;
}

function authHeader(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ── Auth ──
export const authApi = {
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
};

// ── Menu ──
export const menuApi = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/menu${qs ? `?${qs}` : ''}`);
  },
  getCategories: () => request('/menu/categories'),
  getById: (id) => request(`/menu/${id}`),
};

// ── Cart ──
export const cartApi = {
  get: (sid) => request(`/cart/${sid}`),
  add: (sid, menuId, portion) =>
    request(`/cart/${sid}`, { method: 'POST', body: JSON.stringify({ menuId, portion }) }),
  updateQty: (sid, key, delta) =>
    request(`/cart/${sid}/${key}`, { method: 'PATCH', body: JSON.stringify({ delta }) }),
  clear: (sid) => request(`/cart/${sid}`, { method: 'DELETE' }),
};

// ── Orders ──
export const orderApi = {
  create: (token, payload) =>
    request('/orders', { method: 'POST', headers: authHeader(token), body: JSON.stringify(payload) }),
  getMine: (token) => request('/orders', { headers: authHeader(token) }),
  remove: (token, id) => request(`/orders/${id}`, { method: 'DELETE', headers: authHeader(token) }),
  clearAll: (token) => request('/orders', { method: 'DELETE', headers: authHeader(token) }),
};
