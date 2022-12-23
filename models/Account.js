import mongoose from 'mongoose'

mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const AccountSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  lastLoginAt: {
    type: Number
  }
});

export default mongoose.models['Account'] 
    ? mongoose.model('Account')
    : mongoose.model('Account', AccountSchema)