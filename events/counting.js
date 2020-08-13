const timeout = 5000
module.exports = {
  name: 'counting',
  run: async(Discord, client, message) => {
    const logChannel = message.guild.channels.cache.find(channel => channel.name === "counting");
    if(!logChannel) return
    if(logChannel.id != message.channel.id) return
    
    const lastMessage = await message.channel.messages.fetch({limit : 1})
    
    if(isNaN(lastMessage.content)) return
    
    if(isNaN(message.content)){
      message.delete()
      const message2 = await message.channel.send("This is a counting channel please refrain from chatting anything else")
      message2.delete({timeout : timeout})
    }
    
    if(lastMessage.content + 1 == message.content) return
    
    message.delete()
  }
}
