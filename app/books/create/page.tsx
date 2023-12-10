import BookForm from '@/app/components/book/create/BookForm';
import DefaultCard from '@/app/components/layers/DefaultCard';
import { IBook } from '@/app/types/IBook';


export default function BookCreateView({book}: {book: IBook | null}) {

  return (
    <DefaultCard >
        <p className='text-3xl'>
          Create Book
        </p>
        <BookForm />
    </DefaultCard>
  )
}

