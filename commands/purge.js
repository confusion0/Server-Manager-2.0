const timeout = 5000

module.exports = {
  name: 'purge',
  aliases: ['clear'],
  run: async(Discord, client, message, args) => {
    message.delete()
    
    const amount = args[0]
    if(isNaN(amount)) return message.channel.send('Please enter the amount of messages you want deleted')
    
    const fetched = await message.channel.fetchMessages( { limit : amount } )
    
    message.channel.bulkDelete(fetched)
      .catch(error => message.channel.send(`Error: ${error}`))
    
  }
}
