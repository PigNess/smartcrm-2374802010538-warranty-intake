const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export class ApiError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let res;
  try {
    res = await fetch(`${BASE}${path}`, { ...options, headers });
  } catch (err) {
    throw new ApiError(0, 'NETWORK_ERROR', 'Không kết nối được tới Backend.');
  }

  if (res.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new ApiError(401, 'UNAUTHORIZED', 'Phiên đăng nhập hết hạn.');
  }

  if (res.status === 204) return null;

  let body = null;
  try { body = await res.json(); } catch (e) {}

  if (!res.ok) {
    throw new ApiError(res.status, body?.error, body?.message || 'Hệ thống bị lỗi.');
  }

  return body?.data ?? body;
}