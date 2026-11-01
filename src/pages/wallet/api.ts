// import { apiClient } from '../../lib/apiClient';
// import type { Wallet } from './types';

// // Wallet balance is intentionally read-only from the frontend: all mutations
// // happen server-side as a side effect of bet placement/settlement/deposits,
// // never via a direct wallet PATCH endpoint.
// export const walletApi = {
//   getMyWallet: () => apiClient.get<Wallet>('/wallets/me'),
// };