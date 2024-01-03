"use client"
import BookForm from '@/app/components/book/create/BookForm';
import DefaultCard from '@/app/components/layers/DefaultCard';
import { Book } from '@/app/dto/Book';
import { BookService } from '@/app/services/BookService';
import { IBook } from '@/app/types/IBook';
import { useRouter } from 'next/navigation';
import router from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react'

export default function EditBookView({ params }: { params: { id: string } }) {
    const [res, setRes] = useState({ book: new Book, loading: true, error: false });
    const router = useRouter()

    const loadData = async () => {
        let _res = await BookService.getBook(params.id);
        setRes(_res)
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async (book: IBook) => {
      let res = await BookService.editBook(book)
      if (!res.error) {
          router.push(`/books/${book.id}`)
      }
    };

    return (
        <DefaultCard >
        <p className='text-3xl'>
          Edit Book
        </p>
        <BookForm submit={handleSubmit} bookEdit={res.book} />
      </DefaultCard>
    )
}
