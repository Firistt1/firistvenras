const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const emoji = require("../../databases/myJsonEmojis.json");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "fechar",
    description:"「🛒」Feche um carrinho",
    type:Discord.ApplicationCommandType.ChatInput,
    run: async(client,interaction, message, args) => {
      if (interaction.user.id !== `${perms.get(`${interaction.user.id}_id`)}`) {
        interaction.reply(`${emoji.nao} | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        return;
      }
  if(!interaction.channel.name.startsWith("🛒・")) {
    interaction.reply(`${emoji.nao} | Você só pode fechar carrinhos!`, { ephemeral: true })
  .then((replyMessage) => {
    setTimeout(() => {
      replyMessage.delete().catch(console.error);
    }, 5000); 
  });

  } else {
    interaction.channel.send("⏰️ **・Excluindo carrinho...**").then(async msg => {
      msg.react("⏰️")
      msg.react("⛔")
      
      const sim = (reaction, user) => reaction.emoji.id === "✅" && user.id === interaction.user.id;
      const nao = (reaction, user) => reaction.emoji.id === "⛔" && user.id === interaction.user.id;
      
      const s = msg.createReactionCollector(sim);
      const n = msg.createReactionCollector(nao);
      s.on("collect", async r2 => {
        interaction.channel.delete()
      })
      n.on("collect", async r2 => {
        msg.delete()
        
      })
   })
  }
}
}