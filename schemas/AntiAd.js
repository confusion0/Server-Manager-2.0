const mongoose = require('mongoose')

const AntiAdSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  enabled: {
    type: Boolean,
    required: true,
  }
})

module.exports = mongoose.model('AntiAd', AntiAdSchema)

