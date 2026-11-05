// Wallet Type
export enum Currency {
    USD
}

export enum WalletStatus {
    ACTIVE,
    SUSPENDED
}

export type Wallet = {
    id: string,
    userId: string,
    balance: bigint,
    currency: Currency,
    reservedAmount: bigint,
    status: WalletStatus,
    updatedAt: string
}

// Wallet History types
export enum WalletTransactionType {
    DEPOSIT,
    WITHDRAW,
    BET,
    PAYOUT,
    REFUND,
    CANCEL,
}

export type WalletTransaction = {
    id: string
    wallet_id: string
    user_id: string
    prediction_id: string
    type: WalletTransactionType
    currency: Currency
    amount: bigint
    balance_before: bigint
    balance_after: bigint
    created_at: string
}