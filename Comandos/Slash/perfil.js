const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const emoji = require("../../databases/myJsonEmojis.json");
const db2 = new JsonDatabase({ databasePath:"./databases/myJsonDatabase.json" });
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const db8 = new JsonDatabase({ databasePath:"./databases/myJsonRankUsers.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });

const db4 = new JsonDatabase({ databasePath:"./databases/myJsonSaldo.json" });
const db = new JsonDatabase({ databasePath: "./databases/myJsonDatabase.json" });

module.exports = {
    name: "perfil", 
    description:"「👤」Veja o seu perfil ou de outro usúario",
    type:Discord.ApplicationCommandType.ChatInput,
    options: [
      {
        name:"pessoa",
        description:"Escolha algum usuario!",
        type:Discord.ApplicationCommandOptionType.User,
        required: false
      }
    ],
    run: async(client, interaction, message, args) => {
      const usuario = interaction.options.getUser("pessoa") || interaction.user
     if (usuario.id === interaction.user.id) {
      
      const id = interaction.user
      const gasto = db8.get(`${id}.comprasrealizadas`) || "0";
      const pedidos = db8.get(`${id}.valoresganhos`) || "0";
      const saldototal = db4.get(`${interaction.user.id}.saldo`) || "0";
      const db22 = db.all().filter(i => i.data.gastosaprovados).sort((a, b) => b.data.gastosaprovados - a.data.gastosaprovados);
      const userPosition = db22.findIndex(entry => entry.ID === id.id) + 1;
      
      const posrank = `${userPosition || "Sem Posição"}`;
      
        
      const embed = new Discord.EmbedBuilder()
      .setTitle(`${dbcv.get(`title`)} | Seu perfil`)
      .addFields(
          { name: `**${emoji.cart} | Produtos Comprados:**`, value: `\`\`${Number(gasto).toFixed(2)}\`\` Compras realizadas.` },
          { name: `**${emoji.card} | Dinheiro gasto:**`, value: `\`\`R$${Number(pedidos).toFixed(2)}\`\` Reais` },
          { name: `**${emoji.bagmoney} | Saldo total:**`, value: `\`\`R$${Number(saldototal).toFixed(2)}\`\` Reais` },
          { name: `🏆 | Posição Rank:`, value: `${id.username} está na **__${posrank}°__** posição do rank!` }
      )
      .setColor(dbcv.get(`color`));
      interaction.reply({embeds: [embed]})
     } else {
      const id = usuario
      const gasto = db8.get(`${id}.comprasrealizadas`) || "0";
      const pedidos = db8.get(`${id}.valoresganhos`) || "0";
      const saldototal = db4.get(`${interaction.user.id}.saldo`) || "0"; 
      const db22 = db.all().filter(i => i.data.gastosaprovados).sort((a, b) => b.data.gastosaprovados - a.data.gastosaprovados);
      const userPosition = db22.findIndex(entry => entry.ID === id.id) + 1;
      
      const posrank = `${userPosition || "Sem Posição"}`;
      
      const embed = new Discord.EmbedBuilder()
    .setTitle(`${dbcv.get(`title`)} | Perfil do ${id.username}`)
    .addFields(
        { name: `**${emoji.cart} | Produtos Comprados:**`, value: `\`\`${Number(gasto).toFixed(2)}\`\` Compras realizadas.` },
        { name: `**${emoji.card} | Dinheiro gasto:**`, value: `\`\`R$${Number(pedidos).toFixed(2)}\`\` Reais` },
        { name: `**${emoji.bagmoney} | Saldo total:**`, value: `\`\`R$${Number(saldototal).toFixed(2)}\`\` Reais` }, 
        { name: `🏆 | Posição Rank:`, value: `${id.username} está na **__${posrank}°__** posição do rank!` }
    )
    .setColor(dbcv.get(`color`));
      interaction.reply({embeds: [embed]})
     }
   }
}