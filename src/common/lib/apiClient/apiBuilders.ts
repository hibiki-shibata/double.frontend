import { getAccessToken } from "../auth";
import { coreConfig } from "../../config/coreConfig"

export function buildReqURI(
    path: string,
    reqQueryParam?: Record<string, unknown>
): string {
    const uri = new URL(coreConfig.BFF_URI + path, window.location.origin)
    // const uri = new URL(path, window.location.origin) // For msw test
    // set query param like localhost:3000?=name=hibiki
    if (reqQueryParam) {
        for (const [key, value] of Object.entries(reqQueryParam)) {
            if (value !== undefined) uri.searchParams.set(key, String(value))
        }
    }
    return uri.toString();
}

export function buildReqHeader(headerInit: HeadersInit | undefined) {
    const accessToken: string | null = getAccessToken()
    return {
        'Content-Type': 'application/json',
        ...headerInit,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    }
}