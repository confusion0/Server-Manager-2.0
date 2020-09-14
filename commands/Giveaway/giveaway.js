module.exports = {
  name: 'giveaway',
  aliases: [],
  reqPerms: "BOT_OWNER",//["MANAGE_GUILD"],
  args: "",
  desc: "Starts a giveaway constructor (Not Finished) (interactive)",
  run: async(Discord, client, message, args) => {

  }
}

// async function awaitMessage(channel, prompt, filter, options){
//   const deafultFilter = response => {
//     return true
//   }

//   const max = options.max || 1
//   const time = options.max || 600000
//   const errors = options.errors
//   filter = options.filter || deafultFilter
//   const 

//   var response = undefined

//   channel.send(prompt)
//   await channel.awaitMessages(filter, { max, time, errors })
//     .then(collected => {
//       var response = collected.first().content
//     })

//   return response
// }
