const Keyv = require('keyv');
const keyv = new Keyv()

module.exports = {
  name: 'pushtodb',
  aliases: [],
  reqPerms: "BOT_OWNER",
  args: "<guild id>",
  desc: "Pushes Bot data to mongodb",
  run: async(Discord, client, message, args) => {
    client.gData.forEach(guild => {
      keyv.set(guild.id, guild)
    })
    console.log(await keyv.get(message.guild.id))
  }
}