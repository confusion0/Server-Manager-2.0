const mongoose = require('mongoose')

const BackupSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
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
  const schema = await BackupModel.findById(_id)
  return schema || false
}

async function add(gid, uid, backup){
  const current = (new Date()).toISOString()
  const schema = new BackupModel({
    _id: makeid(20),
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

function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}
