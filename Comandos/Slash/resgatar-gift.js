const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const emoji = require("../../databases/myJsonEmojis.json");
const config = new JsonDatabase({ databasePath:"./config.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsongifts.json" });
const db1 = new JsonDatabase({ databasePath:"./databases/myJsonSaldo.json" });
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });

module.exports = {
    name: "resgatar-gift", 
    description:"「🎁」Resgate um gift",
    type:Discord.ApplicationCommandType.ChatInput,
    options: [
      {
        name:"gift",
        description:"Qual é o gift?",
        type:Discord.ApplicationCommandOptionType.String,
        required: true
      }
    ],
    run: async(client, interaction) => {
      const args = [interaction.options.getString("gift")]
      if(args[0] !== `${db.get(`${args[0]}.idgift`)}`) return interaction.reply(`${emoji.lupa} | Esse Giftnão existe!`)
      if(`${db.get(`${args[0]}.status`)}` == `Resgatado`) return interaction.reply(`${emoji.lupa} | Esse Gift já foi resgatado!`)
      
      var texto = ""
      var quant = 1
      var estoque = `${db.get(`${args[0]}.estoque`)}`.split(',');
            
      for(let i in estoque) {
        texto = `${texto}${quant}° | ${estoque[i]}\n`
        quant++
      }
      
      db.set(`${args[0]}.info`, `Resgatado`)
      db.set(`${args[0]}.status`, `Resgatado`)
      const saldo = db.get(`${args[0]}.saldo`)
      await db1.add(`${interaction.user.id}.saldo`, Number(saldo));
      const msg = await interaction.reply(`${emoji.sim} | Resgatado com sucesso! e agora você está com ${db1.get(`${interaction.user.id}.saldo`)} de Saldo`)


    }
  }      