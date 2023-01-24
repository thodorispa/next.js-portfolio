
import db from '../../../lib/mongodb.js'
import Project from '../../../models/Project.js'
import { uploadToFirebaseStorage } from '../../../helpers/firebase.js'
import { firebaseOptions } from '../../../lib/firebaseOptions.js';

import slugify from "slugify";

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '30mb' // Set desired value here
      }
  }
}

export default async function userHandler(req, res) {
  await db();
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const { title } = req.body
        const { subTitle } = req.body
        const { description } = req.body
        const { images } = req.body || []
        const { active } = req.body;

        const existing = await Project.findOne({ title })

        if (existing) {
          return res.status(400).send('Project already exists')
        }

        for (let i = 0; i < images?.length; i++) {
          const { url, hash, base64 } = await uploadToFirebaseStorage(images[i], firebaseOptions)

          images[i].url = url
          images[i].hash = hash
          images[i].base64 = base64
        }

        const slug = slugify(title).toLowerCase()

        const project = new Project({
          title,
          subTitle,
          slug,
          description,
          images,
          active
        })

        const _project = await project.save()

        res.status(200).send({ _project })
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
