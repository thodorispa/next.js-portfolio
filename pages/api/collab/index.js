
import db from '../../../lib/mongodb.js'
import Collab from '../../../models/Collab.js'

export default async function userHandler(req, res) {
  await db();
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const collaborations = await Collab.find()

        return res.status(200).send(collaborations)
      } catch (e) {
        console.log(e);
        return res.status(500).send({})
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
