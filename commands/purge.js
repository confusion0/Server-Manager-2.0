const timeout = 5000

module.exports = {
  name: 'purge',
  aliases: ['clear'],
  run: async(Discord, client, message, args) => {
    let amount = args[0]
    
    message.delete()

    if (!amount) return (await message.reply('You haven\'t given an amount of messages which should be deleted!')).delete({timeout: timeout}); // Checks if the `amount` parameter is given
    if (isNaN(amount)) return (await message.reply('The amount parameter isn`t a number!')).delete({timeout: timeout}); // Checks if the `amount` parameter is a number. If not, the command throws an error

    if (amount > 100) return (await message.reply('You can`t delete more than 100 messages at once!')).delete({timeout: timeout}); // Checks if the `amount` integer is bigger than 100
    if (amount < 1) return (await message.reply('You have to delete at least 1 message!')).delete({timeout: timeout}); // Checks if the `amount` integer is smaller than 1

    await message.channel.messages.fetch({ limit: amount }).then(async messages => { // Fetches the messages
      message.channel.bulkDelete(messages) // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
      const message2 = await message.channel.send("I have deleted `" + amount + "` messages!")
      setTimeout(function () {
        message2.delete()
      }, timeout); 
    });
  }
}
