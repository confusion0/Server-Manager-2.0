const { Schema } = require('mongoose')

const prefixSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  prefix: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Prefixes', prefixSchema)

