import { MarketCard } from '../../features/market/components/list/MarketCard';
import { PaginationCard } from '../../features/market/components/list/PaginationCard';
import { useMarketList } from '../../features/market/hooks/marketHook';
import { EmptyState, ErrorState, LoadingState } from '../../common/components/StatusState';
import { usePagination } from '../../common/lib/paginationHook';


// Index page
export function MarketList() {
    const { currentPage, currentLimit, setPage } = usePagination()
    const { data: markets = [], isLoading, isError } = useMarketList({ page: currentPage, limit: currentLimit });

    if (isLoading) {
        return (
            <div className='max-w-7xl mx-auto my-10 h-[60vh] flex items-center justify-center'>
                <LoadingState message="Loading market list..." />
            </div>
        );
    }

    if (isError) {
        return (
            <div className='max-w-7xl mx-auto my-10 h-[60vh] flex items-center justify-center'>
                <ErrorState message="Failed to load market list :(" />
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto my-10'>
            {/* Header section... */}
            <div className='pt-5 pb-6 border-b border-gray-200 dark:border-gray-700 mx-6 1xl:mx-0'>
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

            {markets.length === 0 ? (
                <EmptyState message="No markets exist" />
            ) : (
                <>
                    <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                        {markets.map((market) => (
                            <MarketCard key={market.id} market={market} />
                        ))}
                    </div>
                    <div className="mt-8">
                        <PaginationCard
                            currentPage={currentPage}
                            toPage={setPage}
                        />
                    </div>
                </>
            )}
        </div>
    );
}