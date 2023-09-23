import connectMongo from '@/libs/mongodb'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt' 
import User from '@/models/User'

const authOptions : NextAuthOptions = {
    pages : {
        signIn : '/mannaa/login'
    },
    secret : process.env.NEXTAUTH_SECRET || "",
    providers : [
        CredentialsProvider({
            name : 'credentials' , 
            credentials : {
                password : {label : 'password'}
            },
            async authorize(credentials,req){
                await connectMongo()
                const user = await User.findOne()
                const correctPass = await bcrypt.compare(credentials?.password || "",user.password)
                if(correctPass) return user
                return null 
            } 
        }) 
    ]
}
const handler = NextAuth(authOptions)
export {handler as GET , handler as POST} 


