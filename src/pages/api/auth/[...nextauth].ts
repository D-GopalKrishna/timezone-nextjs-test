import NextAuth, {NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { randomBytes, randomUUID } from "crypto";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
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
};

export default NextAuth(authOptions)
