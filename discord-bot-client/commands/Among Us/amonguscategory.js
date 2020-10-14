  module.exports = {
  name: 'amoungusstart',
  aliases: ['amongus', 'austart'],
  reqPerm: "ADMINISTRATOR",
  args: "<game code>",
  cooldown: 10000,
  desc: "Starts a among us game!",
  example: ['ADFSDF', 'FGDRRD'], 
  run: async(client, message, args) => {
    if(!args[0]) return message.channel.send("Please enter a category ID.")

    if(!message.guild.channels.cache.get(args[0])) return message.channel.send("Please enter a valid category ID.") 

    if(message.guild.channels.cache.get(args[0]).type != 'category') return message.channel.send("Please enter a valid category ID not text or voice.") 

    client.gData.set(`${message.guild.id}:amonguscategory`, args[0])
  }
}