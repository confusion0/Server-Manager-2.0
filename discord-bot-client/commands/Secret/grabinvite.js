module.exports = {
  name: 'grabinvite',
  aliases: [],
  reqPerm: "BOT_ADMIN",
  args: "<guild id>",
  desc: "Grabs a invite from the specified server.",
  example: ['321334789', '231899889'],
  cooldown: undefined,
  run: async(client, message, args) => {
    const guild = client.guilds.cache.get(args[0])
    if(!guild) return message.channel.send("Couldn't find a guild with that id in my cache.")
    var inviteChannel = guild.channels.cache.random()
    while(inviteChannel.type != 'text'){
      inviteChannel = guild.channels.cache.random()
    }
    inviteChannel.createInvite({maxAge: 0}).then(invite => {
      message.channel.send("https://discord.gg/" + invite.code)
    });
  }
}