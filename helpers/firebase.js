import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage"
import SparkMD5 from 'spark-md5'
import { getPlaiceholder } from "plaiceholder";

export async function uploadToFirebaseStorage(image, firebaseOptions, path = '') {
  const app = getApps().length === 0 ? initializeApp(firebaseOptions) : getApp();
  const storage = getStorage(app);
  const hash = SparkMD5.hash(image.url.split('base64,')[1])
  let imagesRef = '';
  if (path === 'front/') {
    imagesRef = ref(storage, path + hash)
  } else {
    imagesRef = ref(storage, hash)
  }

  console.log('disco' , image.width, image.height);

  const fileRef = ref(imagesRef)
  const metadata = {
    alt: image.alt || 'This is an image taken by a good photographer',
    width: image.width, 
    height: image.height,
    cacheControl: 'public,max-age=300'
  }

  await uploadString(fileRef, image.url, 'data_url', metadata)

  const url = await getDownloadURL(fileRef)

  try {
    var { base64 } = await getPlaiceholder(url)
  } catch (err) {
    console.log(err);
  }

  return { url, hash, base64 }
}

export async function deleteFromFirebaseStorage(hash, firebaseOptions, path = '') {

  const app = initializeApp(firebaseOptions)
  const storage = getStorage(app);
  const imagesRef = ref(storage, path + hash)

  let success = true,
    error = null

  try {
    const res = await deleteObject(imagesRef)

    console.log(res);
  } catch (e) {
    success = false
    error = e
  }

  return { success, error }
}