const mongoose = require('mongoose');

const reqString = { type : String, required : true }
const reqInt = { type : Number, required : true }

const guildSchema = mongoose.Schema({
  _id : reqString,
  prefix: reqString,
})

module.exports = {
  guild : mongoose.model('guilds', guildSchema)
}