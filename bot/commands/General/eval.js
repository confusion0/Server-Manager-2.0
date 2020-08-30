module.exports = {
  name: 'eval',
  aliases: [],
  reqPerms: "BOT_OWNER",
  args: "<code",
  desc: "Runs the specified code.",
  run: async(Discord, client, message, args) => {
    const { content } = message
    if(message.author.id == client.config.OWNERID){
      const result = eval(content.replace(`${process.env.PREFIX}eval`, ''))
      message.channel.send(result)
    }
  }
}
