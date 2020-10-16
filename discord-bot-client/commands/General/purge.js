const { MessageEmbed } = require('discord.js')

const timeout = 5000
const limit = 10000

module.exports = {
  name: 'purge',
  aliases: ['clear'],
  reqPerm: "MANAGE_MESSAGES",
  args: "<amount>",
  cooldown: 2000,
  module: "General",
  desc: "Purges the specified amount of messages. max: " + limit,
  example: ['100', '25'],
  run: async(client, message, args) => {
    const amount = args[0] // Amount of messages which should be deleted
    
    if (!amount) return message.reply('You haven\'t given an amount of messages which should be deleted!'); // Checks if the `amount` parameter is given
    if (isNaN(amount)) return message.reply('The amount parameter isn`t a number!'); // Checks if the `amount` parameter is a number. If not, the command throws an error
    
    if (amount > 100) return message.reply('You can`t delete more than 100 messages at once!'); // Checks if the `amount` integer is bigger than 100
    if (amount < 1) return message.reply('You have to delete at least 1 message!'); // Checks if the `amount` integer is smaller than 1
    
    var deleted = { size: 0 }
    try {
      var messages = await message.channel.messages.fetch({ limit: amount })
      deleted = await message.channel.bulkDelete(messages)
    } catch (error) {
      if(error.code == 50034) return message.channel.send('I cannot delete messages that are over 14 days old.')
      throw error
    } finally {
      message.channel.send(`I deleted \`${deleted.size}\` messages!`).then(msg => msg.delete({ timeout: 5000 }))
    }
  }
}
