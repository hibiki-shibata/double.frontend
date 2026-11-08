import { coreConfig } from "../../config/coreConfig"

export function buildReqURI(
    path: string,
    reqQueryParam?: Record<string, unknown>
): string {
    const base = coreConfig.BFF_URI.endsWith('/')
        ? coreConfig.BFF_URI
        : coreConfig.BFF_URI + '/';

    const uri = new URL(path.startsWith('/') ? path.slice(1) : path, base)
    // set query param like localhost:3000?=name=hibiki
    if (reqQueryParam) {
        for (const [key, value] of Object.entries(reqQueryParam)) {
            if (value !== undefined) uri.searchParams.set(key, String(value))
        }
    }
    return uri.toString();
}

export function buildReqHeader(
    headerInit: HeadersInit | undefined,
    accessToken: string | null
) {
    return {
        'Content-Type': 'application/json',
        ...headerInit,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    }
}