const { EmbedBuilder, ActionRowBuilder, MessageSelectMenu, Message, EmbedBuilderButton, ButtonBuilder } = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const Discord = require("discord.js")
const emoji = require("../../databases/myJsonEmojis.json");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });
const dbp = new JsonDatabase({ databasePath:"./databases/painel.json" });

module.exports = {
    name: "configpainel", 
    description:"「💫」Configure um painel",
    type:Discord.ApplicationCommandType.ChatInput,
    options: [
      {
        name:"id",
        description:"Qual é o id do painel?",
        type:Discord.ApplicationCommandOptionType.String,
        required: true,
        autocomplete: true,
      }
    ],
    async autocomplete(interaction) {
        const value = interaction.options.getFocused().toLowerCase();
        let choices = dbp.all().filter(pd => pd.data.idpainel)
    
        const filtered = choices.filter(choice => choice.data.idpainel.toLowerCase().includes(value)).slice(0, 25);
    
        if(!interaction) return;
        if(choices.length === 0){ 
            await interaction.respond([
                { name: "Crie um Painel!", value: "a29183912asd92384XASDASDSADASDSADASDASD12398212222" }
            ])
        } else if(filtered.length === 0) {
            await interaction.respond([
                { name: "Não Achei Nenhum Painel", value: "a29183912asd92384XASDASDSADASDSADASDASD1239821" }
            ]);
        } else {
            await interaction.respond(
                filtered.map(choice => ({ name: `ID  - ${choice.data.idpainel} | Titulo - ${choice.data.titulo}`, value: choice.data.idpainel }))
            );
        }
    },  
    run: async(client, interaction,) => {
        const args = [interaction.options.getString("id")]
        const id = args[0]
        
        if(interaction.user.id !== `${perms.get(`${interaction.user.id}_id`)}`) return interaction.reply(`${emoji.nao} | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        if(args[0] !== `${dbp.get(`${id}.idpainel`)}`) return interaction.reply(`${emoji.nao} | Esse ID de produto não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));

        if(id === "a29183912asd92384XASDASDSADASDSADASDASD1239821") {
            interaction.reply({
                embeds:[
                    new EmbedBuilder()
                    .setDescription(`❌ | Não Achei Nenhum Painel com este ID!`)
                    .setColor("Red")
                ],
                ephemeral:true
            })
            return;
        }
        if(id === "a29183912asd92384XASDASDSADASDSADASDASD12398212222") {
            interaction.reply({
                embeds:[
                    new EmbedBuilder()
                    .setDescription(`❌ | Você não criou nenhum Painel!`)
                    .setColor("Red")
                ],
                ephemeral:true
            })
            return;
        }
    
      
      let a =`# PRODUTOS`;
      dbp.get(`${id}.produtos`).map((produtos) => {
        const valor = Number(db.get(`${produtos}.preco`))
        a += `\n**Produto: ${db.get(`${produtos}.idproduto`)}**\n 💵 | Valor: ${valor.toFixed(2)} \n🛒 | Estoque: ${db.get(`${produtos}.conta`).length} \n 🎃 | Nome ${db.get(`${id}.nome`)} \n`
      })

      const embed = new EmbedBuilder()
      .setTitle(`Titulo: ${dbp.get(`${id}.titulo`)}`)
      .setDescription(`🛒 | Id do Painel: ${dbp.get(`${id}.idpainel`)} \n\n💻 | Descrição: ${dbp.get(`${id}.desc`)} \n${a}`)
  
      if(dbp.get(`${id}.miniatura`) !== "Nenhuma") {

        embed.setThumbnail(`${dbp.get(`${id}.miniatura`)}`)

      }
      const msg = await interaction.reply({
        embeds:[embed],
        components:[
            new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId("descpainel")
                .setEmoji("💻")
                .setStyle(2)
                .setLabel("Alterar Descrição"),
                new ButtonBuilder()
                .setCustomId("titulopainel")
                .setEmoji("📑")
                .setStyle(2)
                .setLabel("Alterar titulo"),
                new ButtonBuilder()
                .setCustomId("bannerpainel")
                .setEmoji("🎨")
                .setStyle(2)
                .setLabel("Alterar banner"),
                new ButtonBuilder()
                .setCustomId("thumbpainel")
                .setEmoji("🖼")
                .setStyle(2)
                .setLabel("Alterar Miniatura"),
                new ButtonBuilder()
                .setCustomId("delpainel")
                .setEmoji("🗑")
                .setStyle(4)
            ),
            new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId("addpainel")
                .setEmoji("➕")
                .setStyle(3)
                .setLabel("ㅤAdicionar Produtoㅤ"),
                new ButtonBuilder()
                .setCustomId("rrpainel")
                .setEmoji("🤖")
                .setStyle(2)
                .setLabel("Atualizar Embed"),
                new ButtonBuilder()
                .setCustomId("emojipainel")
                .setEmoji("📸")
                .setStyle(2)
                .setLabel("Emoji Painel"),
                new ButtonBuilder()
                .setCustomId("removepainel")
                .setEmoji("➖")
                .setStyle(4)
                .setLabel("ㅤRemover Produtoㅤ"),
            )
        ]
      })

      const interação = msg.createMessageComponentCollector({
        componentType: Discord.ComponentType.Button,
     })

     interação.on("collect", async (interaction) => {
        if (interaction.user.id != interaction.user.id) {
        return;
     }
     
     if(interaction.customId === "thumbpainel") {

        interaction.deferUpdate();
                 interaction.channel.send("🥏 | Qual o nova miniatura do painel?").then(msg => {
                     const filter = m => m.author.id === interaction.user.id;
                     const collector = interaction.channel.createMessageCollector({ filter, max: 1 });
                     collector.on("collect", message => {
                         message.delete()
                         dbp.set(`${id}.miniatura`, message.content)
                         msg.edit("📦 | Banner alterado com sucesso!").then((abc) => {
                            setTimeout(() => {
                                abc.delete()
                            }, 2500);
                        })

                        

                     })
                 })

     }
     if(interaction.customId === "emojipainel") {

        interaction.deferUpdate();
                 interaction.channel.send("🥏 | Qual o emoji de produto?").then(msg => {
                     const filter = m => m.author.id === interaction.user.id;
                     const collector = interaction.channel.createMessageCollector({ filter, max: 1 });
                     collector.on("collect", message => {
                         message.delete()
                         dbp.set(`${id}.emoji`, message.content)
                         msg.edit("📦 | emoji alterado com sucesso!").then((abc) => {
                            setTimeout(() => {
                                abc.delete()
                            }, 2500);
                        })

                        

                     })
                 })

     }


     if(interaction.customId === "addpainel") {

        interaction.deferUpdate();
                interaction.channel.send("🥏 | Qual o id do produto?").then(msg => {
                    const filter = m => m.author.id === interaction.user.id;
                    const collector = interaction.channel.createMessageCollector({ filter, max: 1 });
                    collector.on("collect", message => {
                        if(message.content !== `${db.get(`${message.content}.idproduto`)}`) return msg.edit(`📦 | Esse ID de produto não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
                        message.delete()
                        dbp.push(`${id}.produtos`, `${message.content}`)
                        msg.edit("📦 | Adicionado com sucesso!").then((abc) => {
                            setTimeout(() => {
                                abc.delete()
                            }, 2500);
                        })
                    })
                })

     }


     if(interaction.customId === "descpainel") {
        interaction.deferUpdate();
                interaction.channel.send("🥏 | Qual é a nova descrição do painel?").then(msg => {
                    const filter = m => m.author.id === interaction.user.id;
                    const collector = interaction.channel.createMessageCollector({ filter, max: 1 });
                    collector.on("collect", message => {
                        message.delete()
                        dbp.set(`${id}.desc`, `${message.content}`)
                        msg.edit("📦 | Descrição alterada com sucesso!").then((abc) => {
                            setTimeout(() => {
                                abc.delete()
                            }, 2500);
                        })
                    })
                })

}

if(interaction.customId === "titulopainel") {
   interaction.deferUpdate();
           interaction.channel.send("🥏 | Qual é a novo titulo do painel?").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = interaction.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                   message.delete()
                   dbp.set(`${id}.titulo`, `${message.content}`)
                   msg.edit("📦 | Titulo alterado com sucesso!").then((abc) => {
                    setTimeout(() => {
                        abc.delete()
                    }, 2500);
                })
               })
           })

}


     if(interaction.customId === "bannerpainel") {

        interaction.deferUpdate();
                 interaction.channel.send("🥏 | Qual o novo banner do painel?").then(msg => {
                     const filter = m => m.author.id === interaction.user.id;
                     const collector = interaction.channel.createMessageCollector({ filter, max: 1 });
                     collector.on("collect", message => {
                         message.delete()
                         dbp.set(`${id}.banner`, message.content)
                         msg.edit("📦 | Banner alterado com sucesso!")

                        

                     })
                 })

     }
     if(interaction.customId === "removepainel") {
        interaction.deferUpdate();
                interaction.channel.send("🥏 | Qual o id do produto?").then(msg => {
                    const filter = m => m.author.id === interaction.user.id;
                    const collector = interaction.channel.createMessageCollector({ filter, max: 1 });
                    collector.on("collect", message => {
                        message.delete()
                        if(message.content !== `${db.get(`${message.content}.idproduto`)}`) return msg.edit(`📦 | Esse ID de produto não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
                        const painel = dbp.get(`${id}`);

        if (painel && Array.isArray(painel.produtos)) {
            
            const updatedProdutosArray = painel.produtos.filter(prodId => prodId !== message.content);

            
            dbp.set(`${id}.produtos`, updatedProdutosArray);

            msg.edit("📦 | Produto removido com sucesso!").then(abc => {
                setTimeout(() => {
                    abc.delete();
                }, 2500);
            });
        }
                    })
                })
     }


     if(interaction.customId === "delpainel") {
        interaction.channel.bulkDelete(3).then(()=> {
            dbp.delete(`${id}`)
        })
     }


     
     if(interaction.customId === "rrpainel") {
        interaction.deferUpdate();
        let a =`# PRODUTOS`;
      dbp.get(`${id}.produtos`).map((produtos) => {
        a += `\n**Produto: ${db.get(`${produtos}.idproduto`)}**\n 💵 | Valor: ${db.get(`${produtos}.preco`)} \n🛒 | Estoque: ${db.get(`${produtos}.conta`).length} \n 🎃 | Nome ${db.get(`${id}.nome`)} \n`
      })

      const embed = new EmbedBuilder()
      .setTitle(`Titulo: ${dbp.get(`${id}.titulo`)}`)
      .setDescription(`🛒 | Id do Painel: ${dbp.get(`${id}.idpainel`)} \n\n💻 | Descrição: ${dbp.get(`${id}.desc`)} \n${a}`)
  
      if(dbp.get(`${id}.miniatura`) !== "Nenhuma") {

        embed.setThumbnail(`${dbp.get(`${id}.miniatura`)}`)

      }

      msg.edit({
        embeds:[embed],
        components:[
            new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId("descpainel")
                .setEmoji("💻")
                .setStyle(2)
                .setLabel("Alterar Descrição"),
                new ButtonBuilder()
                .setCustomId("titulopainel")
                .setEmoji("📑")
                .setStyle(2)
                .setLabel("Alterar titulo"),
                new ButtonBuilder()
                .setCustomId("bannerpainel")
                .setEmoji("🎨")
                .setStyle(2)
                .setLabel("Alterar banner"),
                new ButtonBuilder()
                .setCustomId("thumbpainel")
                .setEmoji("🖼")
                .setStyle(2)
                .setLabel("Alterar Miniatura"),
                new ButtonBuilder()
                .setCustomId("delpainel")
                .setEmoji("🗑")
                .setStyle(4)
            ),
            new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId("addpainel")
                .setEmoji("➕")
                .setStyle(3)
                .setLabel("ㅤAdicionar Produtoㅤ"),
                new ButtonBuilder()
                .setCustomId("rrpainel")
                .setEmoji("🤖")
                .setStyle(2)
                .setLabel("Atualizar Embed"),
                new ButtonBuilder()
                .setCustomId("emojipainel")
                .setEmoji("📸")
                .setStyle(2)
                .setLabel("Emoji Painel"),
                new ButtonBuilder()
                .setCustomId("removepainel")
                .setEmoji("➖")
                .setStyle(4)
                .setLabel("ㅤRemover Produtoㅤ"),
            )
        ]
      })


      const channel = interaction.guild.channels.cache.get(dbp.get(`${id}.idcanal`))
                     
      const embed2 = new EmbedBuilder()
      .setTitle(`${dbp.get(`${id}.titulo`)}`)
      .setDescription(`${dbp.get(`${id}.desc`)} `);

      const select = new Discord.StringSelectMenuBuilder()
      .setCustomId(`${id}`)
      .setPlaceholder("Escolha algum produto")
      .setMaxValues(1)
  
      if(dbp.get(`${id}.miniatura`) !== "Nenhuma") {

        embed.setThumbnail(`${dbp.get(`${id}.miniatura`)}`)

      }

      dbp.get(`${id}.produtos`).map((pd) => {
        const valor = Number(db.get(`${pd}.preco`))
        select.addOptions(
            {
                label:`${db.get(`${pd}.nome`)}`,
                description:`💸| Valor: ${valor.toFixed(2)} - 📦 Estoque: ${db.get(`${pd}.conta`).length}`,
                value:`${db.get(`${pd}.idproduto`)}`,
                emoji:`${dbp.get(`${id}.emoji`)}`
            }
        )
      })  
      channel.messages.fetch(dbp.get(`${id}.idmsg`))
      .then((message) => {
         message.edit({ 
             embeds:[
            embed2.setColor(dbcv.get(`color`))
            .setImage(`${dbp.get(`${id}.banner`)}`)
        ],
        components:[
            new ActionRowBuilder()
            .addComponents(select)
        ] })
      })

     }
    
    })

    }}