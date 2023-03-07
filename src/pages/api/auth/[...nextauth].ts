import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { randomBytes, randomUUID } from "crypto";

// We can use the Credentials function to create a custom login form... and we can use the fetch method to send the credentials to the backend and get the user from there


export const authOptions: NextAuthOptions = {
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "@anush" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Our own logic comes here!
                // const res = await fetch("/api/books", {
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: { "Content-Type": "application/json" }
                // })
                // const user = await res.json()

                // if (res.ok && user) {
                //     return user
                // }
                return null
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : "",
        }),
    ],
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    },
    events: {
        signIn: async (message) => {
            console.log("signIn", message.user, message.profile)   // this we can set the user in the store or localstorage 
        },
        session: async (message) => {
            console.log("session", message.session)
        },
    },
    // pages: {
    //     signIn: "/auth/signin",
    //     // signOut: "/auth/signout",
    // },
};

export default NextAuth(authOptions)
