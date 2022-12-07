import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import {connectToDatabase} from "../../../lib/db";
import {compare} from "bcrypt";

const verifyPassword = async (pass, hashedPass) => {
    const isValid = await compare(pass, hashedPass)
    return isValid
}

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials, req) {
                const client = await connectToDatabase()
                const db = client.db('next-js')
                const foundUser = await db.collection('users').findOne({email: credentials.email})
                if (!foundUser) throw new Error('No user found!')

                const validPassword = await verifyPassword(credentials.password, foundUser.password)
                if (!validPassword) throw new Error('Invalid Credentials')

                client.close()

                return {
                    email: foundUser.email
                }
            }
        })
    ]

})