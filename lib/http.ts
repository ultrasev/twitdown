// HTTP client module with built-in JWT handling
import { jwtVerify, SignJWT } from "jose";

const DEFAULT_TIMEOUT = 10000;
const APP_NAME = "twitdown";
const ROLE = "user";

interface RequestConfig extends RequestInit {
  timeout?: number;
}

interface HttpResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

// Generate JWT token dynamically
async function generateToken(): Promise<string> {
  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!);

  const token = await new SignJWT({
    role: ROLE,
    app: APP_NAME,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30s") // 30 seconds
    .sign(secret);
  return token;
}

export async function verifyToken(token: string): Promise<boolean> {
  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!);
  const { payload } = await jwtVerify(token, secret);
  return payload.role === ROLE && payload.app === APP_NAME;
}

// Base HTTP request handler
async function request<T>(
  url: string,
  config: RequestConfig = {}
): Promise<HttpResponse<T>> {
  const { timeout = DEFAULT_TIMEOUT, headers = {}, ...restConfig } = config;

  // Generate fresh JWT token for each request
  const token = await generateToken();
  const authHeaders = {
    Authorization: `Bearer ${token}`,
  };

  // Merge headers
  const finalHeaders = {
    "Content-Type": "application/json",
    ...authHeaders,
    ...headers,
  };

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...restConfig,
      headers: finalHeaders,
      signal: controller.signal,
    });

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      data,
      status: response.status,
      headers: response.headers,
    };
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

// HTTP method helpers
export const http = {
  get: <T>(url: string, config?: RequestConfig) =>
    request<T>(url, { ...config, method: "GET" }),

  post: <T>(url: string, data?: unknown, config?: RequestConfig) =>
    request<T>(url, {
      ...config,
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: <T>(url: string, data?: unknown, config?: RequestConfig) =>
    request<T>(url, {
      ...config,
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: <T>(url: string, config?: RequestConfig) =>
    request<T>(url, { ...config, method: "DELETE" }),
};
