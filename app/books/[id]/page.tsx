"use client";
import Error from '@/app/components/common/Error';
import Loader from '@/app/components/common/Loader';
import DefaultCard from '@/app/components/layers/DefaultCard';
import { Book } from '@/app/dto/Book';
import { BookService } from '@/app/services/BookService';
import React, { useEffect, useState } from 'react'

export default function BookView({params}: {params: {id: string}}) {
    const [res, setRes] = useState({book: new Book, loading: true, error: false});

    const loadData = async () => {
        let _res = await BookService.getBook(params.id);
        setRes(_res)
    }

    useEffect(() => {
        loadData();
    }, []);
    
    
    if (res.loading) return <Loader />
    if (res.error) return <Error />

    return (
        <DefaultCard >
            <div className="grid gap-4">
                <p className="text-6xl">
                    Book Details
                </p>

                <div className='grid gap-2'>
                    <p>
                        Id: {res.book.id}
                    </p>
                    <p>
                        Title: {res.book.title}
                    </p>
                    <p>
                        Author: {res.book.author}
                    </p>
                </div>
            </div>
        </DefaultCard>
    )
}
