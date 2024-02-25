const Discord = require("discord.js");
const client = new Discord.Client({ intents: [
  32767,
  Discord.GatewayIntentBits.GuildMembers,
  Discord.GatewayIntentBits.Guilds,
  Discord.GatewayIntentBits.GuildVoiceStates,
  Discord.GatewayIntentBits.MessageContent,
  Discord.GatewayIntentBits.GuildMessages,
] });
const mercadopago = require("mercadopago")
const axios = require("axios")
const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const moment = require("moment")
const { ModalBuilder, TextInputBuilder} = require("discord.js")

const { JsonDatabase, } = require("wio.db");
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });
const emoji = require("./databases/myJsonEmojis.json");
const dbc = new JsonDatabase({ databasePath:"./databases/myJsonCupons.json" });
const db2 = new JsonDatabase({ databasePath:"./databases/myJsonDatabase.json" });
const db3 = new JsonDatabase({ databasePath:"./databases/myJsonIDs.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db4 = new JsonDatabase({ databasePath:"./databases/myJsonSaldo.json" });
const db7 = new JsonDatabase({ databasePath:"./databases/myJsonRankProdutos.json" });
const db8 = new JsonDatabase({ databasePath:"./databases/myJsonRankUsers.json" });
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const db9 = new JsonDatabase({ databasePath:"./databases/myJsonRank.json" });
const cp = new JsonDatabase({ databasePath:"./databases/cupom.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });
const token = config.get('token');
const fs = require('fs');
const db10 = new JsonDatabase({ databasePath:"./databases/myJsonAvaliacao.json" });
const db11 = new JsonDatabase({ databasePath:"./databases/Notificados.json" });



client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})
module.exports = client
client.slashCommands = new Discord.Collection()

client.on("interactionCreate", async interaction => {
  if(interaction.isAutocomplete()) {
    const command = client.slashCommands.get(interaction.commandName)
    if(!command) {
      return;
    }
    

    try{
      await command.autocomplete(interaction);
    }catch(err){return;}
  }
});

const url = 'https://discord.com/api/v10/applications/@me';


const data = {
  description: '<:codigoBranco:1209497357612224522> **Feito por:** @frbanido\n\n> <:CarrinhoLucro_gringocm:1208802659444854926> **Está afim de um bot como esse?** Entre no nosso servidor para adquirir o seu. https://discord.gg/sonhou',
};

axios.patch(url, data, {
  headers: {
    Authorization: `Bot ${token}`,
    'Content-Type': 'application/json'
  }
})
.then((response) => {
  console.log('Aplicação atualizada com sucesso!');
})
.catch((error) => {
  console.error(`Erro ao atualizar aplicação: ${error}`);
});
  
process.on('uncaughtException', (error, origin) => {
  console.log(`🚫 Erro Detectado:]\n\n${error.stack}`);
});

process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`🚫 Erro Detectado:\n\n${error.stack}`);
});

require('./handler')(client)

const aaa = require("./config.json")
client.login(aaa.token)



client.on('ready', () => {
	console.log(`\nTou ligado seu inutil\n\nbot horroroso desbulgado para os burros @frbanido`); 
    client.user.setActivity(`${dbcv.get(`status`)}`, { type: Discord.ActivityType.Streaming, url: "https://www.twitch.tv/discord" });
});

client.on("messageCreate", async(message) => {
  if(message.content === ".teste") {
    message.delete()
  }
})

client.on('interactionCreate', async (interaction) => {
  if (interaction.isModalSubmit()) {
    if (interaction.customId == 'modalbonusdeposito') {
      const porcen = interaction.fields.getTextInputValue("p1")
      const valormin = interaction.fields.getTextInputValue("p2")
      
      if (isNaN(porcen) == true || isNaN(valormin) == true) return interaction.reply({ content: `🔍 | Você não inseriu um número válido.`, ephemeral: true })
      
      dbcv.set(`bonus_deposito`, porcen)
      dbcv.set(`valormin_deposito`, valormin)
      interaction.reply({ content: `✅ Bônus por depósito alterado com sucesso!`, ephemeral: true })
      
      const embedd = new Discord.EmbedBuilder()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true })})
        .setTitle(`💰 | Configurar Sistema de Saldo`)
        .setDescription(`Sistema de Saldo: ${dbcv.get('saldoonoff')}\nBônus por depósito: ${dbcv.get('bonus_deposito') || "0"}%\nValor mínimo para deposito: R$${Number(dbcv.get('valormin_deposito')).toFixed(2) || "0"}`)
        .setColor(dbcv.get(`color`))
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        
        interaction.message.edit({ embeds: [embedd] })
    }
  }
  if(interaction.isModalSubmit()) {
    
    const customId = interaction.customId;
    if(customId.endsWith("_nomegerenciar_modal")) {
      const adb = customId.split("_")[0];

      db.set(`${adb}.nome`, `${interaction.fields.getTextInputValue("text")}`)
    const embed232 = new Discord.EmbedBuilder()
    .setFooter({text:`${dbcv.get(`title`)} - Todos os direitos reservados.`, iconURL: interaction.client.user.displayAvatarURL({ format: "png" })})
    .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
    .setDescription(`${emoji.cartazInfo} | Descrição: \`\`\`${db.get(`${adb}.desc`)}\`\`\`\n${emoji.lupa} | Id:\`\`${adb}\`\`\n${emoji.planet} | Nome: ${db.get(`${adb}.nome`)}\n${emoji.dinheiro} | Preço: ${db.get(`${adb}.preco`)}\n${emoji.caixa} | Estoque quantidade: ${db.get(`${adb}.conta`).length}`)
.setImage(db.get(`${adb}.banner`))
.setColor(dbcv.get(`color`))
      interaction.update({ embeds: [embed232] }).then(() => {
        
    interaction.followUp({content:`${emoji.sim} | Alterado!`, ephemeral:true})
      })

    }
    
    if(customId.endsWith("_precogerenciar_modal")) {
      const adb = customId.split("_")[0];
      const userInput = Number(interaction.fields.getTextInputValue("text").replace(",", "."));

      if (isNaN(userInput)) {
          interaction.reply({content:`${emoji.alerta} | Por favor, digite apenas números.`, ephemeral:true})
      } else {
          db.set(`${adb}.preco`, userInput);
          const embed232 = new Discord.EmbedBuilder()
          .setFooter({text:`${dbcv.get(`title`)} - Todos os direitos reservados.`, iconURL: interaction.client.user.displayAvatarURL({ format: "png" })})
          .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
          .setDescription(`${emoji.cartazInfo} | Descrição: \`\`\`${db.get(`${adb}.desc`)}\`\`\`\n${emoji.lupa} | Id:\`\`${adb}\`\`\n${emoji.planet} | Nome: ${db.get(`${adb}.nome`)}\n${emoji.dinheiro} | Preço: ${db.get(`${adb}.preco`)}\n${emoji.caixa} | Estoque quantidade: ${db.get(`${adb}.conta`).length}`)
     .setImage(db.get(`${adb}.banner`))
     .setColor(dbcv.get(`color`))
            interaction.update({ embeds: [embed232] }).then(() => {
              
          interaction.followUp({content:`${emoji.sim} | Alterado!`, ephemeral:true})
            })
      }                                                 

  
}
    
}
    
    if (interaction.isModalSubmit() && interaction.customId === "aprovar_modal") {

       
      const data_id = interaction.fields.getTextInputValue("text")
      
      if (!db3.has(data_id)) return interaction.reply({content:`:x: | Id inválido.`, ephemeral:true})
      
      db3.set(`${data_id}.status`, `Processando`)

                     
      const logsstaffss2 = new Discord.EmbedBuilder()
      .setTitle(`${dbcv.get(`title`)} | Compra aprovada`)
      .addFields(
       {
           name: `${emoji.user} | Quem Aprovou:`,
           value: `\`${interaction.user.username} - ${interaction.user.id}\``,
       },
       {
         name: '📡 | Status:',
         value: `\`${db3.get(`${data_id}.status`)}\``,
     },
     {
       name: '📆 | Data da aprovação:',
       value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)`,
   },
      )
      .setFooter({ text: `${dbcv.get(`title`)} - Direitos reservados` })
      client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [logsstaffss2], content: `||<@&${dbcv.get(`equipe`)}>||`})

          const embednew = new Discord.EmbedBuilder()
            .setTitle(`${dbcv.get(`title`)} | Gerenciar vendas`)
            .setDescription(`**${emoji.sim} | Id aprovado com sucesso!**`)
            .setColor(dbcv.get(`color`))
            .setThumbnail(dbcv.get(`foto`))
            .setFooter({text:`Gerencie suas vendas por aqui.`})
          interaction.update({ embeds: [embednew] }).then(() => {
           interaction.followUp({
             content:`${emoji.sim} | Compra aprovada!`,
             ephemeral:true
            })
          })
          
   }

    if (interaction.isModalSubmit() && interaction.customId === "reembolsar_modal") {
         const data_id = interaction.fields.getTextInputValue("text")
         
         if (!db3.has(data_id)) return interaction.reply({content:`:x: | Id inválido.`, ephemeral:true})
         
         const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });
         const precoAtual = db.get(`${interaction.customId}.preco`);
         db3.set(`${data_id}.preco`, `${precoAtual}`);
         db3.set(`${data_id}.status`, `Reembolsado`)


         mercadopago.configure({
           access_token: dbcv.get(`access_token`)
          });
           
          var refund = {
           payment_id: data_id
          };
           
          mercadopago.refund.create(refund).then(result => {
           console.log(result.response)
          })

         const logsstaffss = new Discord.EmbedBuilder()
      .setTitle(`${dbcv.get(`title`)} | Reembolso aprovado`)
      .addFields(
       {
           name: `${emoji.user} | Quem Reembolsou:`,
           value: `\`${interaction.user.username} - ${interaction.user.id}\``,
       },
       {
         name: '📡 | Status:',
         value: `\`${db3.get(`${data_id}.status`)}\``,
     },
     {
       name: '📆 | Data do reembolso:',
       value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)`,
   },
   )
      .setFooter({ text: `${dbcv.get(`title`)} - Direitos reservados` })
      client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [logsstaffss], content: `||<@&${dbcv.get(`equipe`)}>||`})

         const embednew = new Discord.EmbedBuilder()
         .setTitle(`${dbcv.get(`title`)} | Gerenciar vendas`)
            .setDescription(`**${emoji.sim} | Id reembolsado com sucesso!**`)
            .setColor(dbcv.get(`color`))
            .setFooter({text:`Gerencie suas vendas por aqui.`})
          interaction.update({ embeds: [embednew] }).then(() => {
           interaction.followUp({content:`${emoji.sim} | Compra reembolsada!`, ephemeral:true})
          })
       
     
    }

    if (interaction.isModalSubmit() && interaction.customId === "info_modal") {
         const data_id = interaction.fields.getTextInputValue("text")
         
         if (!db3.has(data_id)) return interaction.reply({content:`:x: | Id inválido.`, ephemeral:true})
         
         db3.set(`${data_id}.id`, `${data_id}`)

         const embednew = new Discord.EmbedBuilder()
         .setTitle(`${dbcv.get(`title`)} | Info da compra`)
         .setThumbnail(dbcv.get(`foto`))
         .addFields(
           { name: `${emoji.estrela} | ID Da compra:`, value: `\`\`${db3.get(`${data_id}.id`)}\`\`` },
           { name: `📡 | Status:`, value: `\`\`${db3.get(`${data_id}.status`)}\`\`` },
           { name: `${emoji.user}  | Comprador:`, value: `<@${db3.get(`${data_id}.userid`)}>` },
           { name: `📅 | Data da compra:`, value: `${db3.get(`${data_id}.dataid`)}` },
           { name: `${emoji.maos} | Forma de pagamento:`, value: `${db3.get(`${data_id}.formapagamento`)}` },
           { name: `${emoji.planet} | Produto:`, value: `\`\`${db3.get(`${data_id}.nomeid`)}\`\`` },
           { name: `${emoji.caixa} | Quantidade:`, value: `\`\`${db3.get(`${data_id}.qtdid`)}\`\`` },
           { name: `${emoji.dinheiro} | Preço:`, value: `\`\`${db3.get(`${data_id}.precoid`)}\`\`` }
         )
         .setFooter({text:`Gerencie suas vendas por aqui.`})
         .setColor(dbcv.get(`color`));
       
        interaction.update({ embeds: [embednew] }).then(() => {
         interaction.followUp({
           content:`${emoji.sim} | Info encontrada!`,
           ephemeral:true
         })
        })
       }

    if (interaction.isModalSubmit() && interaction.customId === "pegar_modal") {
         const data_id = interaction.fields.getTextInputValue("text")
         
         if (!db3.has(data_id)) return interaction.reply({content:`:x: | Id inválido.`, ephemeral:true})
         
         db3.set(`${data_id}.id`, `${data_id}`)

         const embednew = new Discord.EmbedBuilder()
         .setTitle(`${dbcv.get(`title`)} | Produto da compra`)
         .setThumbnail(dbcv.get(`foto`))
         .addFields({name:`📡 | Status:`,value: `${db3.get(`${data_id}.status`)}`})
         .addFields({name: `${emoji.user} | Comprador:`, value:`<@${db3.get(`${data_id}.userid`)}>`})
         .addFields({name:`📅 | Data da compra:`, value:`${db3.get(`${data_id}.dataid`)}`})
         .addFields({name:`${emoji.planet} | Produto:`,value: `${db3.get(`${data_id}.nomeid`)}`})
         .addFields({name: `${emoji.caixa} | Produto entregue:`,value: `\`\`\`${db3.get(`${data_id}.entrid`)}\`\`\``})
         .setFooter({text:`Gerencie suas vendas por aqui.`})
         .setColor(dbcv.get(`color`))
         interaction.update({ embeds: [embednew] }).then(() => {
           interaction.followUp({
             content:`${emoji.sim} | Produto encontrado!`,
             ephemeral:true
           })
         })
       }

  
  
  if (interaction.isModalSubmit()) {
    const customId = interaction.customId
    const adb = customId.split("_")[0]
    
    if (customId.endsWith("_modaldel")) {
      const aab = interaction.fields.getTextInputValue("sla")
      
      if (aab == 'SIM' || aab == 'Sim' || aab == 'sim') {
        interaction.message.delete()
        db.delete(adb)
        interaction.reply({ content: `✅ Produto deletado com sucesso!`, ephemeral: true })
      } else {
        interaction.reply({ content: `ERROR: você não digitou \`SIM\` corretamente.`, ephemeral: true })
      }
    }
    
    if (customId.endsWith("_modallimpars")) {
      const aab = interaction.fields.getTextInputValue("sla")
      
      if (aab == 'SIM' || aab == 'Sim' || aab == 'sim') {
        interaction.reply({ content: `✅ Estoque limpo com sucesso!`, ephemeral: true })
        const a = db.get(`${adb}.conta`);
        const removed = a.splice(0, `${db.get(`${adb}.conta`).length}`)
        db.set(`${adb}.conta`, a)
        
        var contas = db.get(`${adb}.conta`) || [];  
                          
                          if (contas.length === 0) {
                            
                              const embed = new Discord.EmbedBuilder()
                                  .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
                                  .setDescription("**Sem Estoque**")
                                  .setColor(dbcv.get(`color`))
                                  .setFooter({text: "Seu estoque está vazio."});
                              
                              interaction.message.edit({ embeds: [embed]});
                          } else {
                            
                              const maxItems = 25;
                              const limitedContas = contas.slice(0, maxItems);
                              
                              const backupItems = limitedContas.map((item, index) => `**📦 | ${index}º** - ${item}`);
                              const embed = new Discord.EmbedBuilder()
                                  .setTitle(`${dbcv.get(`title`)} | Gerenciar Produto`)
                                  .setDescription(`**Este é seu estoque:**\n\n${backupItems.join('\n')}`)
                                  .setColor(dbcv.get(`color`))
                                  .setFooter({text: "Seu estoque completo é este."});
                              
                              interaction.message.edit({ embeds: [embed] });
                          }
      } else {
        interaction.reply({ content: `ERROR: você não digitou \`SIM\` corretamente.`, ephemeral: true })
      }
    }
    
    const custom = interaction.customId
    const user = interaction.guild.members.cache.get(custom.split("_")[0])
    
    if (custom.endsWith("_modaladdsaldo")) {
       const valorr = interaction.fields.getTextInputValue("novosaldo")
       
       db4.add(`${user.id}.saldo`, valorr)
       interaction.reply({ content: `✅ Adicionado \`R$${Number(valorr).toFixed(2)}\` para o usuário ${user}`, ephemeral: true })
       
       pushembed()
    }
    
    if (custom.endsWith("_modaldelsaldo")) {
       const valorr = interaction.fields.getTextInputValue("novosaldo")
       
       if (Number(db4.get(`${user.id}.saldo`)) < valorr) return interaction.reply({ content: `🔍 | O ${user}, tem atualmente \`R$${Number(db4.get(`${user.id}.saldo`))}\`, não é possível retirar saldo deste usuário!`, ephemeral: true })
       
       db4.set(`${user.id}.saldo`, Number(db4.get(`${user.id}.saldo`)) - valorr)
       console.log(Number(db4.get(`${user.id}.saldo`)) - valorr)
       interaction.reply({ content: `✅ Removido \`R$${Number(valorr).toFixed(2)}\` do usuário ${user}`, ephemeral: true })
       
       pushembed()
    }
    

    if (custom.endsWith("_modalsetsaldo")) {
      const valorr = interaction.fields.getTextInputValue("setsaldo")
      
      db4.set(`${user.id}.saldo`, Number(valorr))
      console.log(Number(db4.get(`${user.id}.saldo`)) - valorr)
      interaction.reply({ content: `✅ Setado \`R$${Number(valorr).toFixed(2)}\` do usuário ${user}`, ephemeral: true })
      
      pushembed()
   }
   
   
    function pushembed() {
       const embed = new Discord.EmbedBuilder()
         .setTitle(`${client.user.username} | Administrando`)
         .setDescription(`👤 | Usuário: ${user}\n💸 | Saldo: ${Number(db4.get(`${user.id}.saldo`)).toFixed(0) || "0"}`)
         .setColor(dbcv.get(`color`))
         .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
          
      interaction.message.edit({ embeds: [embed] })
    }
  }
  
  if (interaction.isChannelSelectMenu()) {
    const customId = interaction.customId
    const adb = customId.split("_")[0]
    
    if (customId.endsWith("_altcategoriaa")) {
      interaction.deferUpdate()
      const sla = interaction.values[0]
      
      const bjza = interaction.guild.channels.cache.get(sla)
      
      db.set(`${adb}.categoria`, bjza.id)
      
      const rowconsfi = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('bangerenciar')
                        .setEmoji(`${emoji.banner}`)
                        .setLabel('Banner')
                        .setStyle(1),
                )
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('fotogerenciar')
                        .setEmoji(`${emoji.thumb}`)
                        .setLabel('Miniatura')
                        .setStyle(1),
                )
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('rolexgerenciar')
                        .setEmoji(`${emoji.coroa}`)
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
                        .setCustomId('voltar9218439')
                         .setEmoji('⬅️')
                        .setLabel('Voltar')
                          .setStyle(1),
              );
      
      const embedocngiasd = new Discord.EmbedBuilder()
           .setTitle(`${dbcv.get(`title`)} | Outras Configurações`)
           .setDescription(`**${emoji.lupa} | Id: \`\`${adb}\`\`\n\n${emoji.banner} | Banner: [Banner](${db.get(`${adb}.banner`)})\n${emoji.thumb} | Miniatura: [Miniatura](${db.get(`${adb}.foto`)})\n🎃 | Mínimo: ${db.get(`${adb}.minimo`) || "1"}\n${emoji.maleta} | Cargo: <@&${db.get(`${adb}.rolex`)}>**\n🛒 | Categoria: ${interaction.guild.channels.cache.get(db.get(`${adb}.categoria`)) || "\`Categoria padrão\`"}`)
           .setColor(dbcv.get(`color`))
           interaction.message.edit({ embeds: [embedocngiasd], components: [rowconsfi, rowconsfi2] })
    }
  };
if(interaction.isButton()) {
  const customId = interaction.customId;
  if(customId.endsWith("_aprovarcompracarrinho")) {
    const data_id = customId.split("_")[0];
    if (interaction.user.id !== `${perms.get(`${interaction.user.id}_id`)}`) {
      interaction.reply({content:`${emoji.nao} | Você não está na lista de pessoas!`, ephemeral:true})
        return;
    }

    db3.set(`${data_id}.status`, `Processando`)
    interaction.reply({
      embeds:[
        new Discord.EmbedBuilder()
        .setDescription(`✅ | Este Carrinho foi Aprovado com sucesso!`)
      ],
      ephemeral:true
    })
  }
}

  if(interaction.isModalSubmit() && interaction.customId === "configtermos_modal") {
    const newsa = interaction.fields.getTextInputValue("text")
    dbcv.set(`termos`, newsa)
   
   interaction.reply({
    embeds:[
      new Discord.EmbedBuilder()
      .setTitle("Preview dos Termos")
      .setDescription(`${dbcv.get(`termos`)}`)
    ],
    ephemeral:true
   })
}

if(interaction.isModalSubmit() && interaction.customId === "chavepix_modal") {
  const text = interaction.fields.getTextInputValue("text");
const text2 = interaction.fields.getTextInputValue("text2");
await dbcv.set(`chavepix`, text2)
await dbcv.set(`tipopix`, text)
const rowcomnasd = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('ativardesativarsemi')
    .setLabel('Semi-Automatico ON/OFF')
    .setStyle(dbcv.get(`semi-auto`) === true ? 3 : 4),
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('chavepix')
    .setLabel('Chave Pix')
    .setStyle(2),
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('qrcode')
    .setLabel('Qr Code')
    .setStyle(2),
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('voltar435435')
    .setEmoji('⬅️')
    .setLabel('Voltar')
    .setStyle(2),
);
const embedsemiauto = new Discord.EmbedBuilder()
  .setDescription(`### 🛠** | Sistema De Pagamento Semi Automático.**\n⚙ | Sistema: ${dbcv.get(`semi-auto`) === true ? "ON" : "OFF"}\n 🔗 | Chave Pix: \`${dbcv.get(`chavepix`)}\` - ${dbcv.get(`tipopix`)} \n📋 | Qr Code: ${dbcv.get(`qrcode`) === "remover" ? "Sem QRCode" : `[QrCode](${dbcv.get(`qrcode`)})`}`)
  .setFooter({text:`Selecione o sistema de deseja configurar.`})
  .setThumbnail(`${dbcv.get(`foto`)}`)
  .setColor(dbcv.get(`color`))
  interaction.update({ embeds: [embedsemiauto], components: [rowcomnasd] })
}
if(interaction.isModalSubmit() && interaction.customId === "qrcodebutton_modal") {
  const text = interaction.fields.getTextInputValue("text");
await dbcv.set(`qrcode`, text)
const rowcomnasd = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('ativardesativarsemi')
    .setLabel('Semi-Automatico ON/OFF')
    .setStyle(dbcv.get(`semi-auto`) === true ? 3 : 4),
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('chavepix')
    .setLabel('Chave Pix')
    .setStyle(2),
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('qrcode')
    .setLabel('Qr Code')
    .setStyle(2),
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('voltar435435')
    .setEmoji('⬅️')
    .setLabel('Voltar')
    .setStyle(2),
);
const embedsemiauto = new Discord.EmbedBuilder()
  .setDescription(`### 🛠** | Sistema De Pagamento Semi Automático.**\n⚙ | Sistema: ${dbcv.get(`semi-auto`) === true ? "ON" : "OFF"}\n 🔗 | Chave Pix: \`${dbcv.get(`chavepix`)}\` - ${dbcv.get(`tipopix`)} \n📋 | Qr Code: ${dbcv.get(`qrcode`) === "remover" ? "Sem QRCode" : `[QrCode](${dbcv.get(`qrcode`)})`}`)
  .setFooter({text:`Selecione o sistema de deseja configurar.`})
  .setThumbnail(`${dbcv.get(`foto`)}`)
  .setColor(dbcv.get(`color`))
  interaction.update({ embeds: [embedsemiauto], components: [rowcomnasd] })
}

if(interaction.isModalSubmit() && interaction.customId === "bitcoin_modal") {
  const text = interaction.fields.getTextInputValue("text")
  await dbcv.set(`btc`, `${text}`)
  const embedconfigpayss = new Discord.EmbedBuilder()
  .setTitle(`${dbcv.get(`title`)} | Configuração de Criptomoedas`)
  .setDescription(`📋 | Sistema de Criptomoedas: ${dbcv.get(`criptoonoff`) === true ? "`Ligado`" : "`Desligado`"} \n BTC: ${dbcv.get(`btc`) === "remover" ? "`Não Configurado`" :  dbcv.get(`btc`)}\n LTC: ${dbcv.get(`ltc`) === "remover" ? "`Não Configurado`" :  dbcv.get(`ltc`)} \n USDT: ${dbcv.get(`usdt`) === "remover" ? "`Não Configurado`" :  dbcv.get(`usdt`)}`)
  .setFooter({text:`Selecione o sistema de deseja configurar.`})
  .setThumbnail(`${dbcv.get(`foto`)}`)
  .setColor(dbcv.get(`color`))
  interaction.update({ embeds: [embedconfigpayss], components: [
    new Discord.ActionRowBuilder()
    .addComponents(
      new Discord.ButtonBuilder()
      .setCustomId("criptoonoff")
      .setLabel("Criptomoedas ON/OFF")
      .setStyle(dbcv.get(`criptoonoff`) === true ? 3 : 4),
      new Discord.ButtonBuilder()
      .setCustomId("bitcoin")
      .setLabel("BTC")
      .setStyle(2),
      new Discord.ButtonBuilder()
      .setCustomId("ltcoin")
      .setLabel("LTC")
      .setStyle(2),
      new Discord.ButtonBuilder()
      .setCustomId("usdt")
      .setLabel("USDT")
      .setStyle(2),
      new Discord.ButtonBuilder()
      .setCustomId("voltar2")
      .setLabel("Voltar")
      .setStyle(2),
    )
  ] })      
}

if(interaction.isModalSubmit() && interaction.customId === "ltcoin_modal") {
  const text = interaction.fields.getTextInputValue("text")
  await dbcv.set(`ltc`, `${text}`)
  const embedconfigpayss = new Discord.EmbedBuilder()
  .setTitle(`${dbcv.get(`title`)} | Configuração de Criptomoedas`)
  .setDescription(`📋 | Sistema de Criptomoedas: ${dbcv.get(`criptoonoff`) === true ? "`Ligado`" : "`Desligado`"} \n BTC: ${dbcv.get(`btc`) === "remover" ? "`Não Configurado`" :  dbcv.get(`btc`)}\n LTC: ${dbcv.get(`ltc`) === "remover" ? "`Não Configurado`" :  dbcv.get(`ltc`)} \n USDT: ${dbcv.get(`usdt`) === "remover" ? "`Não Configurado`" :  dbcv.get(`usdt`)}`)
  .setFooter({text:`Selecione o sistema de deseja configurar.`})
  .setThumbnail(`${dbcv.get(`foto`)}`)
  .setColor(dbcv.get(`color`))
  interaction.update({ embeds: [embedconfigpayss], components: [
    new Discord.ActionRowBuilder()
    .addComponents(
      new Discord.ButtonBuilder()
      .setCustomId("criptoonoff")
      .setLabel("Criptomoedas ON/OFF")
      .setStyle(dbcv.get(`criptoonoff`) === true ? 3 : 4),
      new Discord.ButtonBuilder()
      .setCustomId("bitcoin")
      .setLabel("BTC")
      .setStyle(2),
      new Discord.ButtonBuilder()
      .setCustomId("ltcoin")
      .setLabel("LTC")
      .setStyle(2),
      new Discord.ButtonBuilder()
      .setCustomId("usdt")
      .setLabel("USDT")
      .setStyle(2),
      new Discord.ButtonBuilder()
      .setCustomId("voltar2")
      .setLabel("Voltar")
      .setStyle(2),
    )
  ] })      
}

if(interaction.isModalSubmit() && interaction.customId === "usdt_modal") {
  const text = interaction.fields.getTextInputValue("text")
  await dbcv.set(`usdt`, `${text}`)
  const embedconfigpayss = new Discord.EmbedBuilder()
  .setTitle(`${dbcv.get(`title`)} | Configuração de Criptomoedas`)
  .setDescription(`📋 | Sistema de Criptomoedas: ${dbcv.get(`criptoonoff`) === true ? "`Ligado`" : "`Desligado`"} \n BTC: ${dbcv.get(`btc`) === "remover" ? "`Não Configurado`" :  dbcv.get(`btc`)}\n LTC: ${dbcv.get(`ltc`) === "remover" ? "`Não Configurado`" :  dbcv.get(`ltc`)} \n USDT: ${dbcv.get(`usdt`) === "remover" ? "`Não Configurado`" :  dbcv.get(`usdt`)}`)
  .setFooter({text:`Selecione o sistema de deseja configurar.`})
  .setThumbnail(`${dbcv.get(`foto`)}`)
  .setColor(dbcv.get(`color`))
  interaction.update({ embeds: [embedconfigpayss], components: [
    new Discord.ActionRowBuilder()
    .addComponents(
      new Discord.ButtonBuilder()
      .setCustomId("criptoonoff")
      .setLabel("Criptomoedas ON/OFF")
      .setStyle(dbcv.get(`criptoonoff`) === true ? 3 : 4),
      new Discord.ButtonBuilder()
      .setCustomId("bitcoin")
      .setLabel("BTC")
      .setStyle(2),
      new Discord.ButtonBuilder()
      .setCustomId("ltcoin")
      .setLabel("LTC")
      .setStyle(2),
      new Discord.ButtonBuilder()
      .setCustomId("usdt")
      .setLabel("USDT")
      .setStyle(2),
      new Discord.ButtonBuilder()
      .setCustomId("voltar2")
      .setLabel("Voltar")
      .setStyle(2),
    )
  ] })      
}

if(interaction.isButton() && interaction.customId === "btc_carrinho") {
  if(dbcv.get(`btc`) === "remover") {
    interaction.reply({
      content:"Está opção está desabilitada",
      ephemeral:true
    })
    return;
  }
  interaction.reply({
    embeds:[
      new Discord.EmbedBuilder()
      .addFields(
        {
          name:"BTC",value:`${dbcv.get(`btc`)}`
        }
      )
    ],
    ephemeral:true
  })
}

if(interaction.isButton() && interaction.customId === "ltc_carrinho") {
  if(dbcv.get(`ltc`) === "remover") {
    interaction.reply({
      content:"Está opção está desabilitada",
      ephemeral:true
    })
    return;
  }
  interaction.reply({
    embeds:[
      new Discord.EmbedBuilder()
      .addFields(
        {
          name:"LTC",value:`${dbcv.get(`ltc`)}`
        }
      )
    ],
    ephemeral:true
  })
}

if(interaction.isButton() && interaction.customId === "usdt_carrinho") {
  if(dbcv.get(`usdt`) === "remover") {
    interaction.reply({
      content:"Está opção está desabilitada",
      ephemeral:true
    })
    return;
  }
  interaction.reply({
    embeds:[
      new Discord.EmbedBuilder()
      .addFields(
        {
          name:"USDT",value:`${dbcv.get(`usdt`)}`
        }
      )
    ],
    ephemeral:true
  })
}


                      if (interaction.customId === "termosget") {
                        const embedsdf = new Discord.EmbedBuilder()
                          .setTitle(`${dbcv.get('title')} | Termos de compra`)
                          .setDescription(`${dbcv.get('termos')}`)
                          .setColor(dbcv.get('color'))
                          .setTimestamp();
                    
                        try {
                          await interaction.reply({ embeds: [embedsdf], ephemeral: true });
                        } catch (error) {
                          console.error('Erro ao responder à interação:', error);
                        }
                      }
                      if (interaction.isButton() && interaction.customId.startsWith("refund-")) {
    
                        if(interaction.user.id !== `${perms.get(`${interaction.user.id}_id`)}`) return interaction.reply(`${emoji.nao} | Você não possui permissão para utilizar este botão.`)
                      
                        await interaction.deferReply()
                    
                        const paymentId = interaction.customId.replace("refund-", "")
                    
                        try {
                          await axios.post(`https://api.mercadopago.com/v1/payments/${paymentId}/refunds`, {}, {
                            headers: {
                              Authorization: `Bearer ${dbcv.get("access_token")}`
                            }
                          })
                          
                          await interaction.editReply(`${emoji.sim} | Usuário(a) reembolsado com sucesso!`)
                          const logsstaffss3 = new Discord.EmbedBuilder()
                    
                          .setTitle(`${dbcv.get(`title`)} | Reembolso`)
                                 .addFields(
                                  {
                                      name: `${emoji.aviso} | Quem Reembolsou:`,
                                      value: `\`${interaction.user.username} - ${interaction.user.id}\``,
                                  },
                                  {
                                    name: '📡 | Status:',
                                    value: `\`Reembolsado\``,
                                },
                                {
                                  name: '📆 | Data do reembolso:',
                                  value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)`,
                              },
                                 )
                                 client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [logsstaffss3], content: `||<@&${dbcv.get(`equipe`)}>||`})
                        } catch (error) {
                          if (error instanceof axios.AxiosError) {
                            if (error.response.status === 400) {
                              await interaction.editReply(`${emoji.nao} | Este usuário(a) já foi reembolsado.`)
                              const logsstaffss2 = new Discord.EmbedBuilder()
                              .setTitle(`${dbcv.get(`title`)} | Reembolso`)
                                 .addFields(
                                  {
                                    name: '📡 | Status:',
                                    value: `\`Reembolsado\``,
                                },
                                {
                                  name: '📆 | Data do reembolso:',
                                  value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)`,
                              },
                              )
                                 .setFooter({ text: `${dbcv.get(`title`)} - Direitos reservados` })
                                 client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [logsstaffss2], content: `||<@&${dbcv.get(`equipe`)}>||`})
                            }
                          }
                        }
                      }

});

client.on('messageCreate', message => {
  if (message.author.bot) return;
  if (message.channel.type == 'dm') return;
  if (!message.content.toLowerCase().startsWith(config.get(`prefix`).toLowerCase())) return;
  if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;
  const args = message.content
      .trim().slice(config.get(`prefix`).length)
      .split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
      const commandFile = require(`./commands/${command}.js`)
      commandFile.run(client, message, args);
  } catch (err) { ; }
});
const dbp = new JsonDatabase({ databasePath:"./databases/painel.json" });

const db1 = new JsonDatabase({ databasePath:"./databases/personalizar.json" });
client.on("interactionCreate", (interaction) => {

  if (interaction.isButton()) {
    const eprod = db.get(interaction.customId);
      if (!eprod) return;
      const severi = interaction.customId;
        if (eprod) {
          const quantidade = db.get(`${severi}.conta`).length;
          const row = new Discord.ActionRowBuilder()               
          .addComponents(
            new Discord.ButtonBuilder()
              .setCustomId(severi)
              .setLabel(`${db1.get(`button.text`)}`)
              .setEmoji(`${db1.get(`button.emoji`)}`)
              .setStyle(db1.get(`button.style`)),
        )
        let titulo = `${db1.get(`titulo`)}`;
        titulo = titulo.replace(`#{nome}`, `${db.get(`${severi}.nome`)}`);
        titulo = titulo.replace(`#{preco}`, `${db.get(`${severi}.preco`,).toLocaleString()}`);
        titulo = titulo.replace(`#{estoque}`, `${db.get(`${severi}.conta`).length}`);
        let desc = `${db1.get(`desc`)}`;
        desc = desc.replace(`#{desc}`, `${db.get(`${severi}.desc`)}`);
        desc = desc.replace(`#{nome}`, `${db.get(`${severi}.nome`)}`);
        desc = desc.replace(`#{preco}`, `${db.get(`${severi}.preco`,).toLocaleString()}`);
        desc = desc.replace(`#{estoque}`, `${db.get(`${severi}.conta`).length}`);
        
        const embed = new Discord.EmbedBuilder()
          .setTitle(titulo)
          .setColor(dbcv.get(`color`))
          .setThumbnail(db.get(`${severi}.foto`))
          .setDescription(`${desc}`)
          .setImage(db.get(`${severi}.banner`))
          if(db1.get(`rodape`) !== "remover") {
            embed.setFooter({text:`${db1.get(`rodape`)}`})
          }
          
        interaction.message.edit({ embeds: [embed], components: [row] })

        
            
        if (quantidade < 1) {
          const embedsemstock = new Discord.EmbedBuilder()
            .setDescription(`${emoji.sino} | Lamentamos informar que estamos sem estoque neste produto no momento, espere um reabastecimento!`)
            .setColor(dbcv.get(`color`))

         const button94 = new Discord.ButtonBuilder()
          .setCustomId('ativarnotify')
          .setEmoji('🔔')
          .setLabel('Ativar Notificação')
          .setStyle(2)
          .setDisabled(false)

       const row241 = new Discord.ActionRowBuilder().addComponents(button94);

                   
            if (quantidade < 1) {
              const embedslogsss = new Discord.EmbedBuilder()
              .setTitle(`${dbcv.get(`title`)} | Fora de estoque`)
              .setColor(dbcv.get(`color`))
              .addFields(
                { name: '👥 | Usuário interresado(a):', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
                { name: '📝 | Produto:', value: `\`Produto: ${eprod.nome} - ${db.get(`${interaction.customId}.idproduto`)}\`` },
                { name: '🕒 | Data / Horário da tentativa:',  value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
            )
              
              .setFooter({ text: `${dbcv.get(`title`)} - Todos os direitos reservados.` })

              const button92 = new Discord.ButtonBuilder()
              .setCustomId('comprarcancelar')
              .setLabel('Mensagem Automática')
              .setStyle(2)
              .setDisabled(true);
              const row241 = new Discord.ActionRowBuilder().addComponents(button92);
              client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [embedslogsss], components: [row241]})
            }
           
         
         interaction.reply({ embeds: [embedsemstock], components: [row241], ephemeral: true }).then(async msg => {
           
           const filter = (i) => i.user.id == interaction.user.id;
           const collector = msg.createMessageComponentCollector({ filter, time: 300000 });
           
           collector.on('collect', (interaction2) => {
             
             if (interaction2.customId == "ativarnotify") {
               if (db11.has(interaction.user.id)) {
                 interaction2.reply({ content: `✅ | Você já estava com as notificações ativadas, portanto elas foram desativadas.\n**Caso queira ativar só clicar no botão novamente!**`, ephemeral: true })
                 db11.delete(interaction.user.id)
               } else if (!db11.has(interaction.user.id)) {
                 db11.set(`${interaction.user.id}.produto`, db.get(`${interaction.customId}.idproduto`))
                 interaction2.reply({ content: `✅ | Notificações ativadas com sucesso!`, ephemeral: true })
               }
             }
             
           })
           
         })
         

          return;

        }
       

        
        if (interaction.guild.channels.cache.find(c => c.topic === interaction.user.id)) {
          const channel = interaction.guild.channels.cache.find(c => c.topic === interaction.user.id);
          return interaction.reply({
            content: `${emoji.aviso} | Você já tem um carrinho criado!`,
            ephemeral: true,
            components: [
              new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                  .setStyle(5)
                  .setLabel('🛒・Ir para carrinho')
                  .setURL(`https://discord.com/channels/${channel.guild.id}/${channel.id}`)
              )
            ]
          });
        }        
      
                
            
        interaction.guild.channels.create({
          name:`🛒・${interaction.user.username}`, 
          type: Discord.ChannelType.GuildText,
          parent: db.get(`${interaction.customId}.categoria`) || dbcv.get(`category`),
          topic: interaction.user.id,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: ["ViewChannel", "SendMessages", "AddReactions"]
            },
            
            {
             id: interaction.user.id,
             allow: ["ViewChannel"],
             deny: ["SendMessages"]
           }
         ]
        }).then(async (c) => {
          await interaction.reply({
              content: `${emoji.carregando} | Criando o Carrinho...`,
              ephemeral: true
          })

          setTimeout(() => {
              interaction.editReply({
                  content: ` `,
                  embeds: [
                      new Discord.EmbedBuilder()
                          .setTitle(`${dbcv.get(`title`)} | Sistema de Vendas`)
                          .setColor(dbcv.get(`color`))
                          .setDescription(`${emoji.sim} | ${interaction.user} **Seu carrinho foi aberto com sucesso em: ${c}, fique à vontade para adicionar mais produtos.**`)
                  ],
                  components: [
                      new Discord.ActionRowBuilder()
                          .addComponents(
                              new Discord.ButtonBuilder()
                                  .setStyle(5)
                                  .setLabel('🛒・Ir para carrinho')
                                  .setURL(`https://discord.com/channels/${c.guildId}/${c.id}`)
                          )
                  ],
                  ephemeral: true
              });
          }, 500);
     

        let quantidade1 = 1;
        var precoalt = eprod.preco;
           var data_id = Math.floor(Math.random() * 999999999999999);
           db3.set(`${data_id}.id`, `${data_id}`)
           db3.set(`${data_id}.status`, `Pendente (1)`)
           db3.set(`${data_id}.userid`, `${interaction.user.id}`)
           db3.set(`${data_id}.dataid`, `${moment().format('LLLL')}`)
           db3.set(`${data_id}.nomeid`, `${eprod.nome}`)
           db3.set(`${data_id}.qtdid`, `${quantidade1}`)
           db3.set(`${data_id}.precoid`, `${precoalt}`)
           db3.set(`${data_id}.entrid`, `Ainda nada...`)
           db3.set(`${data_id}.formapagamento`, `Pix`)
           db10.set(`desconto`, `0`)
           db10.set(`avalicao`, `Nenhum comentário adicional.`)
           

           const embedlogsgs = new Discord.EmbedBuilder()
    .setTitle(`${dbcv.get('title')} | Carrinho Criado`)
    .addFields(
        { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
        { name: '📝 | Criou um Carrinho:', value: `\`Produto: ${eprod.nome} - ${data_id}\`` },
        { name: '🕒 | Data / Horário da Compra:',  value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
    )
    .setColor('Green')
    .setTimestamp()
    .setThumbnail(interaction.user.displayAvatarURL({ format: 'png' }))


const button32 = new Discord.ButtonBuilder()
    .setCustomId('comprarcancelar')
    .setLabel('Mensagem Automática')
    .setStyle(2)
    .setDisabled(true);

const row241 = new Discord.ActionRowBuilder().addComponents(button32);

client.channels.cache.get(dbcv.get('logs_staff')).send({
    embeds: [embedlogsgs],
    components: [row241],
});


          const timer2 = setTimeout(function () {

           const logdssa = new Discord.EmbedBuilder()
           .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
           .setColor('RED')
           .addFields(
            { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
            { name: '📝 | Motivo:', value: `\`Cancelada por inatividade.\`` },
            { name: '🕒 | Data / Horário:', value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
          )
          .setThumbnail(interaction.user.displayAvatarURL({ format: "png" }))
          .setTimestamp()
          .setFooter({name: `${interaction.user.username} - ${interaction.user.id}`, value: interaction.user.displayAvatarURL({ format: "png" })})
          const button21 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row242 = new ActionRowBuilder().addComponents(button21);
           client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [logdssa], components: [row242]})

            if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
            const embedcancelar356 = new Discord.EmbedBuilder()
             .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
             .setDescription(`Olá ${interaction.user},\n\n• A sua compra foi cancelada por **inatividade**, e todos os produtos foram devolvidos para o estoque. Você pode voltar a comprar quando quiser!`)
             .setColor(dbcv.get(`color`))
             const button2 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row22 = new ActionRowBuilder().addComponents(button2);
             interaction.user.send({ embeds: [embedcancelar356], components: [row22] }) 
            db3.delete(`${data_id}`)
          }, 600000)
             
           const row = new Discord.ActionRowBuilder()

           .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId('addboton')
            .setLabel(`+`)
            .setStyle(2),
           )
           .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId('tesdod')
            .setLabel(`${emoji.lapis}`)
            .setStyle(3),
           )
             .addComponents(
               new Discord.ButtonBuilder()
               .setCustomId('removeboton')
               .setLabel(`-`)
               .setStyle(2),
             )

           
             const embedsdf = new Discord.EmbedBuilder()
          .setTitle(`**${dbcv.get(`title`)} | Termos de compra**`)
          .setDescription(`**${dbcv.get(`termos`)}**`)
          .setColor(dbcv.get(`color`))

           const embedsstermos = new Discord.EmbedBuilder()
             .setAuthor({name:`${dbcv.get('title')} | Sistema de Compra`,iconURL: interaction.guild.iconURL({ dynamic: true })})
             .setThumbnail(dbcv.get(`foto`))       
             .setColor(dbcv.get(`color`))
             .setDescription(`${emoji.megafone} | Olá <@${interaction.user.id}>, este é seu carrinho, fique à vontade para adicionar mais produtos ou fazer as modificações que achar necessário.\n\n${emoji.fixo} | ***__Importante:__*** Verifique se o seu privado está aberto. Para verificar se ele está aberto, ***__clique no botão testar DM__***. Se o seu privado estiver fechado, ***o produto adquirido não chegará à seu privado.***\n\n${emoji.alerta} | Lembre-se de ler nossos termos de compra, para não ter nenhum problema futuramente, ao continuar com a compra, você concorda com nossos termos.\n\n${emoji.sino} | Quando estiver tudo pronto aperte o botão abaixo, para continuar com sua compra!`)
             .setFooter({ text: `${dbcv.get(`title`)} - Todos os direitos reservados.` })
             const row3 = new Discord.ActionRowBuilder()

           .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId('comprarboton')
            .setLabel('Aceitar e Continuar')
            .setEmoji(`${emoji.aceitar}`)
            .setStyle(3),

           )
           .addComponents(
           new Discord.ButtonBuilder()
           .setCustomId('cancelarbuy')
           .setLabel('Cancelar')
           .setEmoji(`${emoji.negar}`)
           .setStyle(4)
           )

           .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId('DM')
            .setLabel('Testar DM')
            .setEmoji(`${emoji.envelope}`)
            .setStyle(1)
            )


            
                                                
           const embedss = new Discord.EmbedBuilder()
           .setDescription(`${emoji.planet}  **| Produto:** \`${eprod.nome}\`\n\n ${emoji.caixa} **| Quantidade:** \`${quantidade1}\`\n\n ${emoji.dinheiro} **| Preço** \`R$${precoalt}\`\n\n **${emoji.carrinho} | Quantidade disponível: \`${quantidade}\`**`)
           .setColor(dbcv.get(`color`))
             c.send({ embeds: [embedsstermos], content: `||<@${interaction.user.id}>||`, components: [row3], fetchReply: true }).then(msg => {
              const filter = i => i.user.id === interaction.user.id;
              const collector = msg.createMessageComponentCollector({ filter });
              collector.on("collect", intera => {
                //intera.deferUpdate()
                if (intera.customId === 'cancelarbuy') {
                  clearInterval(timer2);
                  const embedcancelar = new Discord.EmbedBuilder()
                             .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                             .setDescription(`Olá ${interaction.user},\n\n• Você cancelou a compra, e todos os produtos foram devolvido para o estoque. Você pode voltar a comprar quando quiser!`)
                             .setColor(dbcv.get(`color`))

const button2 = new ButtonBuilder()
    .setCustomId('comprarcancelar')
    .setLabel('Mensagem Automática')
    .setStyle(2)
    .setDisabled(true);

const row22 = new ActionRowBuilder().addComponents(button2);


                             interaction.user.send({embeds: [embedcancelar],  components: [row22]})

                             const logstaff = new Discord.EmbedBuilder()
                             .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
           .setColor(dbcv.get(`color`))
           .addFields(
            { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
            { name: '📝 | Motivo:', value: `\`Cancelada pelo usuário.\`` },
            { name: '🕒 | Data / Horário:', value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
          )
          .setThumbnail(interaction.user.displayAvatarURL({ format: "png" }))
          .setTimestamp()
          const button26 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row26 = new ActionRowBuilder().addComponents(button26);
                             client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [logstaff], components: [row26]})

                  db3.delete(`${data_id}`)
                  if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                }
                  
        
          if (intera.customId === `DM`) {
            intera.deferUpdate()
            const row09 = new Discord.ActionRowBuilder()
          .addComponents(
            new Discord.ButtonBuilder()
                        .setLabel('Voltar para o carrinho')
                        .setStyle(5)
                        .setURL(intera.channel.url),
          );


     
			  
                const embeddm = new Discord.EmbedBuilder()
                  .setTitle(`${dbcv.get(`title`)} | Sistema Vendas`)
                  .setDescription(`<@${interaction.user.id}>\nSe você recebeu essa mensagem sua dm está aberta, pode voltar para sua compra tranquilamente`)
                  .setColor(dbcv.get(`color`))
                interaction.user.send({ embeds: [embeddm], components: [row09] }).then(() => {
                  msg.channel.send({
                    content:`${emoji.redondoVerde} | Sua DM Foi Testada e está Aberta! agora pode prosseguir a sua compra`
                  }).then((msg) => {
                    setTimeout(() => {
                      msg.delete()
                    }, 5000);
                  })
                }).catch((err) => { // algo mais?
                  console.log(err)
                  msg.channel.send({
                    content:`${emoji.redondoVermelho} | Sua DM Foi Testada e está Fechada! Abra sua dm para prosseguir sua compra...`
                  }).then((msg) => {
                    setTimeout(() => {
                      msg.delete()
                    }, 5000);
                  })
                })
              }

                   if(dbcv.get(`semi-auto`) === false) {

                    if (intera.customId === "comprarboton") {
                      c.bulkDelete(50).then(() => {
                      if (quantidade1 < Number(db.get(`${interaction.customId}.minimo`) || "0")) return intera.reply({ content: `Você precisa comprar no minimo: ${db.get(`${interaction.customId}.minimo`)} produtos!`, ephemeral: true })
                      
                      c.bulkDelete(50).then(() => {
                        clearInterval(timer2);
                      const timer3 = setTimeout(function () {
                       if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                        db3.delete(`${data_id}`)
                  }, 600000)

                  

                      const row = new Discord.ActionRowBuilder()
                       
                        .addComponents(
                          new Discord.ButtonBuilder()
                            .setCustomId('continuarboton')
                            .setLabel('Ir para o Pagamento')
                            .setEmoji(`${emoji.aceitar}`)
                            .setStyle(3),
                      )
                      
                      if (db.get(`${interaction.customId}.cupom`) != 'OFF') {
                        row.addComponents(
                       new Discord.ButtonBuilder()
                         .setCustomId('addcboton')
                         .setLabel('Adicionar Cupom de Desconto')
                         .setEmoji(`${emoji.cupom}`)
                         .setDisabled(dbcv.get(`botaotruefalse`))
                         .setStyle(1),
                   )
                      }
                      
                      row.addComponents(
                          new Discord.ButtonBuilder()
                            .setCustomId('cancelarboton')
                            .setLabel("Cancelar Compra")
                            .setEmoji(`${emoji.negar}`)
                            .setStyle(4),
                      )
                                         
                      const embedss = new Discord.EmbedBuilder()
                      .setAuthor({name:`${dbcv.get('title')} | Resumo da Compra`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                      .setDescription(`${emoji.planet} | Produto: \`${eprod.nome}\`\n ${emoji.dinheiro} | Valor unitário:  \`R$${db.get(`${severi}.preco`)}\`\n ${emoji.caixa} | Quantidade: \`${quantidade1}\`\n${emoji.carrinho} | Total: \`R$${db.get(`${severi}.preco`) * quantidade1}\`\n\n\n **${emoji.info2} | Desconto: \`0%\`\n ${emoji.presente} | Cupom adicionado: \`Sem Cupom\`**`)                                     
                      .setColor(dbcv.get(`color`))
                        
                      intera.channel.send({ embeds: [embedss], components: [row], content: `||<@${interaction.user.id}>||`, fetchReply: true }).then(msg => {
                        const filter = i => i.user.id === interaction.user.id;
                        const collector = msg.createMessageComponentCollector({ filter });
                        collector.on("collect", intera2 => {
                  //        intera2.deferUpdate()
                  
                  if (intera2.customId === 'addcboton') {
                    row.components[1].setDisabled(true)
                    const ModalBuildercupom = new ModalBuilder();
                    ModalBuildercupom.setTitle(`Adicionar Cupom`)
                    ModalBuildercupom.setCustomId('ModalBuilderCupomm')
                    
                    const textCupom = new Discord.TextInputBuilder()
                    .setCustomId('cupomadd')
                    .setLabel('NOME DO CUPOM?')
                    .setStyle(1)
                  
                    
                    const actioncupom = new ActionRowBuilder().addComponents(textCupom)
                    
                    ModalBuildercupom.addComponents(actioncupom)
                    intera2.showModal(ModalBuildercupom)
                  }
                  
                  client.once('interactionCreate', async (interaction) => {
                    
                    if (interaction.isModalSubmit() && interaction.customId === 'ModalBuilderCupomm') {
                      let cupom = `${interaction.fields.getTextInputValue('cupomadd')}`;
                      if (`${cupom}` !== `${dbc.get(`${cupom}.idcupom`)}`) {
                        interaction.reply({ content: `:x: | Cupom de desconto não existente.`, ephemeral: true });
                      } else {
                        var minalt = dbc.get(`${cupom}.minimo`);
                        var dscalt = dbc.get(`${cupom}.desconto`);
                        var qtdalt = dbc.get(`${cupom}.quantidade`);
                  
                        precoalt = Number(precoalt) + Number.parseInt(`1`);
                        minalt = Number.parseInt(minalt) + Number.parseInt(`1`);
                  
                        if (precoalt < minalt) {
                          interaction.reply({ content: `:x: | Você não atingiu o mínimo para usar este cupom!`, ephemeral: true });
                          return;
                        } else {
                          if (`${dbc.get(`${cupom}.quantidade`)}` === "0") {
                            interaction.reply({ content: `:x: | Este cupom de desconto não existe mais.`, ephemeral: true });
                          } else {
                            if (!interaction.guild.roles.cache.get(dbc.get(`${cupom}.cargo`))) {
                              
                            } else {
                              if (!interaction.member.roles.cache.has(dbc.get(`${cupom}.cargo`))) return interaction.reply({ content: `:x: | Você não possui o cargo desse cupom!`, ephemeral: true })
                            }
                            
                            if (`${cupom}` === `${dbc.get(`${cupom}.idcupom`)}`) {
                              cupom = `${dbc.get(`${cupom}.idcupom`)}`;
                              interaction.reply({ content: `${emoji.sim} | Cupom de desconto adicionado!`, ephemeral: true });
                  
                              const precinho = Number(precoalt);
                              const descontoComoFracao = Number(dbc.get(`${cupom}.desconto`) / 100);
                              const valorDesconto = Number(precinho * descontoComoFracao);
                              const precoComDesconto = precinho - valorDesconto;
                              console.log(`valor descontado: ${valorDesconto} do produto: ${eprod.nome} do carrinho do ${interaction.user.username} id da compra: ${data_id}`)

                              cp.add(`${cupom}.descontado`, valorDesconto-0.50);
                              cp.add(`${cupom}.usado`, 1);
                              precoalt = Number((precoComDesconto - 0.50).toFixed(2));
                              
                              
                              


                  
                              qtdalt = qtdalt - 1;
                  
                              const embedss2 = new Discord.EmbedBuilder()
                                .setAuthor({name:`${dbcv.get('title')} | Resumo da Compra`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                                .setDescription(`${emoji.planet} | Produto: \`${eprod.nome}\`\n ${emoji.dinheiro} | Valor unitário:  \`R$${db.get(`${severi}.preco`)}\`\n${emoji.caixa} | Quantidade: \`${quantidade1}\`\n${emoji.carrinho} | Total: \`R$${db.get(`${severi}.preco`) * quantidade1}\`\n\n\n${emoji.dinheiro} | Valor a Pagar: \`R$${Number(precoalt).toFixed(2)}\n\`${emoji.info2} | Desconto: \`${dbc.get(`${cupom}.desconto`)}%\`\n ${emoji.presente} | Cupom adicionado: \`${dbc.get(`${cupom}.idcupom`)}\``)                                     
                                .setColor(dbcv.get(`color`));
                  
                              msg.edit({ embeds: [embedss2], components: [row], content: `||<@${interaction.user.id}>||`, fetchReply: true });
                  
                              dbc.set(`${cupom}.quantidade`, `${qtdalt}`);
                              db10.set(`desconto`, precoalt);
                            }
                          }
                        }
                      }
                    }
                  });
                  
                  
                  
                        
                                     
                           if (intera2.customId === 'cancelarboton') {
                            clearInterval(timer3);
                            const embedcancelar2 = new Discord.EmbedBuilder()
                           .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                           .setDescription(`Olá ${interaction.user},\n\n• Você cancelou a compra, e todos os produtos foram devolvido para o estoque. Você pode voltar a comprar quando quiser!`)
                           .setColor(dbcv.get(`color`))

                           const button2 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row22 = new ActionRowBuilder().addComponents(button2);
                           interaction.user.send({embeds: [embedcancelar2], components: [row22]})

                           const asdaslog = new Discord.EmbedBuilder()
                           .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                           .setColor(dbcv.get(`color`))
                           .addFields(
                            { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
                            { name: '📝 | Motivo:', value: `\`Cancelada pelo usuário.\`` },
                            { name: '🕒 | Data / Horário:', value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
                          )
                          .setTimestamp()
                          .setThumbnail(interaction.user.displayAvatarURL({ format: "png" }))
                          const button26 = new ButtonBuilder()
                                             .setCustomId('comprarcancelar')
                                             .setLabel('Mensagem Automática')
                                             .setStyle(2)
                                             .setDisabled(true)
                                             const row26 = new ActionRowBuilder().addComponents(button26);
                             client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [asdaslog], components: [row26]})
                            db3.delete(`${data_id}`)
                            if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                          }                       


                            if (intera2.customId === "continuarboton") {
                            intera2.deferUpdate()
                              
                                
                              clearInterval(timer3);
                              const venda = setTimeout(function () {
                                const asdaslog = new Discord.EmbedBuilder()
                                .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
           .setColor(dbcv.get(`color`))
           .addFields(
            { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
            { name: '📝 | Motivo:', value: `\`Cancelada pelo usuário.\`` },
            { name: '🕒 | Data / Horário:', value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
          )
          .setTimestamp()
          .setThumbnail(interaction.user.displayAvatarURL({ format: "png" }))
          const button26 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row27 = new ActionRowBuilder().addComponents(button26);
                                client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [asdaslog], components: [row27]})

                                const embedcancelar3 = new Discord.EmbedBuilder()
              .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
              .setDescription(`Olá ${interaction.user},\n\n• A sua compra foi cancelada por **inatividade**, e todos os produtos foram devolvidos para o estoque. Você pode voltar a comprar quando quiser!`)
              .setColor(dbcv.get(`color`))
              const button2 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row22 = new ActionRowBuilder().addComponents(button2);
              interaction.user.send({ embeds: [embedcancelar3], components: [row22] })
                               if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                db3.delete(`${data_id}`)
                               }, dbcv.get(`tempopagar`));
                               
                              mercadopago.configurations.setAccessToken(dbcv.get(`access_token`));
                              var payment_data = {
                                transaction_amount: Number(precoalt),
                                description: `Pagamento | ${interaction.user.username} | ${data_id}`,
                                payment_method_id: 'pix',
                                 payer: {
                                   email: 'japanstorepayments@gmail.com',
                                   first_name: 'Homero',
                                   last_name: 'Brum',
                                   identification: {
                                    type: 'CPF',
                                    number: '09111189770'
                                  },
                                    address: {
                                      zip_code: '06233200',
                                      street_name: 'Av. das Nações Unidas',
                                      street_number: '3003',
                                      neighborhood: 'Bonfim',
                                      city: 'Osasco',
                                      federal_unit: 'SP'
                                    }
                                  }
                                  
                                };


                                mercadopago.configure({
                                    access_token: dbcv.get(`access_token`)
                                });

                                const preference = {                             
                                  external_reference: '123453546363667890',
                                  items: [
                                      {
                                          title: eprod.nome,
                                          unit_price: Number.parseFloat(precoalt),
                                          quantity: 1,
                                      }         
                                  ],
                                  
                                  }
                                  let preference_id = null;

                                  mercadopago.preferences.create(preference)
                                      .then((response) => {
                                          preference_id = response.body.id;
                                  
                                          // Agora você pode usar a variável preference_id
                                          // Exemplo:
                                          console.log('ID de preferência:', preference_id);
                                  
                                          // Se houver algo relacionado a pixpays aqui, você pode adicionar
                                          // como no exemplo abaixo
                                          // pixpays.algumaFuncao(preference_id);
                                      })
                                      .catch((error) => {
                                          console.log(error);
                                      });


                                
                                mercadopago.payment.create(payment_data).then(function (data) {
                                  db3.set(`${data_id}.status`, `Pendente (2)`)
                                  const buffer = Buffer.from(data.body.point_of_interaction.transaction_data.qr_code_base64, "base64");
                                  const attachment = new Discord.AttachmentBuilder(buffer, "payment.png");
                                  const checkout_link = `https://www.mercadopago.com.br/checkout/v1/redirect/payment-option-form/?preference-id=${preference_id}`
                                  const rowescolha = new Discord.ActionRowBuilder()
                                  .addComponents(   
                                    new Discord.ButtonBuilder()
                                    .setCustomId('pixpays')
                                    .setEmoji(`${emoji.pix}`)
                                    .setLabel("Pix")
                                    .setDisabled(dbcv.get(`pixtruedalse`))
                                    .setStyle(1),
                                  )
                                  .addComponents(
                                    new Discord.ButtonBuilder()
                                      .setCustomId('saldodecidir')
                                      .setEmoji(`${emoji.bagmoney}`)
                                      .setLabel('Saldo')
                                      .setDisabled(dbcv.get(`saldotruefalse`))
                                      .setStyle(1)
                                  );
                                  if(dbcv.get(`criptoonoff`) === true) {
                                    rowescolha.addComponents(
                                      new Discord.ButtonBuilder()
                                      .setCustomId("cripto_carrinho")
                                      .setLabel("Cripto Moedas")
                                      .setStyle(1)
                                      .setEmoji(`${emoji.envelope}`)
                                    )
                                  }
                                   rowescolha.addComponents( 
                                      new Discord.ButtonBuilder()
                                        .setCustomId('cancelarpix')
                                        .setEmoji(`${emoji.negar}`)
                                        
                                        .setStyle(4),
                                  );
                                  msg.edit({content:`**\ ${emoji.loading} | Gerando Pagamento...**`, embeds:[],components:[]}).then(async tempMsg => {
                                    await new Promise(resolve => setTimeout(resolve, 2500));
                                    
                                  
                                    const embedpendente2 = new Discord.EmbedBuilder()
                                      .setTitle(`${dbcv.get(`title`)} | Sistema de pagamento`)
                                      .setDescription(`\`\`\`Escolha a forma de pagamento.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                      .setFooter({text:`Escolha entre as formas de pagamento abaixo.`})
                                      .setColor(dbcv.get(`color`));
                                  
                                    return msg.edit({ embeds: [embedpendente2], content: `||<@${interaction.user.id}>||`, components: [rowescolha] });
                                  }).then(msg => {
                                  const collector = msg.channel.createMessageComponentCollector();
                                 const lopp = setInterval(function () {
                                   const time2 = setTimeout(function () {
                                     clearInterval(lopp);
                                   }, 1800000)
                                  axios.get(`https://api.mercadolibre.com/collections/notifications/${data.body.id}`, {
                                   headers: {
                                     'Authorization': `Bearer ${dbcv.get(`access_token`)}`
                                   }
                                 }).then(async (doc) => {
                                if (doc.data.collection.status === "approved") {
                                    db3.set(`${data_id}.status`, `Processando`)
                                    
                       
                                                   
                                }

                                
                                      
                                if (`${db3.get(`${data_id}.status`)}` === "Processando") {
                                  clearTimeout(time2)
                                  clearInterval(lopp);
                                  clearInterval(venda);
                                  setTimeout(function () {
                                     if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }}, 80000)
                                   
                                     
                                    const a = db.get(`${severi}.conta`);
                                      db2.add("pedidostotal", 1)
                                      db2.add("gastostotal", Number(precoalt))
                                      db2.add(`${moment().format('L')}.pedidos`, 1)
                                      db2.add(`${moment().format('L')}.recebimentos`, Number(precoalt))
                                      db2.add(`${interaction.user.id}.gastosaprovados`, Number(precoalt))
                                      db2.add(`${interaction.user.id}.pedidosaprovados`, 1)
                                      db9.add(`${interaction.user.id}. gastosaprovados`, Number(precoalt))
 
                                      if (a < quantidade1) {}
                                            else { 
                                              const removed = a.splice(0, Number(quantidade1));
                                             db.set(`${severi}.conta`, a);
                                              const embedentrega = new Discord.EmbedBuilder()
                                                .setTitle(`${dbcv.get(`title`)} | Compra aprovada`)
                                                .addFields(
                                                  {
                                                    name: `${emoji.carrinho} | Produto(s) Comprado(s):`,
                                                    value: `${eprod.nome} x${db3.get(`${data_id}.qtdid`)}`,
                                                  },
                                                  {
                                                    name: `${emoji.estrela} | Id da Compra:`,
                                                    value: `\`\`${data_id}\`\``,
                                                  },
                                                  {
                                                    name: `${emoji.confete} | Muito obrigado por comprar conosco,`,
                                                    value: `${dbcv.get('title')} agradece a sua preferência!`,
                                                  }
                                                )
                                                .setImage(dbcv.get(`banner`))
                                                .setThumbnail(dbcv.get(`foto`))
                                                .setFooter({text:`Seu(s) Produto(s):`})
                                                .setColor(dbcv.get(`color`))
                                                const membro = interaction.guild.members.cache.get(interaction.user.id)
                                                const rolex = db.get(`${interaction.customId}.rolex`)
                                                setTimeout(() => {
                                           if (quantidade1 > 4) {
                                             fs.writeFile(`./produtos-${data_id}.txt`, `📦 | Entrega do produto: ${eprod.nome} - ${quantidade1}/${quantidade}\n${removed.join("\n\n")}`, (err) => {
                                  if (err) throw err;
                                  console.log('Arquivo criado com sucesso!');
                                  })
                                  const filed = `./produtos-${data_id}.txt`;
                                  
                                  interaction.user.send({ files: [filed] }).catch(error => {
                                    c.send(`Opa! parece que seu privado está bloqueado, mais não se preocupe, o produto será enviado neste canal!`)
                                    c.send({ files: [filed]})
                                    c.send(`Lembre-se de salvar o produto, o carrinho irá fechar em 1 minuto!`)
                                  })
                                  
                                  setTimeout(() => {
                                    fs.unlink(filed, (err) => {
                                      if (err) {
                                        console.error(`Erro ao apagar o arquivo: ${err}`);
                                        return;
                                      }
                                      console.log(`Arquivo foi apagado com sucesso.`);
                                    });
                                  }, 8000)
                                           }  else {
                                             interaction.user.send(`${emoji.planet} | Entrega do produto: ${eprod.nome} - x${quantidade1} Unidade \n${removed.join("\n")}`).catch(error => {
                                    c.send(`Opa! parece que seu privado está bloqueado, mais não se preocupe, o produto será enviado neste canal!`)
                                    c.send(`${emoji.planet} | Entrega do produto: ${eprod.nome} - x${quantidade1} Unidade \n${removed.join("\n")}`)
                                    c.send(`Lembre-se de salvar o produto, o carrinho irá fechar em 1 minuto!`)
                                  })
                                           }    
                                                }, 3000)
                                              interaction.user.send({ embeds: [embedentrega] }).then(async msga => {
                                               db3.set(`${data_id}.status`, `Concluido`)
                                               const deltc = new Discord.ActionRowBuilder()
                                  .addComponents(
                                    new Discord.ButtonBuilder()
                                     .setURL(msga.url)
                                     .setLabel('Atalho para DM')
                                     .setStyle(5)
                                  );
                                  
                                  c.bulkDelete(50).then(() => {
                                    if (rolex !== null){
                                      const roleasd = interaction.guild.roles.cache.find(role => role.id === db.get(`${interaction.customId}.rolex`))
                                      membro.roles.add(roleasd)
                                      const role = interaction.guild.roles.cache.find(role => role.id === dbcv.get(`role`))
                                      membro.roles.add(role).then(() => {console.log("Usuario já tem o cargo!")})
                                      intera.channel.send(`${emoji.sim} | Setei o cargo <@&${dbcv.get(`role`)}> com sucesso!\n${emoji.sim} | Pagamento Aprovado\n${emoji.estrela} | ID da compra: ${data_id} `)
                                    } else {
                                      const role = interaction.guild.roles.cache.find(role => role.id === dbcv.get(`role`))
                                      membro.roles.add(role).then(() => {console.log("Usuario já tem o cargo!")})
                                      intera.channel.send(`${emoji.sim} | Setei o cargo <@&${dbcv.get(`role`)}> com sucesso!\n${emoji.sim} | Pagamento Aprovado\n${emoji.estrela} | ID da compra: ${data_id} `)
                                    }
                                              const embedprocessando = new Discord.EmbedBuilder()
                                              .setAuthor({name:`${dbcv.get('title')} | Compra aprovada`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                                              .setDescription(`**${interaction.user} Pagamento aprovado verifique sua Dm**\n __este canal será apagado após 1 minuto__`)
                                              .setColor(dbcv.get(`color`))
                                              .setImage(dbcv.get(`banner`))
                                              db3.set(`${data_id}.entrid`, `${removed.join(" \n")}`)  
                                              c.send({ embeds:[embedprocessando], components: [deltc] })
                                              
                                                })
                                                
                                                
 
                                                const rowavaliar = new Discord.ActionRowBuilder()

                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`1star`)
                                                  .setLabel(`1`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                )
                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`2star`)
                                                  .setLabel(`2`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                )
                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`3star`)
                                                  .setLabel(`3`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                )
                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`4star`)
                                                  .setLabel(`4`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                )
                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`5star`)
                                                  .setLabel(`5`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                );
      
                                                

                                                db7.set(`${eprod.nome}.idproduto`, `${interaction.customId}`)
                                                db7.add(`${eprod.nome}.vendasfeitas`, `${db3.get(`${data_id}.qtdid`)}`)
                                                db7.add(`${eprod.nome}.valoresganhos`, `${precoalt}`)

                                              

                                                db8.set(`${interaction.user}.userid`, `${interaction.user.id}`)
                                                db8.add(`${interaction.user}.comprasrealizadas`, `1`)
                                                db8.add(`${interaction.user}.valoresganhos`, `${precoalt}`)

                                                

                                                let sleep = async (ms) => await new Promise(r => setTimeout(r, ms));
                                                let avaliacao = "\`Nenhuma Avaliação\`"
                                                let consi = "\`Nenhuma Consideração\`"
                                                const embed = await interaction.user.send({
                                                    embeds: [new Discord.EmbedBuilder()
                                                      .setAuthor({name:`${dbcv.get('title')} | Faça uma avaliação`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                                                        .setDescription(`**Caso queira, escolha uma nota para a venda:**`)
                                                        .setColor(dbcv.get(`color`))], components: [rowavaliar]})

                                                        const logstaffapr = new Discord.EmbedBuilder()
                                                        .setTitle(`${dbcv.get(`title`)} | Logs`)
                                                        .setDescription(`**${emoji.confete} Nova compra aprovada ${emoji.confete}\n\n${emoji.confete} Id da compra: \`\`${data_id}\`\`\n${emoji.carrinho} Produto: \`\`${eprod.nome}\`\`\n${emoji.dinheiro} Preço: \`\`${precoalt}\`\`\n${emoji.caixa} Quantidade: \`\`${quantidade1}\`\`**`)
                                                        .setFooter({ text: `${dbcv.get(`title`)} - Direitos reservados` });

                                                        client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [logstaffapr]})

                                                        

                                                fs.writeFile(`./produtos-${data_id}.txt`, `📦 | Entrega do produto: ${eprod.nome} - ${quantidade1}/${quantidade}\n${removed.join("\n\n")}`, (err) => {
                                  if (err) throw err;
                                  console.log('Arquivo criado com sucesso!');
                                  });
                                  
                                  const filed = `./produtos-${data_id}.txt`;
                                  
                                  setTimeout(() => {
     fs.unlink(filed, (err) => {
       if (err) {
         console.error(`Erro ao apagar o arquivo: ${err}`);
         return;
         }
         console.log(`Arquivo foi apagado com sucesso.`);
     });
     }, 8000);

                                                  const embedaprovadologstaff = new Discord.EmbedBuilder()
                                                .setAuthor({name:`${dbcv.get('title')} | Compra aprovada`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                                                .addFields(
                                                  {
                                                    name: `${emoji.star} | ID PEDIDO:`,
                                                    value: `${data_id}`,
                                                },
                                                {
                                                    name: `${emoji.star} | ID REEMBOLSO:`,
                                                    value: `${data.body.id}`,
                                                },
                                                  {
                                                      name: `${emoji.user} | COMPRADOR:`,
                                                      value: `${interaction.user} | ${interaction.user.username}`,
                                                  },
                                                  {
                                                    name: `${emoji.user} | ID COMPRADOR:`,
                                                    value: `\`${interaction.user.id}\``,
                                                },
                                                {
                                                  name: `${emoji.presente} | VALOR DO DESCONTO:`,
                                                  value: `\`R$${Number(db10.get(`desconto`)).toFixed(2)}\``,
                                                  },
                                                {
                                                  name: `${emoji.calendario} | DATA:`,
                                                  value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)`,
                                              },
                                              {
                                                name: `${emoji.planet} | PRODUTO(S) ID(S):`,
                                                value: `\`${db.get(`${interaction.customId}.idproduto`)}\``,
                                              },
                                                  {
                                                      name: `${emoji.planet} | Produto(s) Comprado(s):`,
                                                      value: `${eprod.nome} x${db3.get(`${data_id}.qtdid`)}`,
                                                  },
                                                  {
                                                      name: `${emoji.dinheiro} | Valor Pago:`,
                                                      value: `\`R$${precoalt}\``,
                                                  },
                                                  {
                                                      name: `${emoji.maos} | MÉTODO DE PAGAMENTO:`,
                                                      value: `${db3.get(`${data_id}.formapagamento`)}`,
                                                  },
                                                  {
                                                      name: `${emoji.estrela} | PRODUTO ENTREGUE:`,
                                                      value: `\`\`\`📦 | Entrega do Produto: ${eprod.nome} - ${quantidade1}/${quantidade1}\n${db3.get(`${data_id}.entrid`)}\`\`\``,
                                                  }
                                                  
                                                 //value: `\`\`\`📦 | Entrega do Produto: ${eprod.nome} - ${quantidade1}/${quantidade1}\n${db3.get(`${data_id}.entrid`)}\`\`\``,
                                                 
                                              )
                                              
                                                .setFooter({ text: `${dbcv.get(`title`)} - Todos os direitos reservados.` })
                                                .setImage(`${db.get(`${interaction.customId}.banner`) || dbcv.get(`banner`)}`)
                                                .setThumbnail(dbcv.get(`foto`))
                                                .setColor('#000000')

                                                const row = new Discord.ActionRowBuilder()
                                .addComponents(
                                  new Discord.ButtonBuilder()
                                    .setCustomId(`refund-${data.body.id}`)
                                    .setEmoji(`${emoji.maos2}`)
                                    .setLabel('Reembolsar')
                                    .setStyle(1),
                              )
                                                
                                              client.channels.cache.get(dbcv.get(`logs_staff`)).send({ files: [filed], embeds: [embedaprovadologstaff], components: [row], content: `||<@${interaction.user.id}>||` })                                            
                                              setTimeout(() => {
                                               const embedaprovadolog = new Discord.EmbedBuilder()
                                               .setAuthor({name:`${dbcv.get('title')} | Compra aprovada`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                                               .addFields(
                                                {
                                                    name: `${emoji.user} | COMPRADOR:`,
                                                    value: `${interaction.user.username}  - ${interaction.user.id}`,
                                                },
                                                {
                                                    name: `${emoji.cart} | PRODUTO(S) COMPRADO(S):`,
                                                    value: `${eprod.nome} x${db3.get(`${data_id}.qtdid`)}`,
                                                },
                                                {
                                                    name: `${emoji.dinheiro} | VALOR PAGO:`,
                                                    value: `\`R$${precoalt}\``,
                                                },
                                                 {
                                                  name: `${emoji.presente} | VALOR DO DESCONTO:`,
                                                  value: `\`R$${Number(db10.get(`desconto`)).toFixed(2)}\``,
                                                  },
                                                {
                                                    name: `${emoji.calendario} | DATA:`,
                                                    value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)`,
                                                },
                                                {
                                                    name: `${emoji.estrela2} | Avaliação:`,
                                                    value: `${avaliacao}\n**__${interaction.user.username}__: **\`${consi}\``,
                                                },
                                            )
                                            
                                               .setFooter({ text: `${dbcv.get(`title`)} - Todos os direitos reservados.` })
                                               .setImage(`${db.get(`${interaction.customId}.banner`) || dbcv.get(`banner`)}`)
                                               .setThumbnail(dbcv.get(`foto`))
                                               .setColor(dbcv.get(`color`))
                                              client.channels.cache.get(dbcv.get(`logs_feedback`)).send({ embeds: [embedaprovadolog], content: `||<@${interaction.user.id}>||` })

                                              }, 30000);
  
const interacaoavaliar = embed.createMessageComponentCollector({ componentType: Discord.ComponentType.Button });
interacaoavaliar.on("collect", async (interaction) => {
  if (interaction.user.id != interaction.user.id) {
      return;
  }

  if (interaction.isButton()) {
    var escrito = ""
    var textoest = ""
    var estrelas = interaction.customId.replace("star", "")

for (let i = 0; i != estrelas; i++) {
    textoest = `${textoest} ⭐`
}

const Modal = new ModalBuilder().setCustomId("ModalBuilder_avalia")
.setTitle("Considerações finais?");
const text = new Discord.TextInputBuilder()
.setCustomId("consi")
.setLabel("Como foi receber o produto?")
.setRequired(false)
.setStyle(1)
.setPlaceholder("(OPCIONAL)")


Modal.addComponents(new Discord.ActionRowBuilder().addComponents(text))
await interaction.showModal(Modal
  )


  }
  
  client.once('interactionCreate', async (interaction) => {


    if(interaction.customId==="ModalBuilder_avalia" && interaction.isModalSubmit()) {
      const asdasd = interaction.fields.getTextInputValue("consi") || consi
      interaction.reply({
        content: `${emoji.confete} | Você é demais! Obrigado por avaliar a gente, isto ajuda muito! Volte sempre <3`,
      }).then(msg => {
        setTimeout(() => {
          msg.delete();
        }, 5500);
      }).then(msg => {
        
        const newDescription = `${emoji.estrela} | Obrigado por avaliar!`;
    
    embed.edit({
      content: newDescription,
      ephemeral: true,
      embeds: [],
      components: []
    }).then((editedMessage) => {
      setTimeout(() => {
        editedMessage.delete();
      }, 30000);
    });
    avaliacao = `${textoest} (${estrelas})`
    consi = `${asdasd}`})
    }

    
  })
})



})
  
const row = new Discord.ActionRowBuilder()               
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId(severi)
    .setLabel(`${db1.get(`button.text`)}`)
    .setEmoji(`${db1.get(`button.emoji`)}`)
    .setStyle(db1.get(`button.style`)),
)
let titulo = `${db1.get(`titulo`)}`;
titulo = titulo.replace(`#{nome}`, `${db.get(`${severi}.nome`)}`);
titulo = titulo.replace(`#{preco}`, `${db.get(`${severi}.preco`,).toLocaleString()}`);
titulo = titulo.replace(`#{estoque}`, `${db.get(`${severi}.conta`).length}`);
let desc = `${db1.get(`desc`)}`;
desc = desc.replace(`#{desc}`, `${db.get(`${severi}.desc`)}`);
desc = desc.replace(`#{nome}`, `${db.get(`${severi}.nome`)}`);
desc = desc.replace(`#{preco}`, `${db.get(`${severi}.preco`,).toLocaleString()}`);
desc = desc.replace(`#{estoque}`, `${db.get(`${severi}.conta`).length}`);

const embed = new Discord.EmbedBuilder()
.setTitle(titulo)
.setColor(dbcv.get(`color`))
.setThumbnail(db.get(`${severi}.foto`))
.setDescription(`${desc}`)
.setImage(db.get(`${severi}.banner`))
if(db1.get(`rodape`) !== "remover") {
  embed.setFooter({text:`${db1.get(`rodape`)}`})
}

interaction.message.edit({ embeds: [embed], components: [row] })
                                                    
                                                    }}})}, 10000)
                                                 
                                                     collector.on("collect", interaction => {
  
                                                      const rowpixpayments = new Discord.ActionRowBuilder()
                                                      .addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('codigo')
                                                        .setLabel("Chave Pix")
                                                        .setEmoji(`${emoji.pix}`)
                                                        .setStyle(1),
                                                      )
                                                      .addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('qrcode')
                                                        .setLabel('QR Code')
                                                        .setEmoji(`${emoji.qrcode}`)
                                                        .setStyle(1),
                                                      )
                                                      
                                                      .addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('cancelarpix')
                                                        .setEmoji(`${emoji.negar}`)
                                                        .setStyle(4),
                                                      );

                                                      

                                                      const rowpagarsite = new Discord.ActionRowBuilder()
                                                      .addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setURL(checkout_link)
                                                        .setEmoji(`${emoji.maos}`)
                                                        .setLabel(`Realizar Pagamento`)
                                                        .setStyle(5)
                                                      )

                                                      .addComponents(   
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('pixpays')
                                                        .setEmoji(`${emoji.pix}`)
                                                        .setLabel("Pix")
                                                        .setDisabled(dbcv.get(`pixtruedalse`))
                                                        .setStyle(1),
                                                      )     
                                                      .addComponents(   
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('saldocomprar')
                                                        .setEmoji(`${emoji.pix}`)
                                                        .setLabel("teste")
                                                        .setDisabled(dbcv.get(`saldotruefalse`))
                                                        .setStyle(1),
                                                      ) 
                                                      if(dbcv.get(`criptoonoff`) === true) {
                                                        rowescolha.addComponents(
                                                          new Discord.ButtonBuilder()
                                                          .setCustomId("cripto_carrinho")
                                                          .setLabel("Cripto Moedas")
                                                          .setStyle(1)
                                                          .setEmoji(`${emoji.envelope}`)
                                                        )
                                                      }
                                                       rowescolha.addComponents( 
                                                          new Discord.ButtonBuilder()
                                                            .setCustomId('cancelarpix')
                                                            .setEmoji(`${emoji.negar}`)
                                                            
                                                            .setStyle(4),
                                                      );

                                                      if(interaction.customId === "cripto_carrinho") {
                                                        interaction.deferUpdate()
                                                          
                                                        db3.set(`${data_id}.formapagamento`, `Pago com criptomoedas`)
                                                        clearInterval(venda);
                                                       const embedpixpayments = new Discord.EmbedBuilder()
                                                       .setTitle(`${dbcv.get(`title`)} | Criptomoedas`)
                                                       .setImage(dbcv.get(`banner`)) 
                                                       .setDescription(`\`\`\`Escolha a forma de pagamento.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                                         .setColor(dbcv.get(`color`))
                                                         .setFooter({ text: `Escolha entre os abaixo, após escolher, pague.` })
                                                       msg.edit({ embeds: [embedpixpayments], content: `||<@${interaction.user.id}>||`, components: [
                                                        new ActionRowBuilder()
                                                        .addComponents(
                                                          new ButtonBuilder()
                                                          .setCustomId("btc_carrinho")
                                                          .setLabel("BTC")
                                                          .setStyle(1),
                                                          new ButtonBuilder()
                                                          .setCustomId("ltc_carrinho")
                                                          .setLabel("LTC")
                                                          .setStyle(1),
                                                          new ButtonBuilder()
                                                          .setCustomId("usdt_carrinho")
                                                          .setLabel("USDT")
                                                          .setStyle(1),
                                                          new Discord.ButtonBuilder()
                                                        .setCustomId(`${data_id}_aprovarcompracarrinho`)
                                                        .setLabel('Aprovar Compra')
                                                        .setEmoji(`${emoji.staff}`)
                                                        .setStyle(3),
                                                          new Discord.ButtonBuilder()
                                                          .setCustomId('cancelarpix')
                                                          .setEmoji(`${emoji.negar}`)
                                                          .setStyle(4),
                                                        )
                                                       ] })}
                                                        if (interaction.customId === 'pixpays') {
                                                          interaction.deferUpdate()
                                                            
                                                          clearInterval(venda);
                                                          setTimeout(function () {
                                                            if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                                             db3.delete(`${data_id}`)
                                                            },`${dbcv.get(`tempopagar`)}`)
                                                            const moment = require("moment");
                                    moment.locale("pt-br");
                                    const min = moment().add(`${dbcv.get(`tempopagar`)}`, 'milliseconds');
                                    const time = Math.floor(min.valueOf() / 1000);
                                                         const embedpixpayments = new Discord.EmbedBuilder()
                                                         .setTitle(`${dbcv.get(`title`)} | PIX`)
                                                         .setImage(dbcv.get(`banner`)) 
                                                         .setDescription(`\`\`\`Escolha a forma de pagamento.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}\n${emoji.lupa} | Pagamento expira em:\n<t:${time}:f> (<t:${time}:R>)`)
                                                           .setColor(dbcv.get(`color`))
                                                           .setFooter({ text: `Escolha entre os abaixo, após escolher, pague.` })
                                                         msg.edit({ embeds: [embedpixpayments], content: `||<@${interaction.user.id}>||`, components: [rowpixpayments] })
                                                         
                                                        }
                                                        
                                                      

                                                        if (interaction.customId === 'cancelarpix') {
                                                          clearInterval(lopp);
                                                          clearInterval(venda)
                                                          const embedcancelar3 = new Discord.EmbedBuilder()
                             .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                             .setDescription(`Olá ${interaction.user},\n\n• Você cancelou a compra, e todos os produtos foram devolvido para o estoque. Você pode voltar a comprar quando quiser!`)
                             .setColor(dbcv.get(`color`))
                             const button2 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row22 = new ActionRowBuilder().addComponents(button2);
                             
                             interaction.user.send({embeds: [embedcancelar3], components: [row22]})

                             const logstaff = new Discord.EmbedBuilder()
                             .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
           .setColor(dbcv.get(`color`))
           .addFields(
            { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
            { name: '📝 | Motivo:', value: `\`Cancelada pelo usuário.\`` },
            { name: '🕒 | Data / Horário:', value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
          )
          .setThumbnail(interaction.user.displayAvatarURL({ format: "png" }))
          .setTimestamp()
          const button26 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row29 = new ActionRowBuilder().addComponents(button26);
                             client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [logstaff], components: [row29] })
                                                          db3.delete(`${data_id}`)
                                                          if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                                         }
                                                     
                                                        if (interaction.customId === "codigo") {
                                                          interaction.deferUpdate()
                                                          rowpixpayments.components[0].setDisabled(true)
                                                          const moment = require("moment");
                                    moment.locale("pt-br");
                                    const min = moment().add(`${dbcv.get(`tempopagar`)}`, 'milliseconds');
                                    const time = Math.floor(min.valueOf() / 1000);
                                                          const embed2 = new Discord.EmbedBuilder()
                                                          .setTitle(`${dbcv.get(`title`)} | PIX`)
                                                          .setImage(dbcv.get(`banner`)) 
                                                          .setDescription(`\`\`\`Pague para receber o produto.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}\n${emoji.lupa} | Pagamento expira em:\n<t:${time}:f> (<t:${time}:R>)`)
                                                            .setColor(dbcv.get(`color`))
                                                            .setFooter({ text: `Após efetuar o pagamento, o tempo de entrega é de no maximo 1 minuto!` })
                                                         msg.edit({ embeds: [embed2], content: `||<@${interaction.user.id}>||`, components: [rowpixpayments] })

                                                          setTimeout(() => {
                                                            `${data.body.point_of_interaction.transaction_data.qr_code}`
                                                            interaction.followUp({
                                                              embeds:[
                                                                new Discord.EmbedBuilder()
                                                                .addFields(
                                                                  {
                                                                    name:"🔑 | Tipo de Chave:",
                                                                    value:`Copiar e Colar`
                                                                  },
                                                                  {
                                                                    name:"🔗 | Chave Pix:",
                                                                    value:`${data.body.point_of_interaction.transaction_data.qr_code}`
                                                                  }
                                                                )
                                                              ],
                                                              ephemeral:true
                                                            })

                                                        }, 1000);
                                                        }
                                                        
                                                        if (interaction.customId === 'qrcode') {
                                                          interaction.deferUpdate()
                                                          
                                                          rowpixpayments.components[1].setDisabled(true)
                                                          const moment = require("moment");
                                    moment.locale("pt-br");
                                    const min = moment().add(`${dbcv.get(`tempopagar`)}`, 'milliseconds');
                                    const time = Math.floor(min.valueOf() / 1000);
                                                         const embed2 = new Discord.EmbedBuilder()
                                                         .setTitle(`${dbcv.get(`title`)} | PIX`)
                                                         .setImage(dbcv.get(`banner`)) 
                                                         .setDescription(`\`\`\`Pague para receber o produto.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}\n${emoji.lupa} | Pagamento expira em:\n<t:${time}:f> (<t:${time}:R>)`)
                                                           .setColor(dbcv.get(`color`))
                                                           .setFooter({ text: `Após efetuar o pagamento, o tempo de entrega é de no maximo 1 minuto!` })
                                                         msg.edit({ embeds: [embed2], content: `||<@${interaction.user.id}>||`, components: [rowpixpayments] })
                                                         
                                                         setTimeout(() => {

                                                         
                                                         const aes = msg.channel.send({files: [attachment] }).then((aes) => {

                                                          const qrCodeUrl = aes.attachments.first().url;
                                                          const embedqrcode = new Discord.EmbedBuilder()
                                                         .setImage(qrCodeUrl)
                                                         .setTitle(`**QR CODE GERADO COM SUCESSO:**`) 
                                                         .setColor(dbcv.get(`color`))
                                                         interaction.followUp({embeds:[embedqrcode], ephemeral:true}).then(() => {
                                                          aes.delete()
                                                         })
                                                         })

                                                        }, 1000);
                                                        }

                                                        if (interaction.customId === 'chavepix') {
                                                            
                                                          rowpixpayments.components[2].setDisabled(true)
                                                          const embed2 = new Discord.EmbedBuilder()
                                                          .setTitle(`${dbcv.get(`title`)} | PIX`)
                                                          .setImage(dbcv.get(`banner`)) 
                                                          .setDescription(`\`\`\`Pague para receber o produto.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                                            .setColor(dbcv.get(`color`))
                                                            .setFooter({ text: `Após efetuar o pagamento, o tempo de entrega é de no maximo 1 minuto!` })
                                                          msg.edit({ embeds: [embed2], content: `||<@${interaction.user.id}>||`, components: [rowpixpayments] })
                                                          
                                                          setTimeout(() => {
 
                                                          const embedqrcode = new Discord.EmbedBuilder()
                                                          .setFooter({name:`Está forma de pagamento é manual, vai demorar mais para ser verificada"`})
                                                          .setTitle(`**${dbcv.get(`title`)} | Chave Pix**`)
                                                          .setDescription(`**Chave Pix: ${dbcv.get(`chavepix`)}**`)  
                                                          .setColor(dbcv.get(`color`))
                                                          msg.channel.send({ embeds: [embedqrcode], content: `${emoji.carregando} | Aguardando o Pagamento...` })
 
                                                         }, 1000);
                                                        }

                                                        const rowdecidirsaldo = new Discord.ActionRowBuilder()
                                                      .addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('saldocomprar')
                                                        .setLabel('Adicionar ao Carrinho')
                                                        .setEmoji(`${emoji.sim}`)
                                                        .setStyle(3),
                                                      )
                                                      .addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('voltar1')
                                                        .setLabel('Voltar')
                                                        .setEmoji(`${emoji.setaEsquerda}`)
                                                        .setStyle(1),
                                                      )

                                                      const saldo = db4.get(`${interaction.user.id}.saldo`) || "0";

                                                        if (interaction.customId === "saldodecidir") {
                                                          interaction.deferUpdate();
                                                          
                                                          const embedsaldodecidir = new Discord.EmbedBuilder()
                                                          .setTitle(`${dbcv.get(`title`)} | Saldo`)
                                                          .setDescription(`**Você deseja efetuar o pagamento de \`\`${eprod.nome}\`\` no valor de \`\`R$${precoalt}\`\` utilizando seu saldo de \`\`RS$${Number(saldo).toFixed(2)}\`\`?**`)
                                                          .setColor(dbcv.get(`color`))
                                                          msg.edit({ embeds: [embedsaldodecidir], components: [rowdecidirsaldo] })
                                                        }

                                                        if (interaction.customId === 'saldocomprar') {
                                                          interaction.deferUpdate();
                                                          const saldo = db4.get(`${interaction.user.id}.saldo`) || "0";
                                                          
                                                          if (saldo >= precoalt) {
                                                          db4.substr(`${interaction.user.id}.saldo`, `${precoalt}`)
                                                          db3.set(`${data_id}.formapagamento`, `Pago com saldo`)
                                                          db3.set(`${data_id}.status`, `Processando`)
                                                          
                                                          msg.channel.send(`**${emoji.sim} | Compra aprovada no valor de \`\`${precoalt}\`\`, este valor foi descontado do seu saldo.**`).then(msg => { setTimeout(() => msg.delete(), 5000)});
                                                      }
                                                           else {
                                                           
                                                          msg.channel.send(`${emoji.nao} | Você não tem saldo suficiente para realizar essa compra. Seu saldo: \`\`R$${Number(saldo).toFixed(2)}\`\`, valor da compra: \`\`R$${Number(precoalt).toFixed(2)}\`\``).then(msg => { setTimeout(() => msg.delete(), 5000)});
                                                        }
                                                        }

                                                        if (interaction.customId === "voltar1") {
                                                          interaction.deferUpdate();
                                                            
                                                          const embedded = new Discord.EmbedBuilder()
                                                          .setTitle(`${dbcv.get(`title`)} | Sistema de pagamento`)
                                                          .setDescription(`\`\`\`Escolha a forma de pagamento.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                                          .setImage(dbcv.get(`banner`)) 
                                                          .setThumbnail(dbcv.get(`foto`)) 
                                                          .setColor(dbcv.get(`color`))
                                                        msg.edit({ embeds: [embedded], content: `||<@${interaction.user.id}>||`, components: [rowescolha] })
                                                               
                                                         }

                                                        if (interaction.customId === "pagarsite") {
                                                            
                                                          clearInterval(venda);
                                                          const embedpagarsite = new Discord.EmbedBuilder()
                                                          .setFooter({name: `Após efetuar o pagamento, o tempo de entrega é de no maximo 1 minuto!`})
                                                          .setTitle(`**${dbcv.get(`title`)} | Copia e cola**`)
                                                          .setDescription(`\`\`\`Pague para receber o produto.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                                          .setImage(dbcv.get(`banner`)) 
                                                          .setThumbnail(dbcv.get(`foto`)) 
                                                          .setColor(dbcv.get(`color`))
                                                          msg.edit({ embeds: [embedpagarsite], components: [rowpagarsite], content: `||<@${interaction.user.id}>||` })


                                                        }

                                                        if (interaction.customId === "verificarpayments") {
                                                          interaction.deferUpdate();
                                                          const embedvefificarpayments = new Discord.EmbedBuilder()
                                                          .setFooter({name:`Estamos verificando...`})
                                                          .setTitle(`**${dbcv.get(`title`)} | Verificar pagamento**`)
                                                          .setDescription(`**Ei, <@&${dbcv.get(`equipe`)}> venha conferir o seguinte pagamento de \`\`${precoalt}\`\` e caso esteja correto, entregue o produto.**`)
                                                          .setColor(dbcv.get(`color`))
                                                          msg.channel.send({ embeds: [embedvefificarpayments], content: `||<@${interaction.user.id}>||` })
                                                        }
                                                     
                                                        
                                                       })
                                                     })
                                                   }).catch(function (error) {
                                                     console.log(error)
                                                     });
                          
                                                   }
                                                 })
                                              })
                      });
                      
                    })}


                   } else {


                    if (intera.customId === "comprarboton") {
                      msg.channel.bulkDelete(50).then(() => {
                      if (quantidade1 < Number(db.get(`${interaction.customId}.minimo`) || "0")) return intera.reply({ content: `Você precisa comprar no minimo: ${db.get(`${interaction.customId}.minimo`)} produtos!`, ephemeral: true })
                      
                      msg.channel.bulkDelete(50).then(() => {
                        clearInterval(timer2);
                      const timer3 = setTimeout(function () {
                       if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                        db3.delete(`${data_id}`)
                  }, 600000)

                  

                      const row = new Discord.ActionRowBuilder()
                       
                        .addComponents(
                          new Discord.ButtonBuilder()
                            .setCustomId('continuarboton')
                            .setLabel('Ir para o Pagamento')
                            .setEmoji(`${emoji.aceitar}`)
                            .setStyle(3),
                      )
                      
                      if (db.get(`${interaction.customId}.cupom`) != 'OFF') {
                        row.addComponents(
                       new Discord.ButtonBuilder()
                         .setCustomId('addcboton')
                         .setLabel('Adicionar Cupom de Desconto')
                         .setEmoji(`${emoji.cupom}`)
                         .setDisabled(dbcv.get(`botaotruefalse`))
                         .setStyle(1),
                   )
                      }
                      
                      row.addComponents(
                          new Discord.ButtonBuilder()
                            .setCustomId('cancelarboton')
                            .setLabel("Cancelar Compra")
                            .setEmoji(`${emoji.negar}`)
                            .setStyle(4),
                      )
                                         
                      const embedss = new Discord.EmbedBuilder()
                      .setAuthor({name:`${dbcv.get('title')} | Resumo da Compra`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                      .setDescription(`${emoji.planet} | Produto: \`${eprod.nome}\`\n ${emoji.dinheiro} | Valor unitário:  \`R$${db.get(`${severi}.preco`)}\`\n ${emoji.caixa} | Quantidade: \`${quantidade1}\`\n${emoji.carrinho} | Total: \`R$${db.get(`${severi}.preco`) * quantidade1}\`\n\n\n **${emoji.info2} | Desconto: \`0%\`\n ${emoji.presente} | Cupom adicionado: \`Sem Cupom\`**`)                                     
                      .setColor(dbcv.get(`color`))
                        
                      c.send({ embeds: [embedss], components: [row], content: `||<@${interaction.user.id}>||`, fetchReply: true }).then(msg => {
                        const filter = i => i.user.id === interaction.user.id;
                        const collector = msg.createMessageComponentCollector({ filter });
                        collector.on("collect", async(intera2) => {
                  
                  if (intera2.customId === 'addcboton') {
                    row.components[1].setDisabled(true)
                    const ModalBuildercupom = new ModalBuilder();
                    ModalBuildercupom.setTitle(`Adicionar Cupom`)
                    ModalBuildercupom.setCustomId('ModalBuilderCupomm')
                    
                    const textCupom = new Discord.TextInputBuilder()
                    .setCustomId('cupomadd')
                    .setLabel('NOME DO CUPOM?')
                    .setStyle(1)
                  
                    
                    const actioncupom = new ActionRowBuilder().addComponents(textCupom)
                    
                    ModalBuildercupom.addComponents(actioncupom)
                    intera2.showModal(ModalBuildercupom)
                  };
                  
                  client.once('interactionCreate', async (interaction) => {
                    
                    if (interaction.isModalSubmit() && interaction.customId === 'ModalBuilderCupomm') {
                      const cupom = `${interaction.fields.getTextInputValue('cupomadd')}`;
                      if (`${cupom}` !== `${dbc.get(`${cupom}.idcupom`)}`) {
                        interaction.reply({ content: `:x: | Cupom de desconto não existente.`, ephemeral: true });
                      } else {
                        var minalt = dbc.get(`${cupom}.minimo`);
                        var dscalt = dbc.get(`${cupom}.desconto`);
                        var qtdalt = dbc.get(`${cupom}.quantidade`);
                  
                        precoalt = Number(precoalt) + Number.parseInt(`1`);
                        minalt = Number.parseInt(minalt) + Number.parseInt(`1`);
                  
                        if (precoalt < minalt) {
                          interaction.reply({ content: `:x: | Você não atingiu o mínimo para usar este cupom!`, ephemeral: true });
                          return;
                        } else {
                          if (`${dbc.get(`${cupom}.quantidade`)}` === "0") {
                            interaction.reply({ content: `:x: | Este cupom de desconto não existe mais.`, ephemeral: true });
                          } else {
                            if (!interaction.guild.roles.cache.get(dbc.get(`${cupom}.cargo`))) {
                              
                            } else {
                              if (!interaction.member.roles.cache.has(dbc.get(`${cupom}.cargo`))) return interaction.reply({ content: `:x: | Você não possui o cargo desse cupom!`, ephemeral: true })
                            }
                            
                            const cupomId = `${dbc.get(`${cupom}.idcupom`)}`; // Renomeando para evitar conflitos de nome
                              if (`${cupom}` === cupomId) {
                               interaction.reply({ content: `${emoji.sim} | Cupom de desconto adicionado!`, ephemeral: true });
                                

                            
                              const precinho = Number(precoalt);
                              const descontoComoFracao = Number(dbc.get(`${cupom}.desconto`) / 100);
                              const valorDesconto = Number(precinho * descontoComoFracao);
                              const precoComDesconto = precinho - valorDesconto;
                              console.log(`valor descontado: ${valorDesconto} do produto: ${eprod.nome} do carrinho do ${interaction.user.username} id da compra: ${data_id}`);
                            
                              cp.add(`${cupom}.descontado`, valorDesconto - 0.50);
                              cp.add(`${cupom}.usado`, 1);
                              precoalt = Number((precoComDesconto - 0.50).toFixed(2));
                            
                              qtdalt = qtdalt - 1;
                            
                              const embedss2 = new Discord.EmbedBuilder()
                                .setAuthor({ name: `${dbcv.get('title')} | Resumo da Compra`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                                .setDescription(`${emoji.planet} | Produto: \`${eprod.nome}\`\n ${emoji.dinheiro} | Valor unitário: \`R$${db.get(`${severi}.preco`)}\`\n ${emoji.caixa} | Quantidade: \`${quantidade1}\`\n${emoji.carrinho} | Total: \`R$${db.get(`${severi}.preco`) * quantidade1}\`\n\n\n${emoji.dinheiro} | Valor a Pagar \`R$${Number(precoalt).toFixed(2)}\` \n${emoji.info2} | Desconto: \`${dbc.get(`${cupom}.desconto`)}%\`\n ${emoji.presente} | Cupom adicionado: \`${dbc.get(`${cupom}.idcupom`)}\``)
                                .setColor(dbcv.get(`color`));
                            
                              msg.edit({ embeds: [embedss2], components: [row], content: `||<@${interaction.user.id}>||`, fetchReply: true });
                            
                              dbc.set(`${cupom}.quantidade`, `${qtdalt}`);
                              db10.set(`desconto`, precoalt);
                            }
                            
                          }
                        }
                      }
                    }
                  });
                  
                  
                  
                        
                                     
                           if (intera2.customId === 'cancelarboton') {
                            clearInterval(timer3);
                            const embedcancelar2 = new Discord.EmbedBuilder()
                           .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                           .setDescription(`Olá ${interaction.user},\n\n• Você cancelou a compra, e todos os produtos foram devolvido para o estoque. Você pode voltar a comprar quando quiser!`)
                           .setColor(dbcv.get(`color`))

                           const button2 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row22 = new ActionRowBuilder().addComponents(button2);
                           interaction.user.send({embeds: [embedcancelar2], components: [row22]})

                           const asdaslog = new Discord.EmbedBuilder()
                           .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                           .setColor(dbcv.get(`color`))
                           .addFields(
                            { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
                            { name: '📝 | Motivo:', value: `\`Cancelada pelo usuário.\`` },
                            { name: '🕒 | Data / Horário:', value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
                          )
                          .setTimestamp()
                          .setThumbnail(interaction.user.displayAvatarURL({ format: "png" }))
                          const button26 = new ButtonBuilder()
                                             .setCustomId('comprarcancelar')
                                             .setLabel('Mensagem Automática')
                                             .setStyle(2)
                                             .setDisabled(true)
                                             const row26 = new ActionRowBuilder().addComponents(button26);
                             client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [asdaslog], components: [row26]})
                            db3.delete(`${data_id}`)
                            if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                          }                       


                            if (intera2.customId === "continuarboton") {
                            intera2.deferUpdate()
                              
                                
                              clearInterval(timer3);
                              const venda = setTimeout(function () {
                                const asdaslog = new Discord.EmbedBuilder()
                                .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
           .setColor(dbcv.get(`color`))
           .addFields(
            { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
            { name: '📝 | Motivo:', value: `\`Cancelada pelo usuário.\`` },
            { name: '🕒 | Data / Horário:', value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
          )
          .setTimestamp()
          .setThumbnail(interaction.user.displayAvatarURL({ format: "png" }))
          const button26 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row27 = new ActionRowBuilder().addComponents(button26);
                                client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [asdaslog], components: [row27]})

                                const embedcancelar3 = new Discord.EmbedBuilder()
              .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
              .setDescription(`Olá ${interaction.user},\n\n• A sua compra foi cancelada por **inatividade**, e todos os produtos foram devolvidos para o estoque. Você pode voltar a comprar quando quiser!`)
              .setColor(dbcv.get(`color`))
              const button2 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row22 = new ActionRowBuilder().addComponents(button2);
              interaction.user.send({ embeds: [embedcancelar3], components: [row22] })
                               if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                db3.delete(`${data_id}`)
                               }, dbcv.get(`tempopagar`));
                               
                            

                                  db3.set(`${data_id}.status`, `Pendente (2)`)
                                  const rowescolha = new Discord.ActionRowBuilder()
                                    
                                  .addComponents(   
                                    new Discord.ButtonBuilder()
                                    .setCustomId('pixpays')
                                    .setEmoji(`${emoji.pix}`)
                                    .setLabel("Pix")
                                    .setDisabled(dbcv.get(`pixtruedalse`))
                                    .setStyle(1),
                                  )
                                  .addComponents(
                                    new Discord.ButtonBuilder()
                                      .setCustomId('saldodecidir')
                                      .setEmoji(`${emoji.bagmoney}`)
                                      .setLabel('Saldo')
                                      .setDisabled(dbcv.get(`saldotruefalse`))
                                      .setStyle(1)
                                  )     
                                  if(dbcv.get(`criptoonoff`) === true) {
                                    rowescolha.addComponents(
                                      new Discord.ButtonBuilder()
                                      .setCustomId("cripto_carrinho")
                                      .setLabel("Cripto Moedas")
                                      .setStyle(1)
                                      .setEmoji(`${emoji.envelope}`)
                                    )
                                  }
                                   rowescolha.addComponents( 
                                      new Discord.ButtonBuilder()
                                        .setCustomId('cancelarpix')
                                        .setEmoji(`${emoji.negar}`)
                                        
                                        .setStyle(4),
                                  );
                                  msg.edit({content:`**\ ${emoji.loading} | Gerando Pagamento...**`, embeds:[],components:[]}).then(async tempMsg => {
                                    await new Promise(resolve => setTimeout(resolve, 2500));
                                    
                                  
                                    const embedpendente2 = new Discord.EmbedBuilder()
                                      .setTitle(`${dbcv.get(`title`)} | Sistema de pagamento`)
                                      .setDescription(`\`\`\`Escolha a forma de pagamento.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                      .setFooter({text:`Escolha entre as formas de pagamento abaixo.`})
                                      .setColor(dbcv.get(`color`));
                                  
                                    return msg.edit({ embeds: [embedpendente2], content: `||<@${interaction.user.id}>||`, components: [rowescolha] });
                                  }).then(msg => {
                                  const collector = msg.channel.createMessageComponentCollector();
                                 const lopp = setInterval(function () {
                                   const time2 = setTimeout(function () {
                                     clearInterval(lopp);
                                   }, 1800000)


                                
                                      
                                if (`${db3.get(`${data_id}.status`)}` === "Processando") {
                                  clearTimeout(time2)
                                  clearInterval(lopp);
                                  clearInterval(venda);
                                  setTimeout(function () {
                                     if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }}, 80000)
                                   
                                     
                                    const a = db.get(`${severi}.conta`);
                                      db2.add("pedidostotal", 1)
                                      db2.add("gastostotal", Number(precoalt))
                                      db2.add(`${moment().format('L')}.pedidos`, 1)
                                      db2.add(`${moment().format('L')}.recebimentos`, Number(precoalt))
                                      db2.add(`${interaction.user.id}.gastosaprovados`, Number(precoalt))
                                      db2.add(`${interaction.user.id}.pedidosaprovados`, 1)
                                      db9.add(`${interaction.user.id}. gastosaprovados`, Number(precoalt))
 
                                      if (a < quantidade1) {
                                        
                                           } else {
                                            const removed = a.splice(0, Number(quantidade1));
                                             db.set(`${severi}.conta`, a);
                                              const embedentrega = new Discord.EmbedBuilder()
                                                .setTitle(`${dbcv.get(`title`)} | Compra aprovada`)
                                                .addFields(
                                                  {
                                                    name: `${emoji.carrinho} | Produto(s) Comprado(s):`,
                                                    value: `${eprod.nome} x${db3.get(`${data_id}.qtdid`)}`,
                                                  },
                                                  {
                                                    name: `${emoji.estrela} | Id da Compra:`,
                                                    value: `\`\`${data_id}\`\``,
                                                  },
                                                  {
                                                    name: `${emoji.confete} | Muito obrigado por comprar conosco,`,
                                                    value: `${dbcv.get('title')} agradece a sua preferência!`,
                                                  }
                                                )
                                                .setImage(dbcv.get(`banner`))
                                                .setThumbnail(dbcv.get(`foto`))
                                                .setFooter({text:`Seu(s) Produto(s):`})
                                                .setColor(dbcv.get(`color`))
                                                const membro = interaction.guild.members.cache.get(interaction.user.id)
                                                const rolex = db.get(`${interaction.customId}.rolex`)
                                                
                                                setTimeout(() => {
                                           if (quantidade1 > 4) {
                                             fs.writeFile(`./produtos-${data_id}.txt`, `📦 | Entrega do produto: ${eprod.nome} - ${quantidade1}/${quantidade}\n${removed.join("\n\n")}`, (err) => {
                                  if (err) throw err;
                                  console.log('Arquivo criado com sucesso!');
                                  })
                                  const filed = `./produtos-${data_id}.txt`;
                                  
                                  interaction.user.send({ files: [filed] }).catch(error => {
                                    c.send(`Opa! parece que seu privado está bloqueado, mais não se preocupe, o produto será enviado neste canal!`)
                                    c.send({ files: [filed]})
                                    c.send(`Lembre-se de salvar o produto, o carrinho irá fechar em 1 minuto!`)
                                  })
                                  
                                  setTimeout(() => {
                                    fs.unlink(filed, (err) => {
                                      if (err) {
                                        console.error(`Erro ao apagar o arquivo: ${err}`);
                                        return;
                                      }
                                      console.log(`Arquivo foi apagado com sucesso.`);
                                    });
                                  }, 8000)
                                           }  else {
                                             interaction.user.send(`${emoji.planet} | Entrega do produto: ${eprod.nome} - x${quantidade1} Unidade \n${removed.join("\n")}`).catch(error => {
                                    c.send(`Opa! parece que seu privado está bloqueado, mais não se preocupe, o produto será enviado neste canal!`)
                                    c.send(`${emoji.planet} | Entrega do produto: ${eprod.nome} - x${quantidade1} Unidade \n${removed.join("\n")}`)
                                    c.send(`Lembre-se de salvar o produto, o carrinho irá fechar em 1 minuto!`)
                                  })
                                           }    
                                                }, 3000)
                                              interaction.user.send({ embeds: [embedentrega] }).then(async msga => {
                                               db3.set(`${data_id}.status`, `Concluido`)
                                               const deltc = new Discord.ActionRowBuilder()
                                  .addComponents(
                                    new Discord.ButtonBuilder()
                                     .setURL(msga.url)
                                     .setLabel('Atalho para DM')
                                     .setStyle(5)
                                  );
                                  
                                  msg.channel.bulkDelete(50).then(() => {
                                    if (rolex !== null){
                                      const roleasd = interaction.guild.roles.cache.find(role => role.id === db.get(`${interaction.customId}.rolex`))
                                      membro.roles.add(roleasd)
                                      const role = interaction.guild.roles.cache.find(role => role.id === dbcv.get(`role`))
                                      membro.roles.add(role).then(() => {console.log("Usuario já tem o cargo!")})
                                      msg.channel.send(`${emoji.sim} | Setei o cargo <@&${dbcv.get(`role`)}> com sucesso!\n${emoji.sim} | Pagamento Aprovado\n${emoji.estrela} | ID da compra: ${data_id} `)
                                    } else {
                                      const role = interaction.guild.roles.cache.find(role => role.id === dbcv.get(`role`))
                                      membro.roles.add(role).then(() => {console.log("Usuario já tem o cargo!")})
                                      msg.channel.send(`${emoji.sim} | Setei o cargo <@&${dbcv.get(`role`)}> com sucesso!\n${emoji.sim} | Pagamento Aprovado\n${emoji.estrela} | ID da compra: ${data_id} `)
                                    }
                                                
                                              const embedprocessando = new Discord.EmbedBuilder()
                                              .setAuthor({name:`${dbcv.get('title')} | Compra aprovada`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                                              .setDescription(`**${interaction.user} Pagamento aprovado verifique sua Dm**\n __este canal será apagado após 1 minuto__`)
                                              .setColor(dbcv.get(`color`))
                                              .setImage(dbcv.get(`banner`))
                                              db3.set(`${data_id}.entrid`, `${removed.join(" \n")}`)  
                                              c.send({ embeds:[embedprocessando], components: [deltc] })
                                                })
                                                
                                                
 
                                                const rowavaliar = new Discord.ActionRowBuilder()

                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`1star`)
                                                  .setLabel(`1`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                )
                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`2star`)
                                                  .setLabel(`2`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                )
                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`3star`)
                                                  .setLabel(`3`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                )
                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`4star`)
                                                  .setLabel(`4`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                )
                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`5star`)
                                                  .setLabel(`5`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                );
      
                                                

                                                db7.set(`${eprod.nome}.idproduto`, `${interaction.customId}`)
                                                db7.add(`${eprod.nome}.vendasfeitas`, `${db3.get(`${data_id}.qtdid`)}`)
                                                db7.add(`${eprod.nome}.valoresganhos`, `${precoalt}`)

                                              

                                                db8.set(`${interaction.user}.userid`, `${interaction.user.id}`)
                                                db8.add(`${interaction.user}.comprasrealizadas`, `1`)
                                                db8.add(`${interaction.user}.valoresganhos`, `${precoalt}`)

                                                

                                                let sleep = async (ms) => await new Promise(r => setTimeout(r, ms));
                                                let avaliacao = "\`Nenhuma Avaliação\`"
                                                let consi = "\`Nenhuma Consideração\`"
                                                const embed = await interaction.user.send({
                                                    embeds: [new Discord.EmbedBuilder()
                                                      .setAuthor({name:`${dbcv.get('title')} | Faça uma avaliação`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                                                        .setDescription(`**Caso queira, escolha uma nota para a venda:**`)
                                                        .setColor(dbcv.get(`color`))], components: [rowavaliar]})

                                                        const logstaffapr = new Discord.EmbedBuilder()
                                                        .setTitle(`${dbcv.get(`title`)} | Logs`)
                                                        .setDescription(`**${emoji.confete} Nova compra aprovada ${emoji.confete}\n\n${emoji.confete} Id da compra: \`\`${data_id}\`\`\n${emoji.carrinho} Produto: \`\`${eprod.nome}\`\`\n${emoji.dinheiro} Preço: \`\`${precoalt}\`\`\n${emoji.caixa} Quantidade: \`\`${quantidade1}\`\`**`)
                                                        .setFooter({ text: `${dbcv.get(`title`)} - Direitos reservados` });

                                                        client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [logstaffapr]})

                                                        

                                                fs.writeFile(`./produtos-${data_id}.txt`, `📦 | Entrega do produto: ${eprod.nome} - ${quantidade1}/${quantidade}\n${removed.join("\n\n")}`, (err) => {
                                  if (err) throw err;
                                  console.log('Arquivo criado com sucesso!');
                                  });
                                  
                                  const filed = `./produtos-${data_id}.txt`;
                                  
                                  setTimeout(() => {
     fs.unlink(filed, (err) => {
       if (err) {
         console.error(`Erro ao apagar o arquivo: ${err}`);
         return;
         }
         console.log(`Arquivo foi apagado com sucesso.`);
     });
     }, 8000);

                                                  const embedaprovadologstaff = new Discord.EmbedBuilder()
                                                .setAuthor({name:`${dbcv.get('title')} | Compra aprovada`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                                                .addFields(
                                                  {
                                                    name: `${emoji.star} | ID PEDIDO:`,
                                                    value: `${data_id}`,
                                                },
                                                  {
                                                      name: `${emoji.user} | COMPRADOR:`,
                                                      value: `${interaction.user} | ${interaction.user.username}`,
                                                  },
                                                  {
                                                    name: `${emoji.user} | ID COMPRADOR:`,
                                                    value: `\`${interaction.user.id}\``,
                                                },
                                                {
                                                  name: `${emoji.presente} | VALOR DO DESCONTO:`,
                                                  value: `\`R$${Number(db10.get(`desconto`)).toFixed(2)}\``,
                                                  },
                                                {
                                                  name: `${emoji.calendario} | DATA:`,
                                                  value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)`,
                                              },
                                              {
                                                name: `${emoji.planet} | PRODUTO(S) ID(S):`,
                                                value: `\`${db.get(`${interaction.customId}.idproduto`)}\``,
                                              },
                                                  {
                                                      name: `${emoji.planet} | Produto(s) Comprado(s):`,
                                                      value: `${eprod.nome} x${db3.get(`${data_id}.qtdid`)}`,
                                                  },
                                                  {
                                                      name: `${emoji.dinheiro} | Valor Pago:`,
                                                      value: `\`R$${precoalt}\``,
                                                  },
                                                  {
                                                      name: `${emoji.maos} | MÉTODO DE PAGAMENTO:`,
                                                      value: `${db3.get(`${data_id}.formapagamento`)}`,
                                                  },
                                                  {
                                                      name: `${emoji.estrela} | PRODUTO ENTREGUE:`,
                                                      value: `\`\`\`📦 | Entrega do Produto: ${eprod.nome} - ${quantidade1}/${quantidade1}\n${db3.get(`${data_id}.entrid`)}\`\`\``,
                                                  }
                                                  
                                                 //value: `\`\`\`📦 | Entrega do Produto: ${eprod.nome} - ${quantidade1}/${quantidade1}\n${db3.get(`${data_id}.entrid`)}\`\`\``,
                                                 
                                              )
                                              
                                                .setFooter({ text: `${dbcv.get(`title`)} - Todos os direitos reservados.` })
                                                .setImage(`${db.get(`${interaction.customId}.banner`) || dbcv.get(`banner`)}`)
                                                .setThumbnail(dbcv.get(`foto`))
                                                .setColor('#000000')

                                                
                                              client.channels.cache.get(dbcv.get(`logs_staff`)).send({ files: [filed], embeds: [embedaprovadologstaff], content: `||<@${interaction.user.id}>||` })                                            
                                              setTimeout(() => {
                                               const embedaprovadolog = new Discord.EmbedBuilder()
                                               .setAuthor({name:`${dbcv.get('title')} | Compra aprovada`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                                               .addFields(
                                                {
                                                    name: `${emoji.user} | COMPRADOR:`,
                                                    value: `${interaction.user.username}  - ${interaction.user.id}`,
                                                },
                                                {
                                                    name: `${emoji.cart} | PRODUTO(S) COMPRADO(S):`,
                                                    value: `${eprod.nome} x${db3.get(`${data_id}.qtdid`)}`,
                                                },
                                                {
                                                    name: `${emoji.dinheiro} | VALOR PAGO:`,
                                                    value: `\`R$${precoalt}\``,
                                                },
                                                 {
                                                  name: `${emoji.presente} | VALOR DO DESCONTO:`,
                                                  value: `\`R$${Number(db10.get(`desconto`)).toFixed(2)}\``,
                                                  },
                                                {
                                                    name: `${emoji.calendario} | DATA:`,
                                                    value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)`,
                                                },
                                                {
                                                    name: `${emoji.estrela2} | Avaliação:`,
                                                    value: `${avaliacao}\n**__${interaction.user.username}__: **\`${consi}\``,
                                                },
                                            )
                                            
                                               .setFooter({ text: `${dbcv.get(`title`)} - Todos os direitos reservados.` })
                                               .setImage(`${db.get(`${interaction.customId}.banner`) || dbcv.get(`banner`)}`)
                                               .setThumbnail(dbcv.get(`foto`))
                                               .setColor(dbcv.get(`color`))
                                              client.channels.cache.get(dbcv.get(`logs_feedback`)).send({ embeds: [embedaprovadolog], content: `||<@${interaction.user.id}>||` })

                                              }, 30000);
  
const interacaoavaliar = embed.createMessageComponentCollector({ componentType: Discord.ComponentType.Button });
interacaoavaliar.on("collect", async (interaction) => {
  if (interaction.user.id != interaction.user.id) {
      return;
  }

  if (interaction.isButton()) {
    var escrito = ""
    var textoest = ""
    var estrelas = interaction.customId.replace("star", "")

for (let i = 0; i != estrelas; i++) {
    textoest = `${textoest} ⭐`
}

const Modal = new ModalBuilder().setCustomId("ModalBuilder_avalia")
.setTitle("Considerações finais?");
const text = new Discord.TextInputBuilder()
.setCustomId("consi")
.setLabel("Como foi receber o produto?")
.setRequired(false)
.setStyle(1)
.setPlaceholder("(OPCIONAL)")


Modal.addComponents(new Discord.ActionRowBuilder().addComponents(text))
await interaction.showModal(Modal
  )


  }
  
  client.once('interactionCreate', async (interaction) => {


    if(interaction.customId==="ModalBuilder_avalia" && interaction.isModalSubmit()) {
      const asdasd = interaction.fields.getTextInputValue("consi") || consi
      interaction.reply({
        content: `${emoji.confete} | Você é demais! Obrigado por avaliar a gente, isto ajuda muito! Volte sempre <3`,
      }).then(msg => {
        setTimeout(() => {
          msg.delete();
        }, 5500);
      }).then(msg => {
        
        const newDescription = `${emoji.estrela} | Obrigado por avaliar!`;
    
    embed.edit({
      content: newDescription,
      ephemeral: true,
      embeds: [],
      components: []
    }).then((editedMessage) => {
      setTimeout(() => {
        editedMessage.delete();
      }, 30000);
    });
    avaliacao = `${textoest} (${estrelas})`
    consi = `${asdasd}`})
    }

    
  })
})



})
  
const row = new Discord.ActionRowBuilder()               
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId(severi)
    .setLabel(`${db1.get(`button.text`)}`)
    .setEmoji(`${db1.get(`button.emoji`)}`)
    .setStyle(db1.get(`button.style`)),
)
let titulo = `${db1.get(`titulo`)}`;
titulo = titulo.replace(`#{nome}`, `${db.get(`${severi}.nome`)}`);
titulo = titulo.replace(`#{preco}`, `${db.get(`${severi}.preco`,).toLocaleString()}`);
titulo = titulo.replace(`#{estoque}`, `${db.get(`${severi}.conta`).length}`);
let desc = `${db1.get(`desc`)}`;
desc = desc.replace(`#{desc}`, `${db.get(`${severi}.desc`)}`);
desc = desc.replace(`#{nome}`, `${db.get(`${severi}.nome`)}`);
desc = desc.replace(`#{preco}`, `${db.get(`${severi}.preco`,).toLocaleString()}`);
desc = desc.replace(`#{estoque}`, `${db.get(`${severi}.conta`).length}`);

const embed = new Discord.EmbedBuilder()
.setTitle(titulo)
.setColor(dbcv.get(`color`))
.setThumbnail(db.get(`${severi}.foto`))
.setDescription(`${desc}`)
.setImage(db.get(`${severi}.banner`))
if(db1.get(`rodape`) !== "remover") {
  embed.setFooter({text:`${db1.get(`rodape`)}`})
}

interaction.message.edit({ embeds: [embed], components: [row] })
                                                    }}})}, 10000)
                                                 
                                                     collector.on("collect", interaction => {
  
                                                      const rowpixpayments = new Discord.ActionRowBuilder()
                                                      .addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('codigo')
                                                        .setLabel("Chave Pix")
                                                        .setEmoji(`${emoji.pix}`)
                                                        .setStyle(1),
                                                      );
                                                      if(dbcv.get(`qrcode`) !== "remover") {
                                                        
                                                      rowpixpayments.addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('qrcode_carrinho')
                                                        .setLabel("Qr Code")
                                                        .setEmoji(`${emoji.qrcode}`)
                                                        .setStyle(1),
                                                      )
                                                      }
                                                      rowpixpayments.addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId(`${data_id}_aprovarcompracarrinho`)
                                                        .setLabel('Aprovar Compra')
                                                        .setEmoji(`${emoji.staff}`)
                                                        .setStyle(3),

                                                      )
                                                      rowpixpayments.addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('cancelarpix')
                                                        
                                                        .setEmoji(`${emoji.negar}`)
                                                        .setStyle(4),
                                                      );

                                                      if(interaction.customId === "qrcode_carrinho") {
                                                        try{
                                                          interaction.reply({
                                                            embeds:[
                                                              new Discord.EmbedBuilder()
                                                              .setDescription(`Qr Code:`)
                                                              .setImage(`${dbcv.get(`qrcode`)}`)
                                                            ],
                                                            ephemeral:true
                                                          }).catch(() => {
                                                            interaction.reply({
                                                              embeds:[
                                                                new Discord.EmbedBuilder()
                                                                .setDescription(`❌ | Ocorreu um Erro ao tentar renderizar o QRCODE`)
                                                              ],
                                                              ephemeral:true
                                                            })
                                                          })
                                                        } catch{
                                                            interaction.reply({
                                                              embeds:[
                                                                new Discord.EmbedBuilder()
                                                                .setDescription(`❌ | Ocorreu um Erro ao tentar renderizar o QRCODE`)
                                                              ],
                                                              ephemeral:true
                                                            })
                                                        }
                                                      }
                                                      

                                                      const rowpagarsite = new Discord.ActionRowBuilder()
                                                      .addComponents(   
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('pixpays')
                                                        .setEmoji(`${emoji.pix}`)
                                                        .setLabel("Pix")
                                                        .setDisabled(dbcv.get(`pixtruedalse`))
                                                        .setStyle(1),
                                                      )     
                                                      .addComponents(   
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('saldocomprar')
                                                        .setEmoji(`${emoji.pix}`)
                                                        .setLabel("teste")
                                                        .setDisabled(dbcv.get(`saldotruefalse`))
                                                        .setStyle(1),
                                                      ) 
                                                      if(dbcv.get(`criptoonoff`) === true) {
                                                        rowpagarsite.addComponents(
                                                          new Discord.ButtonBuilder()
                                                          .setCustomId("cripto_carrinho")
                                                          .setLabel("Cripto Moedas")
                                                          .setStyle(1)
                                                          .setEmoji(`${emoji.envelope}`)
                                                        )
                                                      }
                                                      rowpagarsite.addComponents( 
                                                          new Discord.ButtonBuilder()
                                                            .setCustomId('cancelarpix')
                                                            .setEmoji(`${emoji.negar}`)
                                                            
                                                            .setStyle(4),
                                                      );
                                                      

                                                      if(interaction.customId === "cripto_carrinho") {
                                                        db3.set(`${data_id}.formapagamento`, `Pago com criptomoedas`)
                                                        interaction.deferUpdate()
                                                          
                                                        clearInterval(venda);
                                                       const embedpixpayments = new Discord.EmbedBuilder()
                                                       .setTitle(`${dbcv.get(`title`)} | Criptomoedas`)
                                                       .setImage(dbcv.get(`banner`)) 
                                                       .setDescription(`\`\`\`Escolha a forma de pagamento.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                                         .setColor(dbcv.get(`color`))
                                                         .setFooter({ text: `Escolha entre os abaixo, após escolher, pague.` })
                                                       msg.edit({ embeds: [embedpixpayments], content: `||<@${interaction.user.id}>||`, components: [
                                                        new ActionRowBuilder()
                                                        .addComponents(
                                                          new ButtonBuilder()
                                                          .setCustomId("btc_carrinho")
                                                          .setLabel("BTC")
                                                          .setStyle(1),
                                                          new ButtonBuilder()
                                                          .setCustomId("ltc_carrinho")
                                                          .setLabel("LTC")
                                                          .setStyle(1),
                                                          new ButtonBuilder()
                                                          .setCustomId("usdt_carrinho")
                                                          .setLabel("USDT")
                                                          .setStyle(1),
                                                          new Discord.ButtonBuilder()
                                                        .setCustomId(`${data_id}_aprovarcompracarrinho`)
                                                        .setLabel('Aprovar Compra')
                                                        .setEmoji(`${emoji.staff}`)
                                                        .setStyle(3),
                                                          new Discord.ButtonBuilder()
                                                          .setCustomId('cancelarpix')
                                                          .setEmoji(`${emoji.negar}`)
                                                          .setStyle(4),
                                                        )
                                                       ] })}

 
                                                        if (interaction.customId === 'pixpays') {
                                                          interaction.deferUpdate()
                                                          clearInterval(venda);
                                                          setTimeout(function () {
                                                            if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                                             db3.delete(`${data_id}`)
                                                            },`${dbcv.get(`tempopagar`)}`)
                                                            const moment = require("moment");
                                    moment.locale("pt-br");
                                    const min = moment().add(`${dbcv.get(`tempopagar`)}`, 'milliseconds');
                                    const time = Math.floor(min.valueOf() / 1000);
                                                         const embedpixpayments = new Discord.EmbedBuilder()
                                                         .setTitle(`${dbcv.get(`title`)} | PIX`)
                                                         .setImage(dbcv.get(`banner`)) 
                                                         .setDescription(`\`\`\`Escolha a forma de pagamento.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}\n${emoji.lupa} | Pagamento expira em:\n<t:${time}:f> (<t:${time}:R>)`)
                                                           .setColor(dbcv.get(`color`))
                                                           .setFooter({ text: `Escolha entre os abaixo, após escolher, pague.` })
                                                         msg.edit({ embeds: [embedpixpayments], content: `||<@${interaction.user.id}>||`, components: [rowpixpayments] })
                                                         
                                                        }

                                                        if (interaction.customId === 'cancelarpix') {
                                                          clearInterval(venda)
                                                          const embedcancelar3 = new Discord.EmbedBuilder()
                             .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                             .setDescription(`Olá ${interaction.user},\n\n• Você cancelou a compra, e todos os produtos foram devolvido para o estoque. Você pode voltar a comprar quando quiser!`)
                             .setColor(dbcv.get(`color`))
                             const button2 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row22 = new ActionRowBuilder().addComponents(button2);
                             
                             interaction.user.send({embeds: [embedcancelar3], components: [row22]})

                             const logstaff = new Discord.EmbedBuilder()
                             .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
           .setColor(dbcv.get(`color`))
           .addFields(
            { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
            { name: '📝 | Motivo:', value: `\`Cancelada pelo usuário.\`` },
            { name: '🕒 | Data / Horário:', value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
          )
          .setThumbnail(interaction.user.displayAvatarURL({ format: "png" }))
          .setTimestamp()
          const button26 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row29 = new ActionRowBuilder().addComponents(button26);
                             client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [logstaff], components: [row29] })
                                                          db3.delete(`${data_id}`)
                                                          if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                                         }
                                                     
                                                        if (interaction.customId === "codigo") {
                                                          interaction.deferUpdate()
                                                          const moment = require("moment");
                                    moment.locale("pt-br");
                                    const min = moment().add(`${dbcv.get(`tempopagar`)}`, 'milliseconds');
                                    const time = Math.floor(min.valueOf() / 1000);
                                                          const embed2 = new Discord.EmbedBuilder()
                                                          .setTitle(`${dbcv.get(`title`)} | PIX`)
                                                          .setImage(dbcv.get(`banner`)) 
                                                          .setDescription(`\`\`\`Pague para receber o produto.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}\n${emoji.lupa} | Pagamento expira em:\n<t:${time}:f> (<t:${time}:R>)`)
                                                            .setColor(dbcv.get(`color`))
                                                            .setFooter({ text: `Após efetuar o pagamento, o tempo de entrega é de no maximo 1 minuto!` })
                                                         msg.edit({ embeds: [embed2], content: `||<@${interaction.user.id}>||`, components: [rowpixpayments] })

                                                          setTimeout(() => { 
                                                            interaction.followUp({
                                                              embeds:[
                                                                new Discord.EmbedBuilder()
                                                                .addFields(
                                                                  {
                                                                    name:"🔑 | Tipo de Chave:",
                                                                    value:`${dbcv.get(`tipopix`)}`
                                                                  },
                                                                  {
                                                                    name:"🔗 | Chave Pix:",
                                                                    value:`${dbcv.get(`chavepix`)}`
                                                                  }
                                                                )
                                                              ],
                                                              ephemeral:true
                                                            })

                                                        }, 1000);
                                                        }


                                                        if (interaction.customId === 'chavepix') {
                                                            
                                                          rowpixpayments.components[2].setDisabled(true)
                                                          const embed2 = new Discord.EmbedBuilder()
                                                          .setTitle(`${dbcv.get(`title`)} | PIX`)
                                                          .setImage(dbcv.get(`banner`)) 
                                                          .setDescription(`\`\`\`Pague para receber o produto.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                                            .setColor(dbcv.get(`color`))
                                                            .setFooter({ text: `Após efetuar o pagamento, o tempo de entrega é de no maximo 1 minuto!` })
                                                          msg.edit({ embeds: [embed2], content: `||<@${interaction.user.id}>||`, components: [rowpixpayments] })
                                                          
                                                          setTimeout(() => {
 
                                                          const embedqrcode = new Discord.EmbedBuilder()
                                                          .setFooter({name:`Está forma de pagamento é manual, vai demorar mais para ser verificada"`})
                                                          .setTitle(`**${dbcv.get(`title`)} | Chave Pix**`)
                                                          .setDescription(`**Chave Pix: ${dbcv.get(`chavepix`)}**`)  
                                                          .setColor(dbcv.get(`color`))
                                                          msg.channel.send({ embeds: [embedqrcode], content: `${emoji.carregando} | Aguardando o Pagamento...` })
 
                                                         }, 1000);
                                                        }

                                                        const rowdecidirsaldo = new Discord.ActionRowBuilder()
                                                      .addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('saldocomprar')
                                                        .setLabel('Adicionar ao Carrinho')
                                                        .setEmoji(`${emoji.sim}`)
                                                        .setStyle(3),
                                                      )
                                                      .addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('voltar1')
                                                        .setLabel('Voltar')
                                                        .setEmoji(`${emoji.setaEsquerda}`)
                                                        .setStyle(1),
                                                      )

                                                      const saldo = db4.get(`${interaction.user.id}.saldo`) || "0";

                                                        if (interaction.customId === "saldodecidir") {
                                                          interaction.deferUpdate();
                                                          
                                                          const embedsaldodecidir = new Discord.EmbedBuilder()
                                                          .setTitle(`${dbcv.get(`title`)} | Saldo`)
                                                          .setDescription(`**Você deseja efetuar o pagamento de \`\`${eprod.nome}\`\` no valor de \`\`R$${precoalt}\`\` utilizando seu saldo de \`\`RS$${Number(saldo).toFixed(2)}\`\`?**`)
                                                          .setColor(dbcv.get(`color`))
                                                          msg.edit({ embeds: [embedsaldodecidir], components: [rowdecidirsaldo] })
                                                        }

                                                        if (interaction.customId === 'saldocomprar') {
                                                          interaction.deferUpdate();
                                                          const saldo = db4.get(`${interaction.user.id}.saldo`) || "0";
                                                          
                                                          if (saldo >= precoalt) {
                                                          db4.substr(`${interaction.user.id}.saldo`, `${precoalt}`)
                                                          db3.set(`${data_id}.formapagamento`, `Pago com saldo`)
                                                          db3.set(`${data_id}.status`, `Processando`)
                                                          
                                                          msg.channel.send(`**${emoji.sim} | Compra aprovada no valor de \`\`${precoalt}\`\`, este valor foi descontado do seu saldo.**`).then(msg => { setTimeout(() => msg.delete(), 5000)});
                                                      }
                                                           else {
                                                           
                                                          msg.channel.send(`${emoji.nao} | Você não tem saldo suficiente para realizar essa compra. Seu saldo: \`\`R$${Number(saldo).toFixed(2)}\`\`, valor da compra: \`\`R$${Number(precoalt).toFixed(2)}\`\``).then(msg => { setTimeout(() => msg.delete(), 5000)});
                                                        }
                                                        }

                                                        if (interaction.customId === "voltar1") {
                                                          interaction.deferUpdate();
                                                            
                                                          const embedded = new Discord.EmbedBuilder()
                                                          .setTitle(`${dbcv.get(`title`)} | Sistema de pagamento`)
                                                          .setDescription(`\`\`\`Escolha a forma de pagamento.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                                          .setImage(dbcv.get(`banner`)) 
                                                          .setThumbnail(dbcv.get(`foto`)) 
                                                          .setColor(dbcv.get(`color`))
                                                        msg.edit({ embeds: [embedded], content: `||<@${interaction.user.id}>||`, components: [rowescolha] })
                                                               
                                                         }

                                                        if (interaction.customId === "pagarsite") {
                                                            
                                                          clearInterval(venda);
                                                          const embedpagarsite = new Discord.EmbedBuilder()
                                                          .setFooter({name: `Após efetuar o pagamento, o tempo de entrega é de no maximo 1 minuto!`})
                                                          .setTitle(`**${dbcv.get(`title`)} | Copia e cola**`)
                                                          .setDescription(`\`\`\`Pague para receber o produto.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                                          .setImage(dbcv.get(`banner`)) 
                                                          .setThumbnail(dbcv.get(`foto`)) 
                                                          .setColor(dbcv.get(`color`))
                                                          msg.edit({ embeds: [embedpagarsite], components: [rowpagarsite], content: `||<@${interaction.user.id}>||` })


                                                        }

                                                        if (interaction.customId === "verificarpayments") {
                                                          interaction.deferUpdate();
                                                          const embedvefificarpayments = new Discord.EmbedBuilder()
                                                          .setFooter({name:`Estamos verificando...`})
                                                          .setTitle(`**${dbcv.get(`title`)} | Verificar pagamento**`)
                                                          .setDescription(`**Ei, <@&${dbcv.get(`equipe`)}> venha conferir o seguinte pagamento de \`\`${precoalt}\`\` e caso esteja correto, entregue o produto.**`)
                                                          .setColor(dbcv.get(`color`))
                                                          msg.channel.send({ embeds: [embedvefificarpayments], content: `||<@${interaction.user.id}>||` })
                                                        }
                                                     
                                                        
                                                     })
                          
                                                   }
                                                 })
                                              })
                      });
                      
                    })}


                   }

                                           
                                            
                                          })
                                        }) 
                                        
 /////////

 const channelId = '1153374218826821685'; // Substitua pelo ID do canal onde deseja que o bot reaja
 const emojiId = `${emoji.confete}`; // Substitua pelo ID do emoji personalizado
 
 client.on('messageCreate', async (message) => {
   if (message.channel.id === channelId) {
     try {
       const emoji = client.emojis.cache.get(emojiId);
       if (emoji) {
         await message.react(emoji);
       } else {
         console.error(`Emoji com ID ${emojiId} não encontrado no bot.`);
       }
     } catch (error) {
       console.error('Erro ao reagir com emoji:', error);
     }
   }
 });
 

           c.send({ embeds: [embedss], components: [row], fetchReply: true }).then(msg => {
             const filter = i => i.user.id === interaction.user.id;
             const collector = msg.createMessageComponentCollector({ filter });
             collector.on("collect", intera => {
              // intera.deferUpdate()
               if (intera.customId === 'cancelarbuy') {
                const embedcancelar = new Discord.EmbedBuilder()
                           .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                           .setDescription(`Olá ${interaction.user},\n\n• Você cancelou a compra, e todos os produtos foram devolvido para o estoque. Você pode voltar a comprar quando quiser!`)
                           .setColor(dbcv.get(`color`))
                           const button2 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row22 = new ActionRowBuilder().addComponents(button2);
                           interaction.user.send({embeds: [embedcancelar], components: [row22]})

                           const logstaff = new Discord.EmbedBuilder()
                           components: [row22]
                           client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [logstaff], components: [row22] })

                db3.delete(`${data_id}`)
                if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
              }
              
              const obter = `${db.get(`${interaction.customId}.conta`).length}`
            if (intera.customId === "tesdod") {
              if (intera.replied) {
                console.log("Interaction already replied to.");
                return;
              }

              const modal = new ModalBuilder();
              modal.setTitle("✏️ | Alterar quantidade");
              modal.setCustomId("newModalBuilder");

              const textInput1 = new TextInputBuilder()
                .setCustomId('test1')
                .setLabel("Quantidade:")
                .setPlaceholder('Quantidade')
                .setStyle(1)

              const action1 = new ActionRowBuilder().addComponents(textInput1)

              modal.addComponents(action1);

              intera.showModal(modal);

            }

            client.once('interactionCreate', async (interaction) => {
              if (!interaction.isModalSubmit()) return;
              if (interaction.customId === 'newModalBuilder') {
                const answer1 = parseInt(interaction.fields.getTextInputValue('test1'));


                if (isNaN(answer1)) {
                  
                  interaction.reply({ content: `:x: | Quantidade inválida.`, ephemeral: true }); // Adiciona uma resposta à interação
                } else {
                  if (answer1 > quantidade ) {
                    const embedadici = new Discord.EmbedBuilder()
                      .setDescription(`:x: | Você não pode adicionar uma quantidade maior ou menor do que o estoque.`)
                      .setColor(dbcv.get(`color`));
                    interaction.reply({ embeds: [embedadici], ephemeral: true })
                   return; 
                  }
                  if(answer1 <= 0){
                    const embedadici = new Discord.EmbedBuilder()
                      .setDescription(`:x: | Você não pode adicionar uma quantidade maior ou menor do que o estoque.`)
                      .setColor(dbcv.get(`color`));
                    interaction.reply({ embeds: [embedadici], ephemeral: true })
                    return;
                  }
                    
                    quantidade1 = answer1;
                    precoalt = (parseFloat(Number(eprod.preco) * Number(quantidade1)).toFixed(2));
                    db3.set(`${data_id}.precoid`, `${precoalt}`);
                    db3.set(`${data_id}.qtdid`, `${quantidade1}`);
                    const embedss2 = new Discord.EmbedBuilder()
                    .setDescription(`${emoji.planet}  **| Produto:** \`${eprod.nome}\`\n\n ${emoji.caixa} **| Quantidade:** \`${quantidade1}\`\n\n ${emoji.dinheiro} **| Preço** \`R$${precoalt}\`\n\n **${emoji.carrinho} | Quantidade disponível: \`${quantidade}\`**`)
                      .setColor(dbcv.get(`color`));
                    msg.edit({ embeds: [embedss2], components: [row] }).catch(console.error); // Editar a mensagem original
                    interaction.reply({ content: `✅ | Quantidade alterada com sucesso.`, ephemeral: true }); // Adiciona uma resposta à interação
                  
                  
                }
              }
            });
              
               if (intera.customId === "addboton") {
                if (quantidade1++ >= quantidade) {
                  quantidade1--;
                    const embedadici = new Discord.EmbedBuilder()
                    .setDescription(`${emoji.nao} | Não é possível adicionar mais que o estoque disponível!`)
                    .setColor(dbcv.get(`color`))
                    intera.reply({ embeds: [embedadici], ephemeral:true })
                    const embedss2 = new Discord.EmbedBuilder()
                    .setDescription(`${emoji.planet}  **| Produto:** \`${eprod.nome}\`\n\n ${emoji.caixa} **| Quantidade:** \`${quantidade1}\`\n\n ${emoji.dinheiro} **| Preço** \`R$${precoalt}\`\n\n **${emoji.carrinho} | Quantidade disponível: \`${quantidade}\`**`)
                    .setColor(dbcv.get(`color`))
                    msg.edit({ embeds: [embedss2] })
                } else {
                  intera.deferUpdate()
                  
                  precoalt = Number(precoalt) + Number(eprod.preco);
    
                  tttt = precoalt.toFixed(2); 
                  precoalt = tttt
                  
                    db3.set(`${data_id}.precoid`, `${precoalt}`)
                    db3.set(`${data_id}.qtdid`, `${quantidade1}`)
                    const embedss = new Discord.EmbedBuilder()
                    .setDescription(`${emoji.planet}  **| Produto:** \`${eprod.nome}\`\n\n ${emoji.caixa} **| Quantidade:** \`${quantidade1}\`\n\n ${emoji.dinheiro} **| Preço** \`R$${precoalt}\`\n\n **${emoji.carrinho} | Quantidade disponível: \`${quantidade}\`**`)
                    .setColor(dbcv.get(`color`))
                    msg.edit({ embeds: [embedss] })
                }
            }
            if (intera.customId === "removeboton") {
              if (quantidade1 <= 1) {
                const embedadici = new Discord.EmbedBuilder()
                  .setDescription(`${emoji.nao} | Não é possível diminuir essa quantidade!`)
                  .setColor(dbcv.get(`color`));
                intera.reply({ embeds: [embedadici], ephemeral:true })
              } else {
                
              intera.deferUpdate()
                precoalt = precoalt - eprod.preco;
                quantidade1--;
                 precoalt = Number(precoalt);
                 tttt = precoalt.toFixed(2); 
                  precoalt = tttt
                const embedss = new Discord.EmbedBuilder()
                .setDescription(`${emoji.planet}  **| Produto:** \`${eprod.nome}\`\n\n ${emoji.caixa} **| Quantidade:** \`${quantidade1}\`\n\n ${emoji.dinheiro} **| Preço** \`R$${precoalt}\`\n\n **${emoji.carrinho} | Quantidade disponível: \`${quantidade}\`**`)
                  .setColor(dbcv.get(`color`));
                msg.edit({ embeds: [embedss] });
              }
            }
            
                 
                   if (intera.customId === "comprarboton") {
                     msg.channel.bulkDelete(50).then(() => {
                      
                     clearInterval(timer2);
                     const timer3 = setTimeout(function () {
                      if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                       db3.delete(`${data_id}`)
                }, 600000)
                     const row = new Discord.ActionRowBuilder()
                      
                       .addComponents(
                         new Discord.ButtonBuilder()
                           .setCustomId('continuarboton')
                           .setLabel('Ir para o Pagamento')
                           .setEmoji(`${emoji.sim}`)
                           .setStyle(3),
                     )
                     .addComponents(
                      new Discord.ButtonBuilder()
                        .setCustomId('addcboton')
                        .setLabel('Adicionar Cupom de Desconto')
                        .setEmoji(`${emoji.cupom}`)
                        .setStyle(1)
                        .setDisabled(dbcv.get(`botaotruefalse`))
                  )
                       .addComponents(
                         new Discord.ButtonBuilder()
                           .setCustomId('cancelarboton')
                           .setLabel("Cancelar Compra")
                           .setEmoji(`${emoji.nao}`)
                           .setStyle(4),
                     );
                                        
                     const embedss = new Discord.EmbedBuilder()
                     .setAuthor({name:`${dbcv.get('title')} | Resumo da Compra`,iconURL: interaction.guild.iconURL({dynamic: true })})                 
                     .setDescription(`${emoji.planet} | Produto: \`${eprod.nome}\`\n ${emoji.dinheiro} | Valor unitário:  \`R$${db.get(`${severi}.preco`)}\`\n ${emoji.caixa} | Quantidade: \`${quantidade1}\`\n${emoji.carrinho} | Total: \`R$${db.get(`${severi}.preco`) * quantidade1}\`\n\n\n **${emoji.info2} | Desconto: \`0%\`\n ${emoji.presente} | Cupom adicionado: \`Sem Cupom\`**`)                                     
                      .setColor(dbcv.get(`color`))
                       
                     c.send({ embeds: [embedss], components: [row], content: `||<@${interaction.user.id}>||`, fetchReply: true }).then(msg => {
                       const filter = i => i.user.id === interaction.user.id;
                       const collector = msg.createMessageComponentCollector({ filter });
                       collector.on("collect", intera2 => {
                         intera2.deferUpdate()
                                    
                         if (intera2.customId === 'cancelarboton') {
                          clearInterval(timer3);
                          const embedcancelar2 = new Discord.EmbedBuilder()
                         .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                         .setDescription(`Olá ${interaction.user},\n\n• Você cancelou a compra, e todos os produtos foram devolvido para o estoque. Você pode voltar a comprar quando quiser!`)
                         .setColor(dbcv.get(`color`))
                         const button2 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row22 = new ActionRowBuilder().addComponents(button2);
                         interaction.user.send({embeds: [embedcancelar2], components: [row22]})

                         const asdaslog = new Discord.EmbedBuilder()
                         components: [row22]
                           client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [asdaslog], components: [row22] })
                          db3.delete(`${data_id}`)
                          if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                        }

                           if (intera2.customId === "continuarboton") {
                              
                             clearInterval(timer3);
                             const venda = setTimeout(function () {
                              if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                               db3.delete(`${data_id}`)
                              }, 150000)
                              mercadopago.configurations.setAccessToken(dbcv.get(`access_token`));
                             var payment_data = {
                               transaction_amount: Number(precoalt),
                               description: `Pagamento | ${interaction.user.username}`,
                               payment_method_id: 'pix',
                                payer: {
                                  email: 'japanstorepayments@gmail.com',
                                  first_name: 'Homero',
                                  last_name: 'Brum',
                                   identification: {
                                     type: 'CPF',
                                     number: '09111189770'
                                   },
                                   address: {
                                     zip_code: '06233200',
                                     street_name: 'Av. das Nações Unidas',
                                     street_number: '3003',
                                     neighborhood: 'Bonfim',
                                     city: 'Osasco',
                                     federal_unit: 'SP'
                                   }
                                 }
                               };

                               mercadopago.payment.create(payment_data).then(function (data) {
                                 db3.set(`${data_id}.status`, `Pendente (2)`)
                                 const buffer = Buffer.from(data.body.point_of_interaction.transaction_data.qr_code_base64, "base64");
                                 const attachment = new Discord.AttachmentBuilder(buffer, "payment.png");
                                 const reponse = request.post(url, json=payment_data)
                                 const row = new Discord.ActionRowBuilder()
                                                              
                                 .addComponents(
                                  new Discord.ButtonBuilder()
                                    .setCustomId('saldocomprar')
                                    .setEmoji("💰")
                                    .setLabel("Saldo")
                                    .setStyle(1),
                                 )                                             
                                   .addComponents(
                                     new Discord.ButtonBuilder()
                                       .setCustomId('cancelarpix')
                                       .setEmoji(`${emoji.negar}`)
                                       
                                       .setStyle(4),
                                 );
                                 const embed = new Discord.EmbedBuilder()
                                 .setTitle(`${dbcv.get(`title`)} | Sistema de pagamento`)
                                 .setDescription(`\`\`\`Pague para receber o produto.\`\`\`\n** **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                 .setImage(dbcv.get(`banner`)) 
                                 .setFooter({ text: `Após efetuar o pagamento, o tempo de entrega é de no maximo 1 minuto!` })
                                 .setColor(dbcv.get(`color`))
                                 
                               msg.channel.send({ embeds: [embed], content: `||<@${interaction.user.id}>||`, components: [row] }).then(msg => {

                               const collector = msg.channel.createMessageComponentCollector();
                               const lopp = setInterval(function () {
                                 const time2 = setTimeout(function () {
                                   clearInterval(lopp);
                                 }, 1800000)
                                axios.get(`https://api.mercadolibre.com/collections/notifications/${data.body.id}`, {
                                 headers: {
                                   'Authorization': `Bearer ${dbcv.get(`access_token`)}`
                                 }
                               }).then(async (doc) => {
                              if (doc.data.collection.status === "approved") {
                                  db3.set(`${data_id}.status`, `Processando`)
                              }

                             
                                    
                              if (`${db3.get(`${data_id}.status`)}` === "Processando") {
                                clearTimeout(time2)
                                clearInterval(lopp);
                                clearInterval(venda);
                                 const vendadel = setTimeout(function () {
                                   if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }}, 30000)
                                  const a = db.get(`${severi}.conta`);
                                    db2.add("pedidostotal", 1)
                                    db2.add("gastostotal", Number(precoalt))
                                    db2.add(`${moment().format('L')}.pedidos`, 1)
                                    db2.add(`${moment().format('L')}.recebimentos`, Number(precoalt))
                                    db2.add(`${interaction.user.id}.gastosaprovados`, Number(precoalt))
                                    db2.add(`${interaction.user.id}.pedidosaprovados`, 1)

                                    if (a < quantidade1) {
                                      
                                         } else {
                                          const removed = a.splice(0, Number(quantidade1));
                                           db.set(`${severi}.conta`, a);
                                            const embedentrega = new Discord.EmbedBuilder()
                                              .setTitle(`${dbcv.get(`title`)} | Seu produto`)
                                              .setDescription(`**${emoji.planet} | Produtos:** \n  \`\`\`${removed.join("\n")}\`\`\`\n**${emoji.estrela} | Id da Compra:** ${data_id}\n\n**${emoji.aviso} | Avalie a nossa loja [aqui](https://discord.com/channels/${c.guildId}/${config.get(`avaliacoes`)})** `)
                                              .setColor(dbcv.get(`color`))
                                              
                                            interaction.user.send({ embeds: [embedentrega] })
                                             db3.set(`${data_id}.status`, `Concluido`)
                                             msg.channel.send(`${emoji.planet} | Pagamento aprovado!! Obrigado por comprar em nossa Loja. Seu produto será enviado na sua DM.`)
                                             msg.channel.send(`${emoji.estrela} | ID Da compra: ||${data_id}||`)
                                             msg.channel.send(`${emoji.sim} | Carrinho fechara em menos de 1 min`)
                                              const membro = interaction.guild.members.cache.get(interaction.user.id)
                                              const role = interaction.guild.roles.cache.find(role => role.id === dbcv.get(`role`))
                                              membro.roles.add(role).then(() => {console.log("Usuario já tem o cargo!")})

                                             
              
                                        
                                               
                                              const row = new Discord.ActionRowBuilder()               
                                              .addComponents(
                                                new Discord.ButtonBuilder()
                                                  .setCustomId(severi)
                                                  .setLabel(`${db1.get(`button.text`)}`)
                                                  .setEmoji(`${db1.get(`button.emoji`)}`)
                                                  .setStyle(db1.get(`button.style`)),
                                            )
                                            let titulo = `${db1.get(`titulo`)}`;
                                            titulo = titulo.replace(`#{nome}`, `${db.get(`${severi}.nome`)}`);
                                            titulo = titulo.replace(`#{preco}`, `${db.get(`${severi}.preco`,).toLocaleString()}`);
                                            titulo = titulo.replace(`#{estoque}`, `${db.get(`${severi}.conta`).length}`);
                                            let desc = `${db1.get(`desc`)}`;
                                            desc = desc.replace(`#{desc}`, `${db.get(`${severi}.desc`)}`);
                                            desc = desc.replace(`#{nome}`, `${db.get(`${severi}.nome`)}`);
                                            desc = desc.replace(`#{preco}`, `${db.get(`${severi}.preco`,).toLocaleString()}`);
                                            desc = desc.replace(`#{estoque}`, `${db.get(`${severi}.conta`).length}`);
                                            
                                            const embed = new Discord.EmbedBuilder()
                                              .setTitle(titulo)
                                              .setColor(dbcv.get(`color`))
                                              .setThumbnail(db.get(`${severi}.foto`))
                                              .setDescription(`${desc}`)
                                              .setImage(db.get(`${severi}.banner`))
                                              if(db1.get(`rodape`) !== "remover") {
                                                embed.setFooter({text:`${db1.get(`rodape`)}`})
                                              }
                                              
                                            interaction.message.edit({ embeds: [embed], components: [row] })
                                                
                                              interaction.message.edit({ embeds: [embed], components: [row] })
                                                  
                                                  }}})}, 10000)
                                               
                                                   collector.on("collect", interaction => {
                                                      if (interaction.customId === 'cancelarpix') {
                                                        clearInterval(lopp);
                                                        clearInterval(venda)
                                                        const embedcancelar3 = new Discord.EmbedBuilder()
                           .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                           .setDescription(`Olá ${interaction.user},\n\n• Você cancelou a compra, e todos os produtos foram devolvido para o estoque. Você pode voltar a comprar quando quiser!`)
                           .setColor(dbcv.get(`color`))
                           const button2 = new ButtonBuilder()
                            .setCustomId('comprarcancelar')
                            .setLabel('Mensagem Automática')
                            .setStyle(2)
                            .setDisabled(true)
                           const row22 = new ActionRowBuilder().addComponents(button2);
                           interaction.user.send({embeds: [embedcancelar3], components: [row22]})
                                                        db3.delete(`${data_id}`)
                                                        if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                                       }
                                                     })
                                                   })
                                                 }).catch(function (error) {
                                                   console.log(error)
                                                   });
                                                 }
                                               })
                                            })
                     });
                                          }
                                        })
                                      })
                                    })
                                  }
                                 }
           });


           client.on("interactionCreate", (interaction) => {
          
            if (interaction.isStringSelectMenu()) {
              const eprod = db.get(interaction.values[0]);
                if (!eprod) return;
                const severi = interaction.values[0];
                  if (eprod) {
                    const quantidade = db.get(`${severi}.conta`).length;
              
                    const embed = new Discord.EmbedBuilder()
      .setTitle(`${dbp.get(`${interaction.customId}.titulo`)}`)
      .setDescription(`${dbp.get(`${interaction.customId}.desc`)} `);

      const select = new Discord.StringSelectMenuBuilder()
      .setCustomId(`${interaction.customId}`)
      .setPlaceholder("Escolha algum produto")
      .setMaxValues(1)
  
      if(dbp.get(`${interaction.customId}.miniatura`) !== "Nenhuma") {

        embed.setThumbnail(`${dbp.get(`${interaction.customId}.miniatura`)}`)

      }

      dbp.get(`${interaction.customId}.produtos`).map((pd) => {
        const valor = Number(db.get(`${pd}.preco`))
        select.addOptions(
            {
                label:`${db.get(`${pd}.nome`)}`,
                description:`💸| Valor: ${valor.toFixed(2)} - 📦 Estoque: ${db.get(`${pd}.conta`).length}`,
                value:`${db.get(`${pd}.idproduto`)}`,
                emoji:`${dbp.get(`${interaction.customId}.emoji`)}`
            }
        )
      })

      interaction.message.edit({
        embeds:[
            embed.setColor(dbcv.get(`color`))
            .setImage(`${dbp.get(`${interaction.customId}.banner`)}`)
        ],
        components:[
            new ActionRowBuilder()
            .addComponents(select)
        ]
      })
          
                  
                      
                  if (quantidade < 1) {
                    const embedsemstock = new Discord.EmbedBuilder()
                      .setDescription(`${emoji.sino} | Lamentamos informar que estamos sem estoque neste produto no momento, espere um reabastecimento!`)
                      .setColor(dbcv.get(`color`))
         
                   const button94 = new Discord.ButtonBuilder()
                    .setCustomId('ativarnotify')
                    .setEmoji('🔔')
                    .setLabel('Ativar Notificação')
                    .setStyle(2)
                    .setDisabled(false);
          
                const row241 = new Discord.ActionRowBuilder().addComponents(button94);
          
                             
                      if (quantidade < 1) {
                        const embedslogsss = new Discord.EmbedBuilder()
                        .setTitle(`${dbcv.get(`title`)} | Fora de estoque`)
                        .setColor(dbcv.get(`color`))
                        .addFields(
                          { name: '👥 | Usuário interresado(a):', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
                          { name: '📝 | Produto:', value: `\`Produto: ${eprod.nome} - ${db.get(`${interaction.values[0]}.idproduto`)}\`` },
                          { name: '🕒 | Data / Horário da tentativa:',  value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
                      )
                        
                        .setFooter({ text: `${dbcv.get(`title`)} - Todos os direitos reservados.` })
          
                        client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [embedslogsss], components: [row241]})
                      }
                     
                   
                   interaction.reply({ embeds: [embedsemstock], components: [row241], ephemeral: true }).then(async msg => {
                     
                     const filter = (i) => i.user.id == interaction.user.id;
                     const collector = msg.createMessageComponentCollector({ filter, time: 300000 });
                     
                     collector.on('collect', (interaction2) => {
                       
                  if (interaction2.customId == "ativarnotify") {
                  if (db11.has(interaction.user.id)) {
                   interaction2.reply({ content: `✅ | Você já estava com as notificações ativadas, portanto elas foram desativadas.\n**Caso queira ativar só clicar no botão novamente!**`, ephemeral: true })
                    db11.delete(interaction.user.id)
                 } else if (!db11.has(interaction.user.id)) {
                   db11.set(`${interaction.user.id}.produto`, db.get(`${interaction.customId}.idproduto`))
                   interaction2.reply({ content: `✅ | Notificações ativadas com sucesso!`, ephemeral: true })
                 }
               }
                       
                    })
                   })
                   
          
                    return;
          
                  }
                 
          
                  
                  if (interaction.guild.channels.cache.find(c => c.topic === interaction.user.id)) {
                    const channel = interaction.guild.channels.cache.find(c => c.topic === interaction.user.id);
                    return interaction.reply({
                      content: `${emoji.aviso} | Você já tem um carrinho criado!`,
                      ephemeral: true,
                      components: [
                        new Discord.ActionRowBuilder().addComponents(
                          new Discord.ButtonBuilder()
                            .setStyle(5)
                            .setLabel('🛒・Ir para carrinho')
                            .setURL(`https://discord.com/channels/${channel.guild.id}/${channel.id}`)
                        )
                      ]
                    });
                  }        
                
                          
                      
                  interaction.guild.channels.create( {
                    name:`🛒・${interaction.user.username}`,
                    type: Discord.ChannelType.GuildText,
                    parent: db.get(`${interaction.customId}.categoria`) || dbcv.get(`category`),
                    topic: interaction.user.id,
                    permissionOverwrites: [
                      {
                        id: interaction.guild.id,
                        deny: ["ViewChannel", "SendMessages", "AddReactions"]
                      },
                      
                      {
                       id: interaction.user.id,
                       allow: ["ViewChannel"],
                       deny: ["SendMessages"]
                     }
                   ]
                  }).then(async (c) => {
                    await interaction.reply({
                        content: `${emoji.carregando} | Criando o Carrinho...`,
                        ephemeral: true
                    })
          
                    setTimeout(() => {
                        interaction.editReply({
                            content: ` `,
                            embeds: [
                                new Discord.EmbedBuilder()
                                    .setTitle(`${dbcv.get(`title`)} | Sistema de Vendas`)
                                    .setColor(dbcv.get(`color`))
                                    .setDescription(`${emoji.sim} | ${interaction.user} **Seu carrinho foi aberto com sucesso em: ${c}, fique à vontade para adicionar mais produtos.**`)
                            ],
                            components: [
                                new Discord.ActionRowBuilder()
                                    .addComponents(
                                        new Discord.ButtonBuilder()
                                            .setStyle(5)
                                            .setLabel('🛒・Ir para carrinho')
                                            .setURL(`https://discord.com/channels/${c.guildId}/${c.id}`)
                                    )
                            ],
                            ephemeral: true
                        });
                    }, 500);
               
          
                  let quantidade1 = 1;
                  var precoalt = eprod.preco;
                     var data_id = Math.floor(Math.random() * 999999999999999);
                     db3.set(`${data_id}.id`, `${data_id}`)
                     db3.set(`${data_id}.status`, `Pendente (1)`)
                     db3.set(`${data_id}.userid`, `${interaction.user.id}`)
                     db3.set(`${data_id}.dataid`, `${moment().format('LLLL')}`)
                     db3.set(`${data_id}.nomeid`, `${eprod.nome}`)
                     db3.set(`${data_id}.qtdid`, `${quantidade1}`)
                     db3.set(`${data_id}.precoid`, `${precoalt}`)
                     db3.set(`${data_id}.entrid`, `Ainda nada...`)
                     db3.set(`${data_id}.formapagamento`, `Pix`)
                     db10.set(`desconto`, `0`)
                     db10.set(`avalicao`, `Nenhum comentário adicional.`)
                     
          
                     const embedlogsgs = new Discord.EmbedBuilder()
              .setTitle(`${dbcv.get('title')} | Carrinho Criado`)
              .addFields(
                  { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
                  { name: '📝 | Criou um Carrinho:', value: `\`Produto: ${eprod.nome} - ${data_id}\`` },
                  { name: '🕒 | Data / Horário da Compra:',  value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
              )
              .setColor('Green')
              .setTimestamp()
              .setThumbnail(interaction.user.displayAvatarURL({ format: 'png' }))
          
          
          const button32 = new Discord.ButtonBuilder()
              .setCustomId('comprarcancelar')
              .setLabel('Mensagem Automática')
              .setStyle(2)
              .setDisabled(true);
          
          const row241 = new Discord.ActionRowBuilder().addComponents(button32);
          
          client.channels.cache.get(dbcv.get('logs_staff')).send({
              embeds: [embedlogsgs],
              components: [row241],
          });
          
          
                    const timer2 = setTimeout(function () {
          
                     const logdssa = new Discord.EmbedBuilder()
                     .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                     .setColor('RED')
                     .addFields(
                      { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
                      { name: '📝 | Motivo:', value: `\`Cancelada por inatividade.\`` },
                      { name: '🕒 | Data / Horário:', value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
                    )
                    .setThumbnail(interaction.user.displayAvatarURL({ format: "png" }))
                    .setTimestamp()
                    const button21 = new ButtonBuilder()
                                       .setCustomId('comprarcancelar')
                                       .setLabel('Mensagem Automática')
                                       .setStyle(2)
                                       .setDisabled(true)
                                       const row242 = new ActionRowBuilder().addComponents(button21);
                     client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [logdssa], components: [row242]})
          
                      if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                      const embedcancelar356 = new Discord.EmbedBuilder()
                       .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                       .setDescription(`Olá ${interaction.user},\n\n• A sua compra foi cancelada por **inatividade**, e todos os produtos foram devolvidos para o estoque. Você pode voltar a comprar quando quiser!`)
                       .setColor(dbcv.get(`color`))
                       const button2 = new ButtonBuilder()
                                       .setCustomId('comprarcancelar')
                                       .setLabel('Mensagem Automática')
                                       .setStyle(2)
                                       .setDisabled(true)
                                       const row22 = new ActionRowBuilder().addComponents(button2);
                       interaction.user.send({ embeds: [embedcancelar356], components: [row22] }) 
                      db3.delete(`${data_id}`)
                    }, 600000)
                       
                     const row = new Discord.ActionRowBuilder()
          
                     .addComponents(
                      new Discord.ButtonBuilder()
                      .setCustomId('addboton')
                      .setLabel(`+`)
                      .setStyle(2),
                     )
                     .addComponents(
                      new Discord.ButtonBuilder()
                      .setCustomId('tesdod')
                      .setLabel(`${emoji.lapis}`)
                      .setStyle(3),
                     )
                       .addComponents(
                         new Discord.ButtonBuilder()
                         .setCustomId('removeboton')
                         .setLabel(`-`)
                         .setStyle(2),
                       )
          
                     
                       const embedsdf = new Discord.EmbedBuilder()
                    .setTitle(`**${dbcv.get(`title`)} | Termos de compra**`)
                    .setDescription(`**${dbcv.get(`termos`)}**`)
                    .setColor(dbcv.get(`color`))
          
                     const embedsstermos = new Discord.EmbedBuilder()
                       .setAuthor({name:`${dbcv.get('title')} | Sistema de Compra`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                       .setThumbnail(dbcv.get(`foto`))       
                       .setColor(dbcv.get(`color`))
                       .setDescription(`${emoji.megafone} | Olá <@${interaction.user.id}>, este é seu carrinho, fique à vontade para adicionar mais produtos ou fazer as modificações que achar necessário.\n\n${emoji.fixo} | ***__Importante:__*** Verifique se o seu privado está aberto. Para verificar se ele está aberto, ***__clique no botão testar DM__***. Se o seu privado estiver fechado, ***o produto adquirido não chegará à seu privado.***\n\n${emoji.alerta} | Lembre-se de ler nossos termos de compra, para não ter nenhum problema futuramente, ao continuar com a compra, você concorda com nossos termos.\n\n${emoji.sino} | Quando estiver tudo pronto aperte o botão abaixo, para continuar com sua compra!`)
                       .setFooter({ text: `${dbcv.get(`title`)} - Todos os direitos reservados.` })
                       const row3 = new Discord.ActionRowBuilder()
          
                     .addComponents(
                      new Discord.ButtonBuilder()
                      .setCustomId('comprarboton')
                      .setLabel('Aceitar e Continuar')
                      .setEmoji(`${emoji.aceitar}`)
                      .setStyle(3),
          
                     )
                     .addComponents(
                     new Discord.ButtonBuilder()
                     .setCustomId('cancelarbuy')
                     .setLabel('Cancelar')
                     .setEmoji(`${emoji.negar}`)
                     .setStyle(4)
                     )
          
                     .addComponents(
                      new Discord.ButtonBuilder()
                      .setCustomId('DM')
                      .setLabel('Testar DM')
                      .setEmoji(`${emoji.envelope}`)
                      .setStyle(1)
                      )

          
                      
                                                          
                     const embedss = new Discord.EmbedBuilder()
                     .setDescription(`${emoji.planet}  **| Produto:** \`${eprod.nome}\`\n\n ${emoji.caixa} **| Quantidade:** \`${quantidade1}\`\n\n ${emoji.dinheiro} **| Preço** \`R$${precoalt}\`\n\n **${emoji.carrinho} | Quantidade disponível: \`${quantidade}\`**`)
                     .setColor(dbcv.get(`color`))
                       c.send({ embeds: [embedsstermos], content: `||<@${interaction.user.id}>||`, components: [row3], fetchReply: true }).then(msg => {
                        const filter = i => i.user.id === interaction.user.id;
                        const collector = msg.createMessageComponentCollector({ filter });
                        collector.on("collect", intera => {
                          //intera.deferUpdate()
                          if (intera.customId === 'cancelarbuy') {
                            clearInterval(timer2);
                            const embedcancelar = new Discord.EmbedBuilder()
                                       .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                                       .setDescription(`Olá ${interaction.user},\n\n• Você cancelou a compra, e todos os produtos foram devolvido para o estoque. Você pode voltar a comprar quando quiser!`)
                                       .setColor(dbcv.get(`color`))
          
          const button2 = new ButtonBuilder()
              .setCustomId('comprarcancelar')
              .setLabel('Mensagem Automática')
              .setStyle(2)
              .setDisabled(true);
          
          const row22 = new ActionRowBuilder().addComponents(button2);
          
          
                                       interaction.user.send({embeds: [embedcancelar],  components: [row22]})
          
                                       const logstaff = new Discord.EmbedBuilder()
                                       .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                     .setColor(dbcv.get(`color`))
                     .addFields(
                      { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
                      { name: '📝 | Motivo:', value: `\`Cancelada pelo usuário.\`` },
                      { name: '🕒 | Data / Horário:', value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
                    )
                    .setThumbnail(interaction.user.displayAvatarURL({ format: "png" }))
                    .setTimestamp()
                    const button26 = new ButtonBuilder()
                                       .setCustomId('comprarcancelar')
                                       .setLabel('Mensagem Automática')
                                       .setStyle(2)
                                       .setDisabled(true)
                                       const row26 = new ActionRowBuilder().addComponents(button26);
                                       client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [logstaff], components: [row26]})
          
                            db3.delete(`${data_id}`)
                            if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                          }
                            
                  
                  
                    if (intera.customId === `DM`) {
                      intera.deferUpdate()
                          const embeddm = new Discord.EmbedBuilder()
                            .setTitle(`${dbcv.get(`title`)} | Sistema Vendas`)
                            .setDescription(`<@${interaction.user.id}>\nSe você recebeu essa mensagem sua dm está aberta, pode voltar para sua compra tranquilamente`)
                            .setColor(dbcv.get(`color`))
                            const row09 = new Discord.ActionRowBuilder()
                    .addComponents(
                      new Discord.ButtonBuilder()
                        .setLabel('Voltar para o carrinho')
                        .setStyle(5)
                        .setURL(intera.channel.url),
                    );
                          interaction.user.send({ embeds: [embeddm], components: [row09] }).then(() => {
                            msg.channel.send({
                              content:`${emoji.redondoVerde} | Sua DM Foi Testada e está Aberta! agora pode prosseguir a sua compra`
                            }).then((msg) => {
                              setTimeout(() => {
                                msg.delete()
                              }, 5000);
                            })
                          }).catch((err) => {
                            console.log(err)
                            msg.channel.send({
                              content:`${emoji.redondoVermelho} | Sua DM Foi Testada e está Fechada! Abra sua dm para prosseguir sua compra...`
                            }).then((msg) => {
                              setTimeout(() => {
                                msg.delete()
                              }, 5000);
                            })
                          })
                        }
          
                            

                   if(dbcv.get(`semi-auto`) === false) {

                    if (intera.customId === "comprarboton") {
                      msg.channel.bulkDelete(50).then(() => {
                      if (quantidade1 < Number(db.get(`${severi}.minimo`) || "0")) return intera.reply({ content: `Você precisa comprar no minimo: ${db.get(`${severi}.minimo`)} produtos!`, ephemeral: true })
                      
                      msg.channel.bulkDelete(50).then(() => {
                        clearInterval(timer2);
                      const timer3 = setTimeout(function () {
                       if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                        db3.delete(`${data_id}`)
                  }, 600000)

                  

                      const row = new Discord.ActionRowBuilder()
                       
                        .addComponents(
                          new Discord.ButtonBuilder()
                            .setCustomId('continuarboton')
                            .setLabel('Ir para o Pagamento')
                            .setEmoji(`${emoji.aceitar}`)
                            .setStyle(3),
                      )
                      
                      if (db.get(`${severi}.cupom`) != 'OFF') {
                        row.addComponents(
                       new Discord.ButtonBuilder()
                         .setCustomId('addcboton')
                         .setLabel('Adicionar Cupom de Desconto')
                         .setEmoji(`${emoji.cupom}`)
                         .setDisabled(dbcv.get(`botaotruefalse`))
                         .setStyle(1),
                   )
                      }
                      
                      row.addComponents(
                          new Discord.ButtonBuilder()
                            .setCustomId('cancelarboton')
                            .setLabel("Cancelar Compra")
                            .setEmoji(`${emoji.negar}`)
                            .setStyle(4),
                      )
                                         
                      const embedss = new Discord.EmbedBuilder()
                      .setAuthor({name:`${dbcv.get('title')} | Resumo da Compra`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                      .setDescription(`${emoji.planet} | Produto: \`${eprod.nome}\`\n ${emoji.dinheiro} | Valor unitário:  \`R$${db.get(`${severi}.preco`)}\`\n ${emoji.caixa} | Quantidade: \`${quantidade1}\`\n${emoji.carrinho} | Total: \`R$${db.get(`${severi}.preco`) * quantidade1}\`\n\n\n **${emoji.info2} | Desconto: \`0%\`\n ${emoji.presente} | Cupom adicionado: \`Sem Cupom\`**`)                                     
                      .setColor(dbcv.get(`color`))
                        
                      c.send({ embeds: [embedss], components: [row], content: `||<@${interaction.user.id}>||`, fetchReply: true }).then(msg => {
                        const filter = i => i.user.id === interaction.user.id;
                        const collector = msg.createMessageComponentCollector({ filter });
                        collector.on("collect", intera2 => {
                  //        intera2.deferUpdate()
                  
                  if (intera2.customId === 'addcboton') {
                    row.components[1].setDisabled(true)
                    const ModalBuildercupom = new ModalBuilder();
                    ModalBuildercupom.setTitle(`Adicionar Cupom`)
                    ModalBuildercupom.setCustomId('ModalBuilderCupomm')
                    
                    const textCupom = new Discord.TextInputBuilder()
                    .setCustomId('cupomadd')
                    .setLabel('NOME DO CUPOM?')
                    .setStyle(1)
                  
                    
                    const actioncupom = new ActionRowBuilder().addComponents(textCupom)
                    
                    ModalBuildercupom.addComponents(actioncupom)
                    intera2.showModal(ModalBuildercupom)
                  }
                  
                  client.once('interactionCreate', async (interaction) => {
                    
                    if (interaction.isModalSubmit() && interaction.customId === 'ModalBuilderCupomm') {
                      const cupom = `${interaction.fields.getTextInputValue('cupomadd')}`;
                      if (`${cupom}` !== `${dbc.get(`${cupom}.idcupom`)}`) {
                        interaction.reply({ content: `:x: | Cupom de desconto não existente.`, ephemeral: true });
                      } else {
                        var minalt = dbc.get(`${cupom}.minimo`);
                        var dscalt = dbc.get(`${cupom}.desconto`);
                        var qtdalt = dbc.get(`${cupom}.quantidade`);
                  
                        precoalt = Number(precoalt) + Number.parseInt(`1`);
                        minalt = Number.parseInt(minalt) + Number.parseInt(`1`);
                  
                        if (precoalt < minalt) {
                          interaction.reply({ content: `:x: | Você não atingiu o mínimo para usar este cupom!`, ephemeral: true });
                          return;
                        } else {
                          if (`${dbc.get(`${cupom}.quantidade`)}` === "0") {
                            interaction.reply({ content: `:x: | Este cupom de desconto não existe mais.`, ephemeral: true });
                          } else {
                            if (!interaction.guild.roles.cache.get(dbc.get(`${cupom}.cargo`))) {
                              
                            } else {
                              if (!interaction.member.roles.cache.has(dbc.get(`${cupom}.cargo`))) return interaction.reply({ content: `:x: | Você não possui o cargo desse cupom!`, ephemeral: true })
                            }
                            
                            if (`${cupom}` === `${dbc.get(`${cupom}.idcupom`)}`) {
                              cupom = `${dbc.get(`${cupom}.idcupom`)}`;
                              interaction.reply({ content: `${emoji.sim} | Cupom de desconto adicionado!`, ephemeral: true });
                  
                              const precinho = Number(precoalt);
                              const descontoComoFracao = Number(dbc.get(`${cupom}.desconto`) / 100);
                              const valorDesconto = Number(precinho * descontoComoFracao);
                              const precoComDesconto = precinho - valorDesconto;
                              console.log(`valor descontado: ${valorDesconto} do produto: ${eprod.nome} do carrinho do ${interaction.user.username} id da compra: ${data_id}`)

                              cp.add(`${cupom}.descontado`, valorDesconto-0.50);
                              cp.add(`${cupom}.usado`, 1);
                              precoalt = Number((precoComDesconto - 0.50).toFixed(2));
                              
                              
                              


                  
                              qtdalt = qtdalt - 1;
                  
                              const embedss2 = new Discord.EmbedBuilder()
                                .setAuthor({name:`${dbcv.get('title')} | Resumo da Compra`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                                .setDescription(`${emoji.planet} | Produto: \`${eprod.nome}\`\n ${emoji.dinheiro} | Valor unitário: \`R$${db.get(`${severi}.preco`)}\`\n ${emoji.caixa} | Quantidade: \`${quantidade1}\`\n${emoji.carrinho} | Total: \`R$${db.get(`${severi}.preco`) * quantidade1}\`\n\n\n${emoji.dinheiro} | Valor a Pagar: \`R$${Number(precoalt).toFixed(2)}\n\`${emoji.info2} | Desconto: \`${dbc.get(`${cupom}.desconto`)}%\`\n ${emoji.presente} | Cupom adicionado: \`${dbc.get(`${cupom}.idcupom`)}\``)                                     
                                .setColor(dbcv.get(`color`));
                  
                              msg.edit({ embeds: [embedss2], components: [row], content: `||<@${interaction.user.id}>||`, fetchReply: true });
                  
                              dbc.set(`${cupom}.quantidade`, `${qtdalt}`);
                              db10.set(`desconto`, precoalt);
                            }
                          }
                        }
                      }
                    }
                  });
                  
                  
                  
                        
                                     
                           if (intera2.customId === 'cancelarboton') {
                            clearInterval(timer3);
                            const embedcancelar2 = new Discord.EmbedBuilder()
                           .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                           .setDescription(`Olá ${interaction.user},\n\n• Você cancelou a compra, e todos os produtos foram devolvido para o estoque. Você pode voltar a comprar quando quiser!`)
                           .setColor(dbcv.get(`color`))

                           const button2 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row22 = new ActionRowBuilder().addComponents(button2);
                           interaction.user.send({embeds: [embedcancelar2], components: [row22]})

                           const asdaslog = new Discord.EmbedBuilder()
                           .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                           .setColor(dbcv.get(`color`))
                           .addFields(
                            { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
                            { name: '📝 | Motivo:', value: `\`Cancelada pelo usuário.\`` },
                            { name: '🕒 | Data / Horário:', value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
                          )
                          .setTimestamp()
                          .setThumbnail(interaction.user.displayAvatarURL({ format: "png" }))
                          const button26 = new ButtonBuilder()
                                             .setCustomId('comprarcancelar')
                                             .setLabel('Mensagem Automática')
                                             .setStyle(2)
                                             .setDisabled(true)
                                             const row26 = new ActionRowBuilder().addComponents(button26);
                             client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [asdaslog], components: [row26]})
                            db3.delete(`${data_id}`)
                            if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                          }                       


                            if (intera2.customId === "continuarboton") {
                            intera2.deferUpdate()
                              
                                
                              clearInterval(timer3);
                              const venda = setTimeout(function () {
                                const asdaslog = new Discord.EmbedBuilder()
                                .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
           .setColor(dbcv.get(`color`))
           .addFields(
            { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
            { name: '📝 | Motivo:', value: `\`Cancelada pelo usuário.\`` },
            { name: '🕒 | Data / Horário:', value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
          )
          .setTimestamp()
          .setThumbnail(interaction.user.displayAvatarURL({ format: "png" }))
          const button26 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row27 = new ActionRowBuilder().addComponents(button26);
                                client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [asdaslog], components: [row27]})

                                const embedcancelar3 = new Discord.EmbedBuilder()
              .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
              .setDescription(`Olá ${interaction.user},\n\n• A sua compra foi cancelada por **inatividade**, e todos os produtos foram devolvidos para o estoque. Você pode voltar a comprar quando quiser!`)
              .setColor(dbcv.get(`color`))
              const button2 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row22 = new ActionRowBuilder().addComponents(button2);
              interaction.user.send({ embeds: [embedcancelar3], components: [row22] })
                               if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                db3.delete(`${data_id}`)
                               }, dbcv.get(`tempopagar`));
                               
                              mercadopago.configurations.setAccessToken(dbcv.get(`access_token`));
                              var payment_data = {
                                transaction_amount: Number(precoalt),
                                description: `Pagamento | ${interaction.user.username} | ${data_id}`,
                                payment_method_id: 'pix',
                                 payer: {
                                   email: 'japanstorepayments@gmail.com',
                                   first_name: 'Homero',
                                   last_name: 'Brum',
                                   identification: {
                                    type: 'CPF',
                                    number: '09111189770'
                                  },
                                    address: {
                                      zip_code: '06233200',
                                      street_name: 'Av. das Nações Unidas',
                                      street_number: '3003',
                                      neighborhood: 'Bonfim',
                                      city: 'Osasco',
                                      federal_unit: 'SP'
                                    }
                                  }
                                  
                                };


                                mercadopago.configure({
                                    access_token: dbcv.get(`access_token`)
                                });

                                const preference = {                             
                                  external_reference: '123453546363667890',
                                  items: [
                                      {
                                          title: eprod.nome,
                                          unit_price: Number.parseFloat(precoalt),
                                          quantity: 1,
                                      }         
                                  ],
                                  
                                  }

                                  let preference_id = null;
                                  mercadopago.preferences.create(preference)
                                  .then((response) => {
                                      preference_id = response.body.id;
                                  })
                                  .catch((error) => {
                                      console.log(error);
                                  });


                                
                                mercadopago.payment.create(payment_data).then(function (data) {
                                  db3.set(`${data_id}.status`, `Pendente (2)`)
                                  const buffer = Buffer.from(data.body.point_of_interaction.transaction_data.qr_code_base64, "base64");
                                  const attachment = new Discord.AttachmentBuilder(buffer, "payment.png");
                                  const checkout_link = `https://www.mercadopago.com.br/checkout/v1/redirect/payment-option-form/?preference-id=${preference_id}`
                                  const rowescolha = new Discord.ActionRowBuilder()
                                    
                                  .addComponents(   
                                    new Discord.ButtonBuilder()
                                    .setCustomId('pixpays')
                                    .setEmoji(`${emoji.pix}`)
                                    .setLabel("Pix")
                                    .setDisabled(dbcv.get(`pixtruedalse`))
                                    .setStyle(1),
                                  )
                                  .addComponents(
                                    new Discord.ButtonBuilder()
                                      .setCustomId('saldodecidir')
                                      .setEmoji(`${emoji.bagmoney}`)
                                      .setLabel('Saldo')
                                      .setDisabled(dbcv.get(`saldotruefalse`))
                                      .setStyle(1)
                                  )   
                                  if(dbcv.get(`criptoonoff`) === true) {
                                    rowpagarsite.addComponents(
                                      new Discord.ButtonBuilder()
                                      .setCustomId("cripto_carrinho")
                                      .setLabel("Cripto Moedas")
                                      .setStyle(1)
                                      .setEmoji(`${emoji.envelope}`)
                                    )
                                  }
                                  rowpagarsite.addComponents( 
                                      new Discord.ButtonBuilder()
                                        .setCustomId('cancelarpix')
                                        .setEmoji(`${emoji.negar}`)
                                        
                                        .setStyle(4),
                                  );
                                  msg.edit({content:`**\ ${emoji.loading} | Gerando Pagamento...**`, embeds:[],components:[]}).then(async tempMsg => {
                                    await new Promise(resolve => setTimeout(resolve, 2500));
                                    
                                  
                                    const embedpendente2 = new Discord.EmbedBuilder()
                                      .setTitle(`${dbcv.get(`title`)} | Sistema de pagamento`)
                                      .setDescription(`\`\`\`Escolha a forma de pagamento.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                      .setFooter({text:`Escolha entre as formas de pagamento abaixo.`})
                                      .setColor(dbcv.get(`color`));
                                  
                                    return msg.edit({ embeds: [embedpendente2], content: `||<@${interaction.user.id}>||`, components: [rowescolha] });
                                  }).then(msg => {
                                  const collector = msg.channel.createMessageComponentCollector();
                                 const lopp = setInterval(function () {
                                   const time2 = setTimeout(function () {
                                     clearInterval(lopp);
                                   }, 1800000)
                                  axios.get(`https://api.mercadolibre.com/collections/notifications/${data.body.id}`, {
                                   headers: {
                                     'Authorization': `Bearer ${dbcv.get(`access_token`)}`
                                   }
                                 }).then(async (doc) => {
                                if (doc.data.collection.status === "approved") {
                                    db3.set(`${data_id}.status`, `Processando`)
                                    
                       
                                                   
                                }

                                
                                      
                                if (`${db3.get(`${data_id}.status`)}` === "Processando") {
                                  clearTimeout(time2)
                                  clearInterval(lopp);
                                  clearInterval(venda);
                                  setTimeout(function () {
                                     if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }}, 80000)
                                   
                                     
                                    const a = db.get(`${severi}.conta`);
                                      db2.add("pedidostotal", 1)
                                      db2.add("gastostotal", Number(precoalt))
                                      db2.add(`${moment().format('L')}.pedidos`, 1)
                                      db2.add(`${moment().format('L')}.recebimentos`, Number(precoalt))
                                      db2.add(`${interaction.user.id}.gastosaprovados`, Number(precoalt))
                                      db2.add(`${interaction.user.id}.pedidosaprovados`, 1)
                                      db9.add(`${interaction.user.id}. gastosaprovados`, Number(precoalt))
 
                                      if (a < quantidade1) {
                                        
                                           } else {
                                            const removed = a.splice(0, Number(quantidade1));
                                             db.set(`${severi}.conta`, a);
                                              const embedentrega = new Discord.EmbedBuilder()
                                                .setTitle(`${dbcv.get(`title`)} | Compra aprovada`)
                                                .addFields(
                                                  {
                                                    name: `${emoji.carrinho} | Produto(s) Comprado(s):`,
                                                    value: `${eprod.nome} x${db3.get(`${data_id}.qtdid`)}`,
                                                  },
                                                  {
                                                    name: `${emoji.estrela} | Id da Compra:`,
                                                    value: `\`\`${data_id}\`\``,
                                                  },
                                                  {
                                                    name: `${emoji.confete} | Muito obrigado por comprar conosco,`,
                                                    value: `${dbcv.get('title')} agradece a sua preferência!`,
                                                  }
                                                )
                                                .setImage(dbcv.get(`banner`))
                                                .setThumbnail(dbcv.get(`foto`))
                                                .setFooter({text:`Seu(s) Produto(s):`})
                                                .setColor(dbcv.get(`color`))
                                                const membro = interaction.guild.members.cache.get(interaction.user.id)
                                                const rolex = db.get(`${severi}.rolex`)
                                                
                                                setTimeout(() => {
                                           if (quantidade1 > 4) {
                                             fs.writeFile(`./produtos-${data_id}.txt`, `📦 | Entrega do produto: ${eprod.nome} - ${quantidade1}/${quantidade}\n${removed.join("\n\n")}`, (err) => {
                                  if (err) throw err;
                                  console.log('Arquivo criado com sucesso!');
                                  })
                                  const filed = `./produtos-${data_id}.txt`;
                                  
                                  interaction.user.send({ files: [filed] }).catch(error => {
                                    c.send(`Opa! parece que seu privado está bloqueado, mais não se preocupe, o produto será enviado neste canal!`)
                                    c.send({ files: [filed]})
                                    c.send(`Lembre-se de salvar o produto, o carrinho irá fechar em 1 minuto!`)
                                  })
                                  
                                  setTimeout(() => {
                                    fs.unlink(filed, (err) => {
                                      if (err) {
                                        console.error(`Erro ao apagar o arquivo: ${err}`);
                                        return;
                                      }
                                      console.log(`Arquivo foi apagado com sucesso.`);
                                    });
                                  }, 8000)
                                           }  else {
                                             interaction.user.send(`${emoji.planet} | Entrega do produto: ${eprod.nome} - x${quantidade1} Unidade \n${removed.join("\n")}`).catch(error => {
                                    c.send(`Opa! parece que seu privado está bloqueado, mais não se preocupe, o produto será enviado neste canal!`)
                                    c.send(`${emoji.planet} | Entrega do produto: ${eprod.nome} - x${quantidade1} Unidade \n${removed.join("\n")}`)
                                    c.send(`Lembre-se de salvar o produto, o carrinho irá fechar em 1 minuto!`)
                                  })
                                           }    
                                                }, 3000)
                                              interaction.user.send({ embeds: [embedentrega] }).then(async msga => {
                                               db3.set(`${data_id}.status`, `Concluido`)
                                               const deltc = new Discord.ActionRowBuilder()
                                  .addComponents(
                                    new Discord.ButtonBuilder()
                                     .setURL(msga.url)
                                     .setLabel('Atalho para DM')
                                     .setStyle(5)
                                  );
                                  
                                  msg.channel.bulkDelete(50).then(() => {
                                    if (rolex !== null){
                                      const roleasd = interaction.guild.roles.cache.find(role => role.id === db.get(`${interaction.customId}.rolex`))
                                      membro.roles.add(roleasd)
                                      const role = interaction.guild.roles.cache.find(role => role.id === dbcv.get(`role`))
                                      membro.roles.add(role).then(() => {console.log("Usuario já tem o cargo!")})
                                      msg.channel.send(`${emoji.sim} | Setei o cargo <@&${dbcv.get(`role`)}> com sucesso!\n${emoji.sim} | Pagamento Aprovado\n${emoji.estrela} | ID da compra: ${data_id} `)
                                    } else {
                                      const role = interaction.guild.roles.cache.find(role => role.id === dbcv.get(`role`))
                                      membro.roles.add(role).then(() => {console.log("Usuario já tem o cargo!")})
                                      msg.channel.send(`${emoji.sim} | Setei o cargo <@&${dbcv.get(`role`)}> com sucesso!\n${emoji.sim} | Pagamento Aprovado\n${emoji.estrela} | ID da compra: ${data_id} `)
                                    }
                                                
                                              const embedprocessando = new Discord.EmbedBuilder()
                                              .setAuthor({name:`${dbcv.get('title')} | Compra aprovada`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                                              .setDescription(`**${interaction.user} Pagamento aprovado verifique sua Dm**\n __este canal será apagado após 1 minuto__`)
                                              .setColor(dbcv.get(`color`))
                                              .setImage(dbcv.get(`banner`))
                                              db3.set(`${data_id}.entrid`, `${removed.join(" \n")}`)  
                                              c.send({ embeds:[embedprocessando], components: [deltc] })
                                                })
                                                
                                                
 
                                                const rowavaliar = new Discord.ActionRowBuilder()

                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`1star`)
                                                  .setLabel(`1`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                )
                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`2star`)
                                                  .setLabel(`2`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                )
                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`3star`)
                                                  .setLabel(`3`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                )
                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`4star`)
                                                  .setLabel(`4`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                )
                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`5star`)
                                                  .setLabel(`5`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                );
      
                                                

                                                db7.set(`${eprod.nome}.idproduto`, `${interaction.customId}`)
                                                db7.add(`${eprod.nome}.vendasfeitas`, `${db3.get(`${data_id}.qtdid`)}`)
                                                db7.add(`${eprod.nome}.valoresganhos`, `${precoalt}`)

                                              

                                                db8.set(`${interaction.user}.userid`, `${interaction.user.id}`)
                                                db8.add(`${interaction.user}.comprasrealizadas`, `1`)
                                                db8.add(`${interaction.user}.valoresganhos`, `${precoalt}`)

                                                

                                                let sleep = async (ms) => await new Promise(r => setTimeout(r, ms));
                                                let avaliacao = "\`Nenhuma Avaliação\`"
                                                let consi = "\`Nenhuma Consideração\`"
                                                const embed = await interaction.user.send({
                                                    embeds: [new Discord.EmbedBuilder()
                                                      .setAuthor({name:`${dbcv.get('title')} | Faça uma avaliação`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                                                        .setDescription(`**Caso queira, escolha uma nota para a venda:**`)
                                                        .setColor(dbcv.get(`color`))], components: [rowavaliar]})

                                                        const logstaffapr = new Discord.EmbedBuilder()
                                                        .setTitle(`${dbcv.get(`title`)} | Logs`)
                                                        .setDescription(`**${emoji.confete} Nova compra aprovada ${emoji.confete}\n\n${emoji.confete} Id da compra: \`\`${data_id}\`\`\n${emoji.carrinho} Produto: \`\`${eprod.nome}\`\`\n${emoji.dinheiro} Preço: \`\`${precoalt}\`\`\n${emoji.caixa} Quantidade: \`\`${quantidade1}\`\`**`)
                                                        .setFooter({ text: `${dbcv.get(`title`)} - Direitos reservados` });

                                                        client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [logstaffapr]})

                                                        

                                                fs.writeFile(`./produtos-${data_id}.txt`, `📦 | Entrega do produto: ${eprod.nome} - ${quantidade1}/${quantidade}\n${removed.join("\n\n")}`, (err) => {
                                  if (err) throw err;
                                  console.log('Arquivo criado com sucesso!');
                                  });
                                  
                                  const filed = `./produtos-${data_id}.txt`;
                                  
                                  setTimeout(() => {
     fs.unlink(filed, (err) => {
       if (err) {
         console.error(`Erro ao apagar o arquivo: ${err}`);
         return;
         }
         console.log(`Arquivo foi apagado com sucesso.`);
     });
     }, 8000);

                                                  const embedaprovadologstaff = new Discord.EmbedBuilder()
                                                .setAuthor({name:`${dbcv.get('title')} | Compra aprovada`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                                                .addFields(
                                                  {
                                                    name: `${emoji.star} | ID PEDIDO:`,
                                                    value: `${data_id}`,
                                                },
                                                {
                                                    name: `${emoji.star} | ID REEMBOLSO:`,
                                                    value: `${data.body.id}`,
                                                },
                                                  {
                                                      name: `${emoji.user} | COMPRADOR:`,
                                                      value: `${interaction.user} | ${interaction.user.username}`,
                                                  },
                                                  {
                                                    name: `${emoji.user} | ID COMPRADOR:`,
                                                    value: `\`${interaction.user.id}\``,
                                                },
                                                {
                                                  name: `${emoji.presente} | VALOR DO DESCONTO:`,
                                                  value: `\`R$${Number(db10.get(`desconto`)).toFixed(2)}\``,
                                                  },
                                                {
                                                  name: `${emoji.calendario} | DATA:`,
                                                  value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)`,
                                              },
                                              {
                                                name: `${emoji.planet} | PRODUTO(S) ID(S):`,
                                                value: `\`${db.get(`${severi}.idproduto`)}\``,
                                              },
                                                  {
                                                      name: `${emoji.planet} | Produto(s) Comprado(s):`,
                                                      value: `${eprod.nome} x${db3.get(`${data_id}.qtdid`)}`,
                                                  },
                                                  {
                                                      name: `${emoji.dinheiro} | Valor Pago:`,
                                                      value: `\`R$${precoalt}\``,
                                                  },
                                                  {
                                                      name: `${emoji.maos} | MÉTODO DE PAGAMENTO:`,
                                                      value: `${db3.get(`${data_id}.formapagamento`)}`,
                                                  },
                                                  {
                                                      name: `${emoji.estrela} | PRODUTO ENTREGUE:`,
                                                      value: `\`\`\`📦 | Entrega do Produto: ${eprod.nome} - ${quantidade1}/${quantidade1}\n${db3.get(`${data_id}.entrid`)}\`\`\``,
                                                  }
                                                  
                                                 //value: `\`\`\`📦 | Entrega do Produto: ${eprod.nome} - ${quantidade1}/${quantidade1}\n${db3.get(`${data_id}.entrid`)}\`\`\``,
                                                 
                                              )
                                              
                                                .setFooter({ text: `${dbcv.get(`title`)} - Todos os direitos reservados.` })
                                                .setImage(`${db.get(`${severi}.banner`) || dbcv.get(`banner`)}`)
                                                .setThumbnail(dbcv.get(`foto`))
                                                .setColor('#000000')

                                                const row = new Discord.ActionRowBuilder()
                                .addComponents(
                                  new Discord.ButtonBuilder()
                                    .setCustomId(`refund-${data.body.id}`)
                                    .setEmoji(`${emoji.maos2}`)
                                    .setLabel('Reembolsar')
                                    .setStyle(1),
                              )
                                                
                                              client.channels.cache.get(dbcv.get(`logs_staff`)).send({ files: [filed], embeds: [embedaprovadologstaff], components: [row], content: `||<@${interaction.user.id}>||` })                                            
                                              setTimeout(() => {
                                               const embedaprovadolog = new Discord.EmbedBuilder()
                                               .setAuthor({name:`${dbcv.get('title')} | Compra aprovada`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                                               .addFields(
                                                {
                                                    name: `${emoji.user} | COMPRADOR:`,
                                                    value: `${interaction.user.username}  - ${interaction.user.id}`,
                                                },
                                                {
                                                    name: `${emoji.cart} | PRODUTO(S) COMPRADO(S):`,
                                                    value: `${eprod.nome} x${db3.get(`${data_id}.qtdid`)}`,
                                                },
                                                {
                                                    name: `${emoji.dinheiro} | VALOR PAGO:`,
                                                    value: `\`R$${precoalt}\``,
                                                },
                                                 {
                                                  name: `${emoji.presente} | VALOR DO DESCONTO:`,
                                                  value: `\`R$${Number(db10.get(`desconto`)).toFixed(2)}\``,
                                                  },
                                                {
                                                    name: `${emoji.calendario} | DATA:`,
                                                    value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)`,
                                                },
                                                {
                                                    name: `${emoji.estrela2} | Avaliação:`,
                                                    value: `${avaliacao}\n**__${interaction.user.username}__: **\`${consi}\``,
                                                },
                                            )
                                            
                                               .setFooter({ text: `${dbcv.get(`title`)} - Todos os direitos reservados.` })
                                               .setImage(`${db.get(`${severi}.banner`) || dbcv.get(`banner`)}`)
                                               .setThumbnail(dbcv.get(`foto`))
                                               .setColor(dbcv.get(`color`))
                                              client.channels.cache.get(dbcv.get(`logs_feedback`)).send({ embeds: [embedaprovadolog], content: `||<@${interaction.user.id}>||` })

                                              }, 30000);
  
const interacaoavaliar = embed.createMessageComponentCollector({ componentType: Discord.ComponentType.Button });
interacaoavaliar.on("collect", async (interaction) => {
  if (interaction.user.id != interaction.user.id) {
      return;
  }

  if (interaction.isButton()) {
    var escrito = ""
    var textoest = ""
    var estrelas = severi.replace("star", "")

for (let i = 0; i != estrelas; i++) {
    textoest = `${textoest} ⭐`
}

const Modal = new ModalBuilder().setCustomId("ModalBuilder_avalia")
.setTitle("Considerações finais?");
const text = new Discord.TextInputBuilder()
.setCustomId("consi")
.setLabel("Como foi receber o produto?")
.setRequired(false)
.setStyle(1)
.setPlaceholder("(OPCIONAL)")


Modal.addComponents(new Discord.ActionRowBuilder().addComponents(text))
await interaction.showModal(Modal
  )


  }
  
  client.once('interactionCreate', async (interaction) => {


    if(interaction.customId==="ModalBuilder_avalia" && interaction.isModalSubmit()) {
      const asdasd = interaction.fields.getTextInputValue("consi") || consi
      interaction.reply({
        content: `${emoji.confete} | Você é demais! Obrigado por avaliar a gente, isto ajuda muito! Volte sempre <3`,
      }).then(msg => {
        setTimeout(() => {
          msg.delete();
        }, 5500);
      }).then(msg => {
        
        const newDescription = `${emoji.estrela} | Obrigado por avaliar!`;
    
    embed.edit({
      content: newDescription,
      ephemeral: true,
      embeds: [],
      components: []
    }).then((editedMessage) => {
      setTimeout(() => {
        editedMessage.delete();
      }, 30000);
    });
    avaliacao = `${textoest} (${estrelas})`
    consi = `${asdasd}`})
    }

    
  })
})



})
const embed = new Discord.EmbedBuilder()
      .setTitle(`${dbp.get(`${severi}.titulo`)}`)
      .setDescription(`${dbp.get(`${severi}.desc`)} `);

      const select = new Discord.StringSelectMenuBuilder()
      .setCustomId(`${severi}`)
      .setPlaceholder("Escolha algum produto")
      .setMaxValues(1)
  
      if(dbp.get(`${severi}.miniatura`) !== "Nenhuma") {

        embed.setThumbnail(`${dbp.get(`${severi}.miniatura`)}`)

      }

      dbp.get(`${severi}.produtos`).map((pd) => {
        const valor = Number(db.get(`${pd}.preco`))
        select.addOptions(
            {
                label:`${db.get(`${pd}.nome`)}`,
                description:`💸| Valor: ${valor.toFixed(2)} - 📦 Estoque: ${db.get(`${pd}.conta`).length}`,
                value:`${db.get(`${pd}.idproduto`)}`,
                emoji:`${dbp.get(`${severi}.emoji`)}`
            }
        )
      })

      interaction.message.edit({
        embeds:[
            embed.setColor(dbcv.get(`color`))
            .setImage(`${dbp.get(`${severi}.banner`)}`)
        ],
        components:[
            new ActionRowBuilder()
            .addComponents(select)
        ]
      })
          
                                                    }}})}, 10000)
                                                 
                                                     collector.on("collect", interaction => {
  
                                                      const rowpixpayments = new Discord.ActionRowBuilder()
                                                      .addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('codigo')
                                                        .setLabel("Chave Pix")
                                                        .setEmoji(`${emoji.pix}`)
                                                        .setStyle(1),
                                                      )
                                                      .addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('qrcode')
                                                        .setLabel('QR Code')
                                                        .setEmoji(`${emoji.qrcode}`)
                                                        .setStyle(1),
                                                      )
                                                      
                                                      .addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('cancelarpix')
                                                        
                                                        .setEmoji(`${emoji.negar}`)
                                                        .setStyle(4),
                                                      );

                                                      

                                                      const rowpagarsite = new Discord.ActionRowBuilder()
                                                      .addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setURL(checkout_link)
                                                        .setEmoji(`${emoji.maos}`)
                                                        .setLabel(`Realizar Pagamento`)
                                                        .setStyle(5)
                                                      )

                                                      .addComponents(   
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('pixpays')
                                                        .setEmoji(`${emoji.pix}`)
                                                        .setLabel("Pix")
                                                        .setDisabled(dbcv.get(`pixtruedalse`))
                                                        .setStyle(1),
                                                      )     
                                                      .addComponents(   
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('saldocomprar')
                                                        .setEmoji(`${emoji.pix}`)
                                                        .setLabel("teste")
                                                        .setDisabled(dbcv.get(`saldotruefalse`))
                                                        .setStyle(1),
                                                      ) 
                                                      if(dbcv.get(`criptoonoff`) === true) {
                                                        rowpagarsite.addComponents(
                                                          new Discord.ButtonBuilder()
                                                          .setCustomId("cripto_carrinho")
                                                          .setLabel("Cripto Moedas")
                                                          .setStyle(1)
                                                          .setEmoji(`${emoji.envelope}`)
                                                        )
                                                      }
                                                      rowpagarsite.addComponents( 
                                                          new Discord.ButtonBuilder()
                                                            .setCustomId('cancelarpix')
                                                            .setEmoji(`${emoji.negar}`)
                                                            
                                                            .setStyle(4),
                                                      );

                                                      if(interaction.customId === "cripto_carrinho") {
                                                        interaction.deferUpdate()
                                                        db3.set(`${data_id}.formapagamento`, `Pago com criptomoedas`)
                                                          
                                                        clearInterval(venda);
                                                       const embedpixpayments = new Discord.EmbedBuilder()
                                                       .setTitle(`${dbcv.get(`title`)} | Criptomoedas`)
                                                       .setImage(dbcv.get(`banner`)) 
                                                       .setDescription(`\`\`\`Escolha a forma de pagamento.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                                         .setColor(dbcv.get(`color`))
                                                         .setFooter({ text: `Escolha entre os abaixo, após escolher, pague.` })
                                                       msg.edit({ embeds: [embedpixpayments], content: `||<@${interaction.user.id}>||`, components: [
                                                        new ActionRowBuilder()
                                                        .addComponents(
                                                          new ButtonBuilder()
                                                          .setCustomId("btc_carrinho")
                                                          .setLabel("BTC")
                                                          .setStyle(1),
                                                          new ButtonBuilder()
                                                          .setCustomId("ltc_carrinho")
                                                          .setLabel("LTC")
                                                          .setStyle(1),
                                                          new ButtonBuilder()
                                                          .setCustomId("usdt_carrinho")
                                                          .setLabel("USDT")
                                                          .setStyle(1),
                                                          new Discord.ButtonBuilder()
                                                        .setCustomId(`${data_id}_aprovarcompracarrinho`)
                                                        .setLabel('Aprovar Compra')
                                                        .setEmoji(`${emoji.staff}`)
                                                        .setStyle(3),
                                                          new Discord.ButtonBuilder()
                                                          .setCustomId('cancelarpix')
                                                          .setEmoji(`${emoji.negar}`)
                                                          .setStyle(4),
                                                        )
                                                       ] })}

 
                                                        if (interaction.customId === 'pixpays') {
                                                          interaction.deferUpdate()
                                                            
                                                          clearInterval(venda);
                                                          setTimeout(function () {
                                                            if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                                             db3.delete(`${data_id}`)
                                                            },`${dbcv.get(`tempopagar`)}`)
                                                            const moment = require("moment");
                                    moment.locale("pt-br");
                                    const min = moment().add(`${dbcv.get(`tempopagar`)}`, 'milliseconds');
                                    const time = Math.floor(min.valueOf() / 1000);
                                                         const embedpixpayments = new Discord.EmbedBuilder()
                                                         .setTitle(`${dbcv.get(`title`)} | PIX`)
                                                         .setImage(dbcv.get(`banner`)) 
                                                         .setDescription(`\`\`\`Escolha a forma de pagamento.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}\n${emoji.lupa} | Pagamento expira em:\n<t:${time}:f> (<t:${time}:R>)`)
                                                           .setColor(dbcv.get(`color`))
                                                           .setFooter({ text: `Escolha entre os abaixo, após escolher, pague.` })
                                                         msg.edit({ embeds: [embedpixpayments], content: `||<@${interaction.user.id}>||`, components: [rowpixpayments] })
                                                         
                                                        }
                                                        
                                                     

                                                        if (interaction.customId === 'cancelarpix') {
                                                          clearInterval(lopp);
                                                          clearInterval(venda)
                                                          const embedcancelar3 = new Discord.EmbedBuilder()
                             .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                             .setDescription(`Olá ${interaction.user},\n\n• Você cancelou a compra, e todos os produtos foram devolvido para o estoque. Você pode voltar a comprar quando quiser!`)
                             .setColor(dbcv.get(`color`))
                             const button2 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row22 = new ActionRowBuilder().addComponents(button2);
                             
                             interaction.user.send({embeds: [embedcancelar3], components: [row22]})

                             const logstaff = new Discord.EmbedBuilder()
                             .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
           .setColor(dbcv.get(`color`))
           .addFields(
            { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
            { name: '📝 | Motivo:', value: `\`Cancelada pelo usuário.\`` },
            { name: '🕒 | Data / Horário:', value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
          )
          .setThumbnail(interaction.user.displayAvatarURL({ format: "png" }))
          .setTimestamp()
          const button26 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row29 = new ActionRowBuilder().addComponents(button26);
                             client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [logstaff], components: [row29] })
                                                          db3.delete(`${data_id}`)
                                                          if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                                         }
                                                     
                                                         if (interaction.customId === "codigo") {
                                                          interaction.deferUpdate()
                                                          rowpixpayments.components[0].setDisabled(true)
                                                          const moment = require("moment");
                                    moment.locale("pt-br");
                                    const min = moment().add(`${dbcv.get(`tempopagar`)}`, 'milliseconds');
                                    const time = Math.floor(min.valueOf() / 1000);
                                                          const embed2 = new Discord.EmbedBuilder()
                                                          .setTitle(`${dbcv.get(`title`)} | PIX`)
                                                          .setImage(dbcv.get(`banner`)) 
                                                          .setDescription(`\`\`\`Pague para receber o produto.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}\n${emoji.lupa} | Pagamento expira em:\n<t:${time}:f> (<t:${time}:R>)`)
                                                            .setColor(dbcv.get(`color`))
                                                            .setFooter({ text: `Após efetuar o pagamento, o tempo de entrega é de no maximo 1 minuto!` })
                                                         msg.edit({ embeds: [embed2], content: `||<@${interaction.user.id}>||`, components: [rowpixpayments] })

                                                          setTimeout(() => {
                                                            interaction.followUp({
                                                              embeds:[
                                                                new Discord.EmbedBuilder()
                                                                .addFields(
                                                                  {
                                                                    name:"🔑 | Tipo de Chave:",
                                                                    value:`Copiar e Colar`
                                                                  },
                                                                  {
                                                                    name:"🔗 | Chave Pix:",
                                                                    value:`${data.body.point_of_interaction.transaction_data.qr_code}`
                                                                  }
                                                                )
                                                              ],
                                                              ephemeral:true
                                                            })

                                                        }, 1000);
                                                        }
                                                        
                                                        
                                                        if (interaction.customId === 'qrcode') {
                                                          interaction.deferUpdate()
                                                          
                                                          rowpixpayments.components[1].setDisabled(true)
                                                          const moment = require("moment");
                                    moment.locale("pt-br");
                                    const min = moment().add(`${dbcv.get(`tempopagar`)}`, 'milliseconds');
                                    const time = Math.floor(min.valueOf() / 1000);
                                                         const embed2 = new Discord.EmbedBuilder()
                                                         .setTitle(`${dbcv.get(`title`)} | PIX`)
                                                         .setImage(dbcv.get(`banner`)) 
                                                         .setDescription(`\`\`\`Pague para receber o produto.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}\n${emoji.lupa} | Pagamento expira em:\n<t:${time}:f> (<t:${time}:R>)`)
                                                           .setColor(dbcv.get(`color`))
                                                           .setFooter({ text: `Após efetuar o pagamento, o tempo de entrega é de no maximo 1 minuto!` })
                                                         msg.edit({ embeds: [embed2], content: `||<@${interaction.user.id}>||`, components: [rowpixpayments] })
                                                         
                                                         setTimeout(() => {

                                                         
                                                         const aes = msg.channel.send({files: [attachment] }).then((aes) => {

                                                          const qrCodeUrl = aes.attachments.first().url;
                                                          const embedqrcode = new Discord.EmbedBuilder()
                                                         .setImage(qrCodeUrl)
                                                         .setTitle(`**QR CODE GERADO COM SUCESSO:**`) 
                                                         .setColor(dbcv.get(`color`))
                                                         interaction.followUp({embeds:[embedqrcode], ephemeral:true}).then(() => {
                                                          aes.delete()
                                                         })
                                                         })

                                                        }, 1000);
                                                        }

                                                        if (interaction.customId === 'chavepix') {
                                                            
                                                          rowpixpayments.components[2].setDisabled(true)
                                                          const embed2 = new Discord.EmbedBuilder()
                                                          .setTitle(`${dbcv.get(`title`)} | PIX`)
                                                          .setImage(dbcv.get(`banner`)) 
                                                          .setDescription(`\`\`\`Pague para receber o produto.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                                            .setColor(dbcv.get(`color`))
                                                            .setFooter({ text: `Após efetuar o pagamento, o tempo de entrega é de no maximo 1 minuto!` })
                                                          msg.edit({ embeds: [embed2], content: `||<@${interaction.user.id}>||`, components: [rowpixpayments] })
                                                          
                                                          setTimeout(() => {
 
                                                          const embedqrcode = new Discord.EmbedBuilder()
                                                          .setFooter({name:`Está forma de pagamento é manual, vai demorar mais para ser verificada"`})
                                                          .setTitle(`**${dbcv.get(`title`)} | Chave Pix**`)
                                                          .setDescription(`**Chave Pix: ${dbcv.get(`chavepix`)}**`)  
                                                          .setColor(dbcv.get(`color`))
                                                          msg.channel.send({ embeds: [embedqrcode], content: `${emoji.carregando} | Aguardando o Pagamento...` })
 
                                                         }, 1000);
                                                        }

                                                        const rowdecidirsaldo = new Discord.ActionRowBuilder()
                                                      .addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('saldocomprar')
                                                        .setLabel('Adicionar ao Carrinho')
                                                        .setEmoji(`${emoji.sim}`)
                                                        .setStyle(3),
                                                      )
                                                      .addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('voltar1')
                                                        .setLabel('Voltar')
                                                        .setEmoji(`${emoji.setaEsquerda}`)
                                                        .setStyle(1),
                                                      )

                                                      const saldo = db4.get(`${interaction.user.id}.saldo`) || "0";

                                                        if (interaction.customId === "saldodecidir") {
                                                          interaction.deferUpdate();
                                                          
                                                          const embedsaldodecidir = new Discord.EmbedBuilder()
                                                          .setTitle(`${dbcv.get(`title`)} | Saldo`)
                                                          .setDescription(`**Você deseja efetuar o pagamento de \`\`${eprod.nome}\`\` no valor de \`\`R$${precoalt}\`\` utilizando seu saldo de \`\`RS$${Number(saldo).toFixed(2)}\`\`?**`)
                                                          .setColor(dbcv.get(`color`))
                                                          msg.edit({ embeds: [embedsaldodecidir], components: [rowdecidirsaldo] })
                                                        }

                                                        if (interaction.customId === 'saldocomprar') {
                                                          interaction.deferUpdate();
                                                          const saldo = db4.get(`${interaction.user.id}.saldo`) || "0";
                                                          
                                                          if (saldo >= precoalt) {
                                                          db4.substr(`${interaction.user.id}.saldo`, `${precoalt}`)
                                                          db3.set(`${data_id}.formapagamento`, `Pago com saldo`)
                                                          db3.set(`${data_id}.status`, `Processando`)
                                                          
                                                          msg.channel.send(`**${emoji.sim} | Compra aprovada no valor de \`\`${precoalt}\`\`, este valor foi descontado do seu saldo.**`).then(msg => { setTimeout(() => msg.delete(), 5000)});
                                                      }
                                                           else {
                                                           
                                                          msg.channel.send(`${emoji.nao} | Você não tem saldo suficiente para realizar essa compra. Seu saldo: \`\`R$${Number(saldo).toFixed(2)}\`\`, valor da compra: \`\`R$${Number(precoalt).toFixed(2)}\`\``).then(msg => { setTimeout(() => msg.delete(), 5000)});
                                                        }
                                                        }

                                                        if (interaction.customId === "voltar1") {
                                                          interaction.deferUpdate();
                                                            
                                                          const embedded = new Discord.EmbedBuilder()
                                                          .setTitle(`${dbcv.get(`title`)} | Sistema de pagamento`)
                                                          .setDescription(`\`\`\`Escolha a forma de pagamento.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                                          .setImage(dbcv.get(`banner`)) 
                                                          .setThumbnail(dbcv.get(`foto`)) 
                                                          .setColor(dbcv.get(`color`))
                                                        msg.edit({ embeds: [embedded], content: `||<@${interaction.user.id}>||`, components: [rowescolha] })
                                                               
                                                         }

                                                        if (interaction.customId === "pagarsite") {
                                                            
                                                          clearInterval(venda);
                                                          const embedpagarsite = new Discord.EmbedBuilder()
                                                          .setFooter({name: `Após efetuar o pagamento, o tempo de entrega é de no maximo 1 minuto!`})
                                                          .setTitle(`**${dbcv.get(`title`)} | Copia e cola**`)
                                                          .setDescription(`\`\`\`Pague para receber o produto.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                                          .setImage(dbcv.get(`banner`)) 
                                                          .setThumbnail(dbcv.get(`foto`)) 
                                                          .setColor(dbcv.get(`color`))
                                                          msg.edit({ embeds: [embedpagarsite], components: [rowpagarsite], content: `||<@${interaction.user.id}>||` })


                                                        }

                                                        if (interaction.customId === "verificarpayments") {
                                                          interaction.deferUpdate();
                                                          const embedvefificarpayments = new Discord.EmbedBuilder()
                                                          .setFooter({name:`Estamos verificando...`})
                                                          .setTitle(`**${dbcv.get(`title`)} | Verificar pagamento**`)
                                                          .setDescription(`**Ei, <@&${dbcv.get(`equipe`)}> venha conferir o seguinte pagamento de \`\`${precoalt}\`\` e caso esteja correto, entregue o produto.**`)
                                                          .setColor(dbcv.get(`color`))
                                                          msg.channel.send({ embeds: [embedvefificarpayments], content: `||<@${interaction.user.id}>||` })
                                                        }
                                                     
                                                        
                                                       })
                                                     })
                                                   }).catch(function (error) {
                                                     console.log(error)
                                                     });
                          
                                                   }
                                                 })
                                              })
                      });
                      
                    })}


                   } else {


                    if (intera.customId === "comprarboton") {
                      msg.channel.bulkDelete(50).then(() => {
                      if (quantidade1 < Number(db.get(`${severi}.minimo`) || "0")) return intera.reply({ content: `Você precisa comprar no minimo: ${db.get(`${severi}.minimo`)} produtos!`, ephemeral: true })
                      
                      msg.channel.bulkDelete(50).then(() => {
                        clearInterval(timer2);
                      const timer3 = setTimeout(function () {
                       if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                        db3.delete(`${data_id}`)
                  }, 600000)

                  

                      const row = new Discord.ActionRowBuilder()
                       
                        .addComponents(
                          new Discord.ButtonBuilder()
                            .setCustomId('continuarboton')
                            .setLabel('Ir para o Pagamento')
                            .setEmoji(`${emoji.aceitar}`)
                            .setStyle(3),
                      )
                      
                      if (db.get(`${severi}.cupom`) != 'OFF') {
                        row.addComponents(
                       new Discord.ButtonBuilder()
                         .setCustomId('addcboton')
                         .setLabel('Adicionar Cupom de Desconto')
                         .setEmoji(`${emoji.cupom}`)
                         .setDisabled(dbcv.get(`botaotruefalse`))
                         .setStyle(1),
                   )
                      }
                      
                      row.addComponents(
                          new Discord.ButtonBuilder()
                            .setCustomId('cancelarboton')
                            .setLabel("Cancelar Compra")
                            .setEmoji(`${emoji.negar}`)
                            .setStyle(4),
                      )
                                         
                      const embedss = new Discord.EmbedBuilder()
                      .setAuthor({name:`${dbcv.get('title')} | Resumo da Compra`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                      .setDescription(`${emoji.planet} | Produto: \`${eprod.nome}\`\n ${emoji.dinheiro} | Valor unitário:  \`R$${db.get(`${severi}.preco`)}\`\n ${emoji.caixa} | Quantidade: \`${quantidade1}\`\n${emoji.carrinho} | Total: \`R$${db.get(`${severi}.preco`) * quantidade1}\`\n\n\n\n **${emoji.info2} | Desconto: \`0%\`\n ${emoji.presente} | Cupom adicionado: \`Sem Cupom\`**`)                                     
                      .setColor(dbcv.get(`color`))
                        
                      c.send({ embeds: [embedss], components: [row], content: `||<@${interaction.user.id}>||`, fetchReply: true }).then(msg => {
                        const filter = i => i.user.id === interaction.user.id;
                        const collector = msg.createMessageComponentCollector({ filter });
                        collector.on("collect", async(intera2) => {
                  
                  if (intera2.customId === 'addcboton') {
                    row.components[1].setDisabled(true)
                    const ModalBuildercupom = new ModalBuilder();
                    ModalBuildercupom.setTitle(`Adicionar Cupom`)
                    ModalBuildercupom.setCustomId('ModalBuilderCupomm')
                    
                    const textCupom = new Discord.TextInputBuilder()
                    .setCustomId('cupomadd')
                    .setLabel('NOME DO CUPOM?')
                    .setStyle(1)
                  
                    
                    const actioncupom = new ActionRowBuilder().addComponents(textCupom)
                    
                    ModalBuildercupom.addComponents(actioncupom)
                    intera2.showModal(ModalBuildercupom)
                  };
                  
                  client.once('interactionCreate', async (interaction) => {
                    
                    if (interaction.isModalSubmit() && interaction.customId === 'ModalBuilderCupomm') {
                      const cupom = `${interaction.fields.getTextInputValue('cupomadd')}`;
                      if (`${cupom}` !== `${dbc.get(`${cupom}.idcupom`)}`) {
                        interaction.reply({ content: `:x: | Cupom de desconto não existente.`, ephemeral: true });
                      } else {
                        var minalt = dbc.get(`${cupom}.minimo`);
                        var dscalt = dbc.get(`${cupom}.desconto`);
                        var qtdalt = dbc.get(`${cupom}.quantidade`);
                  
                        precoalt = Number(precoalt) + Number.parseInt(`1`);
                        minalt = Number.parseInt(minalt) + Number.parseInt(`1`);
                  
                        if (precoalt < minalt) {
                          interaction.reply({ content: `:x: | Você não atingiu o mínimo para usar este cupom!`, ephemeral: true });
                          return;
                        } else {
                          if (`${dbc.get(`${cupom}.quantidade`)}` === "0") {
                            interaction.reply({ content: `:x: | Este cupom de desconto não existe mais.`, ephemeral: true });
                          } else {
                            if (!interaction.guild.roles.cache.get(dbc.get(`${cupom}.cargo`))) {
                              
                            } else {
                              if (!interaction.member.roles.cache.has(dbc.get(`${cupom}.cargo`))) return interaction.reply({ content: `:x: | Você não possui o cargo desse cupom!`, ephemeral: true })
                            }
                            
                            if (`${cupom}` === `${dbc.get(`${cupom}.idcupom`)}`) {
                              cupom = `${dbc.get(`${cupom}.idcupom`)}`;
                              interaction.reply({ content: `${emoji.sim} | Cupom de desconto adicionado!`, ephemeral: true });
                  
                              const precinho = Number(precoalt);
                              const descontoComoFracao = Number(dbc.get(`${cupom}.desconto`) / 100);
                              const valorDesconto = Number(precinho * descontoComoFracao);
                              const precoComDesconto = precinho - valorDesconto;
                              console.log(`valor descontado: ${valorDesconto} do produto: ${eprod.nome} do carrinho do ${interaction.user.username} id da compra: ${data_id}`)

                              cp.add(`${cupom}.descontado`, valorDesconto-0.50);
                              cp.add(`${cupom}.usado`, 1);
                              precoalt = Number((precoComDesconto - 0.50).toFixed(2));
                              
                              
                              


                  
                              qtdalt = qtdalt - 1;
                  
                              const embedss2 = new Discord.EmbedBuilder()
                                .setAuthor({name:`${dbcv.get('title')} | Resumo da Compra`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                                .setDescription(`${emoji.planet} | Produto: \`${eprod.nome}\`\n ${emoji.dinheiro} | Valor unitário: \`R$${db.get(`${severi}.preco`)}\`\n ${emoji.caixa} | Quantidade: \`${quantidade1}\`\n${emoji.carrinho} | Total: \`R$${db.get(`${severi}.preco`) * quantidade1}\`\n\n\n${emoji.dinheiro} | Valor a Pagar: \`R$${Number(precoalt).toFixed(2)}\`\n${emoji.info2} | Desconto: \`${dbc.get(`${cupom}.desconto`)}%\`\n ${emoji.presente} | Cupom adicionado: \`${dbc.get(`${cupom}.idcupom`)}\``)                                     
                                .setColor(dbcv.get(`color`));
                  
                              msg.edit({ embeds: [embedss2], components: [row], content: `||<@${interaction.user.id}>||`, fetchReply: true });
                  
                              dbc.set(`${cupom}.quantidade`, `${qtdalt}`);
                              db10.set(`desconto`, precoalt);
                            }
                          }
                        }
                      }
                    }
                  });
                  
                  
                  
                        
                                     
                           if (intera2.customId === 'cancelarboton') {
                            clearInterval(timer3);
                            const embedcancelar2 = new Discord.EmbedBuilder()
                           .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                           .setDescription(`Olá ${interaction.user},\n\n• Você cancelou a compra, e todos os produtos foram devolvido para o estoque. Você pode voltar a comprar quando quiser!`)
                           .setColor(dbcv.get(`color`))

                           const button2 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row22 = new ActionRowBuilder().addComponents(button2);
                           interaction.user.send({embeds: [embedcancelar2], components: [row22]})

                           const asdaslog = new Discord.EmbedBuilder()
                           .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                           .setColor(dbcv.get(`color`))
                           .addFields(
                            { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
                            { name: '📝 | Motivo:', value: `\`Cancelada pelo usuário.\`` },
                            { name: '🕒 | Data / Horário:', value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
                          )
                          .setTimestamp()
                          .setThumbnail(interaction.user.displayAvatarURL({ format: "png" }))
                          const button26 = new ButtonBuilder()
                                             .setCustomId('comprarcancelar')
                                             .setLabel('Mensagem Automática')
                                             .setStyle(2)
                                             .setDisabled(true)
                                             const row26 = new ActionRowBuilder().addComponents(button26);
                             client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [asdaslog], components: [row26]})
                            db3.delete(`${data_id}`)
                            if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                          }                       


                            if (intera2.customId === "continuarboton") {
                            intera2.deferUpdate()
                              
                                
                              clearInterval(timer3);
                              const venda = setTimeout(function () {
                                const asdaslog = new Discord.EmbedBuilder()
                                .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
           .setColor(dbcv.get(`color`))
           .addFields(
            { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
            { name: '📝 | Motivo:', value: `\`Cancelada pelo usuário.\`` },
            { name: '🕒 | Data / Horário:', value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
          )
          .setTimestamp()
          .setThumbnail(interaction.user.displayAvatarURL({ format: "png" }))
          const button26 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row27 = new ActionRowBuilder().addComponents(button26);
                                client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [asdaslog], components: [row27]})

                                const embedcancelar3 = new Discord.EmbedBuilder()
              .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
              .setDescription(`Olá ${interaction.user},\n\n• A sua compra foi cancelada por **inatividade**, e todos os produtos foram devolvidos para o estoque. Você pode voltar a comprar quando quiser!`)
              .setColor(dbcv.get(`color`))
              const button2 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row22 = new ActionRowBuilder().addComponents(button2);
              interaction.user.send({ embeds: [embedcancelar3], components: [row22] })
                               if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                db3.delete(`${data_id}`)
                               }, dbcv.get(`tempopagar`));
                               
                            

                                  db3.set(`${data_id}.status`, `Pendente (2)`)
                                  const rowescolha = new Discord.ActionRowBuilder()
                                    
                                  .addComponents(   
                                    new Discord.ButtonBuilder()
                                    .setCustomId('pixpays')
                                    .setEmoji(`${emoji.pix}`)
                                    .setLabel("Pix")
                                    .setDisabled(dbcv.get(`pixtruedalse`))
                                    .setStyle(1),
                                  )
                                  
                                  if(dbcv.get(`criptoonoff`) === true) {
                                    rowescolha.addComponents(
                                      new Discord.ButtonBuilder()
                                      .setCustomId("cripto_carrinho")
                                      .setLabel("Cripto Moedas")
                                      .setStyle(1)
                                      .setEmoji(`${emoji.envelope}`)
                                    )
                                  }
                                   rowescolha.addComponents( 
                                      new Discord.ButtonBuilder()
                                        .setCustomId('cancelarpix')
                                        .setEmoji(`${emoji.negar}`)
                                        
                                        .setStyle(4),
                                  );
                                  msg.edit({content:`**\ ${emoji.loading} | Gerando Pagamento...**`, embeds:[],components:[]}).then(async tempMsg => {
                                    await new Promise(resolve => setTimeout(resolve, 2500));
                                    
                                  
                                    const embedpendente2 = new Discord.EmbedBuilder()
                                      .setTitle(`${dbcv.get(`title`)} | Sistema de pagamento`)
                                      .setDescription(`\`\`\`Escolha a forma de pagamento.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                      .setFooter({text:`Escolha entre as formas de pagamento abaixo.`})
                                      .setColor(dbcv.get(`color`));
                                  
                                    return msg.edit({ embeds: [embedpendente2], content: `||<@${interaction.user.id}>||`, components: [rowescolha] });
                                  }).then(msg => {
                                  const collector = msg.channel.createMessageComponentCollector();
                                 const lopp = setInterval(function () {
                                   const time2 = setTimeout(function () {
                                     clearInterval(lopp);
                                   }, 1800000)


                                
                                      
                                if (`${db3.get(`${data_id}.status`)}` === "Processando") {
                                  clearTimeout(time2)
                                  clearInterval(lopp);
                                  clearInterval(venda);
                                  setTimeout(function () {
                                     if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }}, 80000)
                                   
                                     
                                    const a = db.get(`${severi}.conta`);
                                      db2.add("pedidostotal", 1)
                                      db2.add("gastostotal", Number(precoalt))
                                      db2.add(`${moment().format('L')}.pedidos`, 1)
                                      db2.add(`${moment().format('L')}.recebimentos`, Number(precoalt))
                                      db2.add(`${interaction.user.id}.gastosaprovados`, Number(precoalt))
                                      db2.add(`${interaction.user.id}.pedidosaprovados`, 1)
                                      db9.add(`${interaction.user.id}. gastosaprovados`, Number(precoalt))
 
                                      if (a < quantidade1) {
                                        
                                           } else {
                                            const removed = a.splice(0, Number(quantidade1));
                                             db.set(`${severi}.conta`, a);
                                              const embedentrega = new Discord.EmbedBuilder()
                                                .setTitle(`${dbcv.get(`title`)} | Compra aprovada`)
                                                .addFields(
                                                  {
                                                    name: `${emoji.carrinho} | Produto(s) Comprado(s):`,
                                                    value: `${eprod.nome} x${db3.get(`${data_id}.qtdid`)}`,
                                                  },
                                                  {
                                                    name: `${emoji.estrela} | Id da Compra:`,
                                                    value: `\`\`${data_id}\`\``,
                                                  },
                                                  {
                                                    name: `${emoji.confete} | Muito obrigado por comprar conosco,`,
                                                    value: `${dbcv.get('title')} agradece a sua preferência!`,
                                                  }
                                                )
                                                .setImage(dbcv.get(`banner`))
                                                .setThumbnail(dbcv.get(`foto`))
                                                .setFooter({text:`Seu(s) Produto(s):`})
                                                .setColor(dbcv.get(`color`))
                                                const membro = interaction.guild.members.cache.get(interaction.user.id)
                                                const rolex = db.get(`${severi}.rolex`)
                                                
                                                setTimeout(() => {
                                           if (quantidade1 > 4) {
                                             fs.writeFile(`./produtos-${data_id}.txt`, `📦 | Entrega do produto: ${eprod.nome} - ${quantidade1}/${quantidade}\n${removed.join("\n\n")}`, (err) => {
                                  if (err) throw err;
                                  console.log('Arquivo criado com sucesso!');
                                  })
                                  const filed = `./produtos-${data_id}.txt`;
                                  
                                  interaction.user.send({ files: [filed] }).catch(error => {
                                    c.send(`Opa! parece que seu privado está bloqueado, mais não se preocupe, o produto será enviado neste canal!`)
                                    c.send({ files: [filed]})
                                    c.send(`Lembre-se de salvar o produto, o carrinho irá fechar em 1 minuto!`)
                                  })
                                  
                                  setTimeout(() => {
                                    fs.unlink(filed, (err) => {
                                      if (err) {
                                        console.error(`Erro ao apagar o arquivo: ${err}`);
                                        return;
                                      }
                                      console.log(`Arquivo foi apagado com sucesso.`);
                                    });
                                  }, 8000)
                                           }  else {
                                             interaction.user.send(`${emoji.planet} | Entrega do produto: ${eprod.nome} - x${quantidade1} Unidade \n${removed.join("\n")}`).catch(error => {
                                    c.send(`Opa! parece que seu privado está bloqueado, mais não se preocupe, o produto será enviado neste canal!`)
                                    c.send(`${emoji.planet} | Entrega do produto: ${eprod.nome} - x${quantidade1} Unidade \n${removed.join("\n")}`)
                                    c.send(`Lembre-se de salvar o produto, o carrinho irá fechar em 1 minuto!`)
                                  })
                                           }    
                                                }, 3000)
                                              interaction.user.send({ embeds: [embedentrega] }).then(async msga => {
                                               db3.set(`${data_id}.status`, `Concluido`)
                                               const deltc = new Discord.ActionRowBuilder()
                                  .addComponents(
                                    new Discord.ButtonBuilder()
                                     .setURL(msga.url)
                                     .setLabel('Atalho para DM')
                                     .setStyle(5)
                                  );
                                  
                                  msg.channel.bulkDelete(50).then(() => {
                                    if (rolex !== null){
                                      const roleasd = interaction.guild.roles.cache.find(role => role.id === db.get(`${interaction.customId}.rolex`))
                                      membro.roles.add(roleasd)
                                      const role = interaction.guild.roles.cache.find(role => role.id === dbcv.get(`role`))
                                      membro.roles.add(role).then(() => {console.log("Usuario já tem o cargo!")})
                                      msg.channel.send(`${emoji.sim} | Setei o cargo <@&${dbcv.get(`role`)}> com sucesso!\n${emoji.sim} | Pagamento Aprovado\n${emoji.estrela} | ID da compra: ${data_id} `)
                                    } else {
                                      const role = interaction.guild.roles.cache.find(role => role.id === dbcv.get(`role`))
                                      membro.roles.add(role).then(() => {console.log("Usuario já tem o cargo!")})
                                      msg.channel.send(`${emoji.sim} | Setei o cargo <@&${dbcv.get(`role`)}> com sucesso!\n${emoji.sim} | Pagamento Aprovado\n${emoji.estrela} | ID da compra: ${data_id} `)
                                    }
                                                
                                              const embedprocessando = new Discord.EmbedBuilder()
                                              .setAuthor({name:`${dbcv.get('title')} | Compra aprovada`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                                              .setDescription(`**${interaction.user} Pagamento aprovado verifique sua Dm**\n __este canal será apagado após 1 minuto__`)
                                              .setColor(dbcv.get(`color`))
                                              .setImage(dbcv.get(`banner`))
                                              db3.set(`${data_id}.entrid`, `${removed.join(" \n")}`)  
                                              c.send({ embeds:[embedprocessando], components: [deltc] })
                                                })
                                                
                                                
 
                                                const rowavaliar = new Discord.ActionRowBuilder()

                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`1star`)
                                                  .setLabel(`1`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                )
                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`2star`)
                                                  .setLabel(`2`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                )
                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`3star`)
                                                  .setLabel(`3`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                )
                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`4star`)
                                                  .setLabel(`4`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                )
                                                .addComponents(
                                                  new Discord.ButtonBuilder()
                                                  .setCustomId(`5star`)
                                                  .setLabel(`5`)
                                                  .setEmoji(`⭐`)
                                                  .setStyle(3)
                                                );
      
                                                

                                                db7.set(`${eprod.nome}.idproduto`, `${interaction.customId}`)
                                                db7.add(`${eprod.nome}.vendasfeitas`, `${db3.get(`${data_id}.qtdid`)}`)
                                                db7.add(`${eprod.nome}.valoresganhos`, `${precoalt}`)

                                              

                                                db8.set(`${interaction.user}.userid`, `${interaction.user.id}`)
                                                db8.add(`${interaction.user}.comprasrealizadas`, `1`)
                                                db8.add(`${interaction.user}.valoresganhos`, `${precoalt}`)

                                                

                                                let sleep = async (ms) => await new Promise(r => setTimeout(r, ms));
                                                let avaliacao = "\`Nenhuma Avaliação\`"
                                                let consi = "\`Nenhuma Consideração\`"
                                                const embed = await interaction.user.send({
                                                    embeds: [new Discord.EmbedBuilder()
                                                      .setAuthor({name:`${dbcv.get('title')} | Faça uma avaliação`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                                                        .setDescription(`**Caso queira, escolha uma nota para a venda:**`)
                                                        .setColor(dbcv.get(`color`))], components: [rowavaliar]})

                                                        const logstaffapr = new Discord.EmbedBuilder()
                                                        .setTitle(`${dbcv.get(`title`)} | Logs`)
                                                        .setDescription(`**${emoji.confete} Nova compra aprovada ${emoji.confete}\n\n${emoji.confete} Id da compra: \`\`${data_id}\`\`\n${emoji.carrinho} Produto: \`\`${eprod.nome}\`\`\n${emoji.dinheiro} Preço: \`\`${precoalt}\`\`\n${emoji.caixa} Quantidade: \`\`${quantidade1}\`\`**`)
                                                        .setFooter({ text: `${dbcv.get(`title`)} - Direitos reservados` });

                                                        client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [logstaffapr]})

                                                        

                                                fs.writeFile(`./produtos-${data_id}.txt`, `📦 | Entrega do produto: ${eprod.nome} - ${quantidade1}/${quantidade}\n${removed.join("\n\n")}`, (err) => {
                                  if (err) throw err;
                                  console.log('Arquivo criado com sucesso!');
                                  });
                                  
                                  const filed = `./produtos-${data_id}.txt`;
                                  
                                  setTimeout(() => {
     fs.unlink(filed, (err) => {
       if (err) {
         console.error(`Erro ao apagar o arquivo: ${err}`);
         return;
         }
         console.log(`Arquivo foi apagado com sucesso.`);
     });
     }, 8000);

                                                  const embedaprovadologstaff = new Discord.EmbedBuilder()
                                                .setAuthor({name:`${dbcv.get('title')} | Compra aprovada`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                                                .addFields(
                                                  {
                                                    name: `${emoji.star} | ID PEDIDO:`,
                                                    value: `${data_id}`,
                                                  },
                                                  {
                                                    name: `${emoji.user} | COMPRADOR:`,
                                                    value: `${interaction.user} | ${interaction.user.username}`,
                                                  },
                                                  {
                                                    name: `${emoji.user} | ID COMPRADOR:`,
                                                    value: `\`${interaction.user.id}\``,
                                                  },
                                                  {
                                                    name: `${emoji.presente} | VALOR DO DESCONTO:`,
                                                    value: `\`R$${Number(db10.get(`desconto`)).toFixed(2)}\``,
                                                  },
                                                  {
                                                    name: `${emoji.calendario} | DATA:`,
                                                    value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)`,
                                                  },
                                                  {
                                                    name: `${emoji.planet} | PRODUTO(S) ID(S):`,
                                                    value: `\`${db.get(`${severi}.idproduto`)}\``,
                                                  },
                                                  {
                                                    name: `${emoji.planet} | Produto(s) Comprado(s):`,
                                                    value: `${eprod.nome} x${db3.get(`${data_id}.qtdid`)}`,
                                                  },
                                                  {
                                                    name: `${emoji.dinheiro} | Valor Pago:`,
                                                    value: `\`R$${precoalt}\``,
                                                  },
                                                  {
                                                    name: `${emoji.maos} | MÉTODO DE PAGAMENTO:`,
                                                    value: `${db3.get(`${data_id}.formapagamento`)}`,
                                                  },
                                                  {
                                                    name: `${emoji.estrela} | PRODUTO ENTREGUE:`,
                                                    value: `\`\`\`📦 | Entrega do Produto: ${eprod.nome} - ${quantidade1}/${quantidade1}\n${db3.get(`${data_id}.entrid`)}\`\`\``,
                                                  }
                                                  
                                                 //value: `\`\`\`📦 | Entrega do Produto: ${eprod.nome} - ${quantidade1}/${quantidade1}\n${db3.get(`${data_id}.entrid`)}\`\`\``,
                                                 
                                              )
                                              
                                                .setFooter({ text: `${dbcv.get(`title`)} - Todos os direitos reservados.` })
                                                .setImage(`${db.get(`${severi}.banner`) || dbcv.get(`banner`)}`)
                                                .setThumbnail(dbcv.get(`foto`))
                                                .setColor('#000000')

                                                
                                              client.channels.cache.get(dbcv.get(`logs_staff`)).send({ files: [filed], embeds: [embedaprovadologstaff], content: `||<@${interaction.user.id}>||` })                                            
                                              setTimeout(() => {
                                               const embedaprovadolog = new Discord.EmbedBuilder()
                                               .setAuthor({name:`${dbcv.get('title')} | Compra aprovada`,iconURL: interaction.guild.iconURL({ dynamic: true })})
                                               .addFields(
                                                {
                                                    name: `${emoji.user} | COMPRADOR:`,
                                                    value: `${interaction.user.username}  - ${interaction.user.id}`,
                                                },
                                                {
                                                    name: `${emoji.cart} | PRODUTO(S) COMPRADO(S):`,
                                                    value: `${eprod.nome} x${db3.get(`${data_id}.qtdid`)}`,
                                                },
                                                {
                                                    name: `${emoji.dinheiro} | VALOR PAGO:`,
                                                    value: `\`R$${precoalt}\``,
                                                },
                                                 {
                                                  name: `${emoji.presente} | VALOR DO DESCONTO:`,
                                                  value: `\`R$${Number(db10.get(`desconto`)).toFixed(2)}\``,
                                                  },
                                                {
                                                    name: `${emoji.calendario} | DATA:`,
                                                    value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)`,
                                                },
                                                {
                                                    name: `${emoji.estrela2} | Avaliação:`,
                                                    value: `${avaliacao}\n**__${interaction.user.username}__: **\`${consi}\``,
                                                },
                                            )
                                            
                                               .setFooter({ text: `${dbcv.get(`title`)} - Todos os direitos reservados.` })
                                               .setImage(`${db.get(`${severi}.banner`) || dbcv.get(`banner`)}`)
                                               .setThumbnail(dbcv.get(`foto`))
                                               .setColor(dbcv.get(`color`))
                                              client.channels.cache.get(dbcv.get(`logs_feedback`)).send({ embeds: [embedaprovadolog], content: `||<@${interaction.user.id}>||` })

                                              }, 30000);
  
const interacaoavaliar = embed.createMessageComponentCollector({ componentType: Discord.ComponentType.Button });
interacaoavaliar.on("collect", async (interaction) => {
  if (interaction.user.id != interaction.user.id) {
      return;
  }

  if (interaction.isButton()) {
    var escrito = ""
    var textoest = ""
    var estrelas = severi.replace("star", "")

for (let i = 0; i != estrelas; i++) {
    textoest = `${textoest} ⭐`
}

const Modal = new ModalBuilder().setCustomId("ModalBuilder_avalia")
.setTitle("Considerações finais?");
const text = new Discord.TextInputBuilder()
.setCustomId("consi")
.setLabel("Como foi receber o produto?")
.setRequired(false)
.setStyle(1)
.setPlaceholder("(OPCIONAL)")


Modal.addComponents(new Discord.ActionRowBuilder().addComponents(text))
await interaction.showModal(Modal
  )


  }
  
  client.once('interactionCreate', async (interaction) => {


    if(interaction.customId==="ModalBuilder_avalia" && interaction.isModalSubmit()) {
      const asdasd = interaction.fields.getTextInputValue("consi") || consi
      interaction.reply({
        content: `${emoji.confete} | Você é demais! Obrigado por avaliar a gente, isto ajuda muito! Volte sempre <3`,
      }).then(msg => {
        setTimeout(() => {
          msg.delete();
        }, 5500);
      }).then(msg => {
        
        const newDescription = `${emoji.estrela} | Obrigado por avaliar!`;
    
    embed.edit({
      content: newDescription,
      ephemeral: true,
      embeds: [],
      components: []
    }).then((editedMessage) => {
      setTimeout(() => {
        editedMessage.delete();
      }, 30000);
    });
    avaliacao = `${textoest} (${estrelas})`
    consi = `${asdasd}`})
    }

    
  })
})



})
const embed = new Discord.EmbedBuilder()
      .setTitle(`${dbp.get(`${severi}.titulo`)}`)
      .setDescription(`${dbp.get(`${severi  }.desc`)} `);

      const select = new Discord.StringSelectMenuBuilder()
      .setCustomId(`${severi}`)
      .setPlaceholder("Escolha algum produto")
      .setMaxValues(1)
  
      if(dbp.get(`${severi}.miniatura`) !== "Nenhuma") {

        embed.setThumbnail(`${dbp.get(`${severi }.miniatura`)}`)

      }

      dbp.get(`${severi}.produtos`).map((pd) => {
        const valor = Number(db.get(`${pd}.preco`))
        select.addOptions(
            {
                label:`${db.get(`${pd}.nome`)}`,
                description:`💸| Valor: ${valor.toFixed(2)} - 📦 Estoque: ${db.get(`${pd}.conta`).length}`,
                value:`${db.get(`${pd}.idproduto`)}`,
                emoji:`${dbp.get(`${severi}.emoji`)}`
            }
        )
      })

      interaction.message.edit({
        embeds:[
            embed.setColor(dbcv.get(`color`))
            .setImage(`${dbp.get(`${severi}.banner`)}`)
        ],
        components:[
            new ActionRowBuilder()
            .addComponents(select)
        ]
      })
          
                                                    
                                                    }}})}, 10000)
                                                 
                                                     collector.on("collect", interaction => {
  
                                                      const rowpixpayments = new Discord.ActionRowBuilder()
                                                      .addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('codigo')
                                                        .setLabel("Chave Pix")
                                                        .setEmoji(`${emoji.pix}`)
                                                        .setStyle(1),
                                                      );
                                                      if(dbcv.get(`qrcode`) !== "remover") {
                                                        
                                                      rowpixpayments.addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('qrcode_carrinho')
                                                        .setLabel("Qr Code")
                                                        .setEmoji(`${emoji.qrcode}`)
                                                        .setStyle(1),
                                                      )
                                                      }
                                                      rowpixpayments.addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId(`${data_id}_aprovarcompracarrinho`)
                                                        .setLabel('Aprovar Compra')
                                                        .setEmoji(`${emoji.staff}`)
                                                        .setStyle(3),

                                                      )
                                                      rowpixpayments.addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('cancelarpix')
                                                        
                                                        .setEmoji(`${emoji.negar}`)
                                                        .setStyle(4),
                                                      );
                                                      if(interaction.customId === "qrcode_carrinho") {
                                                        try{
                                                          interaction.reply({
                                                            embeds:[
                                                              new Discord.EmbedBuilder()
                                                              .setDescription(`Qr Code:`)
                                                              .setImage(`${dbcv.get(`qrcode`)}`)
                                                            ],
                                                            ephemeral:true
                                                          }).catch(() => {
                                                            interaction.reply({
                                                              embeds:[
                                                                new Discord.EmbedBuilder()
                                                                .setDescription(`❌ | Ocorreu um Erro ao tentar renderizar o QRCODE`)
                                                              ],
                                                              ephemeral:true
                                                            })
                                                          })
                                                        } catch{
                                                            interaction.reply({
                                                              embeds:[
                                                                new Discord.EmbedBuilder()
                                                                .setDescription(`❌ | Ocorreu um Erro ao tentar renderizar o QRCODE`)
                                                              ],
                                                              ephemeral:true
                                                            })
                                                        }
                                                      }
                                                      

                                                      

                                                      const rowpagarsite = new Discord.ActionRowBuilder()
                                                      .addComponents(   
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('pixpays')
                                                        .setEmoji(`${emoji.pix}`)
                                                        .setLabel("Pix")
                                                        .setDisabled(dbcv.get(`pixtruedalse`))
                                                        .setStyle(1),
                                                      )     
                                                      .addComponents(   
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('saldocomprar')
                                                        .setEmoji(`${emoji.pix}`)
                                                        .setLabel("teste")
                                                        .setDisabled(dbcv.get(`saldotruefalse`))
                                                        .setStyle(1),
                                                      ) 
                                                      if(dbcv.get(`criptoonoff`) === true) {
                                                        rowpagarsite.addComponents(
                                                          new Discord.ButtonBuilder()
                                                          .setCustomId("cripto_carrinho")
                                                          .setLabel("Cripto Moedas")
                                                          .setStyle(1)
                                                          .setEmoji(`${emoji.envelope}`)
                                                        )
                                                      }
                                                      rowpagarsite.addComponents( 
                                                          new Discord.ButtonBuilder()
                                                            .setCustomId('cancelarpix')
                                                            .setEmoji(`${emoji.negar}`)
                                                            
                                                            .setStyle(4),
                                                      );
                                                      
 
                                                      if(interaction.customId === "cripto_carrinho") {
                                                        interaction.deferUpdate()
                                                        db3.set(`${data_id}.formapagamento`, `Pago com criptomoedas`)

                                                          
                                                        clearInterval(venda);
                                                       const embedpixpayments = new Discord.EmbedBuilder()
                                                       .setTitle(`${dbcv.get(`title`)} | Criptomoedas`)
                                                       .setImage(dbcv.get(`banner`)) 
                                                       .setDescription(`\`\`\`Escolha a forma de pagamento.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                                         .setColor(dbcv.get(`color`))
                                                         .setFooter({ text: `Escolha entre os abaixo, após escolher, pague.` })
                                                       msg.edit({ embeds: [embedpixpayments], content: `||<@${interaction.user.id}>||`, components: [
                                                        new ActionRowBuilder()
                                                        .addComponents(
                                                          new ButtonBuilder()
                                                          .setCustomId("btc_carrinho")
                                                          .setLabel("BTC")
                                                          .setStyle(1),
                                                          new ButtonBuilder()
                                                          .setCustomId("ltc_carrinho")
                                                          .setLabel("LTC")
                                                          .setStyle(1),
                                                          new ButtonBuilder()
                                                          .setCustomId("usdt_carrinho")
                                                          .setLabel("USDT")
                                                          .setStyle(1),
                                                          new Discord.ButtonBuilder()
                                                        .setCustomId(`${data_id}_aprovarcompracarrinho`)
                                                        .setLabel('Aprovar Compra')
                                                        .setEmoji(`${emoji.staff}`)
                                                        .setStyle(3),
                                                          new Discord.ButtonBuilder()
                                                          .setCustomId('cancelarpix')
                                                          .setEmoji(`${emoji.negar}`)
                                                          .setStyle(4),
                                                        )
                                                       ] })
                                                       

                                                      }

                                                        if (interaction.customId === 'pixpays') {
                                                          interaction.deferUpdate()
                                                          clearInterval(venda);
                                                          setTimeout(function () {
                                                            if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                                             db3.delete(`${data_id}`)
                                                            },`${dbcv.get(`tempopagar`)}`)
                                                            const moment = require("moment");
                                    moment.locale("pt-br");
                                    const min = moment().add(`${dbcv.get(`tempopagar`)}`, 'milliseconds');
                                    const time = Math.floor(min.valueOf() / 1000);
                                                         const embedpixpayments = new Discord.EmbedBuilder()
                                                         .setTitle(`${dbcv.get(`title`)} | PIX`)
                                                         .setImage(dbcv.get(`banner`)) 
                                                         .setDescription(`\`\`\`Escolha a forma de pagamento.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}\n${emoji.lupa} | Pagamento expira em:\n<t:${time}:f> (<t:${time}:R>)`)
                                                           .setColor(dbcv.get(`color`))
                                                           .setFooter({ text: `Escolha entre os abaixo, após escolher, pague.` })
                                                         msg.edit({ embeds: [embedpixpayments], content: `||<@${interaction.user.id}>||`, components: [rowpixpayments] })
                                                         
                                                        }

                                                        if (interaction.customId === 'cancelarpix') {
                                                          clearInterval(venda)
                                                          const embedcancelar3 = new Discord.EmbedBuilder()
                             .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                             .setDescription(`Olá ${interaction.user},\n\n• Você cancelou a compra, e todos os produtos foram devolvido para o estoque. Você pode voltar a comprar quando quiser!`)
                             .setColor(dbcv.get(`color`))
                             const button2 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row22 = new ActionRowBuilder().addComponents(button2);
                             
                             interaction.user.send({embeds: [embedcancelar3], components: [row22]})

                             const logstaff = new Discord.EmbedBuilder()
                             .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
           .setColor(dbcv.get(`color`))
           .addFields(
            { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
            { name: '📝 | Motivo:', value: `\`Cancelada pelo usuário.\`` },
            { name: '🕒 | Data / Horário:', value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
          )
          .setThumbnail(interaction.user.displayAvatarURL({ format: "png" }))
          .setTimestamp()
          const button26 = new ButtonBuilder()
                             .setCustomId('comprarcancelar')
                             .setLabel('Mensagem Automática')
                             .setStyle(2)
                             .setDisabled(true)
                             const row29 = new ActionRowBuilder().addComponents(button26);
                             client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [logstaff], components: [row29] })
                                                          db3.delete(`${data_id}`)
                                                          if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                                         }
                                                     
                                                         if (interaction.customId === "codigo") {
                                                          interaction.deferUpdate()
                                                          const moment = require("moment");
                                    moment.locale("pt-br");
                                    const min = moment().add(`${dbcv.get(`tempopagar`)}`, 'milliseconds');
                                    const time = Math.floor(min.valueOf() / 1000);
                                                          const embed2 = new Discord.EmbedBuilder()
                                                          .setTitle(`${dbcv.get(`title`)} | PIX`)
                                                          .setImage(dbcv.get(`banner`)) 
                                                          .setDescription(`\`\`\`Pague para receber o produto.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}\n${emoji.lupa} | Pagamento expira em:\n<t:${time}:f> (<t:${time}:R>)`)
                                                            .setColor(dbcv.get(`color`))
                                                            .setFooter({ text: `Após efetuar o pagamento, o tempo de entrega é de no maximo 1 minuto!` })
                                                         msg.edit({ embeds: [embed2], content: `||<@${interaction.user.id}>||`, components: [rowpixpayments] })

                                                          setTimeout(() => { 
                                                            interaction.followUp({
                                                              embeds:[
                                                                new Discord.EmbedBuilder()
                                                                .addFields(
                                                                  {
                                                                    name:"🔑 | Tipo de Chave:",
                                                                    value:`${dbcv.get(`tipopix`)}`
                                                                  },
                                                                  {
                                                                    name:"🔗 | Chave Pix:",
                                                                    value:`${dbcv.get(`chavepix`)}`
                                                                  }
                                                                )
                                                              ],
                                                              ephemeral:true
                                                            })

                                                        }, 1000);
                                                        }

                                                        if (interaction.customId === 'chavepix') {
                                                            
                                                          rowpixpayments.components[2].setDisabled(true)
                                                          const embed2 = new Discord.EmbedBuilder()
                                                          .setTitle(`${dbcv.get(`title`)} | PIX`)
                                                          .setImage(dbcv.get(`banner`)) 
                                                          .setDescription(`\`\`\`Pague para receber o produto.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                                            .setColor(dbcv.get(`color`))
                                                            .setFooter({ text: `Após efetuar o pagamento, o tempo de entrega é de no maximo 1 minuto!` })
                                                          msg.edit({ embeds: [embed2], content: `||<@${interaction.user.id}>||`, components: [rowpixpayments] })
                                                          
                                                          setTimeout(() => {
 
                                                          const embedqrcode = new Discord.EmbedBuilder()
                                                          .setFooter({name:`Está forma de pagamento é manual, vai demorar mais para ser verificada"`})
                                                          .setTitle(`**${dbcv.get(`title`)} | Chave Pix**`)
                                                          .setDescription(`**Chave Pix: ${dbcv.get(`chavepix`)}**`)  
                                                          .setColor(dbcv.get(`color`))
                                                          msg.channel.send({ embeds: [embedqrcode], content: `${emoji.carregando} | Aguardando o Pagamento...` })
 
                                                         }, 1000);
                                                        }

                                                        const rowdecidirsaldo = new Discord.ActionRowBuilder()
                                                      .addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('saldocomprar')
                                                        .setLabel('Adicionar ao Carrinho')
                                                        .setEmoji(`${emoji.sim}`)
                                                        .setStyle(3),
                                                      )
                                                      .addComponents(
                                                        new Discord.ButtonBuilder()
                                                        .setCustomId('voltar1')
                                                        .setLabel('Voltar')
                                                        .setEmoji(`${emoji.setaEsquerda}`)
                                                        .setStyle(1),
                                                      )

                                                      const saldo = db4.get(`${interaction.user.id}.saldo`) || "0";

                                                        if (interaction.customId === "saldodecidir") {
                                                          interaction.deferUpdate();
                                                          
                                                          const embedsaldodecidir = new Discord.EmbedBuilder()
                                                          .setTitle(`${dbcv.get(`title`)} | Saldo`)
                                                          .setDescription(`**Você deseja efetuar o pagamento de \`\`${eprod.nome}\`\` no valor de \`\`R$${precoalt}\`\` utilizando seu saldo de \`\`RS$${Number(saldo).toFixed(2)}\`\`?**`)
                                                          .setColor(dbcv.get(`color`))
                                                          msg.edit({ embeds: [embedsaldodecidir], components: [rowdecidirsaldo] })
                                                        }

                                                        if (interaction.customId === 'saldocomprar') {
                                                          interaction.deferUpdate();
                                                          const saldo = db4.get(`${interaction.user.id}.saldo`) || "0";
                                                          
                                                          if (saldo >= precoalt) {
                                                          db4.substr(`${interaction.user.id}.saldo`, `${precoalt}`)
                                                          db3.set(`${data_id}.formapagamento`, `Pago com saldo`)
                                                          db3.set(`${data_id}.status`, `Processando`)
                                                          
                                                          msg.channel.send(`**${emoji.sim} | Compra aprovada no valor de \`\`${precoalt}\`\`, este valor foi descontado do seu saldo.**`).then(msg => { setTimeout(() => msg.delete(), 5000)});
                                                      }
                                                           else {
                                                           
                                                          msg.channel.send(`${emoji.nao} | Você não tem saldo suficiente para realizar essa compra. Seu saldo: \`\`R$${Number(saldo).toFixed(2)}\`\`, valor da compra: \`\`R$${Number(precoalt).toFixed(2)}\`\``).then(msg => { setTimeout(() => msg.delete(), 5000)});
                                                        }
                                                        }

                                                        if (interaction.customId === "voltar1") {
                                                          interaction.deferUpdate();
                                                            
                                                          const embedded = new Discord.EmbedBuilder()
                                                          .setTitle(`${dbcv.get(`title`)} | Sistema de pagamento`)
                                                          .setDescription(`\`\`\`Escolha a forma de pagamento.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                                          .setImage(dbcv.get(`banner`)) 
                                                          .setThumbnail(dbcv.get(`foto`)) 
                                                          .setColor(dbcv.get(`color`))
                                                        msg.edit({ embeds: [embedded], content: `||<@${interaction.user.id}>||`, components: [rowescolha] })
                                                               
                                                         }

                                                        if (interaction.customId === "pagarsite") {
                                                            
                                                          clearInterval(venda);
                                                          const embedpagarsite = new Discord.EmbedBuilder()
                                                          .setFooter({name: `Após efetuar o pagamento, o tempo de entrega é de no maximo 1 minuto!`})
                                                          .setTitle(`**${dbcv.get(`title`)} | Copia e cola**`)
                                                          .setDescription(`\`\`\`Pague para receber o produto.\`\`\`\n **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                                          .setImage(dbcv.get(`banner`)) 
                                                          .setThumbnail(dbcv.get(`foto`)) 
                                                          .setColor(dbcv.get(`color`))
                                                          msg.edit({ embeds: [embedpagarsite], components: [rowpagarsite], content: `||<@${interaction.user.id}>||` })


                                                        }

                                                        if (interaction.customId === "verificarpayments") {
                                                          interaction.deferUpdate();
                                                          const embedvefificarpayments = new Discord.EmbedBuilder()
                                                          .setFooter({name:`Estamos verificando...`})
                                                          .setTitle(`**${dbcv.get(`title`)} | Verificar pagamento**`)
                                                          .setDescription(`**Ei, <@&${dbcv.get(`equipe`)}> venha conferir o seguinte pagamento de \`\`${precoalt}\`\` e caso esteja correto, entregue o produto.**`)
                                                          .setColor(dbcv.get(`color`))
                                                          msg.channel.send({ embeds: [embedvefificarpayments], content: `||<@${interaction.user.id}>||` })
                                                        }
                                                     
                                                        
                                                     })
                          
                                                   }
                                                 })
                                              })
                      });
                      
                    })}


                   }
          
                                                      
                                                      
                                                    })
                                                  }) 
                                                  
           /////////
          
           const channelId = '1152739657692479568'; // Substitua pelo ID do canal onde deseja que o bot reaja
           const emojiId = `1176244400817447085`; // Substitua pelo ID do emoji personalizado
           
           client.on('messageCreate', async (message) => {
             if (message.channel.id === channelId) {
               try {
                 const emoji = client.emojis.cache.get(emojiId);
                 if (emoji) {
                   await message.react(emoji);
                 } else {
                   console.error(`Emoji com ID ${emojiId} não encontrado no bot.`);
                 }
               } catch (error) {
                 console.error('Erro ao reagir com emoji:', error);
               }
             }
           });
                     c.send({ embeds: [embedss], components: [row], fetchReply: true }).then(msg => {
                       const filter = i => i.user.id === interaction.user.id;
                       const collector = msg.createMessageComponentCollector({ filter });
                       collector.on("collect", intera => {
                        // intera.deferUpdate()
                         if (intera.customId === 'cancelarbuy') {
                          const embedcancelar = new Discord.EmbedBuilder()
                                     .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                                     .setDescription(`Olá ${interaction.user},\n\n• Você cancelou a compra, e todos os produtos foram devolvido para o estoque. Você pode voltar a comprar quando quiser!`)
                                     .setColor(dbcv.get(`color`))
                                     const button2 = new ButtonBuilder()
                                       .setCustomId('comprarcancelar')
                                       .setLabel('Mensagem Automática')
                                       .setStyle(2)
                                       .setDisabled(true)
                                       const row22 = new ActionRowBuilder().addComponents(button2);
                                     interaction.user.send({embeds: [embedcancelar], components: [row22]})
          
                                     const logstaff = new Discord.EmbedBuilder()
                                     components: [row22]
                                     client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [logstaff], components: [row22] })
          
                          db3.delete(`${data_id}`)
                          if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                        }
                        
                        const obter = `${db.get(`${interaction.values[0]}.conta`).length}`
                      if (intera.customId === "tesdod") {
                        if (intera.replied) {
                          console.log("Interaction already replied to.");
                          return;
                        }
          
                        const modal = new ModalBuilder();
                        modal.setTitle("✏️ | Alterar quantidade");
                        modal.setCustomId("newModalBuilder");
          
                        const textInput1 = new TextInputBuilder()
                          .setCustomId('test1')
                          .setLabel("Quantidade:")
                          .setPlaceholder('Quantidade')
                          .setStyle(1)
          
                        const action1 = new ActionRowBuilder().addComponents(textInput1)
          
                        modal.addComponents(action1);
          
                        intera.showModal(modal);
          
                      }
          
                      client.once('interactionCreate', async (interaction) => {
                        if (!interaction.isModalSubmit()) return;
                        if (interaction.customId === 'newModalBuilder') {
                          const answer1 = parseInt(interaction.fields.getTextInputValue('test1'));
          
          
                          if (isNaN(answer1)) {
                            
                            interaction.reply({ content: `:x: | Quantidade inválida.`, ephemeral: true }); // Adiciona uma resposta à interação
                          } else {
                            if (answer1 > quantidade ) {
                              const embedadici = new Discord.EmbedBuilder()
                                .setDescription(`:x: | Você não pode adicionar uma quantidade maior ou menor do que o estoque.`)
                                .setColor(dbcv.get(`color`));
                              interaction.reply({ embeds: [embedadici], ephemeral: true })
                             return; 
                            }
                            if(answer1 <= 0){
                              const embedadici = new Discord.EmbedBuilder()
                                .setDescription(`:x: | Você não pode adicionar uma quantidade maior ou menor do que o estoque.`)
                                .setColor(dbcv.get(`color`));
                              interaction.reply({ embeds: [embedadici], ephemeral: true })
                              return;
                            }
                              
                              quantidade1 = answer1;
                              precoalt = (parseFloat(Number(eprod.preco) * Number(quantidade1)).toFixed(2));
                              db3.set(`${data_id}.precoid`, `${precoalt}`);
                              db3.set(`${data_id}.qtdid`, `${quantidade1}`);
                              const embedss2 = new Discord.EmbedBuilder()
                              .setDescription(`${emoji.planet}  **| Produto:** \`${eprod.nome}\`\n\n ${emoji.caixa} **| Quantidade:** \`${quantidade1}\`\n\n ${emoji.dinheiro} **| Preço** \`R$${precoalt}\`\n\n **${emoji.carrinho} | Quantidade disponível: \`${quantidade}\`**`)
                                .setColor(dbcv.get(`color`));
                              msg.edit({ embeds: [embedss2], components: [row] }).catch(console.error); // Editar a mensagem original
                              interaction.reply({ content: `✅ | Quantidade alterada com sucesso.`, ephemeral: true }); // Adiciona uma resposta à interação
                            
                            
                          }
                        }
                      });
                        
                         if (intera.customId === "addboton") {
                         intera.deferUpdate()
                          if (quantidade1++ >= quantidade) {
                            quantidade1--;
                              const embedadici = new Discord.EmbedBuilder()
                              .setDescription(`${emoji.nao} | Não é possível adicionar mais que o estoque disponível!`)
                              .setColor(dbcv.get(`color`))
                              intera.channel.send({ embeds: [embedadici] }).then(msg => {
                                setTimeout(() => msg.delete(), 1500)
                            })
                              const embedss2 = new Discord.EmbedBuilder()
                              .setDescription(`${emoji.planet}  **| Produto:** \`${eprod.nome}\`\n\n ${emoji.caixa} **| Quantidade:** \`${quantidade1}\`\n\n ${emoji.dinheiro} **| Preço** \`R$${precoalt}\`\n\n **${emoji.carrinho} | Quantidade disponível: \`${quantidade}\`**`)
                              .setColor(dbcv.get(`color`))
                              msg.edit({ embeds: [embedss2] })
                          } else {
                            
                            precoalt = Number(precoalt) + Number(eprod.preco);
              
                            tttt = precoalt.toFixed(2); 
                            precoalt = tttt
                            
                              db3.set(`${data_id}.precoid`, `${precoalt}`)
                              db3.set(`${data_id}.qtdid`, `${quantidade1}`)
                              const embedss = new Discord.EmbedBuilder()
                              .setDescription(`${emoji.planet}  **| Produto:** \`${eprod.nome}\`\n\n ${emoji.caixa} **| Quantidade:** \`${quantidade1}\`\n\n ${emoji.dinheiro} **| Preço** \`R$${precoalt}\`\n\n **${emoji.carrinho} | Quantidade disponível: \`${quantidade}\`**`)
                              .setColor(dbcv.get(`color`))
                              msg.edit({ embeds: [embedss] })
                          }
                      }
                      if (intera.customId === "removeboton") {
                        intera.deferUpdate()
                        if (quantidade1 <= 1) {
                          const embedadici = new Discord.EmbedBuilder()
                            .setDescription(`${emoji.nao} | Não é possível diminuir essa quantidade!`)
                            .setColor(dbcv.get(`color`));
                          intera.channel.send({ embeds: [embedadici] }).then(msg => {
                            setTimeout(() => msg.delete(), 1500);
                          });
                        } else {
                          precoalt = precoalt - eprod.preco;
                          quantidade1--;
                           precoalt = Number(precoalt);
                           tttt = precoalt.toFixed(2); 
                            precoalt = tttt
                          const embedss = new Discord.EmbedBuilder()
                          .setDescription(`${emoji.planet}  **| Produto:** \`${eprod.nome}\`\n\n ${emoji.caixa} **| Quantidade:** \`${quantidade1}\`\n\n ${emoji.dinheiro} **| Preço** \`R$${precoalt}\`\n\n **${emoji.carrinho} | Quantidade disponível: \`${quantidade}\`**`)
                            .setColor(dbcv.get(`color`));
                          msg.edit({ embeds: [embedss] });
                        }
                      }
                      
                           
                             if (intera.customId === "comprarboton") {
                               msg.channel.bulkDelete(50).then(() => {
                                
                               clearInterval(timer2);
                               const timer3 = setTimeout(function () {
                                if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                 db3.delete(`${data_id}`)
                          }, 600000)
                               const row = new Discord.ActionRowBuilder()
                                
                                 .addComponents(
                                   new Discord.ButtonBuilder()
                                     .setCustomId('continuarboton')
                                     .setLabel('Ir para o Pagamento')
                                     .setEmoji(`${emoji.sim}`)
                                     .setStyle(3),
                               )
                               .addComponents(
                                new Discord.ButtonBuilder()
                                  .setCustomId('addcboton')
                                  .setLabel('Adicionar Cupom de Desconto')
                                  .setEmoji(`${emoji.cupom}`)
                                  .setStyle(1)
                                  .setDisabled(dbcv.get(`botaotruefalse`))
                            )
                                 .addComponents(
                                   new Discord.ButtonBuilder()
                                     .setCustomId('cancelarboton')
                                     .setLabel("Cancelar Compra")
                                     .setEmoji(`${emoji.nao}`)
                                     .setStyle(4),
                               );
                                                  
                               const embedss = new Discord.EmbedBuilder()
                               .setAuthor({name:`${dbcv.get('title')} | Resumo da Compra`,iconURL: interaction.guild.iconURL({dynamic: true })})                 
                               .setDescription(`${emoji.planet} | Produto: \`${eprod.nome}\`\n ${emoji.dinheiro} | Valor unitário:  \`R$${db.get(`${severi}.preco`)}\`\n ${emoji.caixa} | Quantidade: \`${quantidade1}\`\n${emoji.carrinho} | Total: \`R$${db.get(`${severi}.preco`) * quantidade1}\`\n\n\n **${emoji.info2} | Desconto: \`0%\`\n ${emoji.presente} | Cupom adicionado: \`Sem Cupom\`**`)                                     
                               .setColor(dbcv.get(`color`))
                                 
                               c.send({ embeds: [embedss], components: [row], content: `||<@${interaction.user.id}>||`, fetchReply: true }).then(msg => {
                                 const filter = i => i.user.id === interaction.user.id;
                                 const collector = msg.createMessageComponentCollector({ filter });
                                 collector.on("collect", intera2 => {
                                   intera2.deferUpdate()
                                              
                                   if (intera2.customId === 'cancelarboton') {
                                    clearInterval(timer3);
                                    const embedcancelar2 = new Discord.EmbedBuilder()
                                   .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                                   .setDescription(`Olá ${interaction.user},\n\n• Você cancelou a compra, e todos os produtos foram devolvido para o estoque. Você pode voltar a comprar quando quiser!`)
                                   .setColor(dbcv.get(`color`))
                                   const button2 = new ButtonBuilder()
                                       .setCustomId('comprarcancelar')
                                       .setLabel('Mensagem Automática')
                                       .setStyle(2)
                                       .setDisabled(true)
                                       const row22 = new ActionRowBuilder().addComponents(button2);
                                   interaction.user.send({embeds: [embedcancelar2], components: [row22]})
          
                                   const asdaslog = new Discord.EmbedBuilder()
                                   components: [row22]
                                     client.channels.cache.get(dbcv.get(`logs_staff`)).send({ embeds: [asdaslog], components: [row22] })
                                    db3.delete(`${data_id}`)
                                    if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                  }
          
                                     if (intera2.customId === "continuarboton") {

                                        clearInterval(timer3);
                                        const venda = setTimeout(function () {
                                         if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                          db3.delete(`${data_id}`)
                                         }, 150000)
                                         mercadopago.configurations.setAccessToken(dbcv.get(`access_token`));
                                        var payment_data = {
                                          transaction_amount: Number(precoalt),
                                          description: `Pagamento | ${interaction.user.username}`,
                                          payment_method_id: 'pix',
                                           payer: {
                                             email: 'japanstorepayments@gmail.com',
                                             first_name: 'Homero',
                                             last_name: 'Brum',
                                              identification: {
                                                type: 'CPF',
                                                number: '09111189770'
                                              },
                                              address: {
                                                zip_code: '06233200',
                                                street_name: 'Av. das Nações Unidas',
                                                street_number: '3003',
                                                neighborhood: 'Bonfim',
                                                city: 'Osasco',
                                                federal_unit: 'SP'
                                              }
                                            }
                                          };
           
                                          mercadopago.payment.create(payment_data).then(function (data) {
                                            db3.set(`${data_id}.status`, `Pendente (2)`)
                                            const buffer = Buffer.from(data.body.point_of_interaction.transaction_data.qr_code_base64, "base64");
                                            const attachment = new Discord.AttachmentBuilder(buffer, "payment.png");
                                            const reponse = request.post(url, json=payment_data)
                                            const row = new Discord.ActionRowBuilder()
                                                                         
                                            .addComponents(
                                             new Discord.ButtonBuilder()
                                               .setCustomId('saldocomprar')
                                               .setEmoji("💰")
                                               .setLabel("Saldo")
                                               .setStyle(1),
                                            )                                             
                                              .addComponents(
                                                new Discord.ButtonBuilder()
                                                  .setCustomId('cancelarpix')
                                                  .setEmoji(`${emoji.negar}`)
                                                  
                                                  .setStyle(4),
                                            );
                                            const embed = new Discord.EmbedBuilder()
                                            .setTitle(`${dbcv.get(`title`)} | Sistema de pagamento`)
                                            .setDescription(`\`\`\`Pague para receber o produto.\`\`\`\n** **${emoji.planet} Produto(s):**\n ${eprod.nome} x${quantidade1}\n **${emoji.dinheiro} | Valor:**\n R$${precoalt}`)
                                            .setImage(dbcv.get(`banner`)) 
                                            .setFooter({ text: `Após efetuar o pagamento, o tempo de entrega é de no maximo 1 minuto!` })
                                            .setColor(dbcv.get(`color`))
                                            
                                          msg.channel.send({ embeds: [embed], content: `||<@${interaction.user.id}>||`, components: [row] }).then(msg => {
           
                                          const collector = msg.channel.createMessageComponentCollector();
                                          const lopp = setInterval(function () {
                                            const time2 = setTimeout(function () {
                                              clearInterval(lopp);
                                            }, 1800000)
                                           axios.get(`https://api.mercadolibre.com/collections/notifications/${data.body.id}`, {
                                            headers: {
                                              'Authorization': `Bearer ${dbcv.get(`access_token`)}`
                                            }
                                          }).then(async (doc) => {
                                         if (doc.data.collection.status === "approved") {
                                             db3.set(`${data_id}.status`, `Processando`)
                                         }
           
                                        
                                               
                                         if (`${db3.get(`${data_id}.status`)}` === "Processando") {
                                           clearTimeout(time2)
                                           clearInterval(lopp);
                                           clearInterval(venda);
                                            const vendadel = setTimeout(function () {
                                              if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }}, 30000)
                                             const a = db.get(`${severi}.conta`);
                                               db2.add("pedidostotal", 1)
                                               db2.add("gastostotal", Number(precoalt))
                                               db2.add(`${moment().format('L')}.pedidos`, 1)
                                               db2.add(`${moment().format('L')}.recebimentos`, Number(precoalt))
                                               db2.add(`${interaction.user.id}.gastosaprovados`, Number(precoalt))
                                               db2.add(`${interaction.user.id}.pedidosaprovados`, 1)
           
                                               if (a < quantidade1) {
                                                 
                                                    } else {
                                                     const removed = a.splice(0, Number(quantidade1));
                                                      db.set(`${severi}.conta`, a);
                                                       const embedentrega = new Discord.EmbedBuilder()
                                                         .setTitle(`${dbcv.get(`title`)} | Seu produto`)
                                                         .setDescription(`**${emoji.planet} | Produtos:** \n  \`\`\`${removed.join("\n")}\`\`\`\n**${emoji.estrela} | Id da Compra:** ${data_id}\n\n**${emoji.aviso} | Avalie a nossa loja [aqui](https://discord.com/channels/${c.guildId}/${config.get(`avaliacoes`)})** `)
                                                         .setColor(dbcv.get(`color`))
                                                         
                                                       interaction.user.send({ embeds: [embedentrega] })
                                                        db3.set(`${data_id}.status`, `Concluido`)
                                                        msg.channel.send(`${emoji.planet} | Pagamento aprovado!! Obrigado por comprar em nossa Loja. Seu produto será enviado na sua DM.`)
                                                        msg.channel.send(`${emoji.estrela} | ID Da compra: ||${data_id}||`)
                                                        msg.channel.send(`${emoji.sim} | Carrinho fechara em menos de 1 min`)
                                                         const membro = interaction.guild.members.cache.get(interaction.user.id)
                                                         const role = interaction.guild.roles.cache.find(role => role.id === dbcv.get(`role`))
                                                         membro.roles.add(role).then(() => {console.log("Usuario já tem o cargo!")})
           
                                                        
                         
                                                         const embed = new Discord.EmbedBuilder()
                                                         .setTitle(`${dbp.get(`${severi }.titulo`)}`)
                                                         .setDescription(`${dbp.get(`${severi}.desc`)} `);
                                                   
                                                         const select = new Discord.StringSelectMenuBuilder()
                                                         .setCustomId(`${severi}`)
                                                         .setPlaceholder("Escolha algum produto")
                                                         .setMaxValues(1)
                                                     
                                                         if(dbp.get(`${severi}.miniatura`) !== "Nenhuma") {
                                                   
                                                           embed.setThumbnail(`${dbp.get(`${severi}.miniatura`)}`)
                                                   
                                                         }
                                                   
                                                         dbp.get(`${interaction.customId}.produtos`).map((pd) => {
                                                           const valor = Number(db.get(`${pd}.preco`))
                                                           select.addOptions(
                                                               {
                                                                   label:`${db.get(`${pd}.nome`)}`,
                                                                   description:`💸| Valor: ${valor.toFixed(2)} - 📦 Estoque: ${db.get(`${pd}.conta`).length}`,
                                                                   value:`${db.get(`${pd}.idproduto`)}`,
                                                                   emoji:`${dbp.get(`${severi}.emoji`)}`
                                                               }
                                                           )
                                                         })
                                                   
                                                         interaction.message.edit({
                                                           embeds:[
                                                               embed.setColor(dbcv.get(`color`))
                                                               .setImage(`${dbp.get(`${severi}.banner`)}`)
                                                           ],
                                                           components:[
                                                               new ActionRowBuilder()
                                                               .addComponents(select)
                                                           ]
                                                         })
                                                             
                                                            
                                                            }}})}, 10000)
                                                          
                                                              collector.on("collect", interaction => {
                                                                 if (interaction.customId === 'cancelarpix') {
                                                                   clearInterval(lopp);
                                                                   clearInterval(venda)
                                                                   const embedcancelar3 = new Discord.EmbedBuilder()
                                      .setTitle(`${dbcv.get(`title`)} | Compra Cancelada`)
                                      .setDescription(`Olá ${interaction.user},\n\n• Você cancelou a compra, e todos os produtos foram devolvido para o estoque. Você pode voltar a comprar quando quiser!`)
                                      .setColor(dbcv.get(`color`))
                                      const button2 = new ButtonBuilder()
                                       .setCustomId('comprarcancelar')
                                       .setLabel('Mensagem Automática')
                                       .setStyle(2)
                                       .setDisabled(true)
                                      const row22 = new ActionRowBuilder().addComponents(button2);
                                      interaction.user.send({embeds: [embedcancelar3], components: [row22]})
                                                                   db3.delete(`${data_id}`)
                                                                   if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                                                  }
                                                                })
                                                              })
                                                            }).catch(function (error) {
                                                              console.log(error)
                                                              });
                                                           }
                                                         })
                                                      })
                               });
                                                    }
                                                  })
                                                })
                                              })
                                            }
                                           }
          
                     
                     
                     });