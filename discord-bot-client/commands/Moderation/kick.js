const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'kick',
  aliases: [],
  reqPerm: "KICK_MEMBERS",
  args: "<mention or id> [reason",
  cooldown: 2000,
  desc: "Kicks the specified member.",
  example: ['@person1 spamming', '@coolboy being rude'],
  module: "Moderator",
  run: async(client, message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0])
    const reason = args.slice(1).join(' ')

    if (!user) return message.channel.send(embed.setDescription('No User Mention or User ID Provided'))
    if (user === message.author) return message.channel.send(embed.setDescription('You can\'t kick yourself'));
    if (!message.guild.member(user).bannable) return message.channel.send(embed.setDescription('You can\'t kick this user because the bot does not has sufficient permissions!'));

    const member = message.guild.member(user)

    await member.kick(user, reason) 

    const embed = new MessageEmbed()
    .setColor('RED')
    if(reason) embed.setDescription(`✅  ${user.tag} has been successfully kicked! \n**Reason:** ${reason}`);
    else embed.setDescription(`✅  ${user.tag} has been successfully kicked!`);
    message.channel.send(embed); 
  }
}
