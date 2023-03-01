import Navbar from '@/components/book/Navbar'
import React from 'react'

export default function IndividualBook({book}) {
    if (!book) {
        return (
            <div>Error in this Book </div>
        )
    }

    return (
        <>
            <Navbar />
            <div key={book.id} style={styles.container}>
                <button onClick={() => window.history.back()} className="btn bg-dark text-white mb-5">Go Back</button>            
                <div style={styles.BookinfoContainer} className="bg-dark">
                    <h1>Title: {book.title}</h1>
                    <p>Pages: {book.pages}</p>
                    <p>Language: {book.language}</p>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async (context) => {
    const { id } = context.params
    const res = await fetch(`http://localhost:3000/api/books`)
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