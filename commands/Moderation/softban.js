const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'softban',
  aliases: [],
  reqPerm: "BAN_MEMBERS",
  args: "<mention or id> [reason",
  cooldown: 3000,
  desc: "Softbans the specified member.",
  example: ['@person1 spamming', '@coolboy advertising'],
  run: async(client, message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0])
    const reason = args.slice(1).join(' ')

    const embed = new MessageEmbed()
    .setColor('RED')

    if (!user) return message.channel.send(embed.setDescription('No User Mention or User ID Provided'))
    if (user.id === message.author.id) return message.channel.send(embed.setDescription('You can\'t softban yourself')); 
    if (!message.guild.member(user).bannable) return message.channel.send(embed.setDescription('You can\'t softban this user because the bot does not has sufficient permissions!')); 

    await message.guild.members.ban(user, reason) 
    await message.guild.members.unban(user.id, `Unban for softban: ${reason}`)

    if(reason) embed.setDescription(`✅  ${user.tag} has been successfully softbanned! \n**Reason:** ${reason}`);
    else embed.setDescription(`✅  ${user.tag} has been successfully softbanned!`);
    message.channel.send(embed); 
  }
}