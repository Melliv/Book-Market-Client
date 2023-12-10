import api from '../api/api';
import { Book } from '../dto/Book';
import { BookPagination } from '../dto/BookPagination';
import { IBook } from '../types/IBook';
import { IBookPagination } from '../types/IBookPagination';

export abstract class BookService {

    static async getBooks(limit: number, offset: number): Promise<{bookPagination: IBookPagination, loading: boolean, error: boolean}> {
        try {
            const response = await api.get<IBookPagination>(`/books?limit=${limit}&offset=${offset}`);
            return {
                bookPagination: response.data,
                loading: false,
                error: response.status != 200
            };
        }
        catch (err) {
            return {
                bookPagination: new BookPagination(),
                loading: false,
                error: true
            }
        }

    }

    static async getBook(bookId: string): Promise<{book: IBook, loading: boolean, error: boolean}> {
        try {
            const response = await api.get<IBook>(`/book/${bookId}`);
            return {
                book: response.data,
                loading: false,
                error: response.status != 200
            };
        }
        catch (err) {
            return {
                book: new Book(),
                loading: false,
                error: true
            }
        }

    }

    static async createBook(book: IBook): Promise<{book: IBook, loading: boolean, error: boolean}> {
        try {
            const response = await api.post<IBook>(`/book`, book);
            return {
                book: response.data,
                loading: false,
                error: response.status != 200
            };
        }
        catch (err) {
            return {
                book: new Book(),
                loading: false,
                error: true
            }
        }

    }


}