import db from '../../../lib/mongodb';

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Account from '../../../models/Account';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        await db();

        try {
          const username = credentials.username
          const password = credentials.password
          const account = await Account.findOne({ username })
          if (!account) {
            console.log("Invalid credentials1");

            return;
          }

          const match = await bcrypt.compare(password, account.password)
          if (!match) {
            console.log("Invalid credentials2");
            return ;
          }

          const token = jwt.sign({ account }, process.env.JWT_SECRET || '123')

          account.lastLoginAt = Date.now()

          await account.save()
          return account.username;
          
        } catch (e) {
          console.log(e);
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    signingKey: process.env.JWT_SECRET,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
}

export default NextAuth(authOptions)