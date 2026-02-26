type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

type ApiOptions = {
  method?: HttpMethod;
  body?: unknown;
  token?: string | null;
};

const normalizeBaseUrl = () => {
  const raw = process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, '');
  if (raw) {
    return raw.endsWith('/api') ? raw : `${raw}/api`;
  }
  return 'https://payment-admin-dashboard-backend.vercel.app/api';
};

export const API_BASE_URL = normalizeBaseUrl();

export const apiFetch = async <T>(path: string, options: ApiOptions = {}) => {
  const { method = 'GET', body, token } = options;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Request failed');
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
};

export const getStoredSession = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  const raw = localStorage.getItem('payflow-auth');
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as {
      accessToken?: string;
      refreshToken?: string;
      role?: string;
      email?: string;
      expiresAt?: number;
    };
  } catch {
    return null;
  }
};
