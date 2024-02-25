const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ApplicationCommandOptionType, ModalBuilder, TextInputBuilder } = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const db4 = new JsonDatabase({ databasePath:"./databases/myJsonSaldo.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
   name: "admsaldo",
   description: "「💰」Adicione ou Remova saldo de um usúario",
   type: ApplicationCommandType.ChatInput,
   options: [
     {
       name: "user",
       description: "Selecione abaixo o usuário que deseja gerenciar",
       type: ApplicationCommandOptionType.User,
       required: true
     }
   ],
   
   run: async(client, interaction) => {
        if (!perms.has(`${interaction.user.id}_id`)) return interaction.reply({ content: `${emoji.nao} | Você não está na lista de pessoas!`, ephemeral: true })
        
        
        const usef = interaction.options.getUser("user")
        
        const embed = new EmbedBuilder()
          .setTitle(`${client.user.username} | Administrando`)
          .setDescription(`👤 | Usuário: ${usef}\n💸 | Saldo: ${Number(db4.get(`${usef.id}.saldo`)).toFixed(0) || "0"}`)
          .setColor(dbcv.get(`color`))
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
          
        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId(`addsaldo`)
              .setLabel('Adicionar Saldo')
              .setEmoji(`<:G_MAIS:1152425159630798949>`)
              .setStyle(3),
              new ButtonBuilder()
                .setCustomId(`setsaldo`)
                .setLabel('Setar Saldo')
                .setEmoji(`<:G_MAIS:1152425159630798949>`)
                .setStyle(2),
             new ButtonBuilder()
               .setCustomId(`delsaldo`)
               .setLabel('Remover Saldo')
               .setEmoji(`<:cancelar:1186355178010591403>`)
               .setStyle(4),
          )
        
       interaction.reply({ embeds: [embed], components: [row] }).then(async msg => {
            
            const filter = i => i.member.id === interaction.user.id;
            const collector = msg.createMessageComponentCollector({ filter });
            collector.on('collect', interaction2 => {
                
              if (interaction2.customId == 'addsaldo') {
                 const modal = new ModalBuilder()
                   .setCustomId(`${usef.id}_modaladdsaldo`)
                   .setTitle(`Adicionar Saldo`)
                   
                 const nouevi = new TextInputBuilder()
                   .setCustomId('novosaldo')
                   .setLabel('ADICIONAR SALDO:')
                   .setPlaceholder('10')
                   .setRequired(true)
                   .setStyle(1)
                   
                 modal.addComponents(new ActionRowBuilder().addComponents(nouevi))
                 
                 interaction2.showModal(modal);
              }
                
              if (interaction2.customId == 'setsaldo') {
                 const modal = new ModalBuilder()
                   .setCustomId(`${usef.id}_modalsetsaldo`)
                   .setTitle(`Adicionar Saldo`)
                   
                 const nouevi = new TextInputBuilder()
                   .setCustomId('setsaldo')
                   .setLabel('SETAR SALDO:')
                   .setPlaceholder('10')
                   .setRequired(true)
                   .setStyle(1)
                   
                 modal.addComponents(new ActionRowBuilder().addComponents(nouevi))
                 
                 interaction2.showModal(modal);
              }
                
                if (interaction2.customId == 'delsaldo') {
                   const modal = new ModalBuilder()
                     .setCustomId(`${usef.id}_modaldelsaldo`)
                     .setTitle(`Remover Saldo`)
                     
                   const nouevi = new TextInputBuilder()
                     .setCustomId('novosaldo')
                     .setLabel('REMOVER SALDO:')
                     .setPlaceholder('10')
                     .setRequired(true)
                     .setStyle(1)
                     
                   modal.addComponents(new ActionRowBuilder().addComponents(nouevi))
                   
                   interaction2.showModal(modal);
                }
                
            })
       })
   }
}