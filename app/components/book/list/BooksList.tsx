import { IBook } from "@/app/types/IBook";
import BookCard from "./BookCard";


const BooksList = (props: {books: IBook[]}) => {

    return (
        <div>
            {props.books.map(book =>
                <div key={book.id.toString()}>
                    <BookCard book={book} />
                </div>)
            }
        </div>
    );
};

export default BooksList;