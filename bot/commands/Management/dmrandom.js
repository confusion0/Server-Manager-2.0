module.exports = {
  name: 'dmrandom',
  aliases: [],
  reqPerms: ["MANAGE_GUILD"],
  args: "<amount>",
  desc: "DM's the amount specified",
  run: async(Discord, client, message, args) => {
    if(!args[0]) return message.channel.send("No amount was specified.")
    if(isNaN(args[0])) return message.channel.send("Please enter a valid number")
    if(args[0] < 1) return message.channel.send("Please enter a value greater than 1")
    if(args[0] > message.guild.members.cache.size) return message.channel.send(`There are only ${message.guild.members.cache.size} members in this server. You can't dm ${args[0]} members.`)
    if(!args[1]) return message.channel.send('Cannot send a empty message.')
    var users = []
    for(i = 0; i < args[0]; i++){
      const user = getRandomUser(client, message.guild)
      if(!user) {
        message.channel.send("The bot picked itself so it skipped a dm.") 
      } 
      else users.push(user)
    }
    args.shift()
    users = users.filter(onlyUnique)
    console.log(users)
    for(user of users){
      try {
        const embed = new Discord.MessageEmbed()
        embed.setTitle("From: " + message.guild.name)
        embed.setDescription(args.join(' '))
        embed.setFooter("Sent by: " + message.author.tag + " ID: " + message.author.id)
        user.send(embed)
        message.channel.send("Messaged: " + user.tag + " (" + user + ")")
      } catch(error){
        message.channel.send("Couldn't message: " + user)
      }
    }
  }
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function getRandomUser(client, guild){
  const user = guild.members.cache.random().user
  if(user.id === client.user.id) return
  return guild.members.cache.random().user
}