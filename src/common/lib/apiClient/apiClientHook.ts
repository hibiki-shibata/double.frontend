import { useAuth } from "../../../features/auth/contexts/AuthContext";
import { authTokenStore } from "../authTokenStore";
import { buildReqHeader, buildReqURI } from "./apiBuilders";
import { APIError } from "./apiError";

type RequestOptions = Omit<RequestInit, 'body'> & {
    body?: unknown
    queryParam?: Record<string, unknown>
}

export function useApiClient() {
    const request = async <T>(
        path: string,
        reqOptions: RequestOptions
    ): Promise<T> => {
        const { body, queryParam, headers, ...options } = reqOptions;

        const res: Response = await fetch(buildReqURI(path, queryParam), {
            ...options,
            headers: buildReqHeader(headers, authTokenStore.getAccessToken()),
            body: body ? JSON.stringify(body) : undefined,
        });

        const resBody: any = await res.json().catch(() => null);

        if (!res.ok) {
            throw new APIError(
                res.status,
                resBody?.code ?? 'UNKNOWN_ERROR',
                resBody?.message ?? res.statusText,
                resBody?.details
            );
        }
        return resBody as T;
    };

    return {
        get: <T>(path: string, queryParam?: RequestOptions['queryParam']) => request<T>(path, { method: 'GET', queryParam }),
        post: <T>(path: string, body?: unknown) => request<T>(path, { method: 'POST', body }),
        put: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PUT', body }),
        patch: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PATCH', body }),
        delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
    };
}