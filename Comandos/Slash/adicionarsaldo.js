const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const db4 = new JsonDatabase({ databasePath:"./databases/myJsonSaldo.json" });
const mercadopago = require("mercadopago")
const axios = require("axios")
const moment = require("moment")
const min = moment().add(10, 'minutes');
const time = Math.floor(min.valueOf() / 1000);
const db3 = new JsonDatabase({ databasePath:"./databases/myJsonIDs.json" });

module.exports = {
   name: "adicionarsaldo",
   description: "「💰」Adicionar saldo via pix",
   type: ApplicationCommandType.ChatInput,
   options: [
     {
       name: "valor",
       description: "Valor que deseja adicionar",
       type: ApplicationCommandOptionType.Number,
       required: true
     }
   ],
   run: async(client, interaction) => {
     
     if (dbcv.get('saldoonoff') == "Off") return interaction.reply({ content: `ERROR: o sistema de saldo está desativado.`, ephemeral: true })
    
     const valor = interaction.options.getNumber("valor")
     
     if (valor < Number(dbcv.get(`valormin_deposito`))) return interaction.reply({ content: `ERROR: Está função foi definida para ter um VALOR MÍNIMO de ${dbcv.get(`valormin_deposito`)}`, ephemeral: true })
     
     var data_id = Math.floor(Math.random() * 999999999999999);
     db3.set(`${data_id}.status`, `Em andamento`)
     
     const embedsaldo = new EmbedBuilder()
      .setTitle(`Logs | Sistema de Saldo`)
      .setDescription(`🔍 | O ${interaction.user} acabou de solicitar o pagamento para adição de saldo no valor de \`R$${valor.toFixed(2)}\`,\n➡️ | Id do Pagamento: **${data_id}**`)
      .setColor(dbcv.get(`color`))
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `${interaction.user.username} - ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
      .setTimestamp()
      
     const canal = interaction.guild.channels.cache.get(dbcv.get(`logs_staff`))
     canal.send({ embeds: [embedsaldo] })
     
     let valorparaadd = (valor * dbcv.get(`bonus_deposito`)) / 100;
     
     const valorFinal = (parseFloat(Number(valor) + Number(valorparaadd)).toFixed(2));
     
     mercadopago.configurations.setAccessToken(dbcv.get('access_token'))
     var payment_data = {
            transaction_amount: Number(valor),
            description: `Adicionar Saldo - ${interaction.user.username}`,
            payment_method_id: 'pix',
            payer: {
              email: 'Agradei@gmail.com',
              first_name: 'Paula',
              last_name: 'Guimaraes',
              identification: {
                type: 'CPF',
                number: '07944777984'
              },
              address: {
                zip_code: '06233200',
                street_name: 'Av. das NaÃƒÂ§oes Unidas',
                street_number: '3003',
                neighborhood: 'Bonfim',
                city: 'Osasco',
                federal_unit: 'SP'
              }
            },
            notification_url: interaction.user.displayAvatarURL(),
        }
        
      mercadopago.payment.create(payment_data).then(function (data) {
        
        const buffer = Buffer.from(data.body.point_of_interaction.transaction_data.qr_code_base64, "base64");
        const attachment = new AttachmentBuilder(buffer, "payment.png");
        
        const row = new ActionRowBuilder()
         .addComponents(
            new ButtonBuilder()
             .setLabel('Pix Copia e Cola')
             .setEmoji(`<:G_Pix:1152425185429962922>`)
             .setCustomId('cpc')
             .setDisabled(false)
             .setStyle(1),
            new ButtonBuilder()
             .setLabel('Qr Code')
             .setEmoji(`<:QRCODE:1152428733081329767>`)
             .setCustomId('qrc')
             .setDisabled(false)
             .setStyle(1),
            new ButtonBuilder()
             .setLabel('Cancelar')
             .setEmoji(`<:cancelar:1186355178010591403>`)
             .setCustomId('cancelaar')
             .setDisabled(false)
             .setStyle(4)
         )
         
         const embed = new EmbedBuilder()
          .setTitle(`${client.user.username} | Sistema de pagamento`)
          .setDescription(`\`\`\`Pague com pix para receber seu Saldo.\`\`\`\n💰 **| Valor:**\nR$ ${valor.toFixed(2)}\n🎉 | Bônus de depósito:\n${dbcv.get(`bonus_deposito`) || "0"}% - ${Number(valorFinal).toFixed(2) || "0"}\n🔍 | Pagamento expira em:\n<t:${time}:f> (<t:${time}:R>)`)
          .setFooter({ text: `Após efetuar o pagamento, o tempo de entrega do saldo chegar na sua conta é de no máximo 1 minuto!`})
          .setColor(dbcv.get(`color`))
       //   .setImage('https://payment.png')
        
        interaction.reply({ embeds: [embed], components: [row], ephemeral: true }).then(msg => {
          
            const filter = i => i.member.id === interaction.user.id;
            const collector = msg.createMessageComponentCollector({ filter });
            collector.on('collect', interaction2 => {
                
                if (interaction2.customId == 'cpc') {
                  interaction2.reply({ content: `${data.body.point_of_interaction.transaction_data.qr_code}`, ephemeral: true });
                }
                
                if (interaction2.customId == 'qrc') {
                  interaction2.reply({ files: [attachment], ephemeral: true });
                }
                
                if (interaction2.customId == 'cancelaar') {
                  msg.edit({ content: `🔍 | Pagamento Cancelado`, embeds: [], components: [], ephemeral: true })
                  const embedsaldo2 = new EmbedBuilder()
                   .setTitle(`Logs | Adição de Saldo Cancelada!`)
                   .setDescription(`🔍 | O ${interaction.user} acabou de **Cancelar** o pagamento para adição de saldo no valor de \`R$${valor.toFixed(2)}\`,\n➡️ | Id do Pagamento: **${data_id}**`)
                   .setColor(dbcv.get(`color`))
                   .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                   .setFooter({ text: `${interaction.user.username} - ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
                   .setTimestamp()
                   
                 const canal2 = interaction.guild.channels.cache.get(dbcv.get(`logs_staff`))
                 canal2.send({ embeds: [embedsaldo2] })
                }
           })
           
           const checkPaymentStatus = setInterval(() => {
             axios.get(`https://api.mercadolibre.com/collections/notifications/${data.body.id}`, {
                  headers: {
                    'Authorization': `Bearer ${dbcv.get(`access_token`)}`
                  }
              }).then(async (doc) => {
                if (doc.data.collection.status === "approved") {
                    clearInterval(checkPaymentStatus)
                    db3.set(`${data_id}.status`, `Processando`)
                }
              }).catch(err => {
                  console.error(err);
              });
           }, 2000)
           
           const timer = setInterval(() => {
             if (db3.get(`${data_id}.status`) == 'Processando') {
               clearInterval(timer)
               msg.edit({ content: `✅ | Pagamento aprovado.`, embeds: [], components: [], ephemeral: true })
               if (dbcv.get(`bonus_deposito`) != 0) {
                 db4.add(`${interaction.user.id}.saldo`, `${Number(valorFinal).toFixed(2)}`)
               } else {
                 db4.add(`${interaction.user.id}.saldo`, `${Number(valor).toFixed(2)}`)
              }
             }
           }, 2000)
           
        })
      })
   }
}