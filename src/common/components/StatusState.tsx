import type { ReactNode } from 'react';

interface StatusStateProps {
    message: ReactNode;
}

export function LoadingState({ message = 'Loading...' }: Partial<StatusStateProps>) {
    return (
        <div className="my-4 flex items-center justify-center">
            <p className="text-white">{message}</p>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
        </div>
    );
}

export function ErrorState({ message = 'Failed to load:(' }: Partial<StatusStateProps>) {
    return (
        <div className="flex items-center justify-center">
            <p className="text-white">{message}</p>
        </div>
    );
}

export function EmptyState({ message = 'No data to display' }: Partial<StatusStateProps>) {
    return (
        <div className="flex items-center justify-center text-center">
            <p className="text-white whitespace-pre-line">{message}</p>
        </div>
    );
}