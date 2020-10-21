const { MessageEmbed } = require('discord.js')
const noblox = require('noblox.js')

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  name: 'robloxverify',
  aliases: ['rverify'],
  reqPerm: "NONE",
  args: "",
  cooldown: 1000,
  desc: "Verifies the user inside the server if they have linked a account and the server has set a verified role.",
  example: [],
  run: async(client, message, args) => {
    const vRoleID = await client.gData.get(`${message.guild.id}:vRole`)
    if(!vRoleID) return message.channel.send('This guild hasn\'t set it verified role yet. Use the `config` command to do so.')

    const robloxID = await client.uData.get(`${message.author.id}:robloxID`)
    if(!robloxID) return message.channel.send('You haven\'t linked your roblox account yet! Use the `linkroblox` commmand to do so.')

    const vRole = message.guild.roles.cache.get(vRoleID)

    if(!vRole) return message.channel.send(`A person with \`MANAGE_SERVER\` permission needs to link a verified role with the \`config\` command!`)

    message.guild.members.cache.get(message.author.id).roles.add(vRole)

    message.channel.send('You have been successfully verified in this server!')
  }
}