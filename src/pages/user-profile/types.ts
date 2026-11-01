export type UserRole = 'USER' | 'ADMIN' | 'SUPPORT';
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'DELETED';

/**
 * Client-facing profile. Deliberately does NOT include passwordHash or any
 * other auth secret — those must never be serialized past the backend
 * auth service, regardless of what the source feature list says to include.
 */
export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  roles: UserRole[];
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileInput {
  displayName?: string;
}