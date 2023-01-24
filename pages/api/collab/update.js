
import db from '../../../lib/mongodb.js'
import Collab from '../../../models/Collab.js'
import { uploadToFirebaseStorage } from '../../../helpers/firebase.js'
import slugify from "slugify";
import { firebaseOptions } from '../../../lib/firebaseOptions.js';

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
    
        const collabDB = await Collab.findOne({ _id })
    
        if (!collabDB) {
          return res.status(400).send('Collab not found')
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
    
        // add to collabDB the new images
        if (collabDB.title !== title) {
          collabDB.slug = slugify(title).toLowerCase()
        }
    
        collabDB.title = title
        collabDB.subTitle = subTitle
        collabDB.images = new_images
        collabDB.description = description
        collabDB.active = active
    
        collabDB.markModified('images')
    
        const collab = new Collab(collabDB)
    
        const collaboration = await collab.save()
    
        res.status(200).send({ collaboration })
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
