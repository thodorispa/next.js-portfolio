
import db from '../../../lib/mongodb.js'
import Project from '../../../models/Project.js'
import { uploadToFirebaseStorage } from '../../../helpers/firebase.js';
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
        const { _id } = req.body
        const { title } = req.body
        const { subTitle } = req.body
        const { description } = req.body
        const { images } = req.body || []
        const { active } = req.body
    
    
        const new_images = []
    
        const projectDB = await Project.findOne({ _id })
    
        if (!projectDB) {
          return res.status(400).send('Project not found')
        }
    
        for (let i = 0; i < images?.length; i++) {
          if (!images[i]._id) {
            const { url, hash, base64 } = await uploadToFirebaseStorage(images[i], firebaseOptions)
    
            images[i].url = url
            images[i].hash = hash
            images[i].base64 = base64
          }
        }
    
        new_images.push(...images)
    
        // add to projectDB the new images
        if (projectDB.title !== title) {
          projectDB.slug = slugify(title).toLowerCase()
        }
    
        projectDB.title = title
        projectDB.subTitle = subTitle
        projectDB.images = new_images
        projectDB.description = description
        projectDB.active = active
    
        projectDB.markModified('images')
    
        const project = new Project(projectDB)
    
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
