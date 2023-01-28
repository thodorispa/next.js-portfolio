import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Account from '../../../models/Account.js'
import { setCookie } from 'cookies-next';

import db from '../../../lib/mongodb.js'

export default async function userHandler(req, res) {
  await db();
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const username = req.body.username
        const password = req.body.password
        const account = await Account.findOne({ username })

        if (!account) {
          res.status(404).send("Invalid credentials")
          return;
        }

        const match = await bcrypt.compare(password, account.password)
        if (!match) {
          res.status(404).send("Invalid credentials")
          return;
        }

        const token = jwt.sign({ account }, process.env.SECRET || '123')

        account.lastLoginAt = Date.now()

        await account.save()
        req.account = account;

        setCookie(res, 'jwt', token, { httpOnly: true })
        res.status(200).send()

      } catch (e) {
        console.log(e);
        return res.status(500).send()
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
