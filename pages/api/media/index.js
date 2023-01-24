
import db from '../../../lib/mongodb.js'
import Images from '../../../models/Images.js'

export default async function userHandler(req, res) {
  await db();
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const images = await Images.find()
        return res.status(200).send(images)
      } catch (e) {
        console.log(e);
        res.status
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}