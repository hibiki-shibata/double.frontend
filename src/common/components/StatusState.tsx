import type { ReactNode } from 'react';

interface StatusStateProps {
    message: ReactNode;
}

export function LoadingState({ message = 'Loading...' }: Partial<StatusStateProps>) {
    return (
        <div className="h-screen flex items-center justify-center">
            <p className="text-white">{message}</p>
        </div>
    );
}

export function ErrorState({ message = 'Failed to load:(' }: Partial<StatusStateProps>) {
    return (
        <div className="h-screen flex items-center justify-center">
            <p className="text-white">{message}</p>
        </div>
    );
}

export function EmptyState({ message = 'No data to display' }: Partial<StatusStateProps>) {
    return (
        <div className="h-screen flex items-center justify-center text-center">
            <p className="text-white whitespace-pre-line">{message}</p>
        </div>
    );
}