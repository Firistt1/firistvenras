const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const emoji = require("../../databases/myJsonEmojis.json");
const config = new JsonDatabase({ databasePath:"./config.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsongifts.json" });
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });

module.exports = {
    name: "resgatar-key", 
    description:"「🔑」Resgate uma key",
    type:Discord.ApplicationCommandType.ChatInput,
    options: [
      {
        name:"key",
        description:"Qual é a key?",
        type:Discord.ApplicationCommandOptionType.String,
        required: true
      }
    ],
    run: async(client, interaction) => {
      const args = [interaction.options.getString("key")]
      if(args[0] !== `${db.get(`${args[0]}.idkey`)}`) return interaction.reply(`${emoji.lupa} | Essa key não existe!`)
      if(`${db.get(`${args[0]}.status`)}` == `Resgatado`) return interaction.reply(`${emoji.lupa} | Essa key já foi resgatado!`)
      
      var texto = ""
      var quant = 1
      var estoque = `${db.get(`${args[0]}.estoque`)}`.split(',');
            
      for(let i in estoque) {
        texto = `${texto}${quant}° | ${estoque[i]}\n`
        quant++
      }
      
      db.set(`${args[0]}.info`, `Resgatado`)
      db.set(`${args[0]}.status`, `Resgatado`)
      db.delete(`${args[0]}.estoque`)
      const msg = await interaction.reply(`${emoji.sim} | Resgatado com sucesso!`).then((editedMessage) => {
        const embed = new Discord.EmbedBuilder()
        .setTitle(`${dbcv.get(`title`)} | Key Resgatado`)
        .addFields(
            { name: `${emoji.caixa} | Presentes:`, value: `\`\`\`${texto}\`\`\`` },
            { name: `${emoji.presente} | Código:`, value: `${args[0]}` }
        )
        .setColor(dbcv.get(`color`));
        
        interaction.user.send({ embeds: [embed] }).catch(()=> {
          interaction.followUp({
            content:`Ocorreu um erro para lhe enviar no privado!`,
            embeds:[embed],
            ephemeral:true
          })
        });
        setTimeout(() => {
          setTimeout(() => {
    editedMessage.delete().catch(console.error);
  }, 5000);
});

})


    }
  }      