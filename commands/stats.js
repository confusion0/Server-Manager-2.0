module.exports = {
  name: 'stats',
  aliases: [],
  run: async(Discord, client, message, args) => {
    if(!args[0]) return message.channel.send("Please choose one of the following. \n-setup \n-remove")

    const guild = message.guild

    if(args[0] == '-setup'){
      const category = await guild.channels.create("📊 Server Stats 📊", {
        type : "category",
        permissionOverwrites: [{
          id : guild.roles.everyone.id,
          deny : ["CONNECT"],
          allow : ["VIEW_CHANNEL"]
        }]
      })
      category.setPosition(0)
      guild.channels.create("All Members: ", {type : "voice", parent : category})
      message.channel.send("Finished Setup!")
    }

    if(args[0] == '-remove'){
      const category = guild.channels.cache.find(channel => channel.name === "📊 Server Stats 📊");
      const allMembers = guild.channels.cache.find(channel => channel.name && channel.name.startsWith("All Members:"))
      
      if(category) category.delete()
      if(allMembers) allMembers.delete()

      message.channel.send("Stats Removed!")
    }

    if(args[0] == '-update'){
      const category = guild.channels.cache.find(channel => channel.name === "📊 Server Stats 📊");
      const allMembers = guild.channels.cache.find(channel => channel.name && channel.name.startsWith("All Members:"))

      if(!category) return message.channel.send("Please setup server stats before trying to update") 

      allMembers.edit({ name: `All Members: ${guild.memberCount}` })
      category.setPosition(0)

      message.channel.send("Stats Updated!")
    }
  }
}
