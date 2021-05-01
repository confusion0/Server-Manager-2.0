const axios = require('axios')

module.exports = {
  name: 'docs',
  aliases: ['djs'],
  reqPerm: "NONE",
  args: "<search param>",
  cooldown: 2000,
  desc: "Emulates a user joining the server that this command is ran in.",
  example: ['client#user', 'client'],
  run: async(client, message, args) => {
    if(!args[0]) return message.channel.send('Please make sure to include a search param.')

    const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      args
    )}`

    axios
      .get(uri)
      .then((embed) => {
        const { data } = embed

        if (data && !data.error) {
          message.channel.send({ embed: data })
        } else {
          message.reply('Could not find that documentation')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}