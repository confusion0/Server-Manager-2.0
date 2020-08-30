module.exports = {
  name: 'invitehelp',
  aliases: [],
  reqPerms: [],
  args: "",
  desc: "Sends you a help message.",
  run: async (Discord, client, message, args) => {
    if(!args[0]) message.reply("Please include pc, android, or apple")
    else if(args[0] =="pc") {
      message.reply("check your DM's")
      message.author.send("PC Permanent Invite: ", { files: [ "./files/InvitePCStep1.png",
      "./files/InvitePCStep2.png",
      "./files/InvitePCStep3.png",
      "./files/InvitePCStep4.png",
      "./files/InvitePCStep5.png",]})
    }
    else if(args[0] == "android"){
      message.reply("check your DM's")
      message.author.send("Android Permanent Invite: ", { files: [ "./files/InviteAndroidStep1.jpg",
      "./files/InviteAndroidStep2.jpg",
      "./files/InviteAndroidStep3.jpg",
      "./files/InviteAndroidStep4.jpg",]})
    }
    else if(args[0] == "apple"){
      message.reply("check your DM's")
      message.author.send("Apple Permanent Invite: ", { files: [ "https://cdn.discordapp.com/attachments/747924173879246888/749472167539769384/video0.mp4"]})
    }
    else{
      message.reply("Please include pc, android, or apple")
    }
  }
}