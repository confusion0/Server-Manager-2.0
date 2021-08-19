const timeout = 5000
const { MessageEmbed } = require('discord.js')

colors = [
	@@ -35,8 +35,8 @@ colors = [
]

module.exports = {
  name: 'custom-embed',
  aliases: ['custom-embeds', 'ce'],
  reqPerm: "MANAGE_GUILD",
  args: "",
  cooldown: 3000,
	@@ -56,7 +56,7 @@ module.exports = {

    const embed = new MessageEmbed()
    .setTitle("Custom Embed Creator")
    .setColor('RANDOM')
    .setFooter(`Step ${step} of ${steps} | Type cancel to exit • ${message.author.tag}`)
    .setDescription(text[0])
    .addFields(
	@@ -66,8 +66,8 @@ module.exports = {
      { name: 'Channel', value: channel},
	  )

    embed.setFooter(`Step ${step+1} of ${steps} | Type cancel to exit`)
    const message2 = await message.channel.send(embed)

    collector.on('collect', async m => {
      if(m.author.bot) return
	@@ -82,7 +82,7 @@ module.exports = {
      if(step == 0){
        title = (m.content).trim()
        if(title.length > 1024){
          let errorMessage = await message.channel.send(`The **title** cannot be longer than 1024 characters.`)
          return messages.push(errorMessage)
        }
        if(title === "empty") {
	@@ -94,7 +94,7 @@ module.exports = {
      if(step == 1){
        description = (m.content).trim()
        if(description.length > 1024){
          let errorMessage = await message.channel.send("The **description** cannot be longer than 1024 characters.")
          return messages.push(errorMessage)
        }
        if(description === "empty") {
	@@ -106,15 +106,15 @@ module.exports = {
      if(step == 2){
        color = (m.content).trim()
        if(!(color.startsWith("#") && color.length === 7) && !colors.includes(color.toUpperCase())){
          let errorMessage = await message.channel.send("The **color** you inputed is not valid")
          return messages.push(errorMessage)
        }
        embed.fields.find(c => c.name === 'Color')['value'] = color.toUpperCase();
      }
      if(step == 3){
        channel = (m.content).trim()
        if(!(channel === "current" || channel.startsWith("<#") && channel.endsWith(">"))){
          let errorMessage = await message.channel.send("The **channel** you inputed is not valid")
          return messages.push(errorMessage)
        }
        embed.fields.find(c => c.name === 'Channel')['value'] = channel;
	@@ -132,35 +132,27 @@ module.exports = {
        return collector.stop()
      }
    });

    collector.on('end', async collected => {
      message.delete({timeout : timeout})
      setTimeout(function () {
        messages.forEach((msg) => {
          msg.delete().catch(() => {})
        });
      }, timeout); 

      if(cancelled){
        const message3 = await message.channel.send(`Custom Embed Creation Cancelled. All messages with self destruct in ${timeout/1000} secs`)
        return message3.delete({timeout: timeout}).then(message2.delete({timeout: timeout}))
      } 

      const message4 = await message.channel.send(`Thank you for using my custom embed creator. All messages will now self destruct in ${timeout/1000} secs.`)

      message4.delete({timeout: timeout}).then(message2.delete({timeout: timeout}))

      const embed1 = new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setColor(color.toUpperCase())

      if(channel.toLowerCase() === "current") message.channel.send(embed1)
      else getChannelFromMention(client, message, channel).send(embed1)
    });
  }
}

function getChannelFromMention(client, message, mention) {
	if (!mention) return;

	@@ -172,5 +164,5 @@ function getChannelFromMention(client, message, mention) {
		}

		return message.guild.channels.cache.get(mention);
	}
}
