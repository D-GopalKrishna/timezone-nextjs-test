import React from 'react'
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/pages/api/auth/[...nextauth]"
import HomeComponent from '@/components/HomeComponent'
import Navbar from '@/components/book/Navbar'

export default function home() {
    const { data: session } = useSession()
    console.log(session)

    if (!session) {
        return (
            <>
                <Navbar />
                <p style={styles.textAccess}>Access Denied</p>
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

export async function getServerSideProps(context) {
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

const styles = {
    textAccess: {
        textAlign: 'center',
        fontSize: '2rem',
        marginTop: '2rem'
    }
}