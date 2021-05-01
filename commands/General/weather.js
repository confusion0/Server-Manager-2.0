const { MessageEmbed } = require('discord.js')

const weather = require('weather-js')

module.exports = {
  name: 'weather',
  aliases: ['w'],
  reqPerm: "NONE",
  args: "<location name>",
  cooldown: 3000,
  desc: "Checks a weather forecast",
  example: [],
  run: async(client, message, args) => {
    weather.find({search: args.join(" "), degreeType: 'F'}, function (error, result){
      // 'C' can be changed to 'F' for farneheit results
      if(error) return message.channel.send(error);
      if(!args[0]) return message.channel.send('Please specify a location')

      if(result === undefined || result.length === 0) return message.channel.send('**Invalid** location');

      var current = result[0].current;
      var location = result[0].location;

      const weatherinfo = new MessageEmbed()
      .setDescription(`**${current.skytext}**`)
      .setAuthor(`Weather forecast for ${current.observationpoint}`)
      .setThumbnail(current.imageUrl)
      .setColor(0x111111)
      .addField('Timezone', `UTC${location.timezone}`, true)
      .addField('Degree Type', 'Fahrenheit', true)
      .addField('Temperature', `${current.temperature}°`, true)
      .addField('Wind', current.winddisplay, true)
      .addField('Feels like', `${current.feelslike}°`, true)
      .addField('Humidity', `${current.humidity}%`, true)


      message.channel.send(weatherinfo)
    })
  }
}