const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'unban',
  aliases: [],
  reqPerm: "BAN_MEMBERS",
  args: "<mention or id> [reason",
  cooldown: 3000,
  desc: "Unban the specified member.",
  example: ['@person1 appeald'],
  run: async(client, message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0])
    const reason = args.slice(1).join(' ')

    const embed = new MessageEmbed()
    .setColor('RED')

    if (!user) return message.channel.send(embed.setDescription('No User Mention or User ID Provided'))
    if (user === message.author) return message.channel.send(embed.setDescription('You can\'t unban yourself')); 
    if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) return message.channel.send(embed.setDescription('You can\'t unban this user because the bot does not has sufficient permissions!'));
    if(!(await message.guild.fetchBans()).get(user.id)) message.channel.send('This user isn\'t banned')

    await message.guild.members.unban(user.id, reason)

    if(reason) embed.setDescription(`✅  ${user.tag} has been successfully unbanned! \n**Reason:** ${reason}`);
    else embed.setDescription(`✅  ${user.tag} has been successfully unbanned!`);
    message.channel.send(embed); 
  }
}
