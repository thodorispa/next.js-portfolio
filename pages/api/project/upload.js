
import db from '../../../lib/mongodb.js'
import Project from '../../../models/Project.js'
import { uploadToFirebaseStorage } from '../../../helpers/firebase.js'
import { firebaseOptions } from '../../../lib/firebaseOptions.js';

import slugify from "slugify";

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

        // for (let i = 0; i < images.length; i++) {
        //   const image = images[i]

        //   const base64 = image.url.replace(/^data:image\/\w+;base64,/, "");
        //   const buffer = Buffer.from(base64, 'base64');

        //   const data = await sharp(buffer)
        //     .toFormat('webp')
        //     .webp({ quality: 80 })
        //     .toBuffer();

        //   const base64Image = 'data:image/webp;base64,' + data.toString('base64');


        //   image.url = base64Image
        // }

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
