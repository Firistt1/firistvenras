const Discord = require("discord.js")
const moment = require("moment")
const { JsonDatabase, } = require("wio.db");
const db2 = new JsonDatabase({ databasePath:"./databases/myJsonDatabase.json" });
const emoji = require("../../databases/myJsonEmojis.json");
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

moment.locale("pt-br");
module.exports = {
    name: "rendimentos", 
    description:"「📊」Exiba o seus rendimentos",
    type:Discord.ApplicationCommandType.ChatInput,
    run: async(client,interaction, message, args) => {
      if (interaction.user.id !== `${perms.get(`${interaction.user.id}_id`)}`) {
        interaction.reply(`${emoji.nao} | Você não está na lista de pessoas!`)
          .then(replyMessage => {
            setTimeout(() => {
              replyMessage.delete().catch(console.error);
            }, 5000); 
          });

          return;
      }
      
      const hojepedidos = db2.get(`${moment().format('L')}.pedidos`)  || 0;
      const hojerecebimentos = db2.get(`${moment().format('L')}.recebimentos`) || 0;

      var setedias = 0;
       setedias = Number(setedias) + Number(hojepedidos);
       setedias = Number(setedias) + Number(db2.get(`${moment().subtract(1, 'days').format('L')}.pedidos`) || 0);
       setedias = Number(setedias) + Number(db2.get(`${moment().subtract(2, 'days').format('L')}.pedidos`) || 0);
       setedias = Number(setedias) + Number(db2.get(`${moment().subtract(3, 'days').format('L')}.pedidos`) || 0);
       setedias = Number(setedias) + Number(db2.get(`${moment().subtract(4, 'days').format('L')}.pedidos`) || 0);
       setedias = Number(setedias) + Number(db2.get(`${moment().subtract(5, 'days').format('L')}.pedidos`) || 0);
       setedias = Number(setedias) + Number(db2.get(`${moment().subtract(6, 'days').format('L')}.pedidos`) || 0);
       setedias = Number(setedias) + Number(db2.get(`${moment().subtract(7, 'days').format('L')}.pedidos`) || 0);

      var setediasrec = 0;
       setediasrec = Number(setediasrec) + Number(hojerecebimentos);
       setediasrec = Number(setediasrec) + Number(db2.get(`${moment().subtract(1, 'days').format('L')}.recebimentos`) || 0);
       setediasrec = Number(setediasrec) + Number(db2.get(`${moment().subtract(2, 'days').format('L')}.recebimentos`) || 0);
       setediasrec = Number(setediasrec) + Number(db2.get(`${moment().subtract(3, 'days').format('L')}.recebimentos`) || 0);
       setediasrec = Number(setediasrec) + Number(db2.get(`${moment().subtract(4, 'days').format('L')}.recebimentos`) || 0);
       setediasrec = Number(setediasrec) + Number(db2.get(`${moment().subtract(5, 'days').format('L')}.recebimentos`) || 0);
       setediasrec = Number(setediasrec) + Number(db2.get(`${moment().subtract(6, 'days').format('L')}.recebimentos`) || 0);
       setediasrec = Number(setediasrec) + Number(db2.get(`${moment().subtract(7, 'days').format('L')}.recebimentos`) || 0);

      var setedias2 = 0;
       setedias2 = Number(setedias2) + Number(hojepedidos);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(1, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(2, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(3, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(4, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(5, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(6, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(7, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(8, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(9, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(10, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(11, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(12, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(13, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(14, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(15, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(16, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(17, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(18, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(19, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(20, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(21, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(22, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(23, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(24, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(25, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(26, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(27, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(28, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(29, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(30, 'days').format('L')}.pedidos`) || 0);

      var setediasrec2 = 0;
       setediasrec2 = Number(setediasrec2) + Number(hojerecebimentos);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(1, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(2, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(3, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(4, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(5, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(6, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(7, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(8, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(9, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(10, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(11, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(12, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(13, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(14, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(15, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(16, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(17, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(18, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(19, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(20, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(21, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(22, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(23, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(24, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(25, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(26, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(27, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(28, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(29, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(30, 'days').format('L')}.recebimentos`) || 0);

       var tudo = 0;
       tudo = Number(db2.get(`gastostotal`))

       const embed = new Discord.EmbedBuilder()
       .setTitle(`${dbcv.get(`title`)} | Rendimentos de vendas`)
       .setImage(dbcv.get(`banner`))
       .setColor(dbcv.get(`color`))
       .setDescription("Escolha Qual opção abaixo você deseja ver o rendimento");
   
   const msg = await interaction.reply({ embeds: [embed], components:[
    new Discord.ActionRowBuilder()
    .addComponents(
      new Discord.ButtonBuilder()
      .setCustomId("rendimentohoje")
      .setLabel("Hoje")
      .setStyle(2)
      .setEmoji(emoji.calendario2),
      new Discord.ButtonBuilder()
      .setCustomId("rendimento7dias")
      .setLabel("Nessa Semana")
      .setStyle(2)
      .setEmoji(emoji.calendario2),
      new Discord.ButtonBuilder()
      .setCustomId("rendimentomes")
      .setLabel("Nesse Mês")
      .setStyle(2)
      .setEmoji(emoji.calendario2),
      new Discord.ButtonBuilder()
      .setCustomId("rendimentototal")
      .setLabel("Todo o periodo")
      .setStyle(2)
      .setEmoji(emoji.calendario2),
    )
  ]  });
   
   const interação = msg.createMessageComponentCollector({
    componentType: Discord.ComponentType.Button,
 })
 const user = interaction.user

 interação.on("collect", async (interaction) => {
    if (user.id != interaction.user.id) {
      interaction.deferUpdate()
    return;
 } 

 if(interaction.customId === "rendimentohoje") {
  const embed = new Discord.EmbedBuilder()
       .setTitle(`${dbcv.get(`title`)} | Rendimentos de Hoje`)
       .setThumbnail(dbcv.get(`foto`))
       .setImage(dbcv.get(`banner`))
      .addFields(
           { name: `${emoji.raio} | Hoje:`, value: `${emoji.diamante} | Pedidos ${hojepedidos || "0"} \n${emoji.star} | Recebimentos: R$${hojerecebimentos.toFixed(2) || "0"}`, inline: false },
      )
       .setColor(dbcv.get(`color`))
       interaction.reply({embeds:[embed],ephemeral:true})
 }

 if(interaction.customId === "rendimento7dias") {
  const embed = new Discord.EmbedBuilder()
       .setTitle(`${dbcv.get(`title`)} | Rendimentos Dessa Semana`)
       .setThumbnail(dbcv.get(`foto`))
       .setImage(dbcv.get(`banner`))
       .addFields(
           { name: `${emoji.raio} | Ultimos 7 dias:`, value: `${emoji.diamante} | Pedidos ${setedias || "0"} \n${emoji.star} | Recebimentos: R$${setediasrec.toFixed(2) || "0"}`, inline: false },
       )
       .setColor(dbcv.get(`color`))
       interaction.reply({embeds:[embed],ephemeral:true})
 }

 if(interaction.customId === "rendimentomes") {
  const embed = new Discord.EmbedBuilder()
       .setTitle(`${dbcv.get(`title`)} | Rendimentos Desse Mês`)
       .setThumbnail(dbcv.get(`foto`))
       .setImage(dbcv.get(`banner`))
       .addFields(
           { name: `${emoji.raio} | Ultimos 30 dias:`, value: `${emoji.diamante} | Pedidos ${setedias2 || "0"} \n${emoji.star} | Recebimentos: R$${setediasrec2.toFixed(2) || "0"}`, inline: false },
       )
       .setColor(dbcv.get(`color`))
       interaction.reply({embeds:[embed],ephemeral:true})
 }

 if(interaction.customId === "rendimentototal") {
  const embed = new Discord.EmbedBuilder()
       .setTitle(`${dbcv.get(`title`)} | Rendimentos Em Todo o Periodo`)
       .setThumbnail(dbcv.get(`foto`))
       .setImage(dbcv.get(`banner`))
       .addFields(
           { name: `${emoji.link} | Todo Periodo:`, value: `${emoji.coroa} | Pedidos ${db2.get(`pedidostotal`) || "0"} \n${emoji.dinheiro} | Recebimentos: R$${tudo.toFixed(2) || "0"}`, inline: false }
       )
       .setColor(dbcv.get(`color`))
       interaction.reply({embeds:[embed],ephemeral:true})
 }
}) 
    }
}