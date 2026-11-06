import { useSearchParams } from "react-router";
import { useCallback } from "react";

interface UsePaginationOptions {
    defaultPage?: number;
    defaultLimit?: number;
}

export function usePagination(options: UsePaginationOptions = {}) {
    const { defaultPage = 1, defaultLimit = 15 } = options;
    const [searchParams, setSearchParams] = useSearchParams();

    // Parse current values with safe fallbacks
    const page = Math.max(1, Number(searchParams.get("page") ?? defaultPage));
    const limit = Math.max(1, Number(searchParams.get("limit") ?? defaultLimit));

    // Change page while preserving other search params (e.g., filters, sorting)
    const setPage = useCallback((newPage: number) => {
        setSearchParams(
            (prev) => {
                const params = new URLSearchParams(prev);
                params.set("page", String(newPage));
                return params;
            },
            { replace: true } // Use replace to avoid polluting browser history on rapid page clicks
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [setSearchParams]);

    // Change limit and reset to page 1
    const setLimit = useCallback((newLimit: number) => {
        setSearchParams(
            (prev) => {
                const params = new URLSearchParams(prev);
                params.set("limit", String(newLimit));
                params.set("page", "1"); // Reset to page 1
                return params;
            },
            { replace: true }
        );
    }, [setSearchParams]);

    return {
        currentPage: page,
        currentLimit: limit,
        setPage,
        setLimit,
    };
}