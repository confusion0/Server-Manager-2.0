const { Schema } = require('mongoose')

const VotesSchema = new Schema({
  amount: {
    type: Number,
    required: true,
    default: 0
  },
  lastTOPGG: {
    type: Number,
    required: true,
    default: 0
  }
})

const MindustrySchema = new Schema({
  scores: {
    type: Number,
    required: true,
    default: 0
  }
})

const UserSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  votes: {
    type: VotesSchema,
    required: true
  },
  robloxID: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Users', UserSchema)