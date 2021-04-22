const { MessageEmbed } = require('discord.js')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

module.exports = {
  name: 'profile',
  aliases: ['p'],
  reqPerm: "NONE",
  args: "[mention]",
  cooldown: 3000,
  desc: "displays a users profile",
  example: ['@NoobMan', '@Commander', ""],
  run: async(client, message, args) => {
    let rUser = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author

    const emojis = client.emojis

    const embed = new MessageEmbed()
    .setTitle(`${rUser.tag}'s profile'`)
    .setThumbnail(rUser.displayAvatarURL())
    .addFields(
      { name: 'Bot Badges', value: getBotBadges(emojis, rUser) }
    )

    message.channel.send(embed)
  }
}

function getBotBadges(client, user){
  var returnString = ""

  const { authors } = require('../Mindustry/questions.json')
  if(Object.values(authors).find(author => author.id == user.id)){
    returnString += `${(client.emojis.cache.get('788830783455494244') || ":mindustry_badge:")} **Mindustry Quiz Question Submitter** \n`
  }

  if(client.ADMINS.find(admin => admin.id == user.id)){
    returnString += `${(client.emojis.cache.get('788832864384319539') || ":admin_badge:")} **Mindustry Quiz Question Submitter** \n`
  }

  return returnString
}
