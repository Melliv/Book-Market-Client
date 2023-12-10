import { IBook } from "../types/IBook";

export class Book implements IBook {
    id: string = ""
    title: string = ""
    author: string = ""
    ownerId: string = ""
}