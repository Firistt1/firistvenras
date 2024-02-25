const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const emoji = require("../../databases/myJsonEmojis.json");
const config = new JsonDatabase({ databasePath:"./config.json" });
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonCupons.json" });

module.exports = {
    name: "configcupom", 
    description:"「🎫」Configure um cupom",
    type:Discord.ApplicationCommandType.ChatInput,
    options: [
      {
        name:"id",
        description:"Qual é o id do cupom?",
        type:Discord.ApplicationCommandOptionType.String,
        required: true,
        autocomplete: true,
      }
    ],
    async autocomplete(interaction) {
      const value = interaction.options.getFocused().toLowerCase();
      let choices = db.all().filter(pd => pd.data.idcupom)
  
      const filtered = choices.filter(choice => choice.data.idcupom.toLowerCase().includes(value)).slice(0, 25);
  
      if(!interaction) return;
      if(choices.length === 0){ 
          await interaction.respond([
              { name: "Crie um Cupom", value: "a29183912asd92384XASDASDSADASDSADASDASD12398212222" }
          ])
      } else if(filtered.length === 0) {
          await interaction.respond([
              { name: "Não Achei Nenhum Cupom", value: "a29183912asd92384XASDASDSADASDSADASDASD1239821" }
          ]);
      } else {
          await interaction.respond(
              filtered.map(choice => ({ name: `ID  - ${choice.data.idcupom} | Desconto - ${choice.data.desconto}`, value: choice.data.idcupom }))
          );
      }
  },  
    run: async(client, interaction, message) => {
      if (interaction.user.id !== `${perms.get(`${interaction.user.id}_id`)}`) {
        interaction.reply(`${emoji.nao} | Você não está na lista de pessoas!`)
          .then(replyMessage => {
            setTimeout(() => {
              replyMessage.delete().catch(console.error);
            }, 5000); 
          });
          return;
      }
      const args = [interaction.options.getString("id")]
      if(args[0] !== `${db.get(`${args[0]}.idcupom`)}`) return interaction.reply(`${emoji.nao} | Esse ID de cupom não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      
      if(args[0] === "a29183912asd92384XASDASDSADASDSADASDASD1239821") {
        interaction.reply({
            embeds:[
                new EmbedBuilder()
                .setDescription(`❌ | Não Achei Nenhum Cupom com este nome!`)
                .setColor("Red")
            ],
            ephemeral:true
        })
        return;
    }
    if(args[0] === "a29183912asd92384XASDASDSADASDSADASDASD12398212222") {
        interaction.reply({
            embeds:[
                new EmbedBuilder()
                .setDescription(`❌ | Você não criou nenhum Cupom!`)
                .setColor("Red")
            ],
            ephemeral:true
        })
        return;
    }
        
      const adb = args[0];
      const row = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('qtdcupom')
            .setEmoji(`${emoji.mais}`)
            .setLabel('Adicionar')
            .setStyle(3),
        )
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('mincupom')
            .setEmoji(`${emoji.dinheiro}`)
            .setLabel('Mínimo')
            .setStyle(1),
        )
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('pctcupom')
            .setEmoji(`${emoji.fixo}`)
            .setLabel('Porcentagem')
            .setStyle(2),
        )
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('altcargoc')
            .setLabel('Cargo')
            .setEmoji('🎃')
            .setStyle(3)
        )
        
        const row2 = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('delcupom')
            .setEmoji(`${emoji.lixeira}`)
            .setLabel('Excluir')
            .setStyle(4),
        )
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('relcupom')
            .setEmoji(`${emoji.carregando}`)
            .setLabel('Atualizar')
            .setStyle(1),
        );
        
        const msg = await interaction.reply({ embeds: [new Discord.EmbedBuilder()
          .setTitle(`${dbcv.get(`title`)} | Configurando o(a) ${adb}`)
          .setDescription(`${emoji.caixa} | Quantidade: ${db.get(`${adb}.quantidade`)}\n${emoji.dinheiro} | Mínimo: ${db.get(`${adb}.minimo`)} Reais\n${emoji.cupom} | Desconto: ${db.get(`${adb}.desconto`)}%\n🎃 | Cargo: ${interaction.guild.roles.cache.get(db.get(`${adb}.cargo`)) || "\`Todos podem usar este cupom!\`"}`)
          .setColor(dbcv.get(`color`))], components: [row, row2]})
          
        const interação = msg.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, })
        interação.on("collect", async (interaction) => {
         if (interaction.user.id != interaction.user.id) {
          return;
         }
                
         if (interaction.customId === "delcupom") {
           msg.delete()
           interaction.channel.send(`${emoji.sim} | Excluído!`)
  .then((sentMessage) => {
    setTimeout(() => {
      sentMessage.delete().catch(console.error);
    }, 5000); 
  });

           db.delete(`${adb}`)
         }
         
         if (interaction.customId == 'altcargoc') {
           interaction.deferUpdate();
           interaction.channel.send(`${emoji.carregando} | Mencione o cargo abaixo:`).then(msg => {
              const filter = m => m.author.id === interaction.user.id;
               const collector = interaction.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                  message.delete()
                  const cargo = message.mentions.roles.first();
                  
                  if (!cargo) return msg.edit(`❗ Você não mencionou um cargo válido.`).then((editedMessage) => {
                   setTimeout(() => {
                     editedMessage.delete().catch(console.error);
                    }, 5000); 
                  })
                  
                  db.set(`${adb}.cargo`, cargo.id)
                  msg.edit(`${emoji.sim} | Alterado!`).then((editedMessage) => {
                  setTimeout(() => {
                    editedMessage.delete().catch(console.error);
                  }, 5000); 
                })
               })
           })
         }
         
         if (interaction.customId === "qtdcupom") {
             interaction.deferUpdate();
             interaction.channel.send(`${emoji.carregando} | Qual a nova quantidade de usos?`).then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = interaction.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 if (isNaN(message.content)) return msg.edit(`${emoji.nao} | Não coloque nenhum caractere especial além de números.`)
                 db.set(`${adb}.quantidade`, `${message.content}`)
                 msg.edit(`${emoji.sim} | Alterado!`).then((editedMessage) => {
                  setTimeout(() => {
                    editedMessage.delete().catch(console.error);
                  }, 5000); 
                });
                
             })
           })
         }
         if (interaction.customId === "mincupom") {
             interaction.deferUpdate();
             interaction.channel.send(`${emoji.carregando} | Qual o novo mínimo para uso em reais?`).then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = interaction.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 db.set(`${adb}.minimo`, `${message.content.replace(",", ".")}`)
                 msg.edit(`${emoji.sim} | Alterado!`).then((editedMessage) => {
                  setTimeout(() => {
                    editedMessage.delete().catch(console.error);
                  }, 5000); 
                });
                
             })
           })
         }
         if (interaction.customId === 'pctcupom') {
             interaction.deferUpdate();
             interaction.channel.send(`${emoji.carregando} | Qual o novo desconto em porcentagem?`).then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = interaction.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 if(isNaN(message.content)) return msg.edit(`${emoji.nao} | Não coloque nenhum caractere especial além de números.`)
                 db.set(`${adb}.desconto`, `${message.content}`)
                 msg.edit(`${emoji.sim} | Alterado!`).then((editedMessage) => {
                  setTimeout(() => {
                    editedMessage.delete().catch(console.error);
                  }, 5000); 
                });
                
             })
           })
         }
         if (interaction.customId === 'relcupom') {
           interaction.deferUpdate();
           const embed = new Discord.EmbedBuilder()
             .setTitle(`${dbcv.get(`title`)} | Configurando o(a) ${adb}`)
             .setDescription(`${emoji.caixa} | Quantidade: ${db.get(`${adb}.quantidade`)}\n${emoji.dinheiro} | Mínimo: ${db.get(`${adb}.minimo`)} Reais\n${emoji.cupom} | Desconto: ${db.get(`${adb}.desconto`)}%\n🎃 | Cargo: ${interaction.guild.roles.cache.get(db.get(`${adb}.cargo`)) || "\`Todos podem usar este cupom!\`"}`)
             .setColor(dbcv.get(`color`))
           msg.edit({ embeds: [embed] })
           interaction.channel.send(`${emoji.sim} | Mensagem Atualizada!`)
  .then((sentMessage) => {
    setTimeout(() => {
      sentMessage.delete().catch(console.error);
    }, 5000); 
  });

             }
           })
         }
       }