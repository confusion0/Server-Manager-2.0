const Jimp = require('jimp');
const path = require('path')
const fs = require('fs').promises
const { MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
  name: 'captcha',
  aliases: ['ctc'],
  reqPerm: "NONE",
  args: "",
  cooldown: 2000,
  desc: "Sends a captcha.",
  example: [],
  run: async(client, message, args) => {
    var isRobot = true
    var exitCaptcha = false
    do {
      const { captcha, buffer } = await createCaptcha();
      const captchaAttachment = new MessageAttachment(buffer, `${captcha}.png`)

      const msg = await message.channel.send(new MessageEmbed()
        .setTitle('Discord Captcha')
        .setDescription('You have 60 seconds to solve the captcha and enter it below. \nEnter **cancel** to exit captcha')
        .setColor('NAVY')
        .attachFiles([captchaAttachment])
        .setImage(`attachment://${captcha}.png`)
        .setTimestamp()
        .setFooter(message.author.tag)
      )

      const filter = m => m.author.id === message.author.id

      let collected = await message.channel.awaitMessages(filter, { max: 1, time: 60000 }) 

      if(!collected || !collected.first()){
        exitCaptcha = true
        msg.edit(new MessageEmbed()
        .setTitle('Discord Captcha')
        .setDescription('You took too long to respond, captcha failed.')
        .setColor('RED')
        .attachFiles([captchaAttachment])
        .setImage(`attachment://${captcha}.png`)
        .setTimestamp()
        .setFooter(message.author.tag)
        )
      } else {
        collected.first().delete()
        if(collected.first().content.toLowerCase() == 'cancel'){
          exitCaptcha = true
          msg.edit(new MessageEmbed()
          .setTitle('Discord Captcha')
          .setDescription('You cancelled the captcha, captcha failed.')
          .setColor('RED')
          .attachFiles([captchaAttachment])
          .setImage(`attachment://${captcha}.png`)
          .setTimestamp()
          .setFooter(message.author.tag)
          )
        }
        else if(collected.first().content == captcha) {
          isRobot = false
          msg.edit(new MessageEmbed()
          .setTitle('Discord Captcha')
          .setDescription('You completed the captcha successfully!')
          .addField('Correct Answer: ', captcha)
          .addField('Your Answer: ', collected.first().content)
          .setColor('GREEN')
          .attachFiles([captchaAttachment])
          .setImage(`attachment://${captcha}.png`)
          .setTimestamp()
          .setFooter(message.author.tag)
          )
        }
        else {
          msg.edit(new MessageEmbed()
          .setTitle('Discord Captcha')
          .setDescription('You entered the wrong answer, try again.')
          .addField('Correct Answer: ', captcha)
          .addField('Your Answer: ', collected.first().content)
          .setColor('RED')
          .attachFiles([`${__dirname}/captchas/${captcha}.png`])
          .setImage(`attachment://${captcha}.png`)
          .setTimestamp()
          .setFooter(message.author.tag)
          )
        }
      }

      await fs.unlink(`${__dirname}/captchas/${captcha}.png`)
        .catch(err => console.log(err));
    } while (isRobot == true && exitCaptcha == false)
  }
}

async function createCaptcha() {
    const captcha = Math.random().toString(36).slice(2, 8);
    const image = new Jimp(175, 50, 'white');
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const w = image.bitmap.width;
    const h = image.bitmap.height;
    const textWidth = Jimp.measureText(font, captcha);
    const textHeight = Jimp.measureTextHeight(font, captcha);
    image.print(font, (w/2 - textWidth/2), (h/2 - textHeight/2), captcha);
    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
    return { captcha, buffer };
}