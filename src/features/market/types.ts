export type MarketStatus = 'OPEN' | 'CLOSED' | 'SETTLED' | 'CANCELLED';

export type Market = {
    id: string;
    title: string;
    description: string;
    status: MarketStatus;
    closeTime: string;
    settledAt?: string;
    createdAt: string;
    predictions: Predictions[]
}

export type MarketListParams = {
    page?: string;
    limit?: number;
}

export type Predictions = {
    name: string;
    totalParticipants: number;
    betSum: bigint;
}