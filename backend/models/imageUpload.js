import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ImageSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },  
  },
  {
    timestamps: true,
  }
)

const ImageUpload = mongoose.model('ImageUpload', ImageSchema)

export default ImageUpload