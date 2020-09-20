module.exports = {
  name: 'setbotnickname',
  aliases: ['setbotnick'],
  reqPerms: ["MANAGE_GUILD"],
  args: "<new nickname>",
  desc: "Sets the nickname of the bot for this server.",
  run: async(Discord, client, message, args) => {
    if(!args[0]) message.channel.send("Please include the nickname you would like to change the current one to.")
    message.guild.members.cache.get(client.user.id).setNickname(args.join(" "))
    message.channel.send(`Server nickname has been changed to \`${args.join(" ")}\``)
  }
}