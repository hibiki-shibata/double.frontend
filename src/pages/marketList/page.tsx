import { MarketCard } from '../../features/market/components/list/MarketCard';
import { PaginationCard } from '../../features/market/components/list/PaginationCard';
import { useMarketList } from '../../features/market/hooks/marketHook';
import { EmptyState, ErrorState, LoadingState } from '../../common/components/StatusState';
import { usePagination } from '../../common/lib/paginationHook';


// Index page
export function MarketList() {
    const { currentPage, currentLimit, setPage, setLimit } = usePagination();
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