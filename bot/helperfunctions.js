const dmUser = (user, message) => {
  if(!user) throw 'user is undefined'
  if(!message) throw 'message is undefined'

  user.send(message)
}

module.exports = { dmUser }