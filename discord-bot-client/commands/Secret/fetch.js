module.exports = {
  name: 'fetch',
  aliases: ['f'],
  reqPerm: "BOT_ADMIN",
  args: "<database> <key",
  desc: "fetches the specified from database",
  example: ['guilds 32049238 members'],
  cooldown: undefined,
  run: async(client, message, args) => {
    const db = args.shift().toLowerCase()
    const key = args.join(':')

    if(db == 'guilds'){
      var result = await client.gData.get(key)
      if(!result) result = 'undefined'
      return message.channel.send(clean(result), {code:"xl",split:true});
    }

    if(db == 'users'){
      var result = await client.uData.get(key)
      if(!result) result = 'undefined'
      return message.channel.send(clean(result), {code:"xl",split:true});
    }

    return message.channel.send('Invalid Database')
  }
}

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
