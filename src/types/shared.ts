// export type Page<T> = {
//   items: T[];
//   nextCursor: string | null;
// }

export type PaginationParam = {
  page?: string;
  limit?: number;
}

export type ISODateString = string;