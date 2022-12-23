import Images from '../../../models/Images.js';
import db from '../../../lib/mongodb.js'
import { uploadToFirebaseStorage } from '../../../helpers/firebase.js';
import { firebaseOptions } from '../../../lib/firebaseOptions.js';

export default async function userHandler(req, res) {
  await db();
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const { images } = req.body || [];

        let _frontImages = await Images.findOne({ name: 'front' }) || new Images({ name: 'front' })

        const _images = images?.map(image => image.hash) || []
        const _originalImages = _frontImages.images?.map(image => image.hash) || []

        const _imagesToDelete = _originalImages.filter(image => !_images.includes(image))
        const _imagesToUpload = images.filter(image => !image.hash)

        for (let i = 0; i < _imagesToDelete.length; i++) {
          console.log('deleting-------->', _imagesToUpload[i]);
          const image = _frontImages.images.find(image => image.hash === _imagesToDelete[i])

          const res = await deleteFromFirebaseStorage(image.hash, firebaseOptions, 'front/')
        }

        for (let i = 0; i < _imagesToUpload.length; i++) {
          console.log('uploading-------->', _imagesToUpload[i]);
          const { url, hash, base64 } = await uploadToFirebaseStorage(_imagesToUpload[i], firebaseOptions, 'front/')

          _imagesToUpload[i].url = url
          _imagesToUpload[i].hash = hash
          _imagesToUpload[i].base64 = base64

        }

        let _imagesToSave = [..._imagesToUpload, ...images.filter(image => _originalImages.includes(image.hash))]
        _frontImages.images = _imagesToSave

        if (_frontImages.images) {
          _frontImages.images = images
        } else {
          _frontImages = new Images({
            name: 'front',
            _imagesToSave
          })
        }

        await _frontImages.save()
        return res.status(200).send({ _frontImages })

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