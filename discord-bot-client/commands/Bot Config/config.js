module.exports = {
  name: 'config',
  aliases: [],
  reqPerm: "MANAGE_GUILD",
  args: "[setting] <value>",
  cooldown: 10000,
  desc: "Sets the nickname of the bot for this server.",
  example: ['verified-role @verified', 'nickname dumb robot'], 
  run: async(client, message, args) => {
    if(!args[0]){
      message.channel.send({ embed: {
        title: `Bot Configuration Pannel`,
        thumbnail: client.user.displayAvatarURL(),
        fields: [
          {
            name: 'Bot Nickname',
            value: await getnickname()
          },
          {
            name: 'Prefix',
            value: await getprefix()
          },
          {
            name: 'Verified Role',
            value: await getvRole()
          }
        ]
      }})
    }

    async function getnickname(){
      return message.guild.member(client.user).displayName || client.user.username
    }
    async function getprefix(){
      return await client.gData.get(`${message.guild.id}:prefix`)
    }
    async function getvRole(){
      return await client.gData.get(`${message.guild.id}:vRole`)
    }
  }
}


