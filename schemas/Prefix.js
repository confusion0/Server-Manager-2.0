const { Schema } = require('mongoose')

const PrefixSchema = new Schema({
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

module.exports = mongoose.model('Prefixes', PrefixSchema)

