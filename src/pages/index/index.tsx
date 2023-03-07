import React from 'react'
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/pages/api/auth/[...nextauth]"
import HomeComponent from '@/components/HomeComponent'
import Navbar from '@/components/book/Navbar'
import styles from './Index.module.css'

export default function Index() {
    const { data: session } = useSession()
    console.log(session)

    if (!session) {
        return (
            <>
                <Navbar />
                <p className={styles.textAccess}>Access Denied</p>
            </>
        )
    }
    return (
        <>
            <Navbar />
            <HomeComponent />
        </>
    )
}

export async function getServerSideProps(context: any) {
    const session = await getServerSession(context.req, context.res, authOptions)
    if (!session) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            },
        }
    }
    return {
        props: {
            session
        }
    }
}

