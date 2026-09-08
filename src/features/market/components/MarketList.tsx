import { MarketCard } from './MarketCard';
import type { Market } from '../types';

interface Props {
    markets: Market[];
    onSelect?: (marketId: string) => void;
}

export function MarketList() {
    const markets: Market[] = []

    if (markets.length === 0) {
        return (
            <div className='h-screen'>
                <p className="flex items-center justify-center text-white h-full">
                    No markets to show:(
                    We will add more markets soon
                </p>
            </div>)
    }

    return (
        <div className='max-w-7xl mx-auto'>
            <div className='pt-5 pb-6 border-b border-gray-200 dark:border-gray-700'>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-white tracking-tight'>
                    Trading Markets
                </h1>
                <div className='flex items-center gap-3 mt-1'>
                    <p className='text-gray-600 dark:text-gray-400 font-medium'>
                        Bet on your future prediction
                    </p>
                    <span className='inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold'>
                        <span className='relative flex h-2 w-2'>
                            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                            <span className='relative inline-flex rounded-full h-2 w-2 bg-green-500'></span>
                        </span>
                        812 in volume - Live
                    </span>
                </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {markets.map((market) => (
                    <MarketCard key={market.id} market={market} />
                ))}
            </div>
        </div>
    )
}