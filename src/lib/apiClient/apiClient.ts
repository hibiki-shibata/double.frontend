import { buildReqHeader, buildReqURI } from "./apiBuilders";
import { APIError } from "./apiError";

type RequestOptions = Omit<RequestInit, 'body'> & {
    body?: unknown
    queryParam?: Record<string, unknown>
}

// Action Required: Prevent duplicated token refresh req
async function request<T>(
    path: string,
    reqOptions: RequestOptions
): Promise<T> {
    const { body, queryParam, headers, ...options } = reqOptions

    const res: Response = await fetch(buildReqURI(path, queryParam), {
        ...options,
        headers: buildReqHeader(headers),
        body: body ? JSON.stringify(body) : undefined,
    })

    // if (res.status === 204) return undefined as T
    const resBody: any = await res.json().catch(() => null)

    if (!res.ok) {
        throw new APIError(
            res.status,
            resBody?.code ?? 'UNKNOWN_ERROR',
            resBody?.message ?? res.statusText,
            resBody?.details
        )
    }
    return resBody as T
}

export const apiClient = {
    get: <T>(path: string, queryParam?: RequestOptions['queryParam']) => request<T>(path, { method: 'GET', queryParam }),
    post: <T>(path: string, body?: unknown) => request<T>(path, { method: 'POST', body }),
    patch: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PATCH', body }),
    delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}