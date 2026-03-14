/**
 * Bamwor API Client
 *
 * All MCP tool requests go through the public Bamwor REST API.
 * NEVER accesses the database directly.
 *
 * Default: https://bamwor.com/api/v1
 * Override: BAMWOR_API_URL env var
 */

const BASE_URL = process.env.BAMWOR_API_URL?.replace(/\/+$/, '') || 'https://bamwor.com/api/v1';
const API_KEY = process.env.BAMWOR_API_KEY || '';

export interface ApiResponse<T = unknown> {
  data: T;
  meta?: {
    request_id?: string;
    timestamp?: string;
    cached?: boolean;
  };
  pagination?: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    status: number;
  };
}

class BamworApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = BASE_URL;
    this.apiKey = API_KEY;
  }

  async get<T>(path: string, params?: Record<string, string | number | undefined>): Promise<ApiResponse<T>> {
    // Concatenate base + path (don't use new URL(path, base) — absolute paths override base)
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const url = new URL(`${this.baseUrl}${cleanPath}`);

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== '') {
          url.searchParams.set(key, String(value));
        }
      }
    }

    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'User-Agent': 'bamwor-mcp-server/1.0.0',
    };

    if (this.apiKey) {
      headers['X-API-Key'] = this.apiKey;
    }

    const res = await fetch(url.toString(), { headers, signal: AbortSignal.timeout(15_000) });

    if (!res.ok) {
      let errorBody: ApiError | null = null;
      try {
        errorBody = (await res.json()) as ApiError;
      } catch {
        // ignore parse errors
      }

      const code = errorBody?.error?.code || `HTTP_${res.status}`;
      const message = errorBody?.error?.message || `API request failed with status ${res.status}`;

      if (res.status === 401) {
        throw new Error(`Authentication error: ${message}. Get a free API key at https://bamwor.com/developers/quickstart`);
      }
      if (res.status === 429) {
        throw new Error(`Rate limit exceeded: ${message}. Upgrade your plan at https://bamwor.com/developers/pricing`);
      }
      throw new Error(`Bamwor API error [${code}]: ${message}`);
    }

    return (await res.json()) as ApiResponse<T>;
  }
}

export const apiClient = new BamworApiClient();
