const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const emoji = require("../../databases/myJsonEmojis.json");
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsongifts.json" });

module.exports = {
    name: "criar-gift", 
    description:"「🎁」Crie um presente",
    type:Discord.ApplicationCommandType.ChatInput,
    run: async(client, interaction) => {
      if (interaction.user.id !== `${perms.get(`${interaction.user.id}_id`)}`) {
        interaction.reply(`${emoji.nao} | Você não está na lista de pessoas!`)
          .then(replyMessage => {
            setTimeout(() => {
              replyMessage.delete().catch(console.error);
            }, 5000); 
          });

          return;
      }
      
       function codigo() {
        var gerados = "";
        var codigos = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
         for (var i = 0; i < 12; i++)
           gerados += codigos.charAt(Math.floor(Math.random() * codigos.length));
         return gerados;
       }
        
      const row = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('concluir')
            .setEmoji(`${emoji.sim}`)
            .setLabel('Continuar')
            .setStyle(3),
        )
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('cancelar')
            .setEmoji(`${emoji.nao}`)
            .setLabel('Cancelar')
            .setStyle(4),
        );
        
        const gerado = codigo()        
        const embed = await interaction.reply({ embeds: [new Discord.EmbedBuilder()
          .setTitle(`${dbcv.get(`title`)} | Criação de Gift`)
          .addFields({name:`${emoji.caixa} | Saldo:`,value: `0`})
          .addFields({name:`${emoji.presente} | Código:`,value: `${gerado}`})
          .setColor(dbcv.get(`color`))], components: [row]})
        
        const interação = embed.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, });
          interação.on("collect", async (interaction) => {
           if (interaction.user.id != interaction.user.id) {
             return;
           }

           if (interaction.customId === "concluir") {
             interaction.deferUpdate()
             const idcodigo = gerado
              db.set(`${idcodigo}.idgift`, `${idcodigo}`)
              db.set(`${idcodigo}.status`, `Disponivel`)
              db.set(`${idcodigo}.saldo`, `${idcodigo}`)
              db.set(`${idcodigo}.tipo`, `Gifts`)
               
             interaction.channel.send(`${emoji.carregando} | Envie o saldo no chat!`).then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
             collector.on("collect", message => {
               collector.stop();
               message.delete()     

                 db.set(`${idcodigo}.saldo`, Number(message.content))
                 
                     
                   row.components[0].setDisabled(true)
                   row.components[1].setDisabled(true)
                   msg.edit(`${emoji.sim} | Gift \`${gerado}\` Criado com sucesso!`)
  .then((editedMessage) => {
    setTimeout(() => {
      editedMessage.delete().catch(console.error);
    }, 5000);
  });

                   const embednew = new Discord.EmbedBuilder()
                     .setTitle(`${dbcv.get(`title`)} | Criação de Gift Card`)
                     .addFields({name:`${emoji.caixa} | Saldo`, value:`${message.content}`})
                     .addFields({name:`${emoji.presente} | Código:`,value: `${gerado}`})
                     .setColor(dbcv.get(`color`))
                   embed.edit({ embeds: [embednew], components: [row] })
                 
               
             })
           })
         }
        
           if (interaction.customId === "cancelar") {
             embed.delete()
             interaction.channel.send(`${emoji.nao} | Cancelado`)
  .then((sentMessage) => {
    setTimeout(() => {
      sentMessage.delete().catch(console.error);
    }, 5000); 
  });

           }
         })
       }
     };