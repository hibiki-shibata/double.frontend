import type { Currency } from "./wallet.type"

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