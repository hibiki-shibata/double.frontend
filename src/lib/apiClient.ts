/**
 * Thin, typed fetch wrapper. All feature `api.ts` files go through this —
 * never call fetch() directly in a component or hook.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

export class ApiError extends Error {
    public readonly status: number;
    public readonly code: string;
    public readonly details?: unknown;

    constructor(
        status: number,
        code: string,
        message: string,
        details?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.code = code;
        this.details = details;
    }
}

// Swap this out for your real auth store (e.g. zustand selector) at the app root.
let tokenProvider: () => string | null = () => null;
export function setAuthTokenProvider(fn: () => string | null): void {
    tokenProvider = fn;
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
    body?: unknown;
    params?:  Record<string, unknown>
}

function buildUrl(path: string, params?: RequestOptions['params']): string {
    const url = new URL(API_BASE_URL + path, window.location.origin);
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined) url.searchParams.set(key, String(value));
        }
    }
    return url.toString();
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { body, params, headers, ...rest } = options;
    const token = tokenProvider();

    const res = await fetch(buildUrl(path, params), {
        ...rest,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (res.status === 204) return undefined as T;

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        throw new ApiError(
            res.status,
            data?.code ?? 'UNKNOWN_ERROR',
            data?.message ?? res.statusText,
            data?.details
        );
    }

    return data as T;
}

export const apiClient = {
    get: <T>(path: string, params?: RequestOptions['params']) => request<T>(path, { method: 'GET', params }),
    post: <T>(path: string, body?: unknown) => request<T>(path, { method: 'POST', body }),
    patch: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PATCH', body }),
    delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};