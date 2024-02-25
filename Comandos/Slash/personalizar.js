const { ApplicationCommandType, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ComponentType } = require("discord.js");
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath: "./databases/personalizar.json" });
const emoji = require("../../databases/myJsonEmojis.json");
const dbe = new JsonDatabase({ databasePath: "./databases/myJsonEmojis.json" });

module.exports = {
  name: "personalizar",
  description: "[🛠|💰 Vendas Moderação] Personalize a embed",
  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction) => {

    const initialEmbed = new EmbedBuilder()
      .setTitle(`${interaction.guild.name} | Personalizar`)
      .setFooter({ text: `${interaction.guild.name} - Todos os direitos reservados.` });

    const initialButtons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("personalizarmensagem")
          .setLabel("Mensagem de Compra")
          .setStyle(2)
          .setEmoji(`👨‍🏭`),
        new ButtonBuilder()
          .setCustomId("personalizaremoji")
          .setLabel("Personalizar Emojis")
          .setDisabled(false)
          .setStyle(2)
          .setEmoji(`🔍`)
      );

    const msg = await interaction.reply({
      embeds: [initialEmbed],
      components: [initialButtons],
    });

    const user = interaction.user
    const interação = msg.createMessageComponentCollector({ componentType: ComponentType.Button, });
      interação.on("collect", async (interaction) => {
        if (user.id !== interaction.user.id) {
            return interaction.reply({
              content: `${emoji.interrogacao} | Oops... Parece que você não foi o autor deste comando, ${interaction.user}. Utilize **/personalizar** para ver os comandos disponíveis!`,
              ephemeral: true
            });
          }
       if(interaction.customId === "personalizarmensagem") {
        interaction.update({
            embeds:[
                new EmbedBuilder()
                .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                .setFooter({text:"Escolha oque você deseja mudar:"})
                .setDescription(`**Titulo atual:** \`${db.get(`titulo`)}\` \n\n**Descrição Atual:** ${db.get(`desc`)} \n\n **Rodapé Atual:** \`${db.get(`rodape`) === "remover" ? "Sem rodapé" : db.get(`rodape`)}\``)
            ],
            components:[
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel("Titulo da embed")
                    .setStyle(2)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("tituloembed"),
                    new ButtonBuilder()
                    .setLabel("Descrição da embed")
                    .setStyle(2)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("descembed"),
                    new ButtonBuilder()
                    .setLabel("Rodapé da Embed")
                    .setStyle(2)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("rodapeembed"),
                    new ButtonBuilder()
                    .setLabel("Botão da embed")
                    .setStyle(2)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("buttonembed"),
                    new ButtonBuilder()
                    .setLabel("Resetar embed")
                    .setStyle(4)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("embedresetar"),
                ),
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId("voltarfr")
                    .setStyle(2)
                    .setEmoji(emoji.setaEsquerda)
                    .setLabel("Voltar")
                )
            ]
        })
       }
       if (interaction.customId === "voltarfr") {
        interaction.update({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`${interaction.guild.name} | Personalizar`)
                    .setDescription(`Clique no que você deseja personalizar:`)
                    .setFooter({ text: `${interaction.guild.name} - Todos os direitos reservados.` })
            ],
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("personalizarmensagem")
                            .setLabel("Mensagem de Compra")
                            .setStyle(2)
                            .setEmoji(`👨‍🏭`),
                        new ButtonBuilder()
                            .setCustomId("personalizaremoji")
                            .setLabel("Personalizar Emojis")
                            .setDisabled(false)
                            .setStyle(2)
                            .setEmoji(`🔍`)
                    )
            ]
        });
    }
       if(interaction.customId === "embedresetar") {
        db.set(`titulo`, db.get(`backup.titulo`))
        db.set(`desc`, db.get(`backup.desc`))
        db.set(`rodape`, db.get(`backup.rodape`))
        db.set(`button.text`, db.get(`backup.button.text`))
        db.set(`button.style`, db.get(`backup.button.style`))
        db.set(`button.emoji`, db.get(`backup.button.emoji`))

        interaction.update({
            embeds:[
                new EmbedBuilder()
                .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                .setFooter({text:"Escolha oque você deseja mudar:"})
                .setDescription(`**Titulo atual:** \`${db.get(`titulo`)}\` \n\n**Descrição Atual:** ${db.get(`desc`)} \n\n **Rodapé Atual:** \`${db.get(`rodape`) === "remover" ? "Sem rodapé" : db.get(`rodape`)}\``)
            ],
            components:[
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel("Titulo da embed")
                    .setStyle(2)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("tituloembed"),
                    new ButtonBuilder()
                    .setLabel("Descrição da embed")
                    .setStyle(2)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("descembed"),
                    new ButtonBuilder()
                    .setLabel("Rodapé da Embed")
                    .setStyle(2)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("rodapeembed"),
                    new ButtonBuilder()
                    .setLabel("Botão da embed")
                    .setStyle(2)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("buttonembed"),
                    new ButtonBuilder()
                    .setLabel("Resetar embed")
                    .setStyle(4)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("embedresetar"),
                ),
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId("voltarfr")
                    .setStyle(2)
                    .setEmoji(emoji.setaEsquerda)
                    .setLabel("Voltar")
                )
            ]
        })
       }




       if (interaction.isButton()) {
        if (interaction.customId === "personalizaremoji") {
            var emojis = '';
            dbe.all().map((entrada, indice) => {
                emojis += `${indice + 1} - ${entrada.data}\n`;
            });
            const embedNovo = new EmbedBuilder()
                .setTitle(`${interaction.guild.name} - Configuração dos emojis`)
                .setDescription(`Selecione abaixo qual opção deseja alterar em seus emojis. É importante que você preste atenção nas configurações atuais para garantir que suas alterações sejam feitas corretamente.\n\n${emojis}`)
                .setColor('#2b2d31');
    
            const linhaAcao = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('Alterar')
                    .setStyle(1)
                    .setCustomId(`editemoji_${interaction.user.id}`)
                    .setEmoji('✏️')
                )
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('Voltar')
                    .setStyle(2)
                    .setCustomId(`voltarfr`)
                    .setEmoji('⏪')
                );
    
            await interaction.message.edit({ embeds: [embedNovo], components: [linhaAcao] });
        } else if (interaction.customId.startsWith("altemojis_")) {
            const id = interaction.customId.slice(interaction.customId.indexOf('_')).replace('_', '');
            interaction.deferUpdate();
            if (interaction.user.id !== id) return;
            puxarEmbed();
        } else if (interaction.customId.startsWith('editemoji_')) {
            const id = interaction.customId.slice(interaction.customId.indexOf('_')).replace('_', '');
            if (interaction.user.id !== id) return;
            const modal = new ModalBuilder()
                .setCustomId(`editaremoji_${interaction.user.id}`)
                .setTitle(`✏️ Editar Emoji`);
    
            const Emoji = new TextInputBuilder()
                .setCustomId(`Emoji`)
                .setLabel(`O mais facil e com vc 🤣`)
                .setPlaceholder(`Exemplo: 1`)
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMaxLength(2);
    
            const PrimeiraLinhaAcao = new ActionRowBuilder().addComponents(Emoji);
    
            modal.addComponents(PrimeiraLinhaAcao);
    
            await interaction.showModal(modal);
        }
    }

          
    


      
      
      
      
      
      
      
       if (interaction.customId === "tituloembed") {
        interaction.update({
          embeds: [
            new EmbedBuilder()
              .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
              .setDescription(
                `Envie o novo título da embed de compra, caso queira use as váriaves: \n- \`#{nome}\`\n- \`#{preco}\`\n- \`#{estoque}\``
              ),
          ],
          components: [
            new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId("cancelartituloembed")
                .setStyle(4)
                .setEmoji(emoji.negar)
                .setLabel("Cancelar")
            ),
          ],
        }).then(() => {
          const filter = (m) => m.author.id === interaction.user.id;
          const collector = interaction.channel.createMessageCollector({
            filter,
            max: 1,
          });
          collector.on("collect", (message) => {
            message.delete();
            const newt = message.content;
            db.set(`titulo`, newt);
            interaction.channel
              .send(`${emoji.sim} | Titulo atualizado com sucesso!`)
              .then((editedMessage) => {
                setTimeout(() => {
                  editedMessage.delete().catch(console.error);
                }, 5000);
              });
      
            msg.edit({
              embeds: [
                new EmbedBuilder()
                  .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                  .setFooter({ text: "Escolha oque você deseja mudar:" })
                  .setDescription(`**Titulo atual:** \`${db.get(`titulo`)}\` \n\n**Descrição Atual:** ${db.get(`desc`)} \n\n **Rodapé Atual:** \`${db.get(`rodape`) === "remover" ? "Sem rodapé" : db.get(`rodape`)}\``)
              ],
              components: [
                new ActionRowBuilder().addComponents(
                  new ButtonBuilder()
                    .setLabel("Titulo da embed")
                    .setStyle(2)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("tituloembed"),
                  new ButtonBuilder()
                    .setLabel("Descrição da embed")
                    .setStyle(2)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("descembed"),
                  new ButtonBuilder()
                    .setLabel("Rodapé da Embed")
                    .setStyle(2)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("rodapeembed"),
                  new ButtonBuilder()
                    .setLabel("Botão da embed")
                    .setStyle(2)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("buttonembed"),
                  new ButtonBuilder()
                    .setLabel("Resetar embed")
                    .setStyle(4)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("embedresetar")
                ),
                new ActionRowBuilder().addComponents(
                  new ButtonBuilder()
                    .setCustomId("voltarfr")
                    .setStyle(2)
                    .setEmoji(emoji.setaEsquerda)
                    .setLabel("Voltar")
                ),
              ],
            });
          });
      
          
          client.on("interactionCreate", async (interaction) => {
            if (interaction.isButton() && interaction.customId === "cancelartituloembed") {
                collector.stop();
                interaction.update({
                    embeds: [
                      new EmbedBuilder()
                        .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                        .setFooter({ text: "Escolha oque você deseja mudar:" })
                        .setDescription(`**Titulo atual:** \`${db.get(`titulo`)}\` \n\n**Descrição Atual:** ${db.get(`desc`)} \n\n **Rodapé Atual:** \`${db.get(`rodape`) === "remover" ? "Sem rodapé" : db.get(`rodape`)}\``),
                    ],
                    components: [
                      new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                          .setLabel("Titulo da embed")
                          .setStyle(2)
                          .setEmoji(`${emoji.configurações}`)
                          .setCustomId("tituloembed"),
                        new ButtonBuilder()
                          .setLabel("Descrição da embed")
                          .setStyle(2)
                          .setEmoji(`${emoji.configurações}`)
                          .setCustomId("descembed"),
                        new ButtonBuilder()
                          .setLabel("Rodapé da Embed")
                          .setStyle(2)
                          .setEmoji(`${emoji.configurações}`)
                          .setCustomId("rodapeembed"),
                        new ButtonBuilder()
                          .setLabel("Botão da embed")
                          .setStyle(2)
                          .setEmoji(`${emoji.configurações}`)
                          .setCustomId("buttonembed"),
                        new ButtonBuilder()
                          .setLabel("Resetar embed")
                          .setStyle(4)
                          .setEmoji(`${emoji.configurações}`)
                          .setCustomId("embedresetar")
                      ),
                      new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                          .setCustomId("voltarfr")
                          .setStyle(1)
                          .setEmoji(emoji.setaEsquerda)
                          .setLabel("Voltar")
                      ),
                    ],
                  });
              }
          })
        });
      }
       if(interaction.customId === "descembed") {
        interaction.update({
            embeds:[
                new EmbedBuilder()
                .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                .setDescription(`${emoji.setaDireita} | Envie a nova descrição da embed de compra, use as váriaveis: \n- \`#{desc}\` \n- \`#{nome}\` \n- \`#{preco}\`\n- \`#{estoque}\``)
            ],
            components:[
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId("cancelardescembed")
                    .setStyle(4)
                    .setEmoji(emoji.negar)
                    .setLabel("Cancelar")
                )
            ]
        }).then(() => {
            const filter = m => m.author.id === interaction.user.id;
            const collector = interaction.channel.createMessageCollector({ filter, max: 1 });
             collector.on("collect", message => {
               message.delete()
               const newt = message.content
               db.set(`desc`, newt)
               interaction.channel.send(`${emoji.sim} | Descrição atualizado com sucesso!`).then((editedMessage) => {
                setTimeout(() => {
                  editedMessage.delete().catch(console.error);
                }, 5000); 
              });
              
            msg.edit({  
                embeds:[
                new EmbedBuilder()
                .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                .setFooter({text:"Escolha oque você deseja mudar:"})
                .setDescription(`**Titulo atual:** \`${db.get(`titulo`)}\` \n\n**Descrição Atual:** ${db.get(`desc`)} \n\n **Rodapé Atual:** \`${db.get(`rodape`) === "remover" ? "Sem rodapé" : db.get(`rodape`)}\``)
            ],
            components:[
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel("Titulo da embed")
                    .setStyle(2)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("tituloembed"),
                    new ButtonBuilder()
                    .setLabel("Descrição da embed")
                    .setStyle(2)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("descembed"),
                    new ButtonBuilder()
                    .setLabel("Rodapé da Embed")
                    .setStyle(2)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("rodapeembed"),
                    new ButtonBuilder()
                    .setLabel("Botão da embed")
                    .setStyle(2)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("buttonembed"),
                    new ButtonBuilder()
                    .setLabel("Resetar embed")
                    .setStyle(4)
                    .setEmoji(`${emoji.configurações}`)
                    .setCustomId("embedresetar"),
                ),
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId("voltarfr")
                    .setStyle(2)
                    .setEmoji(emoji.setaEsquerda)
                    .setLabel("Voltar")
                )
            ]})  
               })
               client.on("interactionCreate", async (interaction) => {
                if (interaction.isButton() && interaction.customId === "cancelardescembed") {
                    collector.stop();
                    interaction.update({
                        embeds: [
                          new EmbedBuilder()
                            .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                            .setFooter({ text: "Escolha oque você deseja mudar:" })
                            .setDescription(`**Titulo atual:** \`${db.get(`titulo`)}\` \n\n**Descrição Atual:** ${db.get(`desc`)} \n\n **Rodapé Atual:** \`${db.get(`rodape`) === "remover" ? "Sem rodapé" : db.get(`rodape`)}\``)
                        ],
                        components: [
                          new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                              .setLabel("Titulo da embed")
                              .setStyle(2)
                              .setEmoji(`${emoji.configurações}`)
                              .setCustomId("tituloembed"),
                            new ButtonBuilder()
                              .setLabel("Descrição da embed")
                              .setStyle(2)
                              .setEmoji(`${emoji.configurações}`)
                              .setCustomId("descembed"),
                            new ButtonBuilder()
                              .setLabel("Rodapé da Embed")
                              .setStyle(2)
                              .setEmoji(`${emoji.configurações}`)
                              .setCustomId("rodapeembed"),
                            new ButtonBuilder()
                              .setLabel("Botão da embed")
                              .setStyle(2)
                              .setEmoji(`${emoji.configurações}`)
                              .setCustomId("buttonembed"),
                            new ButtonBuilder()
                              .setLabel("Resetar embed")
                              .setStyle(4)
                              .setEmoji(`${emoji.configurações}`)
                              .setCustomId("embedresetar")
                          ),
                          new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                              .setCustomId("voltarfr")
                              .setStyle(2)
                              .setEmoji(emoji.setaEsquerda)
                              .setLabel("Voltar")
                          ),
                        ],
                      });
                  }
              })
             })


                 


           }
           if(interaction.customId === "rodapeembed") {
            interaction.update({
                embeds:[
                    new EmbedBuilder()
                    .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                    .setDescription(`${emoji.setaDireita} | Envie o novo rodapé abaixo: **Obs: Caso queira remover envie "remover"**`)
                ],
                components:[
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId("cancelarrodapeembed")
                        .setStyle(4)
                        .setEmoji(emoji.negar)
                        .setLabel("Cancelar")
                    )
                ]
            }).then(() => {
                const filter = m => m.author.id === interaction.user.id;
                const collector = interaction.channel.createMessageCollector({ filter, max: 1 });
                 collector.on("collect", message => {
                   message.delete()
                   const newt = message.content
                   if(message.content === "remover") {
                    db.set(`rodape`, "remover")

                    msg.edit({  
                        embeds:[
                        new EmbedBuilder()
                        .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                        .setFooter({text:"Escolha oque você deseja mudar:"})
                        .setDescription(`**Titulo atual:** \`${db.get(`titulo`)}\` \n\n**Descrição Atual:** ${db.get(`desc`)} \n\n **Rodapé Atual:** \`${db.get(`rodape`) === "remover" ? "Sem rodapé" : db.get(`rodape`)}\``)
                    ],
                    components:[
                        new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setLabel("Titulo da embed")
                            .setStyle(2)
                            .setEmoji(`${emoji.configurações}`)
                            .setCustomId("tituloembed"),
                            new ButtonBuilder()
                            .setLabel("Descrição da embed")
                            .setStyle(2)
                            .setEmoji(`${emoji.configurações}`)
                            .setCustomId("descembed"),
                            new ButtonBuilder()
                            .setLabel("Rodapé da Embed")
                            .setStyle(2)
                            .setEmoji(`${emoji.configurações}`)
                            .setCustomId("rodapeembed"),
                            new ButtonBuilder()
                            .setLabel("Botão da embed")
                            .setStyle(2)
                            .setEmoji(`${emoji.configurações}`)
                            .setCustomId("buttonembed"),
                            new ButtonBuilder()
                            .setLabel("Resetar embed")
                            .setStyle(4)
                            .setEmoji(`${emoji.configurações}`)
                            .setCustomId("embedresetar"),
                        ),
                        new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setCustomId("voltarfr")
                            .setStyle(2)
                            .setEmoji(emoji.setaEsquerda)
                            .setLabel("Voltar")
                        )
                    ]})  
                    return;
                   }
                   db.set(`rodape`, newt)
                   interaction.channel.send(`${emoji.sim} | Rodapé atualizado com sucesso!`).then((editedMessage) => {
                    setTimeout(() => {
                      editedMessage.delete().catch(console.error);
                    }, 5000); 
                  });
                  
                msg.edit({  
                    embeds:[
                    new EmbedBuilder()
                    .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                    .setFooter({text:"Escolha oque você deseja mudar:"})
                    .setDescription(`**Titulo atual:** \`${db.get(`titulo`)}\` \n\n**Descrição Atual:** ${db.get(`desc`)} \n\n **Rodapé Atual:** \`${db.get(`rodape`) === "remover" ? "Sem rodapé" : db.get(`rodape`)}\``)
                ],
                components:[
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel("Titulo da embed")
                        .setStyle(2)
                        .setEmoji(`${emoji.configurações}`)
                        .setCustomId("tituloembed"),
                        new ButtonBuilder()
                        .setLabel("Descrição da embed")
                        .setStyle(2)
                        .setEmoji(`${emoji.configurações}`)
                        .setCustomId("descembed"),
                        new ButtonBuilder()
                        .setLabel("Rodapé da Embed")
                        .setStyle(2)
                        .setEmoji(`${emoji.configurações}`)
                        .setCustomId("rodapeembed"),
                        new ButtonBuilder()
                        .setLabel("Botão da embed")
                        .setStyle(2)
                        .setEmoji(`${emoji.configurações}`)
                        .setCustomId("buttonembed"),
                        new ButtonBuilder()
                        .setLabel("Resetar embed")
                        .setStyle(4)
                        .setEmoji(`${emoji.configurações}`)
                        .setCustomId("embedresetar"),
                    ),
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId("voltarfr")
                        .setStyle(2)
                        .setEmoji(emoji.setaEsquerda)
                        .setLabel("Voltar")
                    )
                ]})  
                   })
                   client.on("interactionCreate", async (interaction) => {
                    if (interaction.isButton() && interaction.customId === "cancelarrodapeembed") {
                        collector.stop();
                        interaction.update({
                            embeds: [
                              new EmbedBuilder()
                                .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                                .setFooter({ text: "Escolha oque você deseja mudar:" })
                                .setDescription(`**Titulo atual:** \`${db.get(`titulo`)}\` \n\n**Descrição Atual:** ${db.get(`desc`)} \n\n **Rodapé Atual:** \`${db.get(`rodape`) === "remover" ? "Sem rodapé" : db.get(`rodape`)}\``),
                            ],
                            components: [
                              new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                  .setLabel("Titulo da embed")
                                  .setStyle(2)
                                  .setEmoji(`${emoji.configurações}`)
                                  .setCustomId("tituloembed"),
                                new ButtonBuilder()
                                  .setLabel("Descrição da embed")
                                  .setStyle(2)
                                  .setEmoji(`${emoji.configurações}`)
                                  .setCustomId("descembed"),
                                new ButtonBuilder()
                                  .setLabel("Rodapé da Embed")
                                  .setStyle(2)
                                  .setEmoji(`${emoji.configurações}`)
                                  .setCustomId("rodapeembed"),
                                new ButtonBuilder()
                                  .setLabel("Botão da embed")
                                  .setStyle(2)
                                  .setEmoji(`${emoji.configurações}`)
                                  .setCustomId("buttonembed"),
                                new ButtonBuilder()
                                  .setLabel("Resetar embed")
                                  .setStyle(4)
                                  .setEmoji(`${emoji.configurações}`)
                                  .setCustomId("embedresetar")
                              ),
                              new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                  .setCustomId("voltarfr")
                                  .setStyle(2)
                                  .setEmoji(emoji.setaEsquerda)
                                  .setLabel("Voltar")
                              ),
                            ],
                          });
                      }
                  })
                 })



           }
           if(interaction.customId === "buttonembed") {
            let style = "";

            switch (db.get(`button.style`)) {
                case 1:{style = "azul"}
                    
                    break;
                    case 2: {style = "cinza"}
                        
                        break;
                        case 3:{style = "verde"}
                            
                            break;
                            case 4:{style = "vermelho"}
                                
                                break;
            
                default:
                    break;
            }
            interaction.update({
                embeds:[
                    new EmbedBuilder()
                    .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                    .setFooter({text:"Escolha oque Você deseja mudar:"})
                    .setDescription(`**Texto do botão:** \`${db.get(`button.text`)}\` \n\n **Cor do Botão:** \`${style}\` \n\n **Emoji do Botão:** ${db.get(`button.emoji`)}`)
                ],
                components:[
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId("textobuttonmudar")
                        .setLabel("Texto do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("corbuttonmudar")
                        .setLabel("Cor do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("emojibuttonmudar")
                        .setLabel("Emoji do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("personalizarmensagem")
                        .setLabel("Voltar")
                        .setStyle(2)
                        .setEmoji(emoji.setaEsquerda)
                    )
                ]
            })
           }
           if(interaction.customId === "textobuttonembed") {
            const modal = new ModalBuilder()
            .setCustomId("modal_mudar_label_button")
            .setTitle("🔧 | Alterar Texto do Botão");

            const text = new TextInputBuilder()
            .setCustomId("text")
            .setLabel("NOVO TEXTO DO BOTÃO:")
            .setStyle(2)
            .setMaxLength(50)
            .setMinLength(1)
            .setRequired(true)
            .setPlaceholder("Ex: Comprar");

            modal.addComponents(new ActionRowBuilder().addComponents(text));

            await interaction.showModal(modal)
           }
           if(interaction.customId === "corbuttonmudar") {

            interaction.update({
                embeds:[
                    new EmbedBuilder()
                    .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                    .setDescription(`${emoji.setaDireita} | Escolha uma cor para o botão:`)
                ],
                components:[
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId("buttonazul")
                        .setLabel("Azul")
                        .setStyle(2),
                        new ButtonBuilder()
                        .setCustomId("buttonvermelho")
                        .setLabel("Vermelho")
                        .setStyle(4),
                        new ButtonBuilder()
                        .setCustomId("buttonverde")
                        .setLabel("Verde")
                        .setStyle(3),
                        new ButtonBuilder()
                        .setCustomId("buttoncinza")
                        .setLabel("Cinza")
                        .setStyle(2),
                        new ButtonBuilder()
                        .setCustomId("buttoncolorvoltar123")
                        .setLabel("Voltar")
                        .setEmoji(emoji.setaEsquerda)
                        .setStyle(2),
                    )
                ]
            })

           }

           if(interaction.customId === "buttonazul") {
            let style = "";
            db.set(`button.style`, 1)
            switch (db.get(`button.style`)) {
                case 1:{style = "azul"}
                    
                    break;
                    case 2: {style = "cinza"}
                        
                        break;
                        case 3:{style = "verde"}
                            
                            break;
                            case 4:{style = "vermelho"}
                                
                                break;
            
                default:
                    break;
            }
            interaction.update({
                embeds:[
                    new EmbedBuilder()
                    .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                    .setFooter({text:"Escolha oque Você deseja mudar:"})
                    .setDescription(`**Texto do botão:** \`${db.get(`button.text`)}\` \n\n **Cor do Botão:** \`${style}\` \n\n **Emoji do Botão:** ${db.get(`button.emoji`)}`)
                ],
                components:[
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId("textobuttonmudar")
                        .setLabel("Texto do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("corbuttonmudar")
                        .setLabel("Cor do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("emojibuttonmudar")
                        .setLabel("Emoji do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("personalizarmensagem")
                        .setLabel("Voltar")
                        .setStyle(2)
                        .setEmoji(emoji.setaEsquerda)
                    )
                ]
            })
           }

           if(interaction.customId === "buttonvermelho") {
            let style = "";
            db.set(`button.style`, 4)
            switch (db.get(`button.style`)) {
                case 1:{style = "azul"}
                    
                    break;
                    case 2: {style = "cinza"}
                        
                        break;
                        case 3:{style = "verde"}
                            
                            break;
                            case 4:{style = "vermelho"}
                                
                                break;
            
                default:
                    break;
            }
            interaction.update({
                embeds:[
                    new EmbedBuilder()
                    .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                    .setFooter({text:"Escolha oque Você deseja mudar:"})
                    .setDescription(`**Texto do botão:** \`${db.get(`button.text`)}\` \n\n **Cor do Botão:** \`${style}\` \n\n **Emoji do Botão:** ${db.get(`button.emoji`)}`)
                ],
                components:[
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId("textobuttonmudar")
                        .setLabel("Texto do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("corbuttonmudar")
                        .setLabel("Cor do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("emojibuttonmudar")
                        .setLabel("Emoji do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("personalizarmensagem")
                        .setLabel("Voltar")
                        .setStyle(2)
                        .setEmoji(emoji.setaEsquerda)
                    )
                ]
            })
           }

           if(interaction.customId === "emojibuttonmudar") {
            const modal = new ModalBuilder()
            .setCustomId("modal_mudar_emoji")
            .setTitle("🔧 | Alterar Emoji do Botão");

            const text = new TextInputBuilder()
            .setCustomId("text")
            .setLabel("NOVO EMOJI DO BOTÃO:")
            .setStyle(2)
            .setRequired(true)
            .setPlaceholder("Ex: 🛒");

            modal.addComponents(new ActionRowBuilder().addComponents(text));
            await interaction.showModal(modal)
            
           }


           if(interaction.customId === "buttonverde") {
            let style = "";
            db.set(`button.style`, 3)
            switch (db.get(`button.style`)) {
                case 1:{style = "azul"}
                    
                    break;
                    case 2: {style = "cinza"}
                        
                        break;
                        case 3:{style = "verde"}
                            
                            break;
                            case 4:{style = "vermelho"}
                                
                                break;
            
                default:
                    break;
            }
            interaction.update({
                embeds:[
                    new EmbedBuilder()
                    .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                    .setFooter({text:"Escolha oque Você deseja mudar:"})
                    .setDescription(`**Texto do botão:** \`${db.get(`button.text`)}\` \n\n **Cor do Botão:** \`${style}\` \n\n **Emoji do Botão:** ${db.get(`button.emoji`)}`)
                ],
                components:[
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId("textobuttonmudar")
                        .setLabel("Texto do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("corbuttonmudar")
                        .setLabel("Cor do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("emojibuttonmudar")
                        .setLabel("Emoji do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("personalizarmensagem")
                        .setLabel("Voltar")
                        .setStyle(2)
                        .setEmoji(emoji.setaEsquerda)
                    )
                ]
            })
           }

           if(interaction.customId === "buttoncinza") {
            let style = "";
            db.set(`button.style`, 2)
            switch (db.get(`button.style`)) {
                case 1:{style = "azul"}
                    
                    break;
                    case 2: {style = "cinza"}
                        
                        break;
                        case 3:{style = "verde"}
                            
                            break;
                            case 4:{style = "vermelho"}
                                
                                break;
            
                default:
                    break;
            }
            interaction.update({
                embeds:[
                    new EmbedBuilder()
                    .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                    .setFooter({text:"Escolha oque Você deseja mudar:"})
                    .setDescription(`**Texto do botão:** \`${db.get(`button.text`)}\` \n\n **Cor do Botão:** \`${style}\` \n\n **Emoji do Botão:** ${db.get(`button.emoji`)}`)
                ],
                components:[
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId("textobuttonmudar")
                        .setLabel("Texto do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("corbuttonmudar")
                        .setLabel("Cor do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("emojibuttonmudar")
                        .setLabel("Emoji do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("personalizarmensagem")
                        .setLabel("Voltar")
                        .setStyle(2)
                        .setEmoji(emoji.setaEsquerda)
                    )
                ]
            })
           }

           if(interaction.customId === "buttoncolorvoltar123") {
            let style = "";
            switch (db.get(`button.style`)) {
                case 1:{style = "azul"}
                    
                    break;
                    case 2: {style = "cinza"}
                        
                        break;
                        case 3:{style = "verde"}
                            
                            break;
                            case 4:{style = "vermelho"}
                                
                                break;
            
                default:
                    break;
            }
            interaction.update({
                embeds:[
                    new EmbedBuilder()
                    .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                    .setFooter({text:"Escolha oque Você deseja mudar:"})
                    .setDescription(`**Texto do botão:** \`${db.get(`button.text`)}\` \n\n **Cor do Botão:** \`${style}\` \n\n **Emoji do Botão:** ${db.get(`button.emoji`)}`)
                ],
                components:[
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId("textobuttonmudar")
                        .setLabel("Texto do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("corbuttonmudar")
                        .setLabel("Cor do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("emojibuttonmudar")
                        .setLabel("Emoji do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("personalizarmensagem")
                        .setLabel("Voltar")
                        .setStyle(2)
                        .setEmoji(emoji.setaEsquerda)
                    )
                ]
            })
           }

           client.on("interactionCreate", async(interaction) => {
            if(interaction.isModalSubmit() && interaction.customId === "modal_mudar_label_button") {
                const text = interaction.fields.getTextInputValue("text")
                let style = "";

            switch (db.get(`button.style`)) {
                case 1:{style = "azul"}
                    
                    break;
                    case 2: {style = "cinza"}
                        
                        break;
                        case 3:{style = "verde"}
                            
                            break;
                            case 4:{style = "vermelho"}
                                
                                break;
            
                default:
                    break;
            }
            db.set(`button.text`, text)
            interaction.update({
                embeds:[
                    new EmbedBuilder()
                    .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                    .setFooter({text:"Escolha oque Você deseja mudar:"})
                    .setDescription(`**Texto do botão:** \`${db.get(`button.text`)}\` \n\n **Cor do Botão:** \`${style}\` \n\n **Emoji do Botão:** ${db.get(`button.emoji`)}`)
                ],
                components:[
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId("textobuttonmudar")
                        .setLabel("Texto do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("corbuttonmudar")
                        .setLabel("Cor do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("emojibuttonmudar")
                        .setLabel("Emoji do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("personalizarmensagem")
                        .setLabel("Voltar")
                        .setStyle(2)
                        .setEmoji(emoji.setaEsquerda)
                    )
                ]
            })
            }
            if(interaction.isModalSubmit() && interaction.customId === "modal_mudar_emoji") {
                const text = interaction.fields.getTextInputValue("text")

        const emojis = text
      
        const emojiverification = interaction.client.emojis.cache.find(emoji => `<:${emoji.name}:${emoji.id}>` === emojis) || interaction.client.emojis.cache.find(emoji => emoji.name === emojis) || interaction.client.emojis.cache.get(emojis);
  
        const customEmojiRegex = /<a?:\w+:\d+>/; 
  const unicodeEmojiRegex = /[\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF]/; 
  const animatedEmojiRegex = /<a:\w+:\d+>/; 
  

          if (!emojiverification && !emojis.match(customEmojiRegex) &&
          !emojis.match(unicodeEmojiRegex) &&
          !emojis.match(animatedEmojiRegex)) {
              interaction.reply({
                ephemeral:true,
                  embeds: [
                      new EmbedBuilder()
                      .setColor("Red")
                      .setDescription(`**❌ - Não encontrei nenhum emoji que tenha nome  ou que tenha id , Use Emojis deste servidor!**`)
                  ]
              });
              return;
          } 

          db.set(`button.emoji`, text) 
          let style = "";
            db.set(`button.style`, 4)
            switch (db.get(`button.style`)) {
                case 1:{style = "azul"}
                    
                    break;
                    case 2: {style = "cinza"}
                        
                        break;
                        case 3:{style = "verde"}
                            
                            break;
                            case 4:{style = "vermelho"}
                                
                                break;
            
                default:
                    break;
            }
            interaction.update({
                embeds:[
                    new EmbedBuilder()
                    .setTitle(`${interaction.guild.name} | Personalizar Mensagem de Compra`)
                    .setFooter({text:"Escolha oque Você deseja mudar:"})
                    .setDescription(`**Texto do botão:** \`${db.get(`button.text`)}\` \n\n **Cor do Botão:** \`${style}\` \n\n **Emoji do Botão:** ${db.get(`button.emoji`)}`)
                ],
                components:[
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId("textobuttonmudar")
                        .setLabel("Texto do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("corbuttonmudar")
                        .setLabel("Cor do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("emojibuttonmudar")
                        .setLabel("Emoji do Botão")
                        .setStyle(2)
                        .setEmoji(emoji.configurações),
                        new ButtonBuilder()
                        .setCustomId("personalizarmensagem")
                        .setLabel("Voltar")
                        .setStyle(2)
                        .setEmoji(emoji.setaEsquerda)
                    )
                ]
            })

            }
           })
        })
    }
}