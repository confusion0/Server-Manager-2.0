const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'ping',
  aliases: [],
  reqPerm: "NONE",
  args: "",
  cooldown: 2000,
  module: "General",
  desc: "Pings the bot and gives you some info on the bot.",
  example: [],
  run: async(client, message, args) => {
    const { totalGuilds, totalChannels, totalMembers, shardId } = client

    const msg = await message.channel.send(`🏓 Pinging....`);

    const embed = new MessageEmbed()
    .setTitle("🏓Pong!")
    .setDescription(`
    Gateway Latency: ${Math.floor(msg.createdAt - message.createdAt)}
    API Latency: ${Math.round(client.ping)}
    Total Guilds: ${totalGuilds}
    Total Channels: ${totalChannels}
    Total Members: ${totalMembers}
    Current Shard: ${shardId}
    `)

    msg.edit(embed)
  }
}
