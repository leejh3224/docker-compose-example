import mongoose from 'mongoose'

export default {
  connect: () => {
    mongoose
      .connect(`mongodb://${process.env.HOST}:27017/${process.env.DB}`)
      .catch(console.log)
  },
}
