module.exports = {
  name: "botmention",
  run: async(client, message, prefix) => {
    if(message.content.startsWith('<@') && message.mentions.users.first() && message.mentions.users.first().id === client.user.id) { 
      message.channel.send(`Server prefix is \`${prefix}\``)
      return true;
    }
    return false;
  }
}

