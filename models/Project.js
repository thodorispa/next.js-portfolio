import mongoose from 'mongoose'

mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const Project = new Schema({
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


export default mongoose.models['Project'] 
    ? mongoose.model('Project')
    : mongoose.model('Project', Project)
