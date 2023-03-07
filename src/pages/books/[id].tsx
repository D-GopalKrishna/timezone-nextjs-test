import Navbar from '@/components/book/Navbar'
import React from 'react'

type BookParams = {
    book: {
        id: number,
        title: string,
        pages: number,
        language: string
    },
}

export default function IndividualBook(props: BookParams) {
    if (!props.book) {
        return (
            <div>Error in this Book </div>
        )
    }

    return (
        <div>
            <Navbar />
            <div key={props.book?.id} style={styles.container}>
                <button onClick={() => window.history.back()} className="btn bg-dark text-white mb-5">Go Back</button>            
                <div style={styles.BookinfoContainer} className="bg-dark">
                    <h1>Title: {props.book?.title}</h1>
                    <p>Pages: {props.book?.pages}</p>
                    <p>Language: {props.book?.language}</p>
                </div>
            </div>
        </div>
    )
}

const dev = process.env.NODE_ENV !== 'production';
const server = dev ? 'http://localhost:3000' : 'https://test-projects-nextjs-test-7pb8.vercel.app';

export const getServerSideProps = async (context: any) => {
    const { id } = context.params
    const res = await fetch(`${server}/api/books`)
    const books = await res.json()
    const book = books[id-1]

    return {
        props: {
            book
        }
    }
}


const styles = {
    container: {
        width: '80%', margin: 'auto', marginTop: 50, 
    },
    BookinfoContainer: {
        padding: '15px 30px',
        borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    }
}