const { Schema } = require('mongoose')

const AntiAdSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  activated: {
    type: Boolean,
    required: true,
  }
})

module.exports = mongoose.model('AntiAd', AntiAdSchema)

