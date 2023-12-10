"use client";
import { Book } from '@/app/dto/Book';
import { BookService } from '@/app/services/BookService';
import { TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

const validationTemplate = {
    title: "",
    author: "",
  }

export default function BookForm() {
    const [book, setBook] = useState(new Book);
    const [alertMessage, setAlertMessage] = useState(validationTemplate);
    const router = useRouter()

    // useEffect(() => {
    //     if (_book) {
    //         setBook(_book)
    //     }
    // }, []);  

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
        const valid = handleValidation()

        if (valid) {
            let res = await BookService.createBook(book);
            if (!res.error) {
                router.push(`/books/${res.book.id}`)
            }
        }
    };


    return (
        <form onSubmit={handleSubmit} className='grid gap-4 mt-8'>
            <TextField id="book-title" label="Title" name='title' variant="outlined" error={alertMessage.title != ""} helperText={alertMessage.title} value={book.title} onChange={handleInputChange} />
            <TextField id="book-author" label="Author" name='author' variant="outlined" error={alertMessage.title != ""} helperText={alertMessage.title} value={book.author} onChange={handleInputChange} />

            <button type="submit" className="default-button">Create</button>
        </form>
    )
}
