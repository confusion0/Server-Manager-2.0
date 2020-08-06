const timeout = 5000
const limit = 10000

module.exports = {
  name: 'purge',
  aliases: ['clear'],
  run: async(Discord, client, message, args) => {
    message.delete()
    
    const amount = args[0]
    if(isNaN(amount)) return message.channel.send('Please enter the amount of messages you want deleted')
    
    if(amount > limit) return message.channel.send(`Please enter a amount less than or equal to ${limit}`)

    let counter = amount
    while(counter > 0){
      if(counter >= 100){ 
        message.channel.bulkDelete(100).catch(() => {})
        counter = counter - 100
      }
      else{
        message.channel.bulkDelete(counter).catch(() => {})
        counter = 0
      }
    }

    message.channel.send('I have deleted `' + amount + '` messages!')
  }
}
