const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const mercadopago = require("mercadopago")
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const emoji = require("../../databases/myJsonEmojis.json");
const db3 = new JsonDatabase({ databasePath:"./databases/myJsonIDs.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });



module.exports = {
    name: "gerenciarvendas", 
    description:"「👾」Gerencie as vendas via painel",
    type:Discord.ApplicationCommandType.ChatInput,
    run: async(client, interaction,message, args) => {
      const user = interaction.user
      if (interaction.user.id !== `${perms.get(`${interaction.user.id}_id`)}`) {
        interaction.reply(`${emoji.nao} | Você não está na lista de pessoas!`)
          .then(replyMessage => {
            setTimeout(() => {
              replyMessage.delete().catch(console.error);
            }, 5000); 
          });
          return;

        }
        
      const row = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('aprovar')
            .setEmoji(`${emoji.aceitar}`)
            .setLabel('Aprovar')
            .setStyle(3)
        )
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('reembolsar')
            .setEmoji(`${emoji.negar}`)
            .setLabel('Reembolsar')
            .setStyle(4)
        )
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('info')
            .setEmoji(`${emoji.desc}`)
            .setLabel('Info')
            .setStyle(2)
        )
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('pegar')
            .setEmoji(`${emoji.box}`)
            .setLabel('Pegar Produto')
            .setStyle(2)
        );
        
        const embed = await interaction.reply({ embeds: [new Discord.EmbedBuilder()
          .setTitle(`${dbcv.get(`title`)} | Gerenciar vendas`)
          .setDescription(`**${emoji.fixo} | Gerencie suas vendas usando este comando.**`)
          .setColor(dbcv.get(`color`))
          .setThumbnail(dbcv.get(`foto`))
          .setFooter({text:`Gerencie suas vendas por aqui.`})], components: [row]})
        const interação = embed.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, });
          interação.on("collect", async (interaction) => {
           if (user.id != interaction.user.id) {
             return;
           }

           if (interaction.customId === "aprovar") {
            const modal = new Discord.ModalBuilder()
            .setTitle("Aprovar Compra")
            .setCustomId(`aprovar_modal`);

            const text = new Discord.TextInputBuilder()
            .setLabel("Coloque o ID de um carrinho")
            .setRequired(true)
            .setStyle(1)
            .setCustomId("text");

            modal.addComponents(new Discord.ActionRowBuilder().addComponents(text));
            return interaction.showModal(modal)
           
          }

           if (interaction.customId === "reembolsar") {
            const modal = new Discord.ModalBuilder()
            .setTitle("Reembolsar Compra")
            .setCustomId(`reembolsar_modal`);

            const text = new Discord.TextInputBuilder()
            .setLabel("Coloque o ID de um carrinho")
            .setRequired(true)
            .setStyle(1)
            .setCustomId("text");

            modal.addComponents(new Discord.ActionRowBuilder().addComponents(text));
            return interaction.showModal(modal)
          
           }

           if (interaction.customId === "info") {
            const modal = new Discord.ModalBuilder()
            .setTitle("Info Compra")
            .setCustomId(`info_modal`);

            const text = new Discord.TextInputBuilder()
            .setLabel("Coloque o ID de um carrinho")
            .setRequired(true)
            .setStyle(1)
            .setCustomId("text");

            modal.addComponents(new Discord.ActionRowBuilder().addComponents(text));
            return interaction.showModal(modal)
           
           }
           if(interaction.customId === "pegar"){
            const modal = new Discord.ModalBuilder()
            .setTitle("Pegar Compra")
            .setCustomId(`pegar_modal`);

            const text = new Discord.TextInputBuilder()
            .setLabel("Coloque o ID de um carrinho")
            .setRequired(true)
            .setStyle(1)
            .setCustomId("text");

            modal.addComponents(new Discord.ActionRowBuilder().addComponents(text));
            return interaction.showModal(modal)
          
          }

           
            })

          }
             }
             
             
             
          
        
        

        