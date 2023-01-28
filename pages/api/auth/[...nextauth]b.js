import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Account from "../../../models/Account";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../../lib/mongodb";
import axios from "axios";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      async authorize(credentials, req) {
        const { username, password } = credentials;
        await db();

        try {
          const account = await Account.findOne({ username })
          if (!account) {
            console.log("Invalid credentials");

            return null;
          }

          const match = await bcrypt.compare(password, account.password)
          if (!match) {
            console.log("Invalid credentials");
            return null;
          }
          const token = jwt.sign({ account }, process.env.SECRET || '123')


          return account.username;
        } catch (e) {

          console.log(e);
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    jwt(params) {
      if (params?.token) {
        params.token.user = params?.user;
      }
      return params.token;
    },
    async session({ session, token }) {
      session.user.name = token.user;
      return session;
    },

  },
  jwt: {
    signingKey: process.env.SECRET,
  },
  secret: process.env.SECRET,
};

export default nextAuth(authOptions);