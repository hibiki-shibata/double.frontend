export function PaginationCard({ currentPage, toPage }: { currentPage: number, toPage: (pageNumber: number) => void }) {
    return (
        <nav aria-label="Pagination" className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 sm:px-0 pt-6 mt-8">
            {/* Previous Button */}
            <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => toPage(currentPage - 1)}
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
                onClick={() => toPage(currentPage + 1)}
                className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </nav>
    )
}