const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json"});
const emoji = require("../../databases/myJsonEmojis.json");
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });


module.exports = {
    name: "botconfig",
  description:"「🤖」Configure o bot",
  type:Discord.ApplicationCommandType.ChatInput,
    run: async(client, interaction, args,) => {

      if (interaction.user.id !== config.get(`owner`)) {
        return interaction.reply({ content: `${emoji.nao} | Apenas o dono do bot pode usar isso!`, ephemeral: true })
      }
      
      
      const row = new Discord.ActionRowBuilder()
      .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId(`vendasonoff`)
            .setEmoji('⚙')
            .setLabel('Vendas On/Off')
            .setStyle(1),
        )
        
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('configpayments')
            .setEmoji(`<:Bl_MercadoPago:1152425162554232954>`)
            .setLabel('Configurar Pagamentos')
            .setStyle(2),
        )
        
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('configbot')
            .setEmoji(`⚙`)
            .setLabel('Configurar Bot')
            .setStyle(2),
         )
        
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('configcanais')
            .setEmoji(`⚙`)
            .setLabel('Configurar Canais')
            .setStyle(2),
        )
        
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('configtermos')
            .setEmoji(`<:W_Edit:1152425555610837043>`)
            .setLabel('Configurar os Termos de compra')
            .setStyle(2),
        );
        
        const rownes = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('configbanners')
            .setEmoji(`<:1068825092957671454:1147614898881310741>`)
            .setLabel('Configurar Imagens')
            .setStyle(2),
        );
        
        /*
        new Discord.ButtonBuilder()
            .setCustomId('configsaldo2')
            .setLabel('Configurar Saldo')
            .setEmoji('💰')
            .setStyle(1)
            */
        
        const embed = await interaction.reply({ embeds: [new Discord.EmbedBuilder()
          .setTitle(`${dbcv.get(`title`)} | Configurações`)
          .setDescription(`**> Olá, aqui você pode configurar tudo do bot.\n\n> Recomendo que configure primeiro os payments, canais e os termos.\n\n💰 | Sistema de vendas: \`\`${dbcv.get(`vendasonoff`)}\`\`**`)
          .setThumbnail(`${dbcv.get(`foto`)}`)
          .setFooter({ text: `${dbcv.get(`title`)} - Direitos reservados.` })
          .setColor(dbcv.get(`color`))], components: [row, rownes]})
          const interação = embed.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, });
          interação.on("collect", async (interaction) => {
           if (interaction.user.id != interaction.user.id) {
             return;
           }
           
           const rowsaldo2 = new Discord.ActionRowBuilder()
            .addComponents(
               new Discord.ButtonBuilder()
                .setCustomId('saldoonouoff')
                .setLabel('Saldo ON/OFF')
                .setEmoji('⚙️')
                .setStyle(3),
               new Discord.ButtonBuilder()
                .setCustomId('bonusdeposito')
                .setLabel('Bônus por Depósito')
                .setEmoji('⚙️')
                .setStyle(1),
               new Discord.ButtonBuilder()
                .setCustomId('voltar6')
                .setEmoji('⬅️')
                .setLabel('Voltar')
                .setStyle(2)
            )
            
            if (interaction.customId == 'configsaldo') {
              interaction.deferUpdate()
              const embedd = new Discord.EmbedBuilder()
               .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true })})
               .setTitle(`💰 | Configurar Sistema de Saldo`)
               .setDescription(`Sistema de Saldo: ${dbcv.get('saldoonoff')}\nBônus por depósito: ${dbcv.get('bonus_deposito') || "0"}%\nValor mínimo para deposito: R$${Number(dbcv.get('valormin_deposito')).toFixed(2) || "0"}`)
               .setColor(dbcv.get(`color`))
               .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
               
               embed.edit({ embeds: [embedd], components: [rowsaldo2] })
            }
            
            if (interaction.customId == 'saldoonouoff') {
              interaction.deferUpdate()
              
              if (dbcv.get('saldoonoff') == 'Off') {
                dbcv.set(`saldoonoff`, `On`)
                attembed()
              } else if (dbcv.get('saldoonoff') == 'On') {
                dbcv.set(`saldoonoff`, `Off`)
                attembed()
              }
              
              function attembed() {
                const embedd = new Discord.EmbedBuilder()
               .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true })})
               .setTitle(`💰 | Configurar Sistema de Saldo`)
               .setDescription(`Sistema de Saldo: ${dbcv.get('saldoonoff')}\nBônus por depósito: ${dbcv.get('bonus_deposito') || "0"}%\nValor mínimo para deposito: R$${Number(dbcv.get('valormin_deposito')).toFixed(2) || "0"}`)
               .setColor(dbcv.get(`color`))
               .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
               
               embed.edit({ embeds: [embedd], components: [rowsaldo2] })
              }
            }
            
            if (interaction.customId == 'bonusdeposito') {
              const modalpor = new Discord.ModalBuilder()
               .setCustomId('modalbonusdeposito')
               .setTitle('💰 | Bônus por depósito')
               
              const sla = new Discord.TextInputBuilder()
               .setCustomId('p1')
               .setLabel('Porcentagem do Bônus')
               .setPlaceholder('10')
               .setRequired(true)
               .setStyle(1)
               
              const sla2 = new Discord.TextInputBuilder()
               .setCustomId('p2')
               .setLabel('Valor mínimo de depósito')
               .setPlaceholder('5')
               .setRequired(true)
               .setStyle(1)
               
              modalpor.addComponents(new Discord.ActionRowBuilder().addComponents(sla), new Discord.ActionRowBuilder().addComponents(sla2))
              
              interaction.showModal(modalpor);
            }

           const rowvendasonoff = new Discord.ActionRowBuilder()
           .addComponents(
             new Discord.ButtonBuilder()
               .setCustomId('vendason')
               .setEmoji(`✅`)
               .setLabel('Vendas On')
               .setStyle(3),
           )
           .addComponents(
             new Discord.ButtonBuilder()
               .setCustomId('vendasoff')
               .setEmoji(`<a:No:1152425137166110751>`)
               .setLabel('Vendas Off')
               .setStyle(4),
           )
           .addComponents(
             new Discord.ButtonBuilder()
               .setCustomId('voltar5')
               .setEmoji('⬅️')
               .setLabel('Voltar')
               .setStyle(1),
           );

           if (interaction.customId === "vendasonoff") {
             interaction.deferUpdate();
             const embedvendasonoff = new Discord.EmbedBuilder()
             .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
             .setDescription(`**🔍 | Configurando payments.\n💰 | Vendas \`\`${dbcv.get(`vendasonoff`)}\`\`**`)
             .setFooter({text:`Configure usando os botões abaixo.`})
             .setThumbnail(`${dbcv.get(`foto`)}`)
             .setColor(dbcv.get(`color`)) 
             embed.edit({ embeds: [embedvendasonoff], components: [rowvendasonoff] })    
               }  

          if (interaction.customId === "vendason") {
           interaction.deferUpdate();
           dbcv.set(`vendasonoff`, `On`)
           const embedvendasonoff = new Discord.EmbedBuilder()
             .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
             .setDescription(`**⚙ | Configurando payments.\n💰 | Vendas \`\`${dbcv.get(`vendasonoff`)}\`\`**`)
             .setFooter({text:`Configure usando os botões abaixo.`})
             .setThumbnail(`${dbcv.get(`foto`)}`)
             .setColor(dbcv.get(`color`))
           embed.edit({ embeds: [embedvendasonoff], components: [rowvendasonoff] }) 
           interaction.channel.send(`**💰 | Vendas \`\`${dbcv.get(`vendasonoff`)}\`\`**`)
  .then((sentMessage) => {
    setTimeout(() => {
      sentMessage.delete().catch(console.error);
    }, 5000); 
  });

          }

          if (interaction.customId === "vendasoff") {
           interaction.deferUpdate();
           dbcv.set(`vendasonoff`, `Off`)
           const embedvendasonoff = new Discord.EmbedBuilder()
             .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
             .setDescription(`**⚙ | Configurando payments.\n💰 | Vendas \`\`${dbcv.get(`vendasonoff`)}\`\`**`)
             .setFooter({text:`Configure usando os botões abaixo.`})
             .setThumbnail(`${dbcv.get(`foto`)}`)
             .setColor(dbcv.get(`color`))
           embed.edit({ embeds: [embedvendasonoff], components: [rowvendasonoff] }) 
           interaction.channel.send(`**💰 | Vendas \`\`${dbcv.get(`vendasonoff`)}\`\`**`)
  .then((sentMessage) => {
    setTimeout(() => {
      sentMessage.delete().catch(console.error);
    }, 5000); 
  });

          }

          if (interaction.customId === "voltar5") {
            interaction.deferUpdate();
            const embedvoltar4 = new Discord.EmbedBuilder()
            .setTitle(`${dbcv.get(`title`)} | Configurações`)
            .setDescription(`**> Olá, aqui você pode configurar tudo do bot.\n\n> Recomendo que configure primeiro os payments, canais e os termos.\n\n💰 | Sistema de vendas: \`\`${dbcv.get(`vendasonoff`)}\`\`**`)
            .setThumbnail(`${dbcv.get(`foto`)}`)
            .setFooter({ text: `${dbcv.get(`title`)} - Direitos reservados.` })
            .setColor(dbcv.get(`color`))
            embed.edit({ embeds: [embedvoltar4], components: [row, rownes] })
           }

           const rowconfigpays2 = new Discord.ActionRowBuilder()
           .addComponents(
             new Discord.ButtonBuilder()
               .setCustomId('configmp')
               .setEmoji(`<:mercado_pago:1195793113873133648>`)
               .setLabel('Mercado Pago')
               .setStyle(1),
           )
           .addComponents(
            new Discord.ButtonBuilder()
              .setCustomId('configsaldo')
              .setEmoji(`💰`)
              .setLabel('Saldo')
              .setStyle(1),
          )
          .addComponents(
            new Discord.ButtonBuilder()
              .setCustomId('semiauto')
              .setEmoji(`💰`)
              .setLabel('Pagamento Semiauto')
              .setStyle(1),
          )
          .addComponents(
            new Discord.ButtonBuilder()
              .setCustomId('cripto')
              .setEmoji(`${emoji.envelope}`)
              .setLabel('Criptomoedas')
              .setStyle(1),
          )
          .addComponents(
            new Discord.ButtonBuilder()
              .setCustomId('voltar1')
              .setEmoji('⬅️')
              .setLabel('Voltar')
              .setStyle(1),
          );

          if(interaction.customId === "cripto") { 
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
          if(interaction.customId === "criptoonoff") {
            if(dbcv.get(`criptoonoff`) === true) {
              await dbcv.set(`criptoonoff`,false)
            } else {
              if(dbcv.get(`btc`) === "remover" && dbcv.get(`ltc`) === "remover" && dbcv.get(`usdt`) === "remover") {
                interaction.reply({
                  content:"Adicione Alguma das criptomoedas para podê ativar!",
                  ephemeral:true
                })
                return;
              }
              await dbcv.set(`criptoonoff`, true)
            }
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
          if(interaction.customId === "bitcoin") {
            const modal = new Discord.ModalBuilder()
            .setTitle("🔐 | Configuração de Chave")
            .setCustomId("bitcoin_modal");

            const text = new Discord.TextInputBuilder()
            .setCustomId("text")
            .setLabel("Coloque o Codigo do bitcoin")
            .setStyle(1)
            .setPlaceholder("Caso queira remover digite \"remover\"")
            .setRequired(true);

            modal.addComponents(new Discord.ActionRowBuilder().addComponents(text));
            await interaction.showModal(modal)
          }
          if(interaction.customId === "ltcoin") {
            const modal = new Discord.ModalBuilder()
            .setTitle("🔐 | Configuração de Chave")
            .setCustomId("ltcoin_modal");

            const text = new Discord.TextInputBuilder()
            .setCustomId("text")
            .setLabel("Coloque o Codigo do LTC")
            .setStyle(1)
            .setPlaceholder("Caso queira remover digite \"remover\"")
            .setRequired(true);

            modal.addComponents(new Discord.ActionRowBuilder().addComponents(text));
            await interaction.showModal(modal)
          }
          if(interaction.customId === "usdt") {
            const modal = new Discord.ModalBuilder()
            .setTitle("🔐 | Configuração de Chave")
            .setCustomId("usdt_modal");

            const text = new Discord.TextInputBuilder()
            .setCustomId("text")
            .setLabel("Coloque o Codigo do USDT")
            .setStyle(1)
            .setPlaceholder("Caso queira remover digite \"remover\"")
            .setRequired(true);

            modal.addComponents(new Discord.ActionRowBuilder().addComponents(text));
            await interaction.showModal(modal)
          }

           if (interaction.customId === "configpayments") {
            interaction.deferUpdate();
                const embedconfigpayss = new Discord.EmbedBuilder()
                  .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
                  .setDescription(`**🔍 | Configurando payments.**`)
                  .setFooter({text:`Selecione o sistema de deseja configurar.`})
                  .setThumbnail(`${dbcv.get(`foto`)}`)
                  .setColor(dbcv.get(`color`))
                  embed.edit({ embeds: [embedconfigpayss], components: [rowconfigpays2] })         
              }


              if (interaction.customId === "semiauto") {
                interaction.deferUpdate();
                const rowcomnasd = new Discord.ActionRowBuilder()
                .addComponents(
                  new Discord.ButtonBuilder()
                    .setCustomId('ativardesativarsemi')
                    .setEmoji(`⚙`)
                    .setLabel('Semi-Automatico ON/OFF')
                    .setStyle(dbcv.get(`semi-auto`) === true ? 3 : 4),
                )
                .addComponents(
                  new Discord.ButtonBuilder()
                    .setCustomId('chavepix')
                    .setEmoji(`⚙`)
                    .setLabel('Chave Pix')
                    .setStyle(1),
                )
                .addComponents(
                  new Discord.ButtonBuilder()
                  .setCustomId('qrcodebuttonmodal')
                  .setEmoji(`⚙`)
                    .setLabel('Qr Code')
                    .setStyle(1),
                )
                .addComponents(
                  new Discord.ButtonBuilder()
                    .setCustomId('voltar435435')
                    .setEmoji('⬅️')
                    .setLabel('Voltar')
                    .setStyle(2),
                );
                const embedsemiauto = new Discord.EmbedBuilder()
                  .setDescription(`🛠** | Sistema De Pagamento Semi Automático.**\n⚙ | Sistema: ${dbcv.get(`semi-auto`) === true ? "ON" : "OFF"}\n 🔗 | Chave Pix: \`${dbcv.get(`chavepix`)}\` - ${dbcv.get(`tipopix`)} \n📋 | Qr Code: ${dbcv.get(`qrcode`) === "remover" ? "Sem QRCode" : `[QrCode](${dbcv.get(`qrcode`)})`}`)
                  .setFooter({text:`Selecione o sistema de deseja configurar.`})
                  .setThumbnail(`${dbcv.get(`foto`)}`)
                  .setColor(dbcv.get(`color`))
                  embed.edit({ embeds: [embedsemiauto], components: [rowcomnasd] })  

              }
              if(interaction.customId === "ativardesativarsemi") {
                if(dbcv.get(`semi-auto`) === true) {
                  await dbcv.set(`semi-auto`, false)
                } else {
                  await dbcv.set(`semi-auto`, true)
                }
                const rowcomnasd = new Discord.ActionRowBuilder()
                .addComponents(
                  new Discord.ButtonBuilder()
                    .setCustomId('ativardesativarsemi')
                    .setEmoji(`⚙`)
                    .setLabel('Semi-Automatico ON/OFF')
                    .setStyle(dbcv.get(`semi-auto`) === true ? 3 : 4),
                )
                .addComponents(
                  new Discord.ButtonBuilder()
                    .setCustomId('chavepix')
                    .setEmoji(`⚙`)
                    .setLabel('Chave Pix')
                    .setStyle(1),
                )
                .addComponents(
                  new Discord.ButtonBuilder()
                    .setCustomId('qrcodebuttonmodal')
                    .setEmoji(`⚙`)
                    .setLabel('Qr Code')
                    .setStyle(1),
                )
                .addComponents(
                  new Discord.ButtonBuilder()
                    .setCustomId('voltar435435')
                    .setEmoji('⬅️')
                    .setLabel('Voltar')
                    .setStyle(2),
                );
                const embedsemiauto = new Discord.EmbedBuilder()
                  .setDescription(`🛠** | Sistema De Pagamento Semi Automático.**\n⚙ | Sistema: ${dbcv.get(`semi-auto`) === true ? "ON" : "OFF"}\n 🔗 | Chave Pix: \`${dbcv.get(`chavepix`)}\` - ${dbcv.get(`tipopix`)} \n📋 | Qr Code: ${dbcv.get(`qrcode`) === "remover" ? "Sem QRCode" : `[QrCode](${dbcv.get(`qrcode`)})`}`)
                  .setFooter({text:`Selecione o sistema de deseja configurar.`})
                  .setThumbnail(`${dbcv.get(`foto`)}`)
                  .setColor(dbcv.get(`color`))
                  interaction.update({ embeds: [embedsemiauto], components: [rowcomnasd] }).then(() => {
                    interaction.followUp({
                      embeds:[
                        new Discord.EmbedBuilder()
                        .setDescription(`Olá ${interaction.user}, o sistema de Pagamento Semi Automático foi ${dbcv.get(`semi-auto`) === true ? "`Ativado`" : "`Desativado`"}.`)
                      ],
                      ephemeral:true
                    })   
  
                  })
                 

              }

              if (interaction.customId === "chavepix") {
                const modal = new Discord.ModalBuilder()
                .setTitle("⚙ | Alterar Chave Pix")
                .setCustomId("chavepix_modal");

                const text = new Discord.TextInputBuilder()
                .setLabel("TIPO DE CHAVE:")
                .setCustomId("text")
                .setPlaceholder("Email, Cpf, Aleatória, etc.")
                .setStyle(1)
                .setRequired(true);

                const text2 = new Discord.TextInputBuilder()
                .setLabel("CHAVE:")
                .setStyle(1)
                .setRequired(true)
                .setCustomId("text2")
                .setPlaceholder("frbots@gmail.com");

                modal.addComponents(new Discord.ActionRowBuilder().addComponents(text));
                modal.addComponents(new Discord.ActionRowBuilder().addComponents(text2));

                await interaction.showModal(modal);

              }

              if (interaction.customId === "qrcodebuttonmodal") {
                const modal = new Discord.ModalBuilder()
                .setTitle("🔧 | Alterar Qr Code")
                .setCustomId("qrcodebutton_modal");

                const text = new Discord.TextInputBuilder()
                .setLabel("LINK DA IMAGEM DO QR CODE:")
                .setCustomId("text")
                .setPlaceholder("Caso queira remover, digite: \"remover\"")
                .setStyle(1)
                .setRequired(true);

                modal.addComponents(new Discord.ActionRowBuilder().addComponents(text));

                await interaction.showModal(modal);

              }
              

              if (interaction.customId === "voltar435435") {
                interaction.deferUpdate();
                const embedconfigpayss = new Discord.EmbedBuilder()
                  .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
                  .setDescription(`**🔍 | Configurando payments.**`)
                  .setFooter({text:`Selecione o sistema de deseja configurar.`})
                  .setThumbnail(`${dbcv.get(`foto`)}`)
                  .setColor(dbcv.get(`color`))
                  embed.edit({ embeds: [embedconfigpayss], components: [rowconfigpays2] })   
              }
            
            const rowconfigpaymp = new Discord.ActionRowBuilder()
            .addComponents(
              new Discord.ButtonBuilder()
                .setCustomId('pixonoff')
                .setEmoji(`⚙`)
                .setLabel('Pix On/Off')
                .setStyle(1),
            )
            .addComponents(
              new Discord.ButtonBuilder()
                .setCustomId('tempopagar')
                .setEmoji(`⚙`)
                .setLabel('Tempo Para Pagar')
                .setStyle(2),
            )
            .addComponents(
              new Discord.ButtonBuilder()
                .setCustomId('configmpttoken')
                .setEmoji(`⚙`)
                .setLabel('Alterar Acess Token')
                .setStyle(2),
            )
            .addComponents(
              new Discord.ButtonBuilder()
                  .setCustomId('ativar/desativar')
                  .setEmoji(`⚙`)
                  .setLabel('Ativar/Desativar Cupons')
                  .setStyle(1),
          )
            .addComponents(
              new Discord.ButtonBuilder()
                .setCustomId('voltar2')
                .setEmoji('⬅️')
                .setLabel('Voltar')
                .setStyle(2),
            );

            if (interaction.customId === "configmp") {
              interaction.deferUpdate()
              const embedconfigmp = new Discord.EmbedBuilder()
                  .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
                  .setDescription(`**🤝 | Configurando Mercado Pago.\n\n🔗 | Pix: \`\`${dbcv.get(`pixonoff`)}\`\`\n🕗 | Tempo Para Pagar: ${dbcv.get(`tempopagar`)}\n⚙️ | Access Token: ||${dbcv.get(`access_token`)}||\n🕳 | Cupom: ${dbcv.get(`botaooffon`)}**`)
                  .setFooter({text:`Configure usando os botões abaixo.`})
                  .setThumbnail(`${dbcv.get(`foto`)}`)
                  .setColor(dbcv.get(`color`))
                  embed.edit({ embeds: [embedconfigmp], components: [rowconfigpaymp] })         
            }

            const rowconfigsite = new Discord.ActionRowBuilder()
            .addComponents(
              new Discord.ButtonBuilder()
                .setCustomId('siteon')
                .setEmoji(`⚙`)
                .setLabel('Site On')
                .setStyle(1),
            )
            .addComponents(
              new Discord.ButtonBuilder()
                .setCustomId('siteoff')
                .setEmoji(`⚙`)
                .setLabel('Site Off')
                .setStyle(1),
            )
            .addComponents(
              new Discord.ButtonBuilder()
                .setCustomId('voltar9')
                .setEmoji('⬅️')
                .setLabel('Voltar')
                .setStyle(2),
            );


            if (interaction.customId === "siteonoff") {
              interaction.deferUpdate();
              const embedsite = new Discord.EmbedBuilder()
              .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
              .setDescription(`**⚙️ | Configurando Site.\n\n💸 | Site \`\`${dbcv.get(`siteonoff`)}\`\`**`)
              .setFooter({text:`Configure usando os botões abaixo.`})
              .setThumbnail(`${dbcv.get(`foto`)}`)
              .setColor(dbcv.get(`color`))
              embed.edit({ embeds: [embedsite], components: [rowconfigsite] })          
            }

            if (interaction.customId === "siteon") {
              interaction.deferUpdate();
              dbcv.set(`siteonoff`, `On`)
              dbcv.set(`sitetruefalse`, false)
              const embedpisald = new Discord.EmbedBuilder()
                .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
                .setDescription(`**⚙️ | Configurando Site.\n\n💸 | Site \`\`${dbcv.get(`siteonoff`)}\`\`**`)
                .setFooter({text:`Configure usando os botões abaixo.`})
                .setThumbnail(`${dbcv.get(`foto`)}`)
                .setColor(dbcv.get(`color`))
              embed.edit({ embeds: [embedpisald], components: [rowconfigsite] }) 
              interaction.channel.send(`**💰 | Site \`\`${dbcv.get(`siteonoff`)}\`\`**`)
  .then((sentMessage) => {
    setTimeout(() => {
      sentMessage.delete().catch(console.error);
    }, 5000); 
  });

             }
    
             if (interaction.customId === "siteoff") {
              interaction.deferUpdate();
              dbcv.set(`siteonoff`, `Off`)
              dbcv.set(`sitetruefalse`, true)
              const embedpixasdff = new Discord.EmbedBuilder()
                .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
                .setDescription(`**⚙ | Configurando Site.\n\n💰 | Site \`\`${dbcv.get(`siteonoff`)}\`\`**`)
                .setFooter({text:`Configure usando os botões abaixo.`})
                .setThumbnail(`${dbcv.get(`foto`)}`)
                .setColor(dbcv.get(`color`))
              embed.edit({ embeds: [embedpixasdff], components: [rowconfigsite] }) 
              interaction.channel.send(`**💰 | Site \`\`${dbcv.get(`siteonoff`)}\`\`**`)
  .then((sentMessage) => {
    setTimeout(() => {
      sentMessage.delete().catch(console.error);
    }, 5000); 
  });

             }

             if (interaction.customId === "voltar9") {
              interaction.deferUpdate()
              const embedconfigmp = new Discord.EmbedBuilder()
                  .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
                  .setDescription(`**⚙️ | Configurando Mercado Pago.\n\n🔗 | Pix: \`\`${dbcv.get(`pixonoff`)}\`\`\n🕙 | Tempo Para Pagar: ${dbcv.get(`tempopagar`)}\n⚙️ | Access Token: ||${dbcv.get(`access_token`)}||\n🕳️ | Cupom: ${dbcv.get(`botaooffon`)}**`)
                  .setFooter({text:`Configure usando os botões abaixo.`})
                  .setThumbnail(`${dbcv.get(`foto`)}`)
                  .setColor(dbcv.get(`color`))
                  embed.edit({ embeds: [embedconfigmp], components: [rowconfigpaymp] })
            }

          const rowconfigsaldo = new Discord.ActionRowBuilder()
           .addComponents(
             new Discord.ButtonBuilder()
               .setCustomId('saldoonoff')
               .setEmoji(`⚙`)
               .setLabel('Saldo On/Off')
               .setStyle(1),
           )
           .addComponents(
            new Discord.ButtonBuilder()
              .setCustomId('voltar6')
              .setEmoji('⬅️')
              .setLabel('Voltar')
              .setStyle(2),
          );

           const rowconfigad = new Discord.ActionRowBuilder()
           .addComponents(
            new Discord.ButtonBuilder()
              .setCustomId('saldoon')
              .setEmoji(`✅`)
              .setLabel('Saldo On')
              .setStyle(3),
          )
          .addComponents(
            new Discord.ButtonBuilder()
              .setCustomId('saldooff')
              .setEmoji(`<a:Errado_FastStore:1195794088017006804>`)
              .setLabel('Saldo Off')
              .setStyle(4),
          )
          .addComponents(
            new Discord.ButtonBuilder()
              .setCustomId('voltar7')
              .setEmoji('⬅️')
              .setLabel('Voltar')
              .setStyle(2),
          );

          if (interaction.customId === "saldoonoff") {
            interaction.deferUpdate();
            const embedsaldo = new Discord.EmbedBuilder()
            .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
            .setDescription(`**⚙️ | Configurando Saldo.\n\n💸 | Saldo \`\`${dbcv.get(`saldoonoff`)}\`\`**`)
            .setFooter({text:`Configure usando os botões abaixo.`})
            .setThumbnail(`${dbcv.get(`foto`)}`)
            .setColor(dbcv.get(`color`))
            embed.edit({ embeds: [embedsaldo], components: [rowconfigad] })    
              } 
              
              if (interaction.customId === "configtermos") {
                const modal = new Discord.ModalBuilder()
                .setCustomId("configtermos_modal")
                .setTitle("Configurar Modal");

                const text = new Discord.TextInputBuilder()
                .setCustomId("text")
                .setLabel("O que deseja colocar nos termos?")
                .setStyle(2)
                .setValue(`${dbcv.get(`termos`)}`)
                .setRequired(true);

                modal.addComponents(new Discord.ActionRowBuilder().addComponents(text));
                await interaction.showModal(modal)

              }
              client.on("interactionCreate", async (interaction) => {
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
                
              })

              
           const rowbanners = new Discord.ActionRowBuilder()
           .addComponents(
            new Discord.ButtonBuilder()
              .setCustomId('avatarconfig')
              .setEmoji(`📝`)
              .setLabel('Avatar')
              .setStyle(1),
          )
          .addComponents(
            new Discord.ButtonBuilder()
              .setCustomId('bannerconfig')
              .setEmoji(`📝`)
              .setLabel('Banner')
              .setStyle(1),
          )
          .addComponents(
            new Discord.ButtonBuilder()
              .setCustomId('voltar12')
              .setEmoji('⬅️')
              .setLabel('Voltar')
              .setStyle(2),
          );

              if (interaction.customId === "configbanners") {
                interaction.deferUpdate();
                const embedbanners = new Discord.EmbedBuilder()
                .setTitle(`${dbcv.get(`title`)} | Configurando bot`)
                .setDescription(`**📝 | Avatar: [aqui](${dbcv.get(`foto`)})\n📝 | Banner [aqui](${dbcv.get(`banner`)})**`)
                .setFooter({text:`Configure usando os botões abaixo.`})
                .setThumbnail(`${dbcv.get(`foto`)}`)
                .setColor(dbcv.get(`color`))
                embed.edit({ embeds: [embedbanners], components: [rowbanners] })
              
        }

        if (interaction.customId === "avatarconfig") {
          interaction.deferUpdate();
          interaction.channel.send(`${emoji.carregando} | Qual o novo avatar do bot?`).then(msg => {
           const filter = m => m.author.id === interaction.user.id;
           const collector = msg.channel.createMessageCollector({ filter, max: 1 });
             collector.on("collect", message => {
              message.delete()
               const newt = message.content
               client.user.setAvatar(message.content);
               dbcv.set(`foto`, newt)
               msg.edit(`✅ | Alterado!`).then((editedMessage) => {
                setTimeout(() => {
                  editedMessage.delete().catch(console.error);
                }, 5000); 
              });
              
                          
               const embednew = new Discord.EmbedBuilder()
               .setTitle(`${dbcv.get(`title`)} | Configuração dos banners`)
               .setDescription(`**📝 | Avatar: [aqui](${dbcv.get(`foto`)})\n📝 | Banner [aqui](${dbcv.get(`banner`)})**`)
                 .setThumbnail(`${dbcv.get(`foto`)}`)
                 .setColor(dbcv.get(`color`))
               embed.edit({ embeds: [embednew] })
               })
             })
           }

        if (interaction.customId === "bannerconfig") {
          interaction.deferUpdate();
          interaction.channel.send(`${emoji.carregando} | Qual o banner do bot?`).then(msg => {
           const filter = m => m.author.id === interaction.user.id;
           const collector = msg.channel.createMessageCollector({ filter, max: 1 });
             collector.on("collect", message => {
              message.delete()
               const newt = message.content
               dbcv.set(`banner`, newt)
               msg.edit(`✅ | Alterado!`).then((editedMessage) => {
                setTimeout(() => {
                  editedMessage.delete().catch(console.error);
                }, 5000); 
              });
              
                          
               const embednew = new Discord.EmbedBuilder()
                 .setTitle(`${dbcv.get(`title`)} | Configuração dos banners`)
                 .setDescription(`**📝 | Avatar: [aqui](${dbcv.get(`foto`)})\n📝 | Banner [aqui](${dbcv.get(`banner`)})**`)
                 .setThumbnail(`${dbcv.get(`foto`)}`)
                 .setColor(dbcv.get(`color`))
               embed.edit({ embeds: [embednew] })
               })
             })
           }

           if (interaction.customId === "voltar12") {
            interaction.deferUpdate();
            const embedvoltar1 = new Discord.EmbedBuilder()
              .setTitle(`${dbcv.get(`title`)} | Configurações`)
              .setDescription(`**> Olá, aqui você pode configurar tudo do bot.\n\n> Recomendo que configure primeiro os payments, canais e os termos.\n\n💸 | Sistema de vendas: \`\`${dbcv.get(`vendasonoff`)}\`\`**`)
              .setThumbnail(`${dbcv.get(`foto`)}`)
              .setFooter({ text: `${dbcv.get(`title`)} - Direitos reservados.` })
              .setColor(dbcv.get(`color`))
            embed.edit({ embeds: [embedvoltar1], components: [row, rownes] })
    
           }

         if (interaction.customId === "saldoon") {
          interaction.deferUpdate();
          dbcv.set(`saldoonoff`, `On`)
          dbcv.set(`saldotruefalse`, false)
          const embedpisald = new Discord.EmbedBuilder()
            .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
            .setDescription(`**⚙️ | Configurando Saldo.\n\n💸 | Saldo \`\`${dbcv.get(`saldoonoff`)}\`\`**`)
            .setFooter({text:`Configure usando os botões abaixo.`})
            .setThumbnail(`${dbcv.get(`foto`)}`)
            .setColor(dbcv.get(`color`))
          embed.edit({ embeds: [embedpisald], components: [rowconfigad] }) 
          interaction.channel.send(`**💰 | Saldo \`\`${dbcv.get(`saldoonoff`)}\`\`**`)
  .then((sentMessage) => {
    setTimeout(() => {
      sentMessage.delete().catch(console.error);
    }, 5000); 
  });

         }

         if (interaction.customId === "saldooff") {
          interaction.deferUpdate();
          dbcv.set(`saldoonoff`, `Off`)
          dbcv.set(`saldotruefalse`, true)
          const embedpixasdff = new Discord.EmbedBuilder()
            .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
            .setDescription(`**⚙️ | Configurando Saldo.\n\n💸 | Saldo \`\`${dbcv.get(`saldoonoff`)}\`\`**`)
            .setFooter({text:`Configure usando os botões abaixo.`})
            .setThumbnail(`${dbcv.get(`foto`)}`)
            .setColor(dbcv.get(`color`))
          embed.edit({ embeds: [embedpixasdff], components: [rowconfigad] }) 
          interaction.channel.send(`**💰 | Saldo \`\`${dbcv.get(`saldoonoff`)}\`\`**`)
  .then((sentMessage) => {
    setTimeout(() => {
      sentMessage.delete().catch(console.error);
    }, 5000); 
  });

         }

         if (interaction.customId === "voltar6") {
          interaction.deferUpdate();
          const embedconfigpayss = new Discord.EmbedBuilder()
          .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
          .setDescription(`**⚙️ | Configurando payments.**`)
          .setFooter({text:`Selecione o sistema de deseja configurar.`})
          .setThumbnail(`${dbcv.get(`foto`)}`)
          .setColor(dbcv.get(`color`))
          embed.edit({ embeds: [embedconfigpayss], components: [rowconfigpays2] }) 
         }

         if (interaction.customId === "voltar7") {
          interaction.deferUpdate();
          const embedsaldoasd = new Discord.EmbedBuilder()
          .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
          .setDescription(`**⚙️ | Configurando Saldo.\n\n💸 | Saldo \`\`${dbcv.get(`saldoonoff`)}\`\`**`)
          .setFooter({text:`Configure usando os botões abaixo.`})
          .setThumbnail(`${dbcv.get(`foto`)}`)
          .setColor(dbcv.get(`color`))
          embed.edit({ embeds: [embedsaldoasd], components: [rowconfigsaldo] })  
         }
         /*
            if (interaction.customId === "configsaldo") {
              interaction.deferUpdate();
              const embedsaldoconfig = new Discord.EmbedBuilder()
                .setTitle(`${dbcv.get(`title`)} | Configurações`)
                .setDescription(`**⚙ | Configurando Saldo.\n\n💰 | Saldo \`\`${dbcv.get(`saldoonoff`)}\`\`**`)
                .setThumbnail(`${dbcv.get(`foto`)}`)
                .setFooter({ text: `${dbcv.get(`title`)} - Direitos reservados.` })
                .setColor(dbcv.get(`color`))
              embed.edit({ embeds: [embedsaldoconfig], components: [rowconfigsaldo] })
             }
             */
            if (interaction.customId === "voltar1") {
              interaction.deferUpdate();
              const embedvoltar1 = new Discord.EmbedBuilder()
                .setTitle(`${dbcv.get(`title`)} | Configurações`)
                .setDescription(`**> Olá, aqui você pode configurar tudo do bot.\n\n> Recomendo que configure primeiro os payments, canais e os termos.\n\n💸 | Sistema de vendas: \`\`${dbcv.get(`vendasonoff`)}\`\`**`)
                .setThumbnail(`${dbcv.get(`foto`)}`)
                .setFooter({ text: `${dbcv.get(`title`)} - Direitos reservados.` })
                .setColor(dbcv.get(`color`))
              embed.edit({ embeds: [embedvoltar1], components: [row, rownes] })
      
             }
            
            const rowpixoffon = new Discord.ActionRowBuilder()
            .addComponents(
              new Discord.ButtonBuilder()
                .setCustomId('pixon')
                .setEmoji(`✅`)
                .setLabel('Pix On')
                .setStyle(3),
            )
            .addComponents(
              new Discord.ButtonBuilder()
                .setCustomId('pixoff')
                .setEmoji(`<a:Errado_FastStore:1195794088017006804>`)
                .setLabel('Pix Off')
                .setStyle(4),
            )
            .addComponents(
              new Discord.ButtonBuilder()
                .setCustomId('voltar3')
                .setEmoji('⬅️')
                .setLabel('Voltar')
                .setStyle(2),
            );

            if (interaction.customId === "pixonoff") {
              interaction.deferUpdate();
              const embedpixonoff = new Discord.EmbedBuilder()
              .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
              .setDescription(`**⚙️ | Configurando pix.\n🔗 | Pix \`\`${dbcv.get(`pixonoff`)}\`\`**`)
              .setFooter({text:`Configure usando os botões abaixo.`})
              .setThumbnail(`${dbcv.get(`foto`)}`)
              .setColor(dbcv.get(`color`))
              embed.edit({ embeds: [embedpixonoff], components: [rowpixoffon] })    
                }  

           if (interaction.customId === "pixon") {
            interaction.deferUpdate();
            dbcv.set(`pixonoff`, `On`)
            dbcv.set(`pixtruedalse`, false)
            const embedpixonoff = new Discord.EmbedBuilder()
              .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
              .setDescription(`**⚙️ | Configurando pix.\n🔗 | Pix \`\`${dbcv.get(`pixonoff`)}\`\`**`)
              .setFooter({text:`Configure usando os botões abaixo.`})
              .setThumbnail(`${dbcv.get(`foto`)}`)
              .setColor(dbcv.get(`color`))
            embed.edit({ embeds: [embedpixonoff], components: [rowpixoffon] }) 
            interaction.channel.send(`**✅ | Pix \`\`${dbcv.get(`pixonoff`)}\`\`**`)
  .then((sentMessage) => {
    setTimeout(() => {
      sentMessage.delete().catch(console.error);
    }, 5000); 
  });

           }

           if (interaction.customId === "pixoff") {
            interaction.deferUpdate();
            dbcv.set('pixonoff', 'Off');
            dbcv.set('pixtruedalse', true);        
            const embedpixonoff = new Discord.EmbedBuilder()
              .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
              .setDescription(`**⚙️ | Configurando pix.\n🔗 | Pix \`\`${dbcv.get(`pixonoff`)}\`\`**`)
              .setFooter({text:`Configure usando os botões abaixo.`})
              .setThumbnail(`${dbcv.get(`foto`)}`)
              .setColor(dbcv.get(`color`))
            embed.edit({ embeds: [embedpixonoff], components: [rowpixoffon] }) 
            interaction.channel.send(`**${emoji.nao} | Pix \`\`${dbcv.get(`pixonoff`)}\`\`**`)
  .then((sentMessage) => {
    setTimeout(() => {
      sentMessage.delete().catch(console.error);
    }, 5000); 
  });

           }

           if (interaction.customId === "voltar3") {
            interaction.deferUpdate();
            const embedconfigmp = new Discord.EmbedBuilder()
            .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
            .setDescription(`**⚙️ | Configurando Mercado Pago.\n\n🔗 | Pix: \`\`${dbcv.get(`pixonoff`)}\`\`\n🕙 | Tempo Para Pagar: ${dbcv.get(`tempopagar`)}\n⚙️ | Access Token: ||${dbcv.get(`access_token`)}||\n🕳️ | Cupom: ${dbcv.get(`botaooffon`)}**`)
            .setFooter({text:`Configure usando os botões abaixo.`})
            .setThumbnail(`${dbcv.get(`foto`)}`)
            .setColor(dbcv.get(`color`))
            embed.edit({ embeds: [embedconfigmp], components: [rowconfigpaymp] }) 
           }

          if (interaction.customId === "tempopagar") {
            interaction.deferUpdate();
            interaction.channel.send(`${emoji.carregando} | Qual o tempo para pagar (em milissegundos)?`).then(msg => {
              const filter = m => m.author.id === interaction.user.id;
              const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 const newt = message.content
                 dbcv.set(`tempopagar`, newt)
                 msg.edit(`✅ | Alterado!`).then((editedMessage) => {
                  setTimeout(() => {
                    editedMessage.delete().catch(console.error);
                  }, 5000); 
                });
                
                             
                 const embedconfigmp = new Discord.EmbedBuilder()
                  .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
                  .setDescription(`**⚙️ | Configurando Mercado Pago.\n\n🔗 | Pix: \`\`${dbcv.get(`pixonoff`)}\`\`\n🕙 | Tempo Para Pagar: ${dbcv.get(`tempopagar`)}\n⚙️ | Access Token: ||${dbcv.get(`access_token`)}||\n🕳️ | Cupom: ${dbcv.get(`botaooffon`)}**`)
                  .setFooter({text:`Selecione o sistema de deseja configurar.`})
                  .setThumbnail(`${dbcv.get(`foto`)}`)
                  .setColor(dbcv.get(`color`))
                  embed.edit({ embeds: [embedconfigmp], components: [rowconfigpaymp] })
                 })
               })
          }
        
          if (interaction.customId === "configmpttoken") {
            interaction.deferUpdate();
            interaction.channel.send(`${emoji.carregando} | Qual o novo acesstoken?`).then(msg => {
              const filter = m => m.author.id === interaction.user.id;
              const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 const newt = message.content
                 dbcv.set(`access_token`, newt)
                 msg.edit(`✅ | Alterado!`).then((editedMessage) => {
                  setTimeout(() => {
                    editedMessage.delete().catch(console.error);
                  }, 5000); 
                });
                
                             
                 const embedconfigmp = new Discord.EmbedBuilder()
                  .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
                  .setDescription(`**⚙️ | Configurando Mercado Pago.\n\n🔗 | Pix: \`\`${dbcv.get(`pixonoff`)}\`\`\n🕙 | Tempo Para Pagar: ${dbcv.get(`tempopagar`)}\n⚙️ | Access Token: ||${dbcv.get(`access_token`)}||\n🕳️ | Cupom: ${dbcv.get(`botaooffon`)}**`)
                  .setFooter({text:`Configure usando os botões abaixo`})
                  .setThumbnail(`${dbcv.get(`foto`)}`)
                  .setColor(dbcv.get(`color`))
                  embed.edit({ embeds: [embedconfigmp], components: [rowconfigpaymp] })
                 })
               })
          }

          if (interaction.customId === "ativar/desativar") {
            interaction.deferUpdate();
        
            if (dbcv.get("botaooffon") === "Desativado!") {
                dbcv.set("botaooffon", "Ativado!");
                dbcv.set("botaotruefalse", false);
                const embed321 = new Discord.EmbedBuilder()
                .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
                  .setDescription(`**⚙ | Configurando Mercado Pago.\n\n<:1140706544879669268:1147614586464383028> | Pix: \`\`${dbcv.get(`pixonoff`)}\`\`\n<:W_Relgio:1152425171764904046> | Tempo Para Pagar: ${dbcv.get(`tempopagar`)}\n<:Bl_MercadoPago:1152425162554232954> | Access Token: ||${dbcv.get(`access_token`)}||\n<:W_Cupom:1152425154794766346> | Cupom: ${dbcv.get(`botaooffon`)}**`)
                  .setFooter({text:`Configure usando os botões abaixo.`})
                  .setThumbnail(`${dbcv.get(`foto`)}`)
                  .setColor(dbcv.get(`color`))
        
            interaction.message.edit({ embeds: [embed321] });  
            } else {
                dbcv.set("botaooffon", "Desativado!");
                dbcv.set("botaotruefalse", true);
                const embed = new Discord.EmbedBuilder()
                .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
                  .setDescription(`**⚙ | Configurando Mercado Pago.\n\n<:1140706544879669268:1147614586464383028> | Pix: \`\`${dbcv.get(`pixonoff`)}\`\`\n<:W_Relgio:1152425171764904046> | Tempo Para Pagar: ${dbcv.get(`tempopagar`)}\n<:Bl_MercadoPago:1152425162554232954> | Access Token: ||${dbcv.get(`access_token`)}||\n<:W_Cupom:1152425154794766346> | Cupom: ${dbcv.get(`botaooffon`)}**`)
                  .setFooter({text:`Configure usando os botões abaixo.`})
                  .setThumbnail(`${dbcv.get(`foto`)}`)
                  .setColor(dbcv.get(`color`))
        
            interaction.message.edit({ embeds: [embed] });  
            }
        
                          
        } 

       if (interaction.customId === "voltar2") {
        interaction.deferUpdate();
        const embedvoltar2 = new Discord.EmbedBuilder()
          .setTitle(`${dbcv.get(`title`)} | Configurações`)
          .setDescription(`**⚙️ | Configurando payments.**`)
          .setThumbnail(`${dbcv.get(`foto`)}`)
          .setFooter({text:`Selecione o sistema de deseja configurar.`})
          .setColor(dbcv.get(`color`))
        embed.edit({ embeds: [embedvoltar2], components: [rowconfigpays2]})
       }

       const rowconfigbot = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('nomeconfig')
            .setEmoji(`<a:planeta:1195794568625541210>`)
            .setLabel('Nome do Bot')
            .setStyle(2),
        )
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('titleconfig')
            .setEmoji(`📝`)
            .setLabel('Titulo das Embed')
            .setStyle(2),
        )
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('statusconfig')
            .setEmoji(`⚙`)
            .setLabel('Status')
            .setStyle(2),
        )
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('prefixconfig')
            .setEmoji(`<:cpu:1195794860683305030>`)
            .setLabel('Prefix')
            .setStyle(2),
        )
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('colorconfig')
            .setEmoji(`🔅`)
            .setLabel('Cor das Embed')
            .setStyle(2),
        );
        const rowconfigbot2 = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('cargoconfig')
            .setEmoji(`<:Carrinho_WJ:1195795262300491886>`)
            .setLabel('Cargo Cliente')
            .setStyle(2),
        ) 
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('voltar23234')
            .setEmoji('⬅️')
            .setLabel('Voltar')
            .setStyle(1),
        );

       if (interaction.customId === "configbot") {
        interaction.deferUpdate();
        const embedconfigbot = new Discord.EmbedBuilder()
        .setTitle(`${dbcv.get(`title`)} | Configurações`)
        .setDescription(`**⚙ | Configurando Bot.\n\n⚙ | Nome: \`\`${dbcv.get(`nomebot`)}\`\`\n✍ | Title: \`\`${dbcv.get(`title`)}\`\`\n📡 | Status: \`\`${dbcv.get(`status`)}\`\`\n⚙ | Prefix: \`\`${dbcv.get(`prefix`)}\`\`\n🔅 | Color: ${dbcv.get(`color`)}\n📝 | Cargo Cliente: <@&${dbcv.get(`role`)}>**`)
          .setThumbnail(`${dbcv.get(`foto`)}`)
          .setFooter({text:`Configure usando os botões abaixo`})
          .setColor(dbcv.get(`color`))
        embed.edit({ embeds: [embedconfigbot], components: [rowconfigbot, rowconfigbot2] })  
       }

       if (interaction.customId === "nomeconfig") {
        interaction.deferUpdate();
        interaction.channel.send(`${emoji.carregando} | Qual o novo nome do bot?`).then(msg => {
         const filter = m => m.author.id === interaction.user.id;
         const collector = msg.channel.createMessageCollector({ filter, max: 1 });
          collector.on("collect", message => {
            message.delete()
            const newt = message.content
            client.user.setUsername(message.content);
            dbcv.set(`nomebot`, newt)
            msg.edit(`✅ | Alterado!`).then((editedMessage) => {
              setTimeout(() => {
                editedMessage.delete().catch(console.error);
              }, 5000); 
            });
            
                       
            const embednew = new Discord.EmbedBuilder()
              .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
              .setDescription(`**⚙ | Configurando Bot.\n\n⚙ | Nome: \`\`${dbcv.get(`nomebot`)}\`\`\n✍ | Title: \`\`${dbcv.get(`title`)}\`\`\n⚙ | Status: \`\`${dbcv.get(`status`)}\`\`\n⚙ | Prefix: \`\`${dbcv.get(`prefix`)}\`\`\n🔅 | Color: ${dbcv.get(`color`)}\n📝 | Cargo Cliente: <@&${dbcv.get(`role`)}>**`)
              .setThumbnail(`${dbcv.get(`foto`)}`)
              .setColor(dbcv.get(`color`))
            embed.edit({ embeds: [embednew] })
            })
          })
        }

        if (interaction.customId === "voltar23234") {
          interaction.deferUpdate();
          const embedvoltar4 = new Discord.EmbedBuilder()
          .setTitle(`${dbcv.get(`title`)} | Configurações`)
          .setDescription(`**> Olá, aqui você pode configurar tudo do bot.\n\n> Recomendo que configure primeiro os payments, canais e os termos.\n\n💰 | Sistema de vendas: \`\`${dbcv.get(`vendasonoff`)}\`\`**`)
          .setThumbnail(`${dbcv.get(`foto`)}`)
          .setFooter({ text: `${dbcv.get(`title`)} - Direitos reservados.` })
          .setColor(dbcv.get(`color`))
          embed.edit({ embeds: [embedvoltar4], components: [row, rownes] })
         }

        if (interaction.customId === "titleconfig") {
          interaction.deferUpdate();
          interaction.channel.send(`${emoji.carregando} | Qual o novo title do bot?`).then(msg => {
           const filter = m => m.author.id === interaction.user.id;
           const collector = msg.channel.createMessageCollector({ filter, max: 1 });
            collector.on("collect", message => {
              message.delete()
              const newt = message.content
              client.user.setUsername(message.content);
              dbcv.set(`title`, newt)
              msg.edit(`✅ | Alterado!`).then((editedMessage) => {
                setTimeout(() => {
                  editedMessage.delete().catch(console.error);
                }, 5000); 
              });
              
                         
              const embednew = new Discord.EmbedBuilder()
                .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
                .setDescription(`**⚙ | Configurando Bot.\n\n⚙ | Nome: \`\`${dbcv.get(`nomebot`)}\`\`\n⚙ | Title: \`\`${dbcv.get(`title`)}\`\`\n⚙ | Status: \`\`${dbcv.get(`status`)}\`\`\n⚙ | Prefix: \`\`${dbcv.get(`prefix`)}\`\`\n⚙ | Color: ${dbcv.get(`color`)}\n📝 | Cargo Cliente: <@&${dbcv.get(`role`)}>**`)
                .setThumbnail(`${dbcv.get(`foto`)}`)
                .setColor(dbcv.get(`color`))
              embed.edit({ embeds: [embednew] })
              })
            })
          }
          if (interaction.customId === "statusconfig") {
            interaction.deferUpdate();
            interaction.channel.send(`${emoji.carregando} | Qual o novo status do bot?`).then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
              collector.on("collect", message => {
                message.delete()
                const newt = message.content
                client.user.setUsername(message.content);
                dbcv.set(`status`, newt)
                msg.edit(`✅ | Alterado!`).then((editedMessage) => {
                  setTimeout(() => {
                    editedMessage.delete().catch(console.error);
                  }, 5000); 
                });
                
                           
                const embednew = new Discord.EmbedBuilder()
                  .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
                  .setDescription(`**⚙ | Configurando Bot.\n\n⚙ | Nome: \`\`${dbcv.get(`nomebot`)}\`\`\n👨‍🏭| Title: \`\`${dbcv.get(`title`)}\`\`\n📡 | Status: \`\`${dbcv.get(`status`)}\`\`\n🌴 | Prefix: \`\`${dbcv.get(`prefix`)}\`\`\n🖌| Color: ${dbcv.get(`color`)}\n📝 | Cargo Cliente: <@&${dbcv.get(`role`)}>**`)
                  .setThumbnail(`${dbcv.get(`foto`)}`)
                  .setColor(dbcv.get(`color`))
                embed.edit({ embeds: [embednew] })
                })
              })
            }
            if (interaction.customId === "prefixconfig") {
                interaction.deferUpdate();
                interaction.channel.send(`${emoji.carregando} | Qual o novo prefix do bot?`).then(msg => {
                 const filter = m => m.author.id === interaction.user.id;
                 const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                  collector.on("collect", message => {
                    message.delete()
                    const newt = message.content
                    client.user.setUsername(message.content);
                    dbcv.set(`preifx`, newt)
                    msg.edit(`✅ | Alterado!`).then((editedMessage) => {
                      setTimeout(() => {
                        editedMessage.delete().catch(console.error);
                      }, 5000); 
                    });
                    
                               
                    const embednew = new Discord.EmbedBuilder()
                      .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
                      .setDescription(`**⚙ | Configurando Bot.\n\n⚙ | Nome: \`\`${dbcv.get(`nomebot`)}\`\`\n👨‍🏭| Title: \`\`${dbcv.get(`title`)}\`\`\n<a:earth_africa:1152425183966134284> | Status: \`\`${dbcv.get(`status`)}\`\`\n🌴 | Prefix: \`\`${dbcv.get(`prefix`)}\`\`\n🖌| Color: ${dbcv.get(`color`)}\n📝 | Cargo Cliente: <@&${dbcv.get(`role`)}>**`)
                      .setThumbnail(`${dbcv.get(`foto`)}`)
                      .setColor(dbcv.get(`color`))
                    embed.edit({ embeds: [embednew] })
                    })
                  })
                }
      if (interaction.customId === "colorconfig") {
        interaction.deferUpdate();
        interaction.channel.send(`${emoji.carregando} | Qual a nova cor em hex?`).then(msg => {
         const filter = m => m.author.id === interaction.user.id;
         const collector = msg.channel.createMessageCollector({ filter, max: 1 });
          collector.on("collect", message => {
            message.delete()
            const newt = message.content
            dbcv.set(`color`, newt)
            msg.edit(`✅ | Alterado!`).then((editedMessage) => {
              setTimeout(() => {
                editedMessage.delete().catch(console.error);
              }, 5000); 
            });
            
                       
            const embednew = new Discord.EmbedBuilder()
              .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
              .setDescription(`**⚙ | Configurando Bot.\n\n⚙ | Nome: \`\`${dbcv.get(`nomebot`)}\`\`\n👨‍🏭| Title: \`\`${dbcv.get(`title`)}\`\`\n<a:earth_africa:1152425183966134284> | Status: \`\`${dbcv.get(`status`)}\`\`\n🌴 | Prefix: \`\`${dbcv.get(`prefix`)}\`\`\n🖌| Color: ${dbcv.get(`color`)}\n📝 | Cargo Cliente: <@&${dbcv.get(`role`)}>**`)
              .setThumbnail(`${dbcv.get(`foto`)}`)
              .setColor(dbcv.get(`color`))
            embed.edit({ embeds: [embednew] })
            })
          })
        }
      if (interaction.customId === "cargoconfig") {
        interaction.deferUpdate();
        interaction.channel.send(`${emoji.carregando} | Qual o novo cargo de cliente em id?`).then(msg => {
         const filter = m => m.author.id === interaction.user.id;
         const collector = msg.channel.createMessageCollector({ filter, max: 1 });
          collector.on("collect", message => {
            message.delete()
            const newt = message.content
            dbcv.set(`role`, newt);
            msg.edit(`✅ | Alterado!`).then((editedMessage) => {
              setTimeout(() => {
                editedMessage.delete().catch(console.error);
              }, 5000); 
            });
            
                       
            const embednew = new Discord.EmbedBuilder()
              .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
              .setDescription(`**⚙ | Configurando Bot.\n\n⚙ | Nome: \`\`${dbcv.get(`nomebot`)}\`\`\n👨‍🏭| Title: \`\`${dbcv.get(`title`)}\`\`\n<a:earth_africa:1152425183966134284> | Status: \`\`${dbcv.get(`status`)}\`\`\n🌴 | Prefix: \`\`${dbcv.get(`prefix`)}\`\`\n🖌| Color: ${dbcv.get(`color`)}\n📝 | Cargo Cliente: <@&${dbcv.get(`role`)}>**`)
              .setThumbnail(`${dbcv.get(`foto`)}`)
              .setColor(dbcv.get(`color`))
            embed.edit({ embeds: [embednew] })
            })
          })
        }

        if (interaction.customId === "equipe") {
          interaction.deferUpdate();
          interaction.channel.send(`${emoji.carregando} | Qual o cargo da equipe em id?`).then(msg => {
            const filter = m => m.author.id === interaction.user.id;
            const collector = msg.channel.createMessageCollector({ filter, max: 1 });
             collector.on("collect", message => {
               message.delete()
               const newt = message.content
               dbcv.set(`equipe`, newt)
               msg.edit(`✅ | Alterado!`).then((editedMessage) => {
                setTimeout(() => {
                  editedMessage.delete().catch(console.error);
                }, 5000); 
              });
              
                           
               const embednew = new Discord.EmbedBuilder()
              .setTitle(`${dbcv.get(`title`)} | Configuração do bot`)
              .setDescription(`**⚙ | Configurando Bot.\n\n⚙ | Nome: \`\`${dbcv.get(`nomebot`)}\`\`\n👨‍🏭| Title: \`\`${dbcv.get(`title`)}\`\`\n<a:earth_africa:1152425183966134284> | Status: \`\`${dbcv.get(`status`)}\`\`\n🌴 | Prefix: \`\`${dbcv.get(`prefix`)}\`\`\n🖌| Color: ${dbcv.get(`color`)}\n📝 | Cargo Cliente: <@&${dbcv.get(`role`)}>**`)
              .setThumbnail(`${dbcv.get(`foto`)}`)
              .setColor(dbcv.get(`color`))
            embed.edit({ embeds: [embednew] }) 
               })
             })
        }

         const rowconfigcanais = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('categoriaconfig')
            .setEmoji(`<:cbrp_carrinho:1178174221646577736>`)
            .setLabel('Categoria Carrinho')
            .setStyle(2),
        )

        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('canalvoz')
            .setEmoji(`🎧`)
            .setLabel('Canal de Voz')
            .setStyle(2),
        )
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('logsconfig')
            .setEmoji(`📦`)
            .setLabel('Logs Vendas')
            .setStyle(2),
        )
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('logs2config')
            .setEmoji(`💊`)
            .setLabel('Logs Vendas Staff')
            .setStyle(2),
        )
            .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId('voltar8')
            .setEmoji('⬅️')
            .setLabel('Voltar')
            .setStyle(1),
        );

         if (interaction.customId === "configcanais") {
          interaction.deferUpdate();
          const asddas = new Discord.EmbedBuilder()
            .setTitle(`${dbcv.get(`title`)} | Configuração dos canais`)
            .setThumbnail(dbcv.get(`foto`))
            .setDescription(`**⚙ | Configurando canais.\n\n<:cbrp_carrinho:1178174221646577736> | Categoria Carrinho: <#${dbcv.get(`category`)}>\n<:call:1186387904566661160> | Canal Voz: <#${dbcv.get(`canalvoz`)}>\n🌴  | Logs Vendas: <#${dbcv.get(`logs_feedback`)}>\n⚙ | Logs Vendas Staff: <#${dbcv.get(`logs_staff`)}>**`)
            .setColor(dbcv.get(`color`))
            embed.edit({ embeds: [asddas], components: [rowconfigcanais] })
         }

         if (interaction.customId === "categoriaconfig") {
          interaction.deferUpdate();
          interaction.channel.send(`${emoji.carregando} | Qual a nova de categoria dos carrinhos em id?`).then(msg => {
           const filter = m => m.author.id === interaction.user.id;
           const collector = msg.channel.createMessageCollector({ filter, max: 1 });
            collector.on("collect", message => {
              message.delete()
              const newt = message.content
              dbcv.set(`category`, newt)
              msg.edit(`✅ | Alterado!`).then((editedMessage) => {
                setTimeout(() => {
                  editedMessage.delete().catch(console.error);
                }, 5000); 
              });
              
                          
              const embednew = new Discord.EmbedBuilder()
                .setTitle(`${dbcv.get(`title`)} | Configuração dos canais`)
                .setThumbnail(dbcv.get(`foto`))
                .setDescription(`**⚙ | Configurando canais.\n\n<:cbrp_carrinho:1178174221646577736> | Categoria Carrinho: <#${dbcv.get(`category`)}>\n<:call:1186387904566661160> | Canal Voz: <#${dbcv.get(`canalvoz`)}>\n<a:badge_bot:1186387882949226496>  | Logs Vendas: <#${dbcv.get(`logs_feedback`)}>\n<a:badge_bot:1186387882949226496> | Logs Vendas Staff: <#${dbcv.get(`logs_staff`)}>**`)
                .setColor(dbcv.get(`color`))
              embed.edit({ embeds: [embednew], components: [rowconfigcanais] })
              })
            })
          }

          if (interaction.customId === "canalvoz") {
            interaction.deferUpdate();
            interaction.channel.send(`${emoji.carregando} | Qual o novo canal de voz em id?`).then(msg => {
              const filter = m => m.author.id === interaction.user.id;
              const collector = msg.channel.createMessageCollector({ filter, max: 1});
              collector.on("collect", message => {
                message.delete()
                const newt = message.content
                dbcv.set(`canalvoz`, newt)
                msg.edit(`✅ | Alterado!`).then((editedMessage) => {
                  setTimeout(() => {
                    editedMessage.delete().catch(console.error);
                  }, 5000); 
                });
                

                const embednew = new Discord.EmbedBuilder()
                .setTitle(`${dbcv.get(`title`)} | Configuração dos canais`)
                .setColor(dbcv.get(`color`))
                .setThumbnail(dbcv.get(`foto`))
                .setDescription(`**⚙ | Configurando canais.\n\n<:cbrp_carrinho:1178174221646577736> | Categoria Carrinho: <#${dbcv.get(`category`)}>\n<:call:1186387904566661160> | Canal Voz: <#${dbcv.get(`canalvoz`)}>\n<a:badge_bot:1186387882949226496>  | Logs Vendas: <#${dbcv.get(`logs_feedback`)}>\n<a:badge_bot:1186387882949226496> | Logs Vendas Staff: <#${dbcv.get(`logs_staff`)}>**`)
                embed.edit({ embeds: [embednew], components: [rowconfigcanais] })
              })
            })
          }

         if (interaction.customId === "logsconfig") {
          interaction.deferUpdate();
          interaction.channel.send(`${emoji.carregando} | Qual o novo canal de logs de vendas em id?`).then(msg => {
           const filter = m => m.author.id === interaction.user.id;
           const collector = msg.channel.createMessageCollector({ filter, max: 1 });
            collector.on("collect", message => {
              message.delete()
              const newt = message.content
              dbcv.set(`logs_feedback`, newt)
              msg.edit(`✅ | Alterado!`).then((editedMessage) => {
                setTimeout(() => {
                  editedMessage.delete().catch(console.error);
                }, 5000); 
              });
              
                          
              const embednew = new Discord.EmbedBuilder()
                .setTitle(`${dbcv.get(`title`)} | Configuração dos canais`)
                .setDescription(`**⚙ | Configurando canais.\n\n<:cbrp_carrinho:1178174221646577736> | Categoria Carrinho: <#${dbcv.get(`category`)}>\n<:call:1186387904566661160> | Canal Voz: <#${dbcv.get(`canalvoz`)}>\n<a:badge_bot:1186387882949226496> | Logs Vendas: <#${dbcv.get(`logs_feedback`)}>\n<a:badge_bot:1186387882949226496> | Logs Vendas Staff: <#${dbcv.get(`logs_staff`)}>**`)
                .setThumbnail(dbcv.get(`foto`))
                .setColor(dbcv.get(`color`))
              embed.edit({ embeds: [embednew], components: [rowconfigcanais] })
              })
            })
          }

          if (interaction.customId === "logs2config") {
            interaction.deferUpdate();
            interaction.channel.send(`${emoji.carregando} | Qual o novo canal de logs staff em id?`).then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
              collector.on("collect", message => {
                message.delete()
                const newt = message.content
                dbcv.set(`logs_staff`, newt)
                msg.edit(`✅ | Alterado!`).then((editedMessage) => {
                  setTimeout(() => {
                    editedMessage.delete().catch(console.error);
                  }, 5000); 
                });
                
                          
              const embednew = new Discord.EmbedBuilder()
                .setTitle(`${dbcv.get(`title`)} | Configuração dos canais`)
                .setDescription(`**⚙ | Configurando canais.\n\n<:cbrp_carrinho:1178174221646577736> | Categoria Carrinho: <#${dbcv.get(`category`)}>\n<:call:1186387904566661160> | Canal Voz: <#${dbcv.get(`canalvoz`)}>\n🌴  | Logs Vendas: <#${dbcv.get(`logs_feedback`)}>\n<a:badge_bot:1186387882949226496> | Logs Vendas Staff: <#${dbcv.get(`logs_staff`)}>**`)
                .setThumbnail(dbcv.get(`foto`))
                .setColor(dbcv.get(`color`))
              embed.edit({ embeds: [embednew], components: [rowconfigcanais] })
              })
            })
          }
        

            if (interaction.customId === "voltar8") {
              interaction.deferUpdate();
              const embedvoltar8 = new Discord.EmbedBuilder()
              .setTitle(`${dbcv.get(`title`)} | Configurações`)
              .setDescription(`**> Olá, aqui você pode configurar tudo do bot.\n\n> Recomendo que configure primeiro os payments, canais e os termos.\n\n💰 | Sistema de vendas: \`\`${dbcv.get(`vendasonoff`)}\`\`**`)
              .setThumbnail(`${dbcv.get(`foto`)}`)
              .setFooter({ text: `${dbcv.get(`title`)} - Direitos reservados.` })
              .setColor(dbcv.get(`color`))
              embed.edit({ embeds: [embedvoltar8], components: [row, rownes] })
            }

          })

          }
            }
              
            

           
         
      

       
    