import type { Market } from './features/market/types'


export const mockMarkets: Market[] = [
    {
        id: 'mkt_001',
        title: 'Will Team A win the championship?',
        description: 'Resolves based on the official league result at the end of the season.',
        status: 'OPEN',
        closeTime: '2026-09-01T00:00:00Z',
        createdAt: '2026-07-01T00:00:00Z',
    },
    {
        id: 'mkt_002',
        title: 'Will it rain in Tokyo on Aug 20?',
        description: 'Resolves based on the JMA official weather record for Tokyo.',
        status: 'CLOSED',
        closeTime: '2026-08-20T00:00:00Z',
        createdAt: '2026-08-01T00:00:00Z',
    },
    {
        id: 'mkt_003',
        title: 'Will it rain in Tokyo on Aug 20?',
        description: 'Resolves based on the JMA official weather record for Tokyo.',
        status: 'CLOSED',
        closeTime: '2026-08-20T00:00:00Z',
        createdAt: '2026-08-01T00:00:00Z',
    },
    {
        id: 'mkt_004',
        title: 'Will it rain in Tokyo on Aug 20?',
        description: 'Resolves based on the JMA official weather record for Tokyo.',
        status: 'OPEN',
        closeTime: '2026-08-20T00:00:00Z',
        createdAt: '2026-08-01T00:00:00Z',
    },
    {
        id: 'mkt_004',
        title: 'Will it rain in Tokyo on Aug 20?',
        description: 'Resolves based on the JMA official weather record for Tokyo.',
        status: 'OPEN',
        closeTime: '2026-08-20T00:00:00Z',
        createdAt: '2026-08-01T00:00:00Z',
    },
]