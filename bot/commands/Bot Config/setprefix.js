module.exports = {
  name: 'setprefix',
  aliases: [],
  reqPerms: ["MANAGE_GUILD"],
  args: "<new prefix>",
  desc: "Sets the prefix of the bot for this server.",
  run: async(Discord, client, message, args) => {
    if(!args[0]) message.channel.send("Please include the prefix you would like to change the current one to.")
    client.gData.get(message.guild.id).prefix = args[0]
    message.channel.send(`Server prefix has been changed to \`${args[0]}\``)
  }
}
