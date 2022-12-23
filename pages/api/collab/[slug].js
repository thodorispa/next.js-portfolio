
import db from '../../../lib/mongodb.js'
import Collab from '../../../models/Collab.js'


export default async function userHandler(req, res) {
  await db();
  const { method } = req

  console.log('teo', req.query);

  switch (method) {
    case 'GET':
      try {
        const collaboration = await Collab.findOne({ slug: req.query.slug })
    
        res.send({ collaboration });
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
