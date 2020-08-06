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

    try{
      let counter = amount
      while(counter > 0){
        if(counter >= 100){ 
          message.channel.bulkDelete(100)
          counter = counter - 100
        }
        else{
          message.channel.bulkDelete(counter)
          counter = 0
        }
      }
    } catch (error) {
       if (error.name === 'DiscordAPIError: Unknown Message') {
         console.log("Caught: DiscordAPIError: Unknown Message")
       }
       else throw error
    }
    message.channel.send('I have deleted `' + amount + '` messages!')
  }
}
