
import db from '../../../lib/mongodb.js'
import Project from '../../../models/Project.js'

export default async function userHandler(req, res) {
  await db();
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const project = await Project.findOne({ slug: req.query.slug })
    
        res.send({ project });
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
