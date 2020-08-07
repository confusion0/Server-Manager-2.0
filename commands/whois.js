module.exports = {
  name: 'whois',
  aliases: [],
  run: async(Discord, client, message, args) => {
    if(!args[0]) return message.channel.send("Please mention a user to use this command on. @Example")
    let mention = args[0]
    let user = getUserFromMention(mention, client)
    if(!user) return message.channel.send("Please enter the user as a mention. Ex: @Example")
    let guild = message.guild

    const embed = new Discord.MessageEmbed()
    .setAuthor(user.tag, user.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL())
    .addField("Account Created: ", user.createdAt, true)
    .addField("Joined this Server: ", guild.members.get(user.id).joinedAt, true)
    .setFooter(`Requested by ${message.author.tag} • Searched User`)
    .setTimestamp()
  }
}

function getUserFromMention(mention, client) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}
