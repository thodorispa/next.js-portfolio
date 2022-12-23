
import db from '../../../lib/mongodb.js'
import Project from '../../../models/Project.js'

export default async function userHandler(req, res) {
  await db();
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const { id } = req.body
    
        await Project.deleteOne({ _id: id })
  
        res.status(200)
      } catch (e) {
        console.log(e);
        res.status
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}
