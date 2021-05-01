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

const AntiAdModel = mongoose.model('AntiAd', AntiAdSchema)

async function get(_id){
  const schema = await AntiAdModel.findOne({
    _id
  })
  return schema ? schema.enabled : false;
}

async function set(_id, enabled){
  await AntiAdModel.updateOne({
    _id,
  }, {
    _id,
    enabled
  }, {
    upsert: true
  })
}

module.exports = {
  AntiAdModel,
  get,
  set
}

