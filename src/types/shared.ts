export interface Page<T> {
  items: T[];
  nextCursor: string | null;
}

export interface CursorPaginationParams {
  cursor?: string;
  limit?: number;
}

export type ISODateString = string;