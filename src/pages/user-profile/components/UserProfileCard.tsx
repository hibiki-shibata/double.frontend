import type { UserProfile } from '../types';

interface Props {
  user: UserProfile;
}

export function UserProfileCard({ user }: Props) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-medium text-white">
        {user.displayName.slice(0, 1).toUpperCase()}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-slate-900">{user.displayName}</p>
        <p className="truncate text-xs text-slate-500">{user.email}</p>
      </div>
      <span
        className={`ml-auto rounded-full px-2 py-0.5 text-xs font-medium ${
          user.status === 'ACTIVE'
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        {user.status}
      </span>
    </div>
  );
}