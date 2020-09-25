module.exports = {
  name: 'setbotnickname',
  aliases: ['setbotnick'],
  reqPerm: "MANAGE_GUILD",
  args: "<new nickname>",
  desc: "Sets the nickname of the bot for this server.",
  module: "Bot Config",
  example: ['wanky bot', 'Bot 1'], 
  run: async(client, message, args) => {
    if(!args[0]) message.channel.send("Please include the nickname you would like to change the current one to.")
    message.guild.members.cache.get(client.user.id).setNickname(args.join(" "))
    message.channel.send(`My nickname has been changed to \`${args.join(" ")}\``)
  }
}