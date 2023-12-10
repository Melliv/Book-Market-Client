import { IBook } from "../types/IBook";
import { IBookPagination } from "../types/IBookPagination";

export class BookPagination implements IBookPagination {
    books: IBook[] = []
    totalCount: number = 0

}