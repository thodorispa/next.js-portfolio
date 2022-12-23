import mongoose from 'mongoose'

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const Images = new Schema(
  {
    name: String,
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
  }
);

export default mongoose.models['Images'] 
    ? mongoose.model('Images')
    : mongoose.model('Images', Images)