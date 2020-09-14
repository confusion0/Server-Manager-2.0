module.exports = {
  name: 'kick',
  aliases: [],
  reqPerms: ["KICK_MEMBERS"],
  args: "<mention or id> [reason",
  desc: "Kicks the specified member.",
  run: async(Discord, client, message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0])
    const reason = args.slice(1).join(' ')

    if (!user) return message.channel.send("No user found.")
    if (user === message.author) return message.channel.send('You can\'t kick yourself'); 
    if (!reason) return message.reply('You forgot to enter a reason for this kick!'); 
    if (!message.guild.member(user).kickable) return message.reply('You can\'t kick this user because the bot has not sufficient permissions!'); 

    const member = message.guild.members.cache.get(user.id)

    await member.kick(user, {reason: reason}) 

    const kickConfirmationEmbed = new Discord.MessageEmbed()
    .setColor('RED')
    .setDescription(`✅ ${user.tag} has been successfully kick!`);
    message.channel.send({
      embed: kickConfirmationEmbed
    }); 

    const logChannel = member.guild.channels.cache.find(channel => channel.name === "mod-logs");
    if(!logChannel) return
    
    const kickConfirmationEmbedModlog = new Discord.MessageEmbed()
    .setAuthor(`Kicked by **${msg.author.username}#${msg.author.discriminator}**`, msg.author.displayAvatarURL)
    .setThumbnail(user.displayAvatarURL)
    .setColor('RED')
    .setTimestamp()
    .setDescription(`**Action**: Kick
    **User**: ${user.username}#${user.discriminator} (${user.id})
    **Reason**: ${reason}`);
    logChannel.send({
      embed: kickConfirmationEmbedModlog
    }); 
  }
}
