"use client";

import { IBook } from "@/app/types/IBook";
import Link from "next/link";


const BookCard = (props: { book: IBook }) => {
    return (
        <Link href={`/books/${props.book.id}`}>
            <div className="row flex gap-4">
                <div>
                    {props.book.id}
                </div>
                <div>
                    {props.book.title}
                </div>
                <div>
                    {props.book.author}
                </div>
            </div>
        </Link>

    )
}

export default BookCard;
