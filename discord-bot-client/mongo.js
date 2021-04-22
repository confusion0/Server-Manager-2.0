const mongoose = require('mongoose')

module.exports = async () => {
  await mongoose.connect(process.env.MONGOPATHH, {
  	keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    setDefaultsOnInsert: true,
  })
  
  return mongoose.connection
}