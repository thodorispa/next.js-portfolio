import db from '../../../lib/mongodb.js'
import Project from '../../../models/Project.js'

export default async function projectHandler(req, res) {
  await db();
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const projectSlugs = await Project.find({}, 'slug');

        // Extract the slug values into an array
        const slugs = projectSlugs.map(project => project.slug);

        return res.status(200).json(slugs);
      } catch (e) {
        console.log(e);
        return res.status(500).send({});
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
