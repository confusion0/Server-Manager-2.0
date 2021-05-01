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

const PrefixModel = mongoose.model('Prefixes', PrefixSchema)

async function get(_id){
  const schema = await PrefixModel.findOne({
    _id
  })
  return schema ? schema.prefix : null
}

async function set(_id, prefix){
  await PrefixModel.updateOne({
    _id,
  }, {
    _id,
    prefix
  }, {
    upsert: true
  })
}

module.exports = {
  PrefixModel,
  get,
  set,
}
