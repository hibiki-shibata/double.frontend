export type Bet = {
    id: string;
    marketTitle: string;
    prediction: string;
    amount: number;
    outcome: 'won' | 'lost' | 'pending';
    profit: number;
    timestamp: string;
}