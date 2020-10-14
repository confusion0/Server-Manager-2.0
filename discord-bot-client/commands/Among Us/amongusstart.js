  module.exports = {
  name: 'amoungusstart',
  aliases: ['amongus', 'austart'],
  reqPerm: "ADMINISTRATOR",
  args: "<game code>",
  cooldown: 10000,
  desc: "Starts a among us game!",
  example: ['ADFSDF', 'FGDRRD'], 
  run: async(client, message, args) => {
    if(!args[0]) message.channel.send("Please enter a game code.")

    var Game = { code: args[0], players: [], muted: false }

    message.channel.send(
      new MessageEmbed()
      .setTitle('Amoung Us Lobby')
      .setDescription('React with ')
    )
  }
}