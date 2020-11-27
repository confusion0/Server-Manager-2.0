const { MessageEmbed } = require('discord.js')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

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
      .setDescription(`**top.gg** \n[CLICK HERE](https://top.gg/bot/739943852726681650/vote)`)
      .setFooter(`You currently have ${await client.uData.get(`${message.author.id}:votes`)} votes`)

    message.channel.send(embed)
  }
}
