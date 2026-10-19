// export type Page<T> = {
//   items: T[];
//   nextCursor: string | null;
// }

export type PaginationParam = {
  page?: number;
  limit?: number;
}

export type ISODateString = string;