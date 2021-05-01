const mongoose = require('mongoose')

const BackupSchema = new mongoose.Schema({
  gid: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  saveTimestamp: {
    type: String,
    required: true,
  }
})

const BackupModel = mongoose.model('Backups', BackupSchema)

async function getGuild(gid){
  const schemas = await BackupModel.find({
    gid,
  })
  return schemas || null
}

async function getUser(uid){
  const schemas = await BackupModel.find({
    uid,
  })
  return schemas || null
}

async function get(_id){
  const schema = await BackupModel.findOne({
    _id,
  })
}

async function add(gid, uid, backup){
  const current = (new Date()).toISOString()
  const schema = new BackupModel({
    gid,
    uid,
    data: backup,
    saveTimestamp: current,
  })
  const { _id } = await schema.save()
  return _id;
}

async function deleteOne(_id){
  await BackupModel.deleteOne({
    _id
  })
}

module.exports = {
  BackupModel,
  getGuild,
  getUser,
  get,
  add,
  "delete": deleteOne
}
