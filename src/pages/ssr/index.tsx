
import Link from 'next/link'
import React, { useEffect } from 'react'
import {wrapper} from '@/store/store'
import Navbar from '@/components/book/Navbar'
import { format, compareAsc } from 'date-fns'
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'

type Props = {
    data: any, 
    data2: any,
    servertimenow: any
}

export default function Page(props: Props) {
    const date = new Date(props.data.utc_datetime)
    const timeZone = props.data.timezone
    const zonedDate = utcToZonedTime(date, timeZone)
    
    const date2 = new Date(props.data2.utc_datetime)    // this converts the date to the client's timezone... 
    const timeZone2 = props.data2.timezone
    const zonedDate2 = utcToZonedTime(date2, timeZone2)      // client's timezone time is converted to the timezone given. 
    
    const NewYorkTimeInUTC = zonedTimeToUtc(new Date('2018-09-01 18:01:36.386'), 'America/New_York')
    console.log("NewYorkTimeInUTC", NewYorkTimeInUTC)
    const NewYorkTimeInIST = utcToZonedTime(NewYorkTimeInUTC, 'Asia/Kolkata')
    console.log("NewYorkTimeInIST", NewYorkTimeInIST)

    
    console.log("zonedDate", zonedDate.toString(), "date", date, "timeZone", timeZone)
    console.log("zonedDate2", zonedDate2.toString(), "date2", date2, "timeZone2", timeZone2)
    return (
        <div>
            <h1>Server Side</h1>
            <p>servertimenow - {props.servertimenow}</p>
            <p>datetime - {props.data?.datetime.toString()}</p>

            <p>utc_datetime - {props.data?.utc_datetime.toString()}</p>
            <p>utc_datetime converted to client (which is also given by an attribute) timezone- {utcToZonedTime(props.data?.utc_datetime.toString(), timeZone).toString()}</p>
            <p>utc_datetime converted to client (which is also given by an attribute) timezone (in ISO string) - {utcToZonedTime(props.data?.utc_datetime.toString(), timeZone).toISOString()}</p>
            <p>utc_datetime converted to client (which is also given by an attribute) timezone (in UTC string) - {utcToZonedTime(props.data?.utc_datetime.toString(), timeZone).toUTCString()}</p>
            <p>timezone - {props.data?.timezone.toString()}</p>
            <p>zonedDate - {zonedDate.toString()}</p>

            <hr />

            <p>dateTime2 - {props.data2?.datetime.toString()}</p>
            <p>utc_datetime2 - {props.data2?.utc_datetime.toString()}</p>
            <p>utc_datetime converted to client (which is also given by an attribute) timezone- {utcToZonedTime(props.data?.utc_datetime.toString(), timeZone2).toString()}</p>
            <p>utc_datetime converted to client (which is also given by an attribute) timezone- {format(utcToZonedTime(props.data?.utc_datetime.toString(), timeZone2),  'yyyy-MM-dd HH:mm:ss')}</p>
            <p>utc_datetime converted to client (which is also given by an attribute) timezone (in ISO string) - {utcToZonedTime(props.data?.utc_datetime, timeZone2).toISOString()}</p>
            <p>utc_datetime converted to client (which is also given by an attribute) timezone (in UTC string) - {utcToZonedTime(props.data?.utc_datetime, timeZone2).toUTCString()}</p>
            <p>timezone - {props.data2?.timezone.toString()}</p>
            <p>zonedDate2 - {zonedDate2.toString()}</p>
        </div>
    )
}


export async function getServerSideProps(context: any) {
    const res = await fetch(`http://worldtimeapi.org/api/timezone/Asia/Kolkata`)
    const data = await res.json()
    const res2 = await fetch(`http://worldtimeapi.org/api/timezone/America/New_York`)
    const data2 = await res2.json()
    const servertimenow = new Date()

    return { props: { data: data, data2: data2, servertimenow: servertimenow.toString() }}}
