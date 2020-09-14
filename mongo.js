const mongoose = require('mongoose')
const mongoPath = process.env.MONGOPATH

async function mongo(){
  await mongoose.connect(mongoPath, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return mongoose
}

module.exports = mongo