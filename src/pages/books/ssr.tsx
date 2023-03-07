
import Link from 'next/link'
import React, { useEffect } from 'react'
import {wrapper} from '@/store/store'
import Navbar from '@/components/book/Navbar'
import { format, compareAsc } from 'date-fns'
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'

type Props = {
    data: any, 
    data2: any
}
export default function Page(props: Props) {
    const date = new Date(props.data.utc_datetime)
    const timeZone = props.data.timezone
    const zonedDate = utcToZonedTime(date, timeZone)
    
    const date2 = new Date(props.data2.dateTime)    // this converts the date to the client's timezone... 
    const timeZone2 = props.data2.timeZone
    const zonedDate2 = utcToZonedTime(date2, timeZone)      // client's timezone time is converted to the timezone given. 
    
    console.log("zonedDate", zonedDate.toString(), "date", date, "timeZone", timeZone)
    console.log("zonedDate2", zonedDate2.toString(), "date2", date2, "timeZone2", timeZone2)
    return (
        <div>
            <h1>Server Side</h1>
            <p>datetime - {props.data?.datetime.toString()}</p>

            <p>utc_datetime - {props.data?.utc_datetime.toString()}</p>
            <p>utc_datetime converted to client (which is also given by an attribute) timezone- {utcToZonedTime(props.data?.utc_datetime.toString(), timeZone).toString()}</p>
            <p>utc_datetime converted to client (which is also given by an attribute) timezone (in ISO string) - {utcToZonedTime(props.data?.utc_datetime.toString(), timeZone).toISOString()}</p>
            <p>utc_datetime converted to client (which is also given by an attribute) timezone (in UTC string) - {utcToZonedTime(props.data?.utc_datetime.toString(), timeZone).toUTCString()}</p>
            <p>timezone - {props.data?.timezone.toString()}</p>
            <p>zonedDate - {zonedDate.toString()}</p>

            <hr />
            <p>dateTime - {props.data2?.dateTime.toString()}</p>
            <p>timeZone - {props.data2?.timeZone.toString()}</p>
            <p>zonedDate2 - {zonedDate2.toString()}</p>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const res = await fetch(`http://worldtimeapi.org/api/timezone/Asia/Kolkata`)
    const data = await res.json()
    console.log("res", res.json())
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
