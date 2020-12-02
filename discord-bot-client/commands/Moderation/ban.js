const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'ban',
  aliases: [],
  reqPerm: "BAN_MEMBERS",
  args: "<mention or id> [reason",
  cooldown: 3000,
  desc: "Bans the specified member.",
  example: ['@person1 spamming', '@coolboy advertising'],
  run: async(client, message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0])
    const reason = args.slice(1).join(' ')

    const embed = new MessageEmbed()
    .setColor('RED')

    if (!user) return message.channel.send(embed.setDescription('No User Mention or User ID Provided'))
    if (user === message.author) return message.channel.send(embed.setDescription('You can\'t ban yourself')); 
    if (!message.guild.member(user).bannable) return message.channel.send(embed.setDescription('You can\'t ban this user because the bot does not has sufficient permissions!')); 

    await message.guild.members.ban(user, reason) 

    if(reason) embed.setDescription(`✅  ${user.tag} has been successfully banned! \n**Reason:** ${reason}`);
    else embed.setDescription(`✅  ${user.tag} has been successfully banned!`);
    message.channel.send(embed); 
  }
}
