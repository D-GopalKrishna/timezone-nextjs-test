import Link from 'next/link'
import React from 'react'

import Navbar from '@/components/book/Navbar'

export default function Books({books}){
    return (
        <div>
            <Navbar />
            <div style={styles.mainContainer}>
                <div style={styles.container}>
                    <h1 className="mt-4">Renzo Book Library</h1> 
                    {books.map((book, index) => (
                        <Link key={index} style={styles.LinkContainer}  href={'/books/' + (book.id).toString()}>
                            <div style={styles.BookContainer} className="bg-dark">
                                    <p>Book {index+1}</p>
                                <h3>Title: {book.title}</h3>
                                <p>Pages: {book.pages}</p>
                                <p>Language: {book.language}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const res = await fetch(`http://localhost:3000/api/books`)
    const books = await res.json()
    return {
        props: {
            books
        }
    }
}

const styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        width: '80%',
    },
    BookContainer: {
        margin: '1rem', marginBottom: 50, padding: '15px 30px',
        borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.1)', 
    }, 
    LinkContainer: {
        textDecoration: 'none', color: 'white'
    }
}