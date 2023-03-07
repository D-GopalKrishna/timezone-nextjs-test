import Link from 'next/link'
import React from 'react'
import {wrapper} from '@/store/store'
import Navbar from '@/components/book/Navbar'
import {setupbookInfo} from '@/store/books/bookSlice'
import type * as CSS from 'csstype';
// import module css as styles
import styles from './Book.module.css'

type Props = {
    books: any
}

export default function Books(props: Props) {
    return (
        <div>
            <Navbar />
            <div className={styles.mainContainer}>
                <div className={styles.container}>
                    <h1 className="mt-4">Renzo Book Library</h1> 
                    {props?.books ? props.books.map((book: any, index: any) => (
                        <Link key={index} className={styles.LinkContainer}  href={'/books/' + (book.id).toString()}>
                            <div className={styles.BookContainer + ' bg-dark'} >
                                    <p>Book {index+1}</p>
                                <h3>Title: {book.title}</h3>
                                <p>Pages: {book.pages}</p>
                                <p>Language: {book.language}</p>
                            </div>
                        </Link>
                    ))
                    : <div>loading...</div>}
                </div>
            </div>
        </div>
    )
}


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const res = await fetch(`http://localhost:3000/api/books`)
    const books = await res.json()
    console.log("store in Books List Page:", books)
    store.dispatch(setupbookInfo({books: books}))
    return {
        props: {
            books,
        }
    }
})
