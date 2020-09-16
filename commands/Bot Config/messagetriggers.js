const timeout = 60000

module.exports = {
  name: 'messagetriggers',
  aliases: [],
  reqPerms: ["MANAGE_GUILD"],
  args: "",
  desc: "Sets message triggers for this server",
  run: async(Discord, client, message, args) => {
    return //disabled
    const triggers = client.gData.get(message.guild.id).messageTriggers

    const embed = new Discord.MessageEmbed()

    const filter = response => {
      return response.author == message.author
    };

    if(args[0] === 'add'){
      if(triggers.size >= 32) return message.chanenl.send("You have reached max message triggers for this guild. Please remove one in order to add another one.")

      var mtrigger = undefined
      var response = undefined
      var includes = undefined
      var deleteMessage = undefined
      var caseSensitive = undefined
      var timedout = false

      await message.channel.send("Enter a message trigger.")
      await message.channel.awaitMessages(filter, { max: 1, time: timeout, errors: ['time'] }).then(collected => {
          mtrigger = collected.first().content
        }).catch(collected => timedout = true );
      if(timedout) return message.channel.send("You took too long to respond. Rerun the command to continue.")
      
      await message.channel.send("Enter a response.")
      await message.channel.awaitMessages(filter, { max: 1, time: timeout, errors: ['time'] }).then(collected => {
          response = collected.first().content
        }).catch(collected => timedout = true );
      if(timedout) return message.channel.send("You took too long to respond. Rerun the command to continue.")

      do {
      await message.channel.send("Does this message trigger trigger if the message sent contains the triggger? (yes/no)")
      await message.channel.awaitMessages(filter, { max: 1, time: timeout, errors: ['time'] }).then(collected => {
          const response = collected.first().content
          if(response == "yes") includes = true
          if(response == "no") includes = false
        }).catch(collected => timedout = true );
      if(timedout) return message.channel.send("You took too long to respond. Rerun the command to continue.")
      } while(includes === undefined)

      do {
      await message.channel.send("Should I delete the message if It triggers? (yes/no)")
      await message.channel.awaitMessages(filter, { max: 1, time: timeout, errors: ['time'] }).then(collected => {
          const response = collected.first().content
          if(response == "yes") deleteMessage = true
          if(response == 'no') deleteMessage = false
        }).catch(collected => timedout = true );
      if(timedout) return message.channel.send("You took too long to respond. Rerun the command to continue.")
      } while(deleteMessage === undefined)

      do {
      await message.channel.send("Is the trigger case sensitive? (yes/no)")
      await message.channel.awaitMessages(filter, { max: 1, time: timeout, errors: ['time'] }).then(collected => {
          const response = collected.first().content
          if(response == "yes") caseSensitive = true
          if(response == 'no') caseSensitive = false
        }).catch(collected => timedout = true );
      if(timedout) return message.channel.send("You took too long to respond. Rerun the command to continue.")
      } while(caseSensitive === undefined)

      if(!caseSensitive) mtrigger = mtrigger.toLowerCase()

      const keys = triggers.keys()
      var newKey = undefined
      do {
        newKey = Math.floor(Math.random()*50)
      } while(keys.includes && newKey !== undefined)

      triggers.set(newKey, { mtrigger, response, includes, deleteMessage, caseSensitive })

      message.channel.send("Added Successfully")
    }
    else if(args[0] === 'remove'){
      var remove = undefined
      var timedout = false

      await message.channel.send("Enter a the ID of the message trigger you would like to remove.")
      await message.channel.awaitMessages(filter, { max: 1, time: timeout, errors: ['time'] }).then(collected => {
          remove = collected.first().content
        }).catch(collected => timedout = true );
      if(timedout) return message.channel.send("You took too long to respond. Rerun the command to continue.")

      const trigger = triggers.get(remove)
      if(!trigger) return message.channel.send("Couldn't find a message trigger with that ID.")

      triggers.delete(remove)

      message.channel.send("Removed Successfully")
    }
    else {
      embed.setTitle("Message Triggers")
      .setDescription("Bold text is trigger, normal text is reponse \nMax triggers: 32 \n Subcommands: add, remove")
      const entries = triggers.entries()
      console.log(entries)
      for([key, value] of entries){
        embed.addField(`ID: \`${key}\``, `Trigger: ${value.mtrigger} \nResponse: ${value.response} \nCase Sensitive: ${value.caseSensitive} \nIncludes: ${value.includes} \nDelete Trigger Message: ${value.deleteMessage}`)
      }
      message.channel.send(embed)
    }
  }
}