"use client";
import DefaultCard from "../components/layers/DefaultCard";
import Loader from "../components/common/Loader";
import { useEffect, useState } from "react";
import { BookService } from "../services/BookService";
import Error from "../components/common/Error";
import { BookPagination } from "../dto/BookPagination";
import PaginationBar from "../components/common/PaginationBar";
import BooksList from "../components/book/list/BooksList";

const JOBS_PER_PAGE = 5;

const BooksView = () =>  {
    const [currentPage, setCurrentPage] = useState(1);
    const [res, setRes] = useState({bookPagination: new BookPagination, loading: true, error: false});

    const loadData = async () => {
        let _res = await BookService.getBooks(JOBS_PER_PAGE, (currentPage - 1) * JOBS_PER_PAGE);
        setRes(_res)
    }

    useEffect(() => {
        loadData();
    }, [currentPage]);
    
    
    if (res.loading) return <Loader />
    if (res.error) return <Error />

    const totalPages = Math.ceil(res.bookPagination.totalCount / JOBS_PER_PAGE);
    return (
        <DefaultCard >
            <div className="grid gap-4">
                <p className="text-6xl">
                    Books list
                </p>

                <PaginationBar currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                <BooksList books={res.bookPagination!.books} />
            </div>
        </DefaultCard>
    )
}

export default BooksView;