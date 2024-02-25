const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, ModalBuilder, TextInputBuilder } = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db1 = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });
const db2 = new JsonDatabase({ databasePath:"./databases/myJsonCupons.json" });
const db3 = new JsonDatabase({ databasePath:"./databases/myJsongifts.json" });
const db4 = new JsonDatabase({ databasePath:"./databases/painel.json" });
const emoji = require("../../databases/myJsonEmojis.json")

module.exports = {
   name: "ids",
   description: "「👻」Exiba os ids criados",
   run: async(client, interaction) => {
     
     if (!perms.has(`${interaction.user.id}_id`)) return interaction.reply({ content: `${emoji.nao} | Você não está na lista de pessoas!`, ephemeral: true })
     
     const row = new ActionRowBuilder()
       .addComponents(
           new ButtonBuilder()
             .setCustomId('produtosc')
             .setLabel('Produtos')
             .setEmoji(`${emoji.box}`)
             .setStyle(2),
           new ButtonBuilder()
             .setCustomId('cupomc')
             .setLabel('Cupons')
             .setEmoji(`${emoji.cupom}`)
             .setStyle(2),
           new ButtonBuilder()
             .setCustomId('painelc')
             .setLabel('Paineis')
             .setEmoji(`${emoji.abobora}`)
             .setStyle(2),
           new ButtonBuilder()
             .setCustomId('gifsc')
             .setLabel('Keys/Gifts')
             .setEmoji(`${emoji.presente}`)
             .setStyle(2), 
       )
       
     const embed = new EmbedBuilder()
       .setDescription(`Escolha o tipo de **serviço** que você deseja ver.`)
       .setColor(dbcv.get(`color`))
       
     interaction.reply({ embeds: [embed], components: [row] }).then(async msg => {
       
       const filter = i => i.user.id === interaction.user.id
       const collector = msg.createMessageComponentCollector({ filter })
        collector.on("collect", async interaction => {
            
            if (interaction.customId == 'produtosc') {
               const push = db1.all()
               
               if (push.length <= 0) return interaction.reply({ content: `Não há nenhum **Produto Funcionando** no momento!`, ephemeral: true })
               
               const pageSize = 10
               let page = 0
               
               const displayPage = () => {
                  const pagestart = page * pageSize
                  const pageend = pagestart + pageSize
                  const pageItems = push.slice(pagestart, pageend)
                  
                  const valores = pageItems.map((entry) => `🏷️ **| ID:** ${entry.ID}\n🪐 **| Nome:** ${entry.data.nome}\n💸 **| Preço:** ${entry.data.preco}\n📦 **| Estoque:** ${entry.data.conta ? entry.data.conta.length : 0}\n`
                  ).join('\n\n')
                  
                  const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                          .setCustomId('primeiraPagina')
                          .setEmoji('⏮️')
                          .setDisabled(page == 0)
                          .setStyle(2),
                        new ButtonBuilder()
                          .setCustomId('voltar')
                          .setEmoji('⬅️')
                          .setDisabled(page == 0)
                          .setStyle(2),
                        new ButtonBuilder()
                          .setCustomId('gotopage')
                          .setLabel('Go to Page')
                          .setEmoji('📑')
                          .setDisabled(push.length < 0)
                          .setStyle(3),
                        new ButtonBuilder()
                          .setCustomId('proximo')
                          .setEmoji('➡️')
                          .setDisabled(page == Math.ceil(push.length / pageSize) - 1)
                          .setStyle(2),
                        new ButtonBuilder()
                          .setCustomId('ultimaPagina')
                          .setEmoji('⏩')
                          .setDisabled(page == Math.ceil(push.length / pageSize) - 1)
                          .setStyle(2),
                    )
                    
                  const embed = new EmbedBuilder()
                    .setTitle('Produtos:')
                    .setDescription(`${valores}`)
                    .setColor(dbcv.get(`color`))
                    .setFooter({ text: `Página ${page + 1}/${Math.ceil(push.length / pageSize)}` })
                    
                  return { embed, components: [row2] }
               }
               
               const { embed, components } = displayPage()
               const msg = await interaction.reply({ embeds: [embed], components, ephemeral: true })
               
               const filter = i => i.user.id === interaction.user.id;
               const collector = msg.createMessageComponentCollector({ filter });
               
               collector.on('collect', async(interaction2) => {
                if (interaction2.customId === "gotopage") {

                  const modal = new ModalBuilder()
                  .setCustomId("gotopagerank")
                  .setTitle("Go To Page")
                
                  const num = new TextInputBuilder()
                  .setCustomId("pagina")
                  .setLabel("Qual vai ser a pagina?")
                  .setStyle(1)
                  .setMaxLength(2)
                  .setRequired(true)
                  .setPlaceholder("Escolha entre 1 a 99")
                  modal.addComponents(new ActionRowBuilder().addComponents(num))
                  await interaction2.showModal(modal)
                }
                client.once('interactionCreate', async (interaction) => {
                if(interaction.isModalSubmit() && interaction.customId === "gotopagerank") {
                  const text = interaction.fields.getTextInputValue('pagina')
                
                  const newPage = parseInt(text)
                  if (!isNaN(newPage) && newPage >= 1 && newPage <= Math.ceil(push.length / pageSize)) {
                    page = newPage - 1;
                    const { embed, components } = displayPage();
                
                    await interaction.update({ embeds: [embed], components });
                  } else {
                    interaction.reply({ content: "Número de página inválido. Certifique-se de inserir um número válido dentro do intervalo.", ephemeral: true });
                  }
                
                } 
                })
                   if (interaction2.customId == 'proximo') {
                     page += 1;
                   } else if (interaction2.customId == 'voltar') {
                     page -= 1;
                   } else if (interaction2.customId == 'ultimaPagina') {
                     page = Math.ceil(push.length / pageSize) - 1;
                   } else if (interaction2.customId == 'primeiraPagina') {
                     page = 0;
                   }
                 
                 const { embed, components } = displayPage();
                 msg.edit({ embeds: [embed], components })
               })
            }
            
            if (interaction.customId == 'cupomc') {
               const push = db2.all()
               
               if (push.length <= 0) return interaction.reply({ content: `Não há nenhum **Cupom Functionando** no momento!`, ephemeral: true })
               
               const pageSize = 10
               let page = 0
               
               const displayPage = () => {
                  const pagestart = page * pageSize
                  const pageend = pagestart + pageSize
                  const pageItems = push.slice(pagestart, pageend)
                  
                  const valores = pageItems.map((entry) => `🏷️ **| ID:** ${entry.ID}\n🪐 **| Nome:** ${entry.data.idcupom}\n💸 **| Mínimo:** R$${entry.data.minimo}\n🛒 |**| Desconto:** ${entry.data.desconto}%\n📦 **| Quantiade:** ${entry.data.quantidade}\n`
                  ).join('\n\n')
                  
                  const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                          .setCustomId('primeiraPagina')
                          .setEmoji('⏮️')
                          .setDisabled(page == 0)
                          .setStyle(2),
                        new ButtonBuilder()
                          .setCustomId('voltar')
                          .setEmoji('⬅️')
                          .setDisabled(page == 0)
                          .setStyle(2),
                        new ButtonBuilder()
                          .setCustomId('gotopage')
                          .setLabel('Go to Page')
                          .setEmoji('📑')
                          .setDisabled(push.length < 10)
                          .setStyle(3),
                        new ButtonBuilder()
                          .setCustomId('proximo')
                          .setEmoji('➡️')
                          .setDisabled(page == Math.ceil(push.length / pageSize) - 1)
                          .setStyle(2),
                        new ButtonBuilder()
                          .setCustomId('ultimaPagina')
                          .setEmoji('⏩')
                          .setDisabled(page == Math.ceil(push.length / pageSize) - 1)
                          .setStyle(2),
                    )
                    
                  const embed = new EmbedBuilder()
                    .setTitle('Cupons:')
                    .setDescription(`${valores}`)
                    .setColor(dbcv.get(`color`))
                    .setFooter({ text: `Página ${page + 1}/${Math.ceil(push.length / pageSize)}` })
                    
                  return { embed, components: [row2] }
               }
               
               const { embed, components } = displayPage()
               const msg = await interaction.reply({ embeds: [embed], components, ephemeral: true })
               
               const filter = i => i.user.id === interaction.user.id;
               const collector = msg.createMessageComponentCollector({ filter });
               
               collector.on('collect', async(interaction2) => {
                if (interaction2.customId === "gotopage") {

                  const modal = new ModalBuilder()
                  .setCustomId("gotopagerank")
                  .setTitle("Go To Page")
                
                  const num = new TextInputBuilder()
                  .setCustomId("pagina")
                  .setLabel("Qual vai ser a pagina?")
                  .setStyle(1)
                  .setMaxLength(2)
                  .setRequired(true)
                  .setPlaceholder("Escolha entre 1 a 99")
                  modal.addComponents(new ActionRowBuilder().addComponents(num))
                  await interaction2.showModal(modal)
                }
                client.once('interactionCreate', async (interaction) => {
                if(interaction.isModalSubmit() && interaction.customId === "gotopagerank") {
                  const text = interaction.fields.getTextInputValue('pagina')
                
                  const newPage = parseInt(text)
                  if (!isNaN(newPage) && newPage >= 1 && newPage <= Math.ceil(push.length / pageSize)) {
                    page = newPage - 1;
                    const { embed, components } = displayPage();
                
                    await interaction.update({ embeds: [embed], components });
                  } else {
                    interaction.reply({ content: "Número de página inválido. Certifique-se de inserir um número válido dentro do intervalo.", ephemeral: true });
                  }
                
                } 
                })
                   if (interaction2.customId == 'proximo') {
                     page += 1;
                   } else if (interaction2.customId == 'voltar') {
                     page -= 1;
                   } else if (interaction2.customId == 'ultimaPagina') {
                     page = Math.ceil(push.length / pageSize) - 1;
                   } else if (interaction2.customId == 'primeiraPagina') {
                     page = 0;
                   }
                 
                 const { embed, components } = displayPage();
                 msg.edit({ embeds: [embed], components })
               })
            }
            
            if (interaction.customId == 'painelc') {
               const push = db4.all()
               
               if (push.length <= 0) return interaction.reply({ content: `Não há nenhum **Painel Functionando** no momento!`, ephemeral: true })
               
               const pageSize = 10
               let page = 0
               
               const displayPage = () => {
                  const pagestart = page * pageSize
                  const pageend = pagestart + pageSize
                  const pageItems = push.slice(pagestart, pageend)
                  
                  const valores = pageItems.map((entry) => `🏷️ **| ID:** ${entry.ID}\n🪐 **| Titulo:** ${entry.data.titulo}\n`
                  ).join('\n\n')
                  
                  const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                          .setCustomId('primeiraPagina')
                          .setEmoji('⏮️')
                          .setDisabled(page == 0)
                          .setStyle(2),
                        new ButtonBuilder()
                          .setCustomId('voltar')
                          .setEmoji('⬅️')
                          .setDisabled(page == 0)
                          .setStyle(2),
                        new ButtonBuilder()
                          .setCustomId('gotopage')
                          .setLabel('Go to Page')
                          .setEmoji('📑')
                          .setDisabled(push.length < 10)
                          .setStyle(3),
                        new ButtonBuilder()
                          .setCustomId('proximo')
                          .setEmoji('➡️')
                          .setDisabled(page == Math.ceil(push.length / pageSize) - 1)
                          .setStyle(2),
                        new ButtonBuilder()
                          .setCustomId('ultimaPagina')
                          .setEmoji('⏩')
                          .setDisabled(page == Math.ceil(push.length / pageSize) - 1)
                          .setStyle(2),
                    )
                    
                  const embed = new EmbedBuilder()
                    .setTitle('Painel:')
                    .setDescription(`${valores}`)
                    .setColor(dbcv.get(`color`))
                    .setFooter({ text: `Página ${page + 1}/${Math.ceil(push.length / pageSize)}` })
                    
                  return { embed, components: [row2] }
               }
               
               const { embed, components } = displayPage()
               const msg = await interaction.reply({ embeds: [embed], components, ephemeral: true })
               
               const filter = i => i.user.id === interaction.user.id;
               const collector = msg.createMessageComponentCollector({ filter });
               
               collector.on('collect', async (interaction2) => {
                if (interaction2.customId === "gotopage") {

                  const modal = new ModalBuilder()
                  .setCustomId("gotopagerank")
                  .setTitle("Go To Page")
                
                  const num = new TextInputBuilder()
                  .setCustomId("pagina")
                  .setLabel("Qual vai ser a pagina?")
                  .setStyle(1)
                  .setMaxLength(2)
                  .setRequired(true)
                  .setPlaceholder("Escolha entre 1 a 99")
                  modal.addComponents(new ActionRowBuilder().addComponents(num))
                  await interaction2.showModal(modal)
                }
                client.once('interactionCreate', async (interaction) => {
                if(interaction.isModalSubmit() && interaction.customId === "gotopagerank") {
                  const text = interaction.fields.getTextInputValue('pagina')
                
                  const newPage = parseInt(text)
                  if (!isNaN(newPage) && newPage >= 1 && newPage <= Math.ceil(push.length / pageSize)) {
                    page = newPage - 1;
                    const { embed, components } = displayPage();
                
                    await interaction.update({ embeds: [embed], components });
                  } else {
                    interaction.reply({ content: "Número de página inválido. Certifique-se de inserir um número válido dentro do intervalo.", ephemeral: true });
                  }
                
                } 
                })
                   if (interaction2.customId == 'proximo') {
                     page += 1;
                   } else if (interaction2.customId == 'voltar') {
                     page -= 1;
                   } else if (interaction2.customId == 'ultimaPagina') {
                     page = Math.ceil(push.length / pageSize) - 1;
                   } else if (interaction2.customId == 'primeiraPagina') {
                     page = 0;
                   }
                 
                 const { embed, components } = displayPage();
                 msg.edit({ embeds: [embed], components })
               })
            }
            
            if (interaction.customId == 'gifsc') {
               const push = db3.all().filter(unkoynx7 => unkoynx7.data.status == 'Disponivel')
               
               if (push.length <= 0) return interaction.reply({ content: `Não há nenhuma **Key Funcionando** no momento!`, ephemeral: true })
               
               const pageSize = 10
               let page = 0
               
               const displayPage = () => {
                  const pagestart = page * pageSize
                  const pageend = pagestart + pageSize
                  const pageItems = push.slice(pagestart, pageend)
                  
                  const valores = pageItems.map((entry) => `🏷️ **| ID:** ${entry.ID}\n🪐 **| Status:** ${entry.data.status}\n **📦 | Tipo: **${entry.data.tipo}\n`
                  ).join('\n\n')
                  
                  const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                          .setCustomId('primeiraPagina')
                          .setEmoji('⏮️')
                          .setDisabled(page == 0)
                          .setStyle(2),
                        new ButtonBuilder()
                          .setCustomId('voltar')
                          .setEmoji('⬅️')
                          .setDisabled(page == 0)
                          .setStyle(2),
                        new ButtonBuilder()
                          .setCustomId('gotopage')
                          .setLabel('Go to Page')
                          .setEmoji('📑')
                          .setDisabled(push.length < 10)
                          .setStyle(3),
                        new ButtonBuilder()
                          .setCustomId('proximo')
                          .setEmoji('➡️')
                          .setDisabled(page == Math.ceil(push.length / pageSize) - 1)
                          .setStyle(2),
                        new ButtonBuilder()
                          .setCustomId('ultimaPagina')
                          .setEmoji('⏩')
                          .setDisabled(page == Math.ceil(push.length / pageSize) - 1)
                          .setStyle(2),
                    )
                    
                  const embed = new EmbedBuilder()
                    .setTitle('Keys:')
                    .setDescription(`${valores}`)
                    .setColor(dbcv.get(`color`))
                    .setFooter({ text: `Página ${page + 1}/${Math.ceil(push.length / pageSize)}` })
                    
                  return { embed, components: [row2] }
               }
               
               const { embed, components } = displayPage()
               const msg = await interaction.reply({ embeds: [embed], components, ephemeral: true })
               
               const filter = i => i.user.id === interaction.user.id;
               const collector = msg.createMessageComponentCollector({ filter });
               
               collector.on('collect', async (interaction2) => {
                const { embed, components } = displayPage();
                if (interaction2.customId === "gotopage") {

                  const modal = new ModalBuilder()
                  .setCustomId("gotopagerank")
                  .setTitle("Go To Page")
                
                  const num = new TextInputBuilder()
                  .setCustomId("pagina")
                  .setLabel("Qual vai ser a pagina?")
                  .setStyle(1)
                  .setMaxLength(2)
                  .setRequired(true)
                  .setPlaceholder("Escolha entre 1 a 99")
                  modal.addComponents(new ActionRowBuilder().addComponents(num))
                  await interaction2.showModal(modal)
                }
                client.once('interactionCreate', async (interaction) => {
                if(interaction.isModalSubmit() && interaction.customId === "gotopagerank") {
                  const text = interaction.fields.getTextInputValue('pagina')
                
                  const newPage = parseInt(text)
                  if (!isNaN(newPage) && newPage >= 1 && newPage <= Math.ceil(push.length / pageSize)) {
                    page = newPage - 1;
                    const { embed, components } = displayPage();
                
                    await interaction.update({ embeds: [embed], components });
                  } else {
                    interaction.reply({ content: "Número de página inválido. Certifique-se de inserir um número válido dentro do intervalo.", ephemeral: true });
                  }
                
                } 
                })
                   if (interaction2.customId == 'proximo') {
                     page += 1;
                     msg.edit({ embeds: [embed], components })
                   } else if (interaction2.customId == 'voltar') {
                     page -= 1;
                     msg.edit({ embeds: [embed], components })
                   } else if (interaction2.customId == 'ultimaPagina') {
                     page = Math.ceil(push.length / pageSize) - 1;
                     msg.edit({ embeds: [embed], components })
                   } else if (interaction2.customId == 'primeiraPagina') {
                     page = 0;
                     msg.edit({ embeds: [embed], components })
                   }
                 
               })
            }
            
        })
     })
   }
}