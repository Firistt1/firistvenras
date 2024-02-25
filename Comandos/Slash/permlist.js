const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const emoji = require("../../databases/myJsonEmojis.json");
const config = new JsonDatabase({ databasePath:"./config.json" });
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
  name: "permlist",
  description:"「📝」Pessoas com permissões",
  type:Discord.ApplicationCommandType.ChatInput,
  run: async(client, interaction,message, args) => {
    
    const a = perms.all()
    
    const response = a.map(x => {
      return `🔧 | <@${x.data.split("_")}> - ${x.data.split("_")}\n`
    }).join('\n')
    
    const embed = new Discord.EmbedBuilder()
    .setTitle(`Membro(s) com permissão - ${a.length}`)
    .setDescription(response)
    .setColor("Blue")
    
    interaction.reply({ embeds: [embed], ephemeral:true })
  }
}