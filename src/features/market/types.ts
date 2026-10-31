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

export type Prediction = {
    id: string;
    name: string;
    totalParticipants: number;
    betSum: bigint;
}

export type BetPayload = {
    predictionId: string
    amount: number
}