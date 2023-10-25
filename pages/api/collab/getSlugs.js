import db from '../../../lib/mongodb.js'
import Collab from '../../../models/Collab.js'

export default async function collabHandler(req, res) {
  await db();
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        // Fetch only the 'slug' field for each collaboration
        const collabSlugs = await Collab.find({}, 'slug');

        // Extract the slug values into an array
        const slugs = collabSlugs.map(collab => collab.slug);

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
