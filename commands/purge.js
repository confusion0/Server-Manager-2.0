const timeout = 5000

module.exports = {
  name: 'purge',
  aliases: ['clear'],
  run: async(Discord, client, message, args) => {
    message.delete()
    
    const amount = args[0]
    if(isNaN(amount)) return message.channel.send('Please enter the amount of messages you want deleted')
    
    //const fetched = await message.channel.fetch( { limit : amount } )
    
    message.channel.bulkDelete(amount)
      .catch(async error => {let message2 = await message.channel.send(`Error: ${error}`)}).then(message2.delete({timeout : timeout}))
    
  }
}
