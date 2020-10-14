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

    if (!user) return message.channel.send("No user found.")
    if (user === message.author) return message.channel.send('You can\'t ban yourself'); 
    if (!reason) return message.reply('You forgot to enter a reason for this ban!'); 
    if (!message.guild.member(user).bannable) return message.reply('You can\'t ban this user because you the bot has not sufficient permissions!'); 

    await message.guild.members.ban(user, {reason: reason}) 

    const banConfirmationEmbed = new MessageEmbed()
    .setColor('RED')
    .setDescription(`✅ ${user.tag} has been successfully banned!`);
    message.channel.send({
      embed: banConfirmationEmbed
    }); 

    const logChannel = member.guild.channels.cache.find(channel => channel.name === "mod-logs");
    if(!logChannel) return
    
    const banConfirmationEmbedModlog = new MessageEmbed()
    .setAuthor(`Banned by **${msg.author.username}#${msg.author.discriminator}**`, msg.author.displayAvatarURL)
    .setThumbnail(user.displayAvatarURL)
    .setColor('RED')
    .setTimestamp()
    .setDescription(`**Action**: Ban
    **User**: ${user.username}#${user.discriminator} (${user.id})
    **Reason**: ${reason}`);
    logChannel.send({
      embed: banConfirmationEmbedModlog
    }); 
  }
}
