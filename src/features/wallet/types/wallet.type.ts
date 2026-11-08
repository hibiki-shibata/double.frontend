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