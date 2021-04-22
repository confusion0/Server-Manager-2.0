const { Schema } = require('mongoose')

const guildSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  prefix: {
    type: String,
    required: true,
    default: process.env.PREFIX
  }
})

module.exports = mongoose.model('Guilds', guildSchema)

