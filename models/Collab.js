import mongoose from 'mongoose'

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const Collab = new Schema({
  title: String,
  subTitle: String,
  slug: String,
  description: String,
  active: Boolean,
  images: [
    {
      name: String,
      caption: String,
      base64: String,
      alt: String,
      url: String,
      width: Number,
      height: Number,
      hash: String,
      index: Number
    }
  ],
});


export default mongoose.models['Collab'] 
    ? mongoose.model('Collab')
    : mongoose.model('Collab', Collab)