const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const emoji = require("../../databases/myJsonEmojis.json");
const config = new JsonDatabase({ databasePath:"./config.json" });
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "perms", 
    description:"「🔑」De permissões via painel",
    type:Discord.ApplicationCommandType.ChatInput,
    run: async(client, interaction,message, args) => {

      if (interaction.user.id !== config.get(`owner`)) {
        return interaction.reply({ content: `${emoji.nao} | Apenas o dono do bot pode usar isso!`, ephemeral: true })
      }

         
       


      const row = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('adicionar')
            .setEmoji(`${emoji.mais}`)
            .setLabel('Adicionar')
            .setStyle(3),
        )
        .addComponents(
            new Discord.ButtonBuilder()
              .setCustomId('remover')
              .setEmoji(`${emoji.menos}`)
              .setLabel('Remover')
              .setStyle(4),
          );
        
        const embed = await interaction.reply({ embeds: [new Discord.EmbedBuilder()
          .setTitle(`${dbcv.get(`title`)} | Configuração das permissões`)
          .setDescription(`**${emoji.fixo} | Adicione e remova permissões usando este comando.**`)
          .setThumbnail(`${dbcv.get(`foto`)}`)
          .setColor(dbcv.get(`color`))
          .setFooter({text:`Adicione e remova perms.`})], components: [row]})
        const interação = embed.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, });
          interação.on("collect", async (interaction) => {
           if (interaction.user.id != interaction.user.id) {
             return;
           }

           if (interaction.customId === "adicionar") {
             interaction.deferUpdate();
             interaction.channel.send(`${emoji.carregando} | Qual é o id do usuário que você quer dar permissão?`).then(msg => {
              const filter = m => m.author.id === interaction.user.id;
              const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                message.delete()
                 const user = message.content
                 perms.set(`${user}_id`, user)
                 msg.edit(`${emoji.sim} | Permissão adicionada para o usuário!`).then((editedMessage) => {
                  setTimeout(() => {
                    editedMessage.delete().catch(console.error);
                  }, 2500); 
                });
                
                            
                 const embednew = new Discord.EmbedBuilder()
                   .setTitle(`${dbcv.get(`title`)} | Configuração das permissões`)
                   .setDescription(`**${emoji.fixo} | Adicione e remova permissões usando este comando.**`)
                   .setThumbnail(`${dbcv.get(`foto`)}`)
                   .setColor(dbcv.get(`color`))
                   .setFooter({text:`Adicione e remova perms.`})
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }
             if (interaction.customId === "remover") {
              interaction.deferUpdate();
              interaction.channel.send(`${emoji.carregando} | Qual é o id do usuário que você quer tirar permissão?`).then(msg => {
                const filter = m => m.author.id === interaction.user.id;
                const collector = msg.channel.createMessageCollector({ filter, max: 1});
                collector.on("collect", message => {
                  message.delete()
                  const user = message.content
                  perms.delete(`${user}_id`)
                  msg.edit(`${emoji.sim} | Permissão removida do usuário!`).then((editedMessage) => {
                    setTimeout(() => {
                      editedMessage.delete().catch(console.error);
                    }, 2500); 
                  });
                  

                  const embednew = new Discord.EmbedBuilder()
                  .setTitle(`${dbcv.get(`title`)} | Configuração das permissões`)
                  .setDescription(`**${emoji.fixo} | Adicione e remova permissões usando este comando.**`)
                  .setThumbnail(`${dbcv.get(`foto`)}`)
                  .setColor(dbcv.get(`color`))
                  .setFooter({text:`Adicione e remova perms.`})
                  embed.edit({ embeds: [embednew] })

                  
                })
              })
             }
          })
          }
        }