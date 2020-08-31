const mongoose = require('mongoose')
const mongoPath = process.env.MONGOPATH

async function mongo(){
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return mongoose
}

async function mongostatus(){
  var connected = false
  await mongo().then(mongoose => {
    try {
      connected = true
    } finally {
      mongoose.connection.close()
    }
  })
  return connected
}

module.exports = { mongostatus : mongostatus, mongo : mongo}