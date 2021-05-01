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
  size: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
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
  const { _id } = await BackupModel.save({
    gid,
    uid,
    size: backup.size,
    data: backup.data
  })
  return _id;
}

async function delete(_id){
  await BackupModel.deleteOne({
    _id
  })
}

module.exports = {
  PrefixModel,
  getGuild,
  getUser,
  get,
  add,
  delete
}
