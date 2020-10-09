const Jimp = require('jimp');
const path = require('path')
const fs = require('fs').promises

module.exports = {
  name: 'captcha',
  aliases: ['ctc'],
  reqPerm: "NONE",
  args: "",
  desc: "Sends a captcha.",
  example: [],
  run: async(client, message, args) => {
    const captcha = await createCaptcha();
    const msg = await message.channel.send('You have 60 seconds to solve the captcha', {
        files: [{
            attachment: `${__dirname}/captchas/${captcha}.png`,
            name: `${captcha}.png`
        }]
    });
    await fs.unlink(`${__dirname}/captchas/${captcha}.png`)
      .catch(err => console.log(err));
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
    image.write(`${__dirname}/captchas/${captcha}.png`);
    return captcha;
}