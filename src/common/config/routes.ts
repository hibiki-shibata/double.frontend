export const ROUTES = {
    // HOME: '/marketList',
    MARKET_LIST: '/marketList',
    MARKET_DETAILS: ({ marketId }: { marketId?: string }) => `/marketList/` + (marketId ? marketId.trim() : ':marketId'),
    ABOUT: '/about',
    PRIVACY: '/privacy',
    TERMS: '/terms',
    SETTINGS: '/settings',
    AUTH: ({ isSignup }: { isSignup?: boolean }) => '/auth' + (isSignup ? '?isSignup=TRUE' : ''),
}