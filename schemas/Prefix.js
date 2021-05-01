const mongoose = require('mongoose')

const PrefixSchema = new mongoose.Schema({
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

