import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from '../../../../lib/mongoDb'

const adminEmails = ['owinoallan77@gmail.com']

 export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({session, token, user }) => {
      if (adminEmails.includes(session?.user.email)) {
         return session
      } else {
        return false
      }
    }
  },
}

export default NextAuth(authOptions)

export const isAdminRequest = async(req, res)=>{
  const session = await getServerSession(req, res, authOptions)
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401)
    res.end()
    throw 'you are not an admin!'
  }
}