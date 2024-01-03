"use client";
import Error from '@/app/components/common/Error';
import Loader from '@/app/components/common/Loader';
import DefaultCard from '@/app/components/layers/DefaultCard';
import { Book } from '@/app/dto/Book';
import { BookService } from '@/app/services/BookService';
import { UserState, selectUser } from '@/app/store/reducers/user';
import { Button } from '@mui/material';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function BookView({ params }: { params: { id: string } }) {
    const [res, setRes] = useState({ book: new Book, loading: true, error: false });
    const token = getCookie("token")
    const user: UserState | undefined = useSelector(selectUser);

    const loadData = async () => {
        let _res = await BookService.getBook(params.id);
        setRes(_res)
    }

    useEffect(() => {
        loadData();
    }, []);


    if (res.loading) return <Loader />
    if (res.error) return <Error />

    const EditButton = () => {
        if (!token || res.book.ownerId !== user.id) return <></>

        return <Link href={`/books/edit/${res.book.id}`}>
            <Button variant="contained">
                Edit
            </Button>
        </Link> 
    }
    
    return (
        <DefaultCard >
            <div className="grid gap-4">
                <div className='flex justify-between'>
                    <p className="text-6xl">
                        Book Details
                    </p>
                    <EditButton />
                </div>

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
