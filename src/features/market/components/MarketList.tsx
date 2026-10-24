import { MarketCard } from './MarketCard';
import { useMarketList } from '../hooks/marketHook';
import { ErrorState, LoadingState } from '../../../components/StatusState';
import { useSearchParams } from 'react-router';



export function MarketList() {
    const [searchParams, setSearchParams] = useSearchParams()
    const changePageTo = (newPage: number, limit: number) => setSearchParams({ page: String(newPage), limit: String(limit) })

    const currentPage = Number((searchParams.get('page') ?? 1))
    const currentLimit = Number(searchParams.get('limit') ?? 20)

    // Sync URI
    changePageTo(currentPage, currentLimit)

    // Fetch market data
    const { data: markets = [], isLoading, isError } = useMarketList({ page: currentPage, limit: currentLimit })

    const hasMore = markets.length === currentLimit;

    const handlePageChange = (newPage: number) => {
        if (newPage < 1) return;
        changePageTo(newPage, currentLimit);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll back to top on page change
    }

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
            <nav aria-label="Pagination" className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 sm:px-0 pt-6 mt-8">
                {/* Previous Button */}
                <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                </button>

                {/* Page Indicator */}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Page <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span>
                </span>

                {/* Next Button */}
                <button
                    type="button"
                    disabled={!hasMore}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </nav>
        </div>
    )
}