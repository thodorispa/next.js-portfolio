import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Account from '../../../models/Account.js'
import db from '../../../lib/mongodb.js'
import { setCookie } from 'cookies-next';

export default async function userHandler(req, res) {
  await db();

  const { method } = req
  
  switch (method) {
    case 'POST':
      try {
        const username = req.body.username
        const password = req.body.password
        const referral = req.body.referral
    
        if (referral && referral === process.env.REFERRAL) {
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(password, salt)
    
          const account = new Account({
            username,
            password: hashedPassword
          })
    
          const existingAccount = await Account.findOne({ username })
          
          if (existingAccount) {
            res.status(400).send('Username already exists')
          }
    
          const savedAccount = await account.save()
    
          const token = jwt.sign({ savedAccount }, process.env.SECRET)
    
    
          req.account = savedAccount;
          setCookie('jwt', token, { req, res, maxAge: 60 * 60 * 24 });

          res.status(200).send()
        } else {
          res.status(400).send('Invalid referral' )
        }
    
      } catch (e) {
        console.log(e);
        return res.status(500).send("Not allowed to register")
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}