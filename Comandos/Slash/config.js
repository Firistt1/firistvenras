const Discord = require("discord.js")
const fs = require('fs');
const { JsonDatabase, } = require("wio.db");
const emoji = require("../../databases/myJsonEmojis.json");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const db7 = new JsonDatabase({ databasePath:"./databases/myJsonRankProdutos.json" });
const botao = new JsonDatabase({ databasePath:"./databases/myJsonBotao.json" });
const db11 = new JsonDatabase({ databasePath:"./databases/Notificados.json" });

module.exports = {
    name: "config",
    description:"「📦」Configure um produto",
    type:Discord.ApplicationCommandType.ChatInput,
    options: [
      {
        name:"id",
        description:"Qual é o id do produto?",
        type:Discord.ApplicationCommandOptionType.String,
        required: true,
        autocomplete: true,
      }
    ],
    async autocomplete(interaction) {
      const value = interaction.options.getFocused().toLowerCase();
      let choices = db.all().filter(pd => pd.data.idproduto)
  
      const filtered = choices.filter(choice => choice.data.idproduto.toLowerCase().includes(value)).slice(0, 25);
  
      if(!interaction) return;
      if(choices.length === 0){ 
          await interaction.respond([
              { name: "Crie um produto!", value: "a29183912asd92384XASDASDSADASDSADASDASD12398212222" }
          ])
      } else if(filtered.length === 0) {
          await interaction.respond([
              { name: "Não Achei Nenhum produto", value: "a29183912asd92384XASDASDSADASDSADASDASD1239821" }
          ]);
      } else {
          await interaction.respond(
              filtered.map(choice => ({ name: `ID  - ${choice.data.idproduto} | Nome -  ${choice.data.nome}`, value: choice.data.idproduto}))
          );
      }
  },  
    run: async(client,interaction, message, args, ) => {
        if (interaction.user.id !== `${perms.get(`${interaction.user.id}_id`)}`) {
            interaction.reply(`${emoji.nao} | Você não está na lista de pessoas!`)
              .then(replyMessage => {
                setTimeout(() => {
                  replyMessage.delete().catch(console.error);
                }, 5000); 
              });
              return;
          };
          const adb = interaction.options.getString("id");
          
          if(adb === "a29183912asd92384XASDASDSADASDSADASDASD1239821") {
            interaction.reply({
                embeds:[
                    new EmbedBuilder()
                    .setDescription(`❌ | Não Achei Nenhum produto com este nome!`)
                    .setColor("Red")
                ],
                ephemeral:true
            })
            return;
        }
        if(adb === "a29183912asd92384XASDASDSADASDSADASDASD12398212222") {
            interaction.reply({
                embeds:[
                    new EmbedBuilder()
                    .setDescription(`❌ | Você não criou nenhum produto!`)
                    .setColor("Red")
                ],
                ephemeral:true
            })
            return;
        }



          
        function notifyestoque(totalestoque) {
          const allusers = db11.all()
          
          const userencontrados = allusers.filter(data => data.data.produto == adb)
          
          for (const user of userencontrados) {
            const userId = user.ID
            const senduser = interaction.guild.members.cache.get(userId)
            
            if (senduser) {
              const channel = interaction.guild.channels.cache.get(db.get(`${adb}.idcanal`))
              const embedd = new Discord.EmbedBuilder()
               .setTitle(`${client.user.username} - Notificações`)
               .setDescription(`🔔 | O estoque do produto **${adb}**, foi reabastecido com \`${totalestoque}\` itens.\n🛒 | O produto se encontra no canal ${channel || "\`Não encontrado.\`"}`)
               .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
               .setColor(dbcv.get(`color`))
               
              senduser.send({
                embeds: [embedd]
              }).catch(error => console.error('Usuário com dm fechada.'))
              db11.delete(senduser.id)
            }
          }
        }
          
        if(adb !== `${db.get(`${adb}.idproduto`)}`) return interaction.reply(`${emoji.nao} | Esse ID de produto não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
       
        const row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('nomegerenciar')
                .setEmoji(`<:config:1186355632010432532>`)
                .setLabel('Nome')
                .setStyle(3),
        )
        .addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('precogerenciar')
                .setEmoji(`💰`)
                .setLabel('PREÇO')
                .setStyle(3),
        )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('descgerenciar')
                    .setEmoji(`<:W_Edit:1152425555610837043>`)
                    .setLabel('DESCRIÇÃO')
                    .setStyle(3),
            )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('stock')
                    .setEmoji(`📦`)
                    .setLabel('ESTOQUE')
                    .setStyle(3),
            )

            const row2 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setCustomId(`cinfigavancas`)
                .setEmoji(`<:config:1186355632010432532>`)
                .setLabel('Configurações Avançadas')
                .setStyle(1),
            )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('rlgerenciar')
                    .setEmoji(`<a:Carregando:1152425141280710727>`)
                    .setLabel('Atualizar Mensagem')
                    .setStyle(1),
            )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('deletegerenciar')
                    .setEmoji(`<:lixeira:1186387713738412165>`)
                    .setLabel('DELETAR')
                    .setStyle(4),
            )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('infos')
                    .setEmoji(`📝`)
                    
                    .setStyle(1),
            )
           
        
            const msg = await interaction.reply({ embeds: [new Discord.EmbedBuilder()
              .setFooter({text:`${dbcv.get(`title`)} - Todos os direitos reservados.`,iconURL: interaction.client.user.displayAvatarURL({ format: "png" })})
                .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
                .setDescription(`📰 | Descrição: \`\`\`${db.get(`${adb}.desc`)}\`\`\`\n🔍 | Id:\`\`${adb}\`\`\n🏷️ | Nome: ${db.get(`${adb}.nome`)}\n💸 | Preço: ${db.get(`${adb}.preco`)}\n📦 | Estoque quantidade: ${db.get(`${adb}.conta`).length}`)
                .setImage(db.get(`${adb}.banner`))
                .setColor(dbcv.get(`color`))], components: [row, row2]})
                

            const interação = msg.createMessageComponentCollector({
               componentType: Discord.ComponentType.Button,
            })
  
            interação.on("collect", async (interaction) => {
               if (interaction.user.id != interaction.user.id) {
               return;
            }
             
            const eprodnome = db.get(`${adb}.nome`)
const adad = db7.get(`${eprodnome}.vendasfeitas`) || 0;
const adsda = db7.get(`${eprodnome}.valoresganhos`) || 0;

if (interaction.customId === "infos") {
  const embed34 = new Discord.EmbedBuilder()
      .setTitle(`${dbcv.get(`title`)} | Estatísticas do Produto ${adb}`)
      .setDescription(`**📝 | Id Produto: \`\`${adb}\`\`\n💰 | Rendeu: \`\`R$${adsda.toFixed(2)}\`\`\n📦 | Total de Vendas: \`\`${adad}\`\`**`)
      .setColor(dbcv.get(`color`));

  interaction.reply({ embeds: [embed34], ephemeral: true })
      .catch(error => console.error('Erro ao responder à interação:', error));
}

                
                if (interaction.customId === "deletegerenciar") {
                  const modsl = new Discord.ModalBuilder()
                   .setCustomId(`${adb}_modaldel`)
                   .setTitle('Deletar Produto')
                   
                  const pergunta = new Discord.TextInputBuilder()
                   .setCustomId('sla')
                   .setLabel('DESEJA MESMO DELETAR?')
                   .setPlaceholder('SIM')
                   .setRequired(true)
                   .setStyle(1)
                   
                  modsl.addComponents(new Discord.ActionRowBuilder().addComponents(pergunta))
                  
                  interaction.showModal(modsl);
                }
                
                if (interaction.customId == 'cupomonoff') {
                  interaction.deferUpdate()
                  const chech = db.get(`${adb}.cupom`) || "ON"
                  
                  if (chech == 'ON') {
                    db.set(`${adb}.cupom`, `OFF`)
                  } else if (chech == 'OFF') {
                    db.set(`${adb}.cupom`, `ON`)
                  }
                  
                  pembdd()
                  
                  function pembdd() {
                    const embed232 = new Discord.EmbedBuilder()
                     .setFooter({text:`${dbcv.get(`title`)} - Todos os direitos reservados.`, iconURL: interaction.client.user.displayAvatarURL({ format: "png" })})
                     .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
                     .setDescription(`**🔍 | Id: \`\`${adb}\`\`\n\n🖼️ | Banner: [Banner](${db.get(`${adb}.banner`)})\n🖼️ | Miniatura: [Miniatura](${db.get(`${adb}.foto`)})\n🎃 | Mínimo: ${db.get(`${adb}.minimo`) || "1"}\n👤 | Cargo: <@&${db.get(`${adb}.rolex`)}>**\n🛒 | Categoria: ${interaction.guild.channels.cache.get(db.get(`${adb}.categoria`)) || "\`Categoria padrão\`"}\n🏷️ | Cupom: ${db.get(`${adb}.cupom`)}`)
                .setImage(db.get(`${adb}.banner`))
                .setColor(dbcv.get(`color`))
                       msg.edit({ embeds: [embed232] })
                  }
                }
                
                if (interaction.customId === 'rlgerenciar') {
                  //  interaction.deferUpdate();
                     const embed232 = new Discord.EmbedBuilder()
                     .setFooter({text:`${dbcv.get(`title`)} - Todos os direitos reservados.`, iconURL: interaction.client.user.displayAvatarURL({ format: "png" })})
                     .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
                     .setDescription(`📰 | Descrição: \`\`\`${db.get(`${adb}.desc`)}\`\`\`\n🔍 | Id:\`\`${adb}\`\`\n🏷️ | Nome: ${db.get(`${adb}.nome`)}\n💸 | Preço: ${db.get(`${adb}.preco`)}\n📦 | Estoque quantidade: ${db.get(`${adb}.conta`).length}`)
                .setImage(db.get(`${adb}.banner`))
                .setColor(dbcv.get(`color`))
                       msg.edit({ embeds: [embed232] })
                       
                     
                       const embed22 = new Discord.EmbedBuilder()
                       .setColor(dbcv.get(`color`))
                       .setThumbnail(db.get(`${adb}.foto`))
                       .setDescription(`\`\`\`${db.get(`${adb}.desc`)}\`\`\`\n **🪐 | Produto: ${db.get(`${adb}.nome`)}**\n **💸 | Preço: __R$${db.get(`${adb}.preco`,).toLocaleString()}__**\n **📦 | Estoque: __${db.get(`${adb}.conta`).length}__**`)
                       .setImage(db.get(`${adb}.banner`));
                                            
                     const channel = interaction.guild.channels.cache.get(db.get(`${adb}.idcanal`));
                     
                     channel.messages.fetch(db.get(`${adb}.idmsg`))
                       .then((message) => {
                         message.edit({ embeds: [embed22] });
                       });
                     
                     interaction.reply({ content: `✅ Mensagem Atualizada!`, ephemeral: true });

                      }

                

                      if (interaction.customId === "precogerenciar") {
                        const modal = new Discord.ModalBuilder()
                        .setTitle("Alterar Preço")
                        .setCustomId("precogerenciar_modal");
                        const text = new Discord.TextInputBuilder()
                        .setCustomId("text")
                        .setLabel(`⚙ | Qual o novo preço?`)
                        .setStyle(1)
                        .setRequired(true);
      
                        modal.addComponents(new Discord.ActionRowBuilder().addComponents(text))
                        await interaction.showModal(modal)

                }
                if (interaction.customId === "nomegerenciar") {
                  const modal = new Discord.ModalBuilder()
                    .setTitle("Alterar Nome")
                    .setCustomId("nomegerenciar_modal");
                  const text = new Discord.TextInputBuilder()
                    .setCustomId("text")
                    .setLabel(`⚙ | Qual o novo nome?`)
                    .setStyle(1)
                    .setRequired(true);
                
                  modal.addComponents(new Discord.ActionRowBuilder().addComponents(text));
                  await interaction.showModal(modal);
                }
                
                client.on("interactionCreate", async (interaction) => {
                  if (interaction.isModalSubmit() && interaction.customId === "nomegerenciar_modal") {
                    const novoNome = interaction.fields.getTextInputValue("text");
                
                    db.set(`${adb}.nome`, novoNome);
                    interaction.reply({ content: `✅ | Alterado!`, ephemeral: true });
                
                    const embed232 = new Discord.EmbedBuilder()
                      .setFooter({ text: `${dbcv.get(`title`)} - Todos os direitos reservados.`, iconURL: interaction.client.user.displayAvatarURL({ format: "png" }) })
                      .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
                      .setDescription(`📰 | Descrição: \`\`\`${db.get(`${adb}.desc`)}\`\`\`\n️🔍 | Id:\`\`${adb}\`\`\n🪐 | Nome: ${novoNome}\n💸 | Preço: ${db.get(`${adb}.preco`)}\n📦 | Estoque quantidade: ${db.get(`${adb}.conta`).length}`)
                      .setImage(db.get(`${adb}.banner`))
                      .setColor(dbcv.get(`color`));
                
                    // Editar a mensagem com o novo embed
                    const channel = interaction.guild.channels.cache.get(db.get(`${adb}.idcanal`));
                    const message = await channel.messages.fetch(db.get(`${adb}.idmsg`));
                    await message.edit({ embeds: [embed232] });
                  }  
                  if(interaction.isModalSubmit() && interaction.customId === "precogerenciar_modal") {
                    
                                const userInput = Number(interaction.fields.getTextInputValue("text").replace(",", "."));
                    
                                if (isNaN(userInput)) {
                                    interaction.reply({content:`${emoji.alerta} | Por favor, digite apenas números.`, ephemeral:true})
                                } else {
                                    db.set(`${adb}.preco`, userInput);
                                    interaction.reply({content:`✅ | Alterado!`, ephemeral:true})
                                    const embed232 = new Discord.EmbedBuilder()
                                    .setFooter({text:`${dbcv.get(`title`)} - Todos os direitos reservados.`, iconURL: interaction.client.user.displayAvatarURL({ format: "png" })})
                                    .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
                                    .setDescription(`📰 | Descrição: \`\`\`${db.get(`${adb}.desc`)}\`\`\`\n🔍 | Id:\`\`${adb}\`\`\n🏷️ | Nome: ${db.get(`${adb}.nome`)}\n💸 | Preço: ${db.get(`${adb}.preco`)}\n📦 | Estoque quantidade: ${db.get(`${adb}.conta`).length}`)
                               .setImage(db.get(`${adb}.banner`))
                               .setColor(dbcv.get(`color`))
                                      msg.edit({ embeds: [embed232] })
                                }                                                 

                            
                  }
                })
    if (interaction.customId === 'descgerenciar') {
        interaction.deferUpdate();
                    interaction.channel.send(`${emoji.carregando} | Qual a nova descrição?`).then(msg12 => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = msg12.channel.createMessageCollector({ filter, max: 1 });
                        collector.on("collect", message => {
                            message.delete()
                            db.set(`${adb}.desc`, `${message.content}`)
                            msg12.edit(`✅ | Alterado!`).then((editedMessage) => {
                                setTimeout(() => {
                                  editedMessage.delete().catch(console.error);
                                }, 5000); 
                              });

                              const embed232 = new Discord.EmbedBuilder()
                              .setFooter({text:`${dbcv.get(`title`)} - Todos os direitos reservados.`, iconURL: interaction.client.user.displayAvatarURL({ format: "png" })})
                              .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
                              .setDescription(`📰 | Descrição: \`\`\`${db.get(`${adb}.desc`)}\`\`\`\n🔍 | Id:\`\`${adb}\`\`\n🪐 | Nome: ${db.get(`${adb}.nome`)}\n💸 | Preço: ${db.get(`${adb}.preco`)}\n📦 | Estoque quantidade: ${db.get(`${adb}.conta`).length}`)
                         .setImage(db.get(`${adb}.banner`))
                         .setColor(dbcv.get(`color`))
                                msg.edit({ embeds: [embed232] })
                              
                        })
                    })
                }


                const rowconsfi = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('bangerenciar')
                        .setEmoji(`🖼️`)
                        .setLabel('Banner')
                        .setStyle(1),
                )
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('fotogerenciar')
                        .setEmoji(`🖼️`)
                        .setLabel('Miniatura')
                        .setStyle(1),
                )
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('rolexgerenciar')
                        .setEmoji(`👤`)
                        .setLabel('Cargo')
                        .setStyle(1),
                )
                .addComponents(
                   new Discord.ButtonBuilder()
                       .setCustomId('altmin')
                       .setLabel('Alterar Mínimo')
                       .setEmoji('🎃')
                       .setStyle(1),
                )
                .addComponents(
                   new Discord.ButtonBuilder()
                       .setCustomId('altcategoriau')
                       .setLabel('Definir Categoria')
                       .setEmoji('🛒')
                       .setStyle(1),
                )
                
                const rowconsfi2 = new Discord.ActionRowBuilder()
                .addComponents(
                  new Discord.ButtonBuilder()
                      .setCustomId('cupomonoff')
                      .setLabel('Cupom ON/OFF')
                      .setEmoji('🏷️')
                      .setStyle(1),
               )
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('voltar9218439')
                         .setEmoji('⬅️')
                        .setLabel('Voltar')
                          .setStyle(1),
              );
              
                if (interaction.customId === "cinfigavancas") {
                  interaction.deferUpdate()
                    const embedocngiasd = new Discord.EmbedBuilder()
           .setTitle(`${dbcv.get(`title`)} | Outras Configurações`)
           .setDescription(`**🔍 | Id: \`\`${adb}\`\`\n\n🖼️ | Banner: [Banner](${db.get(`${adb}.banner`)})\n🖼️ | Miniatura: [Miniatura](${db.get(`${adb}.foto`)})\n🎃 | Mínimo: ${db.get(`${adb}.minimo`) || "1"}\n👤 | Cargo: <@&${db.get(`${adb}.rolex`)}>**\n🛒 | Categoria: ${interaction.guild.channels.cache.get(db.get(`${adb}.categoria`)) || "\`Categoria padrão\`"}\n🏷️ | Cupom: ${db.get(`${adb}.cupom`)}`)
           .setColor(dbcv.get(`color`))
           msg.edit({ embeds: [embedocngiasd], components: [rowconsfi, rowconsfi2] })
                }
                const rowsla = new Discord.ActionRowBuilder()
                 .addComponents(
                   new Discord.ButtonBuilder()
                    .setCustomId(`canvela`)
                    .setLabel('Cancelar')
                    .setStyle(4)
                 )
                 
                if (interaction.customId == 'altcategoriau') {
                  interaction.deferUpdate()
                  const rowca = new Discord.ActionRowBuilder()
                   .addComponents(
                      new Discord.ChannelSelectMenuBuilder()
                       .setCustomId(`${adb}_altcategoriaa`)
                       .setPlaceholder('Menu Categorias')
                       .setChannelTypes(Discord.ChannelType.GuildCategory)
                       .setMinValues(1)
                       .setMaxValues(1)
                   )
                   
                   const embedd = new Discord.EmbedBuilder()
                    .setTitle('Nova Categoria')
                    .setDescription(`Selecione a nova categoria no menu abaixo!`)
                    .setColor(dbcv.get(`color`))
                    
                   interaction.message.edit({ embeds: [embedd], components: [rowca, rowsla] })
                }
                
                if (interaction.customId == 'canvela') {
                  interaction.deferUpdate()
                  const embedocngiasd = new Discord.EmbedBuilder()
           .setTitle(`${dbcv.get(`title`)} | Outras Configurações`)
           .setDescription(`**🔍 | Id: \`\`${adb}\`\`\n\n🖼️ | Banner: [Banner](${db.get(`${adb}.banner`)})\n🖼️ | Miniatura: [Miniatura](${db.get(`${adb}.foto`)})\n🎃 | Mínimo: ${db.get(`${adb}.minimo`) || "1"}\n👤 | Cargo: <@&${db.get(`${adb}.rolex`)}>**\n🛒 | Categoria: ${interaction.guild.channels.cache.get(db.get(`${adb}.categoria`)) || "\`Categoria padrão\`"}`)
           .setColor(dbcv.get(`color`))
           msg.edit({ embeds: [embedocngiasd], components: [rowconsfi, rowconsfi2] })
                }
                
                if (interaction.customId == 'altmin') {
                  interaction.deferUpdate();
                  interaction.channel.send(`${emoji.carregando} | Qual o novo mínimo para comprar?`).then(msg => {
                    const filter = m => m.author.id === interaction.user.id;
                         const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                    collector.on("collect", message => {
                        message.delete()
                        
                        if (isNaN(message.content) == true) return msg.delete()
                        
                        db.set(`${adb}.minimo`, message.content)
                        const embe77 = new Discord.EmbedBuilder()
                        .setTitle(`${dbcv.get(`title`)} | Outras Configurações`)
                        .setDescription(`**🔍 | Id: \`\`${adb}\`\`\n\n🖼️ | Banner: [Banner](${db.get(`${adb}.banner`)})\n🖼️ | Miniatura: [Miniatura](${db.get(`${adb}.foto`)})\n🎃 | Mínimo: ${db.get(`${adb}.minimo`) || "1"}\n👤 | Cargo: <@&${db.get(`${adb}.rolex`)}>**`)
                        .setColor(dbcv.get(`color`));
                             interaction.message.edit({ embeds: [embe77] });
                             msg.edit(`✅ | Setado!`).then((editedMessage) => {
                                setTimeout(() => {
                                  editedMessage.delete().catch(console.error);
                                }, 5000); 
                              });
                    })
                  })
                }
                
                if (interaction.customId === "bangerenciar") {
                    interaction.deferUpdate();
                     interaction.channel.send(`${emoji.carregando} | Qual o novo banner do produto?`).then(msg => {
                         const filter = m => m.author.id === interaction.user.id;
                         const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                         collector.on("collect", message => {
                             message.delete()
                             db.set(`${adb}.banner`, message.content)
                             
                             const embe77 = new Discord.EmbedBuilder()
                        .setTitle(`${dbcv.get(`title`)} | Outras Configurações`)
                        .setDescription(`**🔍 | Id: \`\`${adb}\`\`\n\n🖼️ | Banner: [Banner](${db.get(`${adb}.banner`)})\n🖼️ | Miniatura: [Miniatura](${db.get(`${adb}.foto`)})\n🎃 | Mínimo: ${db.get(`${adb}.minimo`) || "1"}\n👤 | Cargo: <@&${db.get(`${adb}.rolex`)}>**`)
                        .setColor(dbcv.get(`color`));
                             interaction.message.edit({ embeds: [embe77] });
                             msg.edit(`✅ | Setado!`).then((editedMessage) => {
                                setTimeout(() => {
                                  editedMessage.delete().catch(console.error);
                                }, 5000); 
                              });
                              

                            
    
                         })
                     })
                 }
                 
                 if (interaction.customId === "fotogerenciar") {
                    interaction.deferUpdate();
                     interaction.channel.send(`${emoji.carregando} | Qual a nova miniatura do produto?`).then(msg => {
                         const filter = m => m.author.id === interaction.user.id;
                         const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                         collector.on("collect", message => {
                             message.delete()
                             db.set(`${adb}.foto`, message.content)

                             const embe78 = new Discord.EmbedBuilder()
                             .setTitle(`${dbcv.get(`title`)} | Outras Configurações`)
                             .setDescription(`**🔍 | Id: \`\`${adb}\`\`\n\n🖼️ | Banner: [Banner](${db.get(`${adb}.banner`)})\n🖼️ | Miniatura: [Miniatura](${db.get(`${adb}.foto`)})\n🎃 | Mínimo: ${db.get(`${adb}.minimo`) || "1"}\n👤 | Cargo: <@&${db.get(`${adb}.rolex`)}>**`)
                             .setColor(dbcv.get(`color`));
                                  interaction.message.edit({ embeds: [embe78] });
                             msg.edit(`✅ | Setado!`).then((editedMessage) => {
                                setTimeout(() => {
                                  editedMessage.delete().catch(console.error);
                                }, 5000); 
                              });
                              

                            
    
                         })
                     })
                 }
                 if (interaction.customId === "rolexgerenciar") {
                    interaction.deferUpdate();
                     interaction.channel.send(`${emoji.carregando} | Qual o cargo do produto?`).then(msg => {
                         const filter = m => m.author.id === interaction.user.id;
                         const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                         collector.on("collect", message => {
                             message.delete()
                             db.set(`${adb}.rolex`, message.content)

                             const embed2 = new Discord.EmbedBuilder()
                        .setTitle(`${dbcv.get(`title`)} | Outras Configurações`)
                        .setDescription(`**🔍 | Id: \`\`${adb}\`\`\n\n🖼️ | Banner: [Banner](${db.get(`${adb}.banner`)})\n🖼️ | Miniatura: [Miniatura](${db.get(`${adb}.foto`)})\n🎃 | Mínimo: ${db.get(`${adb}.minimo`) || "1"}\n👤 | Cargo: <@&${db.get(`${adb}.rolex`)}>**`)
                        .setColor(dbcv.get(`color`));
                             interaction.message.edit({ embeds: [embed2] });  
                             msg.edit(`✅ | Setado!`).then((editedMessage) => {
                                setTimeout(() => {
                                  editedMessage.delete().catch(console.error);
                                }, 5000); 
                              });
                              

             
                         })
                     })
                 }

                 

                 if (interaction.customId === "voltar9218439") {
                    interaction.deferUpdate();
                    const asdadasd = new Discord.EmbedBuilder()
                    .setFooter({text:`${dbcv.get(`title`)} - Todos os direitos reservados.`, iconURL: interaction.client.user.displayAvatarURL({ format: "png" })})
                        .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
                        .setDescription(`📰 | Descrição: \`\`\`${db.get(`${adb}.desc`)}\`\`\`\n🔍 | Id:\`\`${adb}\`\`\n🪐 | Nome: ${db.get(`${adb}.nome`)}\n💸 | Preço: ${db.get(`${adb}.preco`)}\n📦 | Estoque quantidade: ${db.get(`${adb}.conta`).length}`)
                        .setImage(db.get(`${adb}.banner`))
                        .setColor(dbcv.get(`color`))
                       msg.edit({ embeds: [asdadasd], components: [row, row2] }) 
                 } 

               const rowstock = new Discord.ActionRowBuilder()
               .addComponents(
                new Discord.ButtonBuilder()
                  .setCustomId('addestoque')
                  .setEmoji(`<:G_Mais:1152425159630798949>`)
                  .setLabel('ADICIONAR')
                  .setStyle(3),
              )
              .addComponents(
                new Discord.ButtonBuilder()
                  .setCustomId('remestoque')
                  .setEmoji(`<:V_Menos:1152425151003099137>`)
                  .setLabel('REMOVER')
                  .setStyle(4),
              )
              .addComponents(
                new Discord.ButtonBuilder()
                  .setCustomId('bckestoque')
                  .setEmoji(`💾`)
                  .setLabel('BACKUP')
                  .setStyle(1),
              )
              .addComponents(
                new Discord.ButtonBuilder()
                  .setCustomId('clestoque')
                  .setEmoji(`<:lixeira:1186387713738412165>`)
                  .setLabel('LIMPAR')
                  .setStyle(4),
              );

              const rowstock2 = new Discord.ActionRowBuilder()
              .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('rlgerenciar22')
                    .setEmoji(`<a:Carregando:1152425141280710727>`)
                    .setLabel('Atualizar Mensagem')
                    .setStyle(1),
            )
              .addComponents(
                new Discord.ButtonBuilder()
                  .setCustomId('voltar')
                  .setEmoji('⬅️')
                  .setLabel('Voltar')
                  .setStyle(1),
              );

              if (interaction.customId === 'rlgerenciar22') {
                //interaction.deferUpdate();
                          var contas = `${db.get(`${adb}.conta`)}`.split(',');
                          const maxItems = 25;
                          const limitedContas = contas.slice(0, maxItems); 
                          const backupItems = limitedContas.map((item, index) => `**📦 | ${index + 0}º** - ${item}`); 
                          const embed = new Discord.EmbedBuilder()
                              .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
                              .setDescription(`**Este é seu estoque:**\n\n${backupItems.join('\n')}`) 
                 .setColor(dbcv.get(`color`))
                 .setFooter({text:`Seu estoque completo é este.`})
                 msg.edit({ embeds: [embed]})
                 
                
                       const embed22 = new Discord.EmbedBuilder()
                       .setColor(dbcv.get(`color`))
                       .setThumbnail(db.get(`${adb}.foto`))
                       .setDescription(`\`\`\`${db.get(`${adb}.desc`)}\`\`\`\n **🪐 | Produto: ${db.get(`${adb}.nome`)}**\n **💸 | Preço: __R$${db.get(`${adb}.preco`,).toLocaleString()}__**\n **📦 | Estoque: __${db.get(`${adb}.conta`).length}__**`)
                       .setImage(db.get(`${adb}.banner`))
                       
                       const channel = interaction.guild.channels.cache.get(db.get(`${adb}.idcanal`))
                       
                       channel.messages.fetch(db.get(`${adb}.idmsg`))
                       .then((message) => {
                          message.edit({ embeds: [embed22] })
                       })
                       
                       interaction.reply({ content: `✅ Mensagem Atualizada!`, ephemeral: true })
                   
                     //   interaction.reply({ content: `:x: Mensagem Inexistente!!`, ephemeral: true )}
                       
                        }

                        if (interaction.customId === "stock") {
                          interaction.deferUpdate();
                          
                          var contas = db.get(`${adb}.conta`) || [];  
                          
                          if (contas.length === 0) {
                            
                              const embed = new Discord.EmbedBuilder()
                                  .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
                                  .setDescription("**Sem Estoque**")
                                  .setColor(dbcv.get(`color`))
                                  .setFooter({text: "Seu estoque está vazio."});
                              
                              msg.edit({ embeds: [embed], components: [rowstock, rowstock2] });
                          } else {
                            
                              const maxItems = 25;
                              const limitedContas = contas.slice(0, maxItems);
                              
                              const backupItems = limitedContas.map((item, index) => `**📦 | ${index}º** - ${item}`);
                              const embed = new Discord.EmbedBuilder()
                                  .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
                                  .setDescription(`**Este é seu estoque:**\n\n${backupItems.join('\n')}`)
                                  .setColor(dbcv.get(`color`))
                                  .setFooter({text: "Seu estoque completo é este."});
                              
                              msg.edit({ embeds: [embed], components: [rowstock, rowstock2] });
                          }
                      }
                      
                      
                      
                      
                      
              

              const rowstocaddk = new Discord.ActionRowBuilder()
              .addComponents(
               new Discord.ButtonBuilder()
                 .setCustomId('linha')
                 .setEmoji(`<:W_Edit:1152425555610837043>`)
                 .setLabel('ADICIONAR POR LINHA')
                 .setStyle(3),
             )
             .addComponents(
               new Discord.ButtonBuilder()
                 .setCustomId('umpo')
                 .setEmoji(`<a:R_Feliz:1152425125413654628>`)
                 .setLabel('ADICIONAR POR VEZ')
                 .setStyle(1),
             )
             .addComponents(
                new Discord.ButtonBuilder()
                  .setCustomId('voltar1')
                  .setEmoji('⬅️')
                  .setLabel('Voltar')
                  .setStyle(2),
              );

              if (interaction.customId === "addestoque") {
                interaction.deferUpdate();
                const embedadds = new Discord.EmbedBuilder()
                 .setDescription(`🔍 | Você deseja adicionar diversos produtos de uma vez ou enviar um por um?`)
                 .setColor(dbcv.get(`color`))
                msg.edit({ embeds: [embedadds], components: [rowstocaddk] })
           }

           if (interaction.customId === "linha") {
            interaction.deferUpdate();
            let quantity = 0
            const embede = new Discord.EmbedBuilder()
              .setDescription(`Envie o produto de um em um, quando terminar de enviar digite: "fim"`)
              .setColor(dbcv.get(`color`));
            msg.edit({ embeds: [embede], components: [] }).then(msg => {
              const filter = m => m.author.id === interaction.user.id;
              const collector = msg.channel.createMessageCollector({ filter });
              let finalizarMessage = null;
          
              collector.on("collect", message => {
                if (finalizarMessage) {
                  finalizarMessage.delete().catch(console.error);
                }
          
                if (message.content === "fim") {
                //  interaction.deferUpdate();
                  collector.stop();
                  var contas = db.get(`${adb}.conta`) || [];  
                          
                          if (contas.length === 0) {
                            
                              const embed = new Discord.EmbedBuilder()
                                  .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
                                  .setDescription("**Sem Estoque**")
                                  .setColor(dbcv.get(`color`))
                                  .setFooter({text: "Seu estoque está vazio."});
                              
                              msg.edit({ embeds: [embed], components: [rowstock, rowstock2] });
                          } else {
                            
                              const maxItems = 25;
                              const limitedContas = contas.slice(0, maxItems);
                              
                              const backupItems = limitedContas.map((item, index) => `**📦 | ${index}º** - ${item}`);
                              const embed = new Discord.EmbedBuilder()
                                  .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
                                  .setDescription(`**Este é seu estoque:**\n\n${backupItems.join('\n')}`)
                                  .setColor(dbcv.get(`color`))
                                  .setFooter({text: "Seu estoque completo é este."});
                              
                              msg.edit({ embeds: [embed], components: [rowstock, rowstock2] });
                          }
                  if (quantity != 0) {
                    notifyestoque(quantity)
                  }
                } else {
                  message.delete();
                  quantity++
                  db.push(`${adb}.conta`, `${message.content}`);
                }
          
                setTimeout(() => {
                  if (finalizarMessage) {
                    finalizarMessage.delete().catch(console.error);
                  }
                }, 5000);
                
                finalizarMessage = message;
              });
            });
        }

           if (interaction.customId === "umpo") {
            interaction.deferUpdate();
            interaction.channel.send(`${emoji.carregando} | Envie os novos produtos no chat!`).then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter })
             collector.on("collect", message => {
                const content = message.content.split('\n');
                const contasnb = message.content.split('\n').length;
                var contas = content;
                var etapa = 0;
                var etapaf = contasnb;
                collector.stop();
                message.delete()
                const timer = setInterval(async function() {
                if(etapa === etapaf) {
                    notifyestoque(etapaf)
                    msg.edit(`✅ | Foram adicionados \`${etapaf}\`\ Produtos`).then((editedMessage) => {
                        setTimeout(() => {
                          editedMessage.delete().catch(console.error);
                        }, 5000); 
                      });
                 clearInterval(timer)
                 return;
                }
                const enviando = contas[etapa];
                db.push(`${adb}.conta`, `${enviando}`)
                etapa = etapa + 1
              }, 100)   
           })
         })
       }


           if (interaction.customId === "voltar1") {
            interaction.deferUpdate();
            var contas = db.get(`${adb}.conta`) || [];  
                          
                          if (contas.length === 0) {
                            
                              const embed = new Discord.EmbedBuilder()
                                  .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
                                  .setDescription("**Sem Estoque**")
                                  .setColor(dbcv.get(`color`))
                                  .setFooter({text: "Seu estoque está vazio."});
                              
                              msg.edit({ embeds: [embed], components: [rowstock, rowstock2] });
                          } else {
                            
                              const maxItems = 25;
                              const limitedContas = contas.slice(0, maxItems);
                              
                              const backupItems = limitedContas.map((item, index) => `**📦 | ${index}º** - ${item}`);
                              const embed = new Discord.EmbedBuilder()
                                  .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
                                  .setDescription(`**Este é seu estoque:**\n\n${backupItems.join('\n')}`)
                                  .setColor(dbcv.get(`color`))
                                  .setFooter({text: "Seu estoque completo é este."});
                              
                              msg.edit({ embeds: [embed], components: [rowstock, rowstock2] });
                          }
       }

       if (interaction.customId === "remestoque") {
        interaction.deferUpdate();
        interaction.channel.send(`${emoji.carregando} | Envie a linha do produto que você quer remover!`).then(msg1 => {
            const filter = m => m.author.id === interaction.user.id;
            const collector = msg1.channel.createMessageCollector({ filter, max: 1 })
            collector.on("collect", message1 => {
                const a = db.get(`${adb}.conta`);
                const removedItem = a.splice(message1.content, 1)[0]; 
                db.set(`${adb}.conta`, a);
                message1.delete();
                msg1.edit(`✅ | O Produto número \`${removedItem}\` foi removido com sucesso!`).then((editedMessage) => {
                    setTimeout(() => {
                        editedMessage.delete().catch(console.error);
                    }, 5000); 
    
                    var contas = db.get(`${adb}.conta`) || [];  
                          
                          if (contas.length === 0) {
                            
                              const embed = new Discord.EmbedBuilder()
                                  .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
                                  .setDescription("**Sem Estoque**")
                                  .setColor(dbcv.get(`color`))
                                  .setFooter({text: "Seu estoque está vazio."});
                              
                              msg.edit({ embeds: [embed], components: [rowstock, rowstock2] });
                          } else {
                            
                              const maxItems = 25;
                              const limitedContas = contas.slice(0, maxItems);
                              
                              const backupItems = limitedContas.map((item, index) => `**📦 | ${index}º** - ${item}`);
                              const embed = new Discord.EmbedBuilder()
                                  .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
                                  .setDescription(`**Este é seu estoque:**\n\n${backupItems.join('\n')}`)
                                  .setColor(dbcv.get(`color`))
                                  .setFooter({text: "Seu estoque completo é este."});
                              
                              msg.edit({ embeds: [embed], components: [rowstock, rowstock2] });
                          }


                          
                    
                    const embed22 = new Discord.EmbedBuilder()
                        .setColor(dbcv.get(`color`))
                        .setThumbnail(db.get(`${adb}.foto`))
                        .setDescription(`\`\`\`${db.get(`${adb}.desc`)}\`\`\`\n **🪐 | Produto: ${db.get(`${adb}.nome`)}**\n **💸 | Preço: __R$${db.get(`${adb}.preco`,).toLocaleString()}__**\n **📦 | Estoque: __${db.get(`${adb}.conta`).length}__**`)
                        .setImage(db.get(`${adb}.banner`));
    
                    const channel = interaction.guild.channels.cache.get(db.get(`${adb}.idcanal`));
    
                    channel.messages.fetch(db.get(`${adb}.idmsg`))
                        .then((message) => {
                            message.edit({ embeds: [embed22] });
                        })
                        .catch(err => {
                            console.error("Erro ao editar a mensagem incorporada:", err);
                        });
                });
            });
        });
    }    

           if (interaction.customId === 'clestoque') {
             const modsl = new Discord.ModalBuilder()
                 .setCustomId(`${adb}_modallimpars`)
                 .setTitle('Limpar Estoque')
                   
             const pergunta = new Discord.TextInputBuilder()
                 .setCustomId('sla')
                 .setLabel('DESEJA MESMO LIMPAR?')
                 .setPlaceholder('SIM')
                 .setRequired(true)
                 .setStyle(1)
                   
             modsl.addComponents(new Discord.ActionRowBuilder().addComponents(pergunta))
                  
             interaction.showModal(modsl);
           }
           if (interaction.customId === 'bckestoque') {
            interaction.deferUpdate();
            var contas = `${db.get(`${adb}.conta`)}`.split(',');
        
            const backupItems = contas.map((item, index) => `📦 | ${index + 1}º - ${item}`);
            var backup = `Este é seu estoque:\n\n${backupItems.join('\n')}`; 
        
            fs.writeFile('estoque.txt', backup, (err) => {
                if (err) throw err;
        
                
                interaction.user.send({
                    files: [{
                        attachment: 'estoque.txt',
                        name: 'estoque.txt'
                    }]
                }).then(() => {
                  
                    fs.unlink('estoque.txt', (err) => {
                        if (err) throw err;
                        console.log('Arquivo temporário deletado!');
                    });
                }).catch(err => {
                    console.error('Erro ao enviar o arquivo:', err);
                });
            });
        }
                       
           if (interaction.customId === 'rlestoque') {
               interaction.deferUpdate();
                const embed = new Discord.EmbedBuilder()
                  .setTitle(`${dbcv.get(`title`)} | Gerenciando o(a) ${adb}`)
                  .setDescription(`<:config:1186355632010432532> | Gerenciando o estoque do produto: ${db.get(`${adb}.nome`)}\n📦 | Total Estoque: ${db.get(`${adb}.conta`).length}`)
                  .setColor(dbcv.get(`color`))
                  msg.edit({ embeds: [embed] })
                  interaction.channel.send(`✅ | Atualizado!`).then((message) => {
                    setTimeout(() => {
                      message.delete().catch(console.error);
                    }, 5000); 
                  });
                  
                       }

                       if (interaction.customId === "voltar") {
                        interaction.deferUpdate();
                        const embedvoltar = new Discord.EmbedBuilder()
                           .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
                           .setFooter({text:`${dbcv.get(`title`)} - Todos os direitos reservados.`, iconURL: interaction.client.user.displayAvatarURL({ format: "png" })})
                           .setDescription(`📰 | Descrição: \`\`\`${db.get(`${adb}.desc`)}\`\`\`\n🔍 | Id:\`\`${adb}\`\`\n🪐 | Nome: ${db.get(`${adb}.nome`)}\n💸 | Preço: ${db.get(`${adb}.preco`)}\n📦 | Estoque quantidade: ${db.get(`${adb}.conta`).length}`)
                           .setImage(db.get(`${adb}.banner`))
                           .setColor(dbcv.get(`color`)) 
                           msg.edit({ embeds: [embedvoltar], components: [row, row2]})
                     } 

            })

            }
            }
            
        