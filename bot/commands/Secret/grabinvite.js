module.exports = {
  name: 'grabinvite',
  aliases: [],
  reqPerms: "BOT_OWNER",
  args: "<guild id>",
  desc: "Grabs a invite from the specified server.",
  run: async(Discord, client, message, args) => {
    const guild = client.guilds.cache.get(args[0])
    if(!guild) return message.channel.send("Couldn't find a guild with that id in my cache.")
    const inviteChannel = guild.channels.cache.random()
    while(inviteChannel.type == 'catagory'){
      inviteChannel = guild.channels.cache.random()
    }
    inviteChannel.createInvite({maxAge: 0}).then(invite => {
      message.channel.send("https://discord.gg/" + invite.code)
    });
  }
}