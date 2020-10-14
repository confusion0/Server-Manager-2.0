const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'giveaway',
  aliases: ['gg'],
  reqPerm: "BOT_ADMIN",//["MANAGE_GUILD"],
  args: "",
  cooldown: 3000,
  desc: "Starts a giveaway constructor (Not Finished) (interactive)",
  example: [],
  module: "Giveaway",
  run: async(client, message, args) => {
    
  }
}