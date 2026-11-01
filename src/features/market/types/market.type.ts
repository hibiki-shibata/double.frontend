export type MarketStatus = 'OPEN' | 'CLOSED' | 'SETTLED' | 'CANCELLED'

export type Market = {
    id: string;
    title: string;
    description: string;
    status: MarketStatus;
    closeAt: string;
    settledAt?: string;
    createdAt: string;
}