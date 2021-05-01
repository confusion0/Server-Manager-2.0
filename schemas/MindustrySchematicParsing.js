const mongoose = require('mongoose')

const MindustrySchematicParsingSchema = new mongoose.Schema({
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

const MindustrySchematicParsingModel = mongoose.model('MindustrySchematicParsing', MindustrySchematicParsingSchema)

async function get(_id){
  const schema = await MindustrySchematicParsingModel.findOne({
    _id
  })
  return schema ? schema.enabled : false;
}

async function set(_id, enabled){
  await MindustrySchematicParsingModel.updateOne({
    _id,
  }, {
    _id,
    enabled
  }, {
    upsert: true
  })
}

module.exports = {
  MindustrySchematicParsingModel,
  get,
  set
}

