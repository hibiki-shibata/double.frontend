import { MarketCard } from './MarketCard';
import { useMarketList } from '../hooks/marketHook';
import { ErrorState, LoadingState } from '../../../components/StatusState';
import { useSearchParams } from 'react-router';


export function MarketList() {  
    const [searchParams, setSearchParams] = useSearchParams()
    const changePageTo = (newPage: number, limit: number) => setSearchParams({ page: String(newPage), limit: String(limit) });
    const page = Number((searchParams.get('page') ?? 1))
    const limit = Number(searchParams.get('limit') ?? 20)
    changePageTo(page, limit)  
    const { data: markets = [], isLoading, isError } = useMarketList({page, limit})

    return (
        <div className='max-w-7xl mx-auto'>
            <div className='pt-5 pb-6 border-b border-gray-200 dark:border-gray-700'>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-white tracking-tight'>
                    Predictions
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
                        Live
                    </span>
                </div>
            </div>
            {isLoading && <LoadingState message="Loading market list.." />}
            {isError && <ErrorState message="Failed to load market list:(" />}
            {(!markets || markets.length === 0) && <LoadingState message="Loading market list.." />}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {markets.map((market) => (
                    <MarketCard key={market.id} market={market} />
                ))}
            </div>
        </div>
    )
}