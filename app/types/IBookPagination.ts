import { IBook } from "./IBook";

export interface IBookPagination {
    books: IBook[];
    totalCount: number;
}