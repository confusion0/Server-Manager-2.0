module.exports = {
  name: 'invitehelp',
  aliases: [],
  reqPerms: [],
  args: "",
  desc: "Sends you a help message.",
  run: async (Discord, client, message, args) => {
    message.reply("check your DM's")
    message.author.send("PC Permanent Invite: ", { files: [ "./files/Step1.png",
    "./files/Step2.png",
    "./files/Step3.png",
    "./files/Step4.png",
    "./files/Step5.png",]})
    message.author.send("Mobile Permanent Invite: ", { files: [
      "https://cdn.discordapp.com/attachments/747924173879246888/749472167539769384/video0.mp4"
    ]})
  }
}