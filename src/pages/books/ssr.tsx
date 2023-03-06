
import Link from 'next/link'
import React, { useEffect } from 'react'
import {wrapper} from '@/store/store'
import Navbar from '@/components/book/Navbar'
import moment from 'moment'

// export default function Books({books}){
//     return (
//         <div>
//             <Navbar />
//             <div style={styles.mainContainer}>
//                 <div style={styles.container}>
//                     <h1 className="mt-4">Renzo Book Library</h1> 
//                     {books.map((book, index) => (
//                         <Link key={index} style={styles.LinkContainer}  href={'/books/' + (book.id).toString()}>
//                             <div style={styles.BookContainer} className="bg-dark">
//                                     <p>Book {index+1}</p>
//                                 <h3>Title: {book.title}</h3>
//                                 <p>Pages: {book.pages}</p>
//                                 <p>Language: {book.language}</p>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }



export default function Page({ data, data2 }) {
    const [datetimetoShow, setDatetimetoShow] = React.useState(data?.datetime)
    const [datetimetoShow2, setDatetimetoShow2] = React.useState(data2?.dateTime)
    useEffect(() => {
        // set the date now from the client side
        setDatetimetoShow(moment().format())
        setDatetimetoShow2(moment().format())
    }, [])
    return (
        <div>
            <h1>Server Side</h1>
            {/* <p>datetime - {data?.datetime.toString()}</p>
            <p>datetime now - {moment().format()}</p>

            <p>datetime - {moment(data2?.dateTime).format()}</p> */}

            <p>datetime - {datetimetoShow}</p>
            <p>datetime - {datetimetoShow2}</p>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const res = await fetch(`http://worldtimeapi.org/api/timezone/Asia/Kolkata`)
    const data = await res.json()
    console.log("res", res)
    const data2 = {
        "year": 2023,
        "month": 3,
        "day": 6,
        "hour": 13,
        "minute": 9,
        "seconds": 14,
        "milliSeconds": 565,
        "dateTime": "2023-03-06T13:09:14.5650545",
        "date": "03/06/2023",
        "time": "13:09",
        "timeZone": "Europe/Amsterdam",
        "dayOfWeek": "Monday",
        "dstActive": false
    }

    return { props: { data: data, data2: data2 } }
})
