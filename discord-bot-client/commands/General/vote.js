const { MessageEmbed } = require('discord.js')
const ms = require('ms')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const twelve_hours = 12 * 60 * 60 * 1000

module.exports = {
  name: 'vote',
  aliases: ['v'],
  reqPerm: "NONE",
  args: "",
  cooldown: 5000,
  desc: "Shows link to vote for bot",
  example: [],
  run: async(client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle(`Vote for ${client.user.username}`)

    const topgg_last_vote = await client.uData.get(`${message.author.id}:votes:top.gg`)
    if(!topgg_last_vote || new Date().getTime() - topgg_last_vote > 12 * 60 * 60 * 1000){
      embed.addField('top.gg', `[AVAILABLE NOW!](https://top.gg/bot/739943852726681650/vote)`)
    }
    else {
      embed.addField('top.gg', `\`${ms(twelve_hours - (new Date().getTime() - topgg_last_vote))} remaining\``)
    }

    embed.setFooter(`You currently have ${await client.uData.get(`${message.author.id}:votes`)} votes`)

    message.channel.send(embed)
  }
}
