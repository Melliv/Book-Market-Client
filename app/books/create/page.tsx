"use client"
import BookForm from '@/app/components/book/create/BookForm';
import DefaultCard from '@/app/components/layers/DefaultCard';
import { BookService } from '@/app/services/BookService';
import { IBook } from '@/app/types/IBook';
import { useRouter } from 'next/navigation';

export default function BookCreateView() {
  const router = useRouter()

  const handleSubmit = async (book: IBook) => {
    let res = await BookService.createBook(book)

    if (!res.error) {
        router.push(`/books/${res.book.id}`)
    }
  };

  return (
    <DefaultCard >
      <p className='text-3xl'>
        Create Book
      </p>
      
      <BookForm submit={handleSubmit}/>
    </DefaultCard>
  )
}

