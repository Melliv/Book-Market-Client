"use client";
import { Book } from '@/app/dto/Book';
import { IBook } from '@/app/types/IBook';
import { TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

const validationTemplate = {
    title: "",
    author: "",
}

interface Props {
    submit: (book: IBook) => Promise<void>;
    bookEdit?: IBook | undefined
}

export default function BookForm({ submit, bookEdit }: Props) {
    const [submitDisabled, setSubmitDisabled] = useState(false)
    const [book, setBook] = useState(new Book);
    const [alertMessage, setAlertMessage] = useState(validationTemplate);

    useEffect(() => {
        if (bookEdit) {
            setBook(bookEdit)
        }
    }, [bookEdit]);  

    const handleValidation = () => {
        let formIsValid = true;

        setAlertMessage(validationTemplate);

        if (!book.title) {
            setAlertMessage(prevState => ({
                ...prevState,
                title: "Title field can not be empty!"
            }));
            formIsValid = false;
        }
        if (!book.author) {
            setAlertMessage(prevState => ({
                ...prevState,
                author: "Author field can not be empty!"
            }));
            formIsValid = false;
        }

        return formIsValid;
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBook({
            ...book,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitDisabled(true)
        const valid = handleValidation()

        if (valid) submit(book)

        setSubmitDisabled(false)
    };

    return (
        <form onSubmit={handleSubmit} className='grid gap-4 mt-8'>
            <TextField id="book-title" label="Title" name='title' variant="outlined" error={alertMessage.title != ""} helperText={alertMessage.title} value={book.title} onChange={handleInputChange} />
            <TextField id="book-author" label="Author" name='author' variant="outlined" error={alertMessage.title != ""} helperText={alertMessage.title} value={book.author} onChange={handleInputChange} />

            <button disabled={submitDisabled} type="submit" className="default-button">Submit</button>
        </form>
    )
}
