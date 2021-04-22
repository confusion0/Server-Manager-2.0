const { MessageEmbed } = require('discord.js')

const { questions, authors } = require('./questions.json')
const letters = { "0": "A", "1": "B", "2": "C", "3": "D"}
const numbers = { "A": "0", "B": "1", "C": "2", "D": "3"}

module.exports = {
  name: 'mindustryquiz',
  aliases: ['mquiz', 'mindustryq'],
  reqPerm: "BOT_ADMIN",
  args: "",
  desc: "Quizzes you on your mindustry knowledge.",
  example: [''],
  cooldown: undefined,
  run: async(client, message, args) => { 
    const { question, authorID, answer, image } = questions[args[0]|| Math.floor(Math.random() * questions.length)]
    
    const embed = new MessageEmbed()
      .setTitle('Mindustry Quiz')

    var desc = `***Submitted by ${authors[authorID].lastKnownTag}*** \n\n**${question}** \n`

    if(answer.type == 'true false'){
      desc += `**Answer with *True or False.***`
    }

    if(answer.type == 'multiple choice'){
      var choiceNumber = 0
      answer.choices.forEach(choice => {
        desc += `**${letters[choiceNumber++]}.** ${choice.text} \n`
      })
    }

    embed.setDescription(desc)

    if(image) embed.setImage(image)

    embed.setFooter(`Please put your answer below.`)

    message.channel.send(embed)
  }
}