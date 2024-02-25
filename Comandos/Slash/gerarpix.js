const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const db8 = new JsonDatabase({ databasePath:"./databases/myJsonRankUsers.json" });
const mercadopago = require("mercadopago")
const axios = require("axios")
const moment = require("moment")
const min = moment().add(10, 'minutes');
const db2 = new JsonDatabase({ databasePath:"./databases/myJsonDatabase.json" });
const time = Math.floor(min.valueOf() / 1000);
const db3 = new JsonDatabase({ databasePath:"./databases/myJsonIDs.json" });

module.exports = {
   name: "gerarpix",
   description: "「💰」Gere uma cobrança",
   type: ApplicationCommandType.ChatInput,
   options: [
     {
       name: "valor",
       description: "Valor da cobrança",
       type: ApplicationCommandOptionType.Number,
       required: true
     }
   ],
   
   run: async(client, interaction) => {
     const msg = await interaction.reply({ content: `🔄 | Gerando pagamento...` })
     
     const valor = interaction.options.getNumber("valor")
     var data_id = Math.floor(Math.random() * 999999999999999);
     
     mercadopago.configurations.setAccessToken(dbcv.get('access_token'))
     var payment_data = {
            transaction_amount: Number(valor),
            description: `Cobrança - ${interaction.user.username}`,
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
       //      .setLabel('Cancelar')
             .setEmoji(`<:cancelar:1186355178010591403>`)
             .setCustomId('cancelaar')
             .setDisabled(false)
             .setStyle(4)
         )
         
         const embed = new EmbedBuilder()
          .setTitle(`${interaction.client.user.username} | Sistema de pagamento`)
          .setDescription(`\`\`\`Pagamento gerado com sucesso!\`\`\`\n💸 **| Valor:**\nR$${valor.toFixed(2)}\n🔍 | Pagamento expira em:\n<t:${time}:f> (<t:${time}:R>)`)
          .setColor(dbcv.get(`color`))
          
          msg.edit({ content: ``, embeds: [embed], components: [row], ephemeral: true }).then(msg => {
            db3.set(`${data_id}.status`, "Pendente (2)")
            const embedlogsgs = new EmbedBuilder()
            .setTitle(`${dbcv.get('title')} | Pagamento Criado`)
            .addFields(
                { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
                { name: '📝 | Criou um Pagamento:', value: `\`Valor: ${valor}\`` },
                { name: '🆔 | ID do Pagamento:', value: `\`Valor: ${data_id}\`` },
                { name: '🕒 | Data / Horário da Compra:',  value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
            )
            .setColor('Green')
            .setTimestamp()
            .setThumbnail(interaction.user.displayAvatarURL({ format: 'png' }))
        
        
        const button32 = new ButtonBuilder()
            .setCustomId('comprarcancelar123213')
            .setLabel('Mensagem Automática')
            .setStyle(2)
            .setDisabled(true);
        
        const row241 = new ActionRowBuilder().addComponents(button32);
        
        interaction.client.channels.cache.get(dbcv.get('logs_staff')).send({
            embeds: [embedlogsgs],
            components: [row241],
        });
              
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
                    db3.delete(`${data_id}`)
                    msg.edit({ content: `🔍 | Pagamento Cancelado`, embeds: [], components: [], ephemeral: true })
                    const embedlogsgs = new EmbedBuilder()
            .setTitle(`${dbcv.get('title')} | Pagamento Cancelado`)
            .addFields(
                { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
                { name: '📝 | Pagamento:', value: `\`Valor: ${valor}\`` },
                { name: '🆔 | ID do Pagamento:', value: `\`Valor: ${data_id}\`` },
                { name: '🕒 | Data / Horário Do Pagamento:',  value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
            )
            .setColor('Red')
            .setTimestamp()
            .setThumbnail(interaction.user.displayAvatarURL({ format: 'png' }))
        
        
        const button32 = new ButtonBuilder()
            .setCustomId('comprarcancelar123213')
            .setLabel('Mensagem Automática')
            .setStyle(2)
            .setDisabled(true);
        
        const row241 = new ActionRowBuilder().addComponents(button32);
        
        interaction.client.channels.cache.get(dbcv.get('logs_staff')).send({
            embeds: [embedlogsgs],
            components: [row241],
        });
                 }
              }) 
              
              const checkPaymentStatus = setInterval(() => {
                axios.get(`https://api.mercadolibre.com/collections/notifications/${data.body.id}`, {
                  headers: {
                    'Authorization': `Bearer ${dbcv.get(`access_token`)}`
                  }
               }).then(async (doc) => {
                   
                   if (doc.data.collection.status === "approved") {
                    db3.set(`${data_id}.status`, "Processando")
                   }
                   if(db3.get(`${data_id}.status`) === "Processando") {
                    clearInterval(checkPaymentStatus)
                    db2.add("pedidostotal", 1)
                    db2.add("gastostotal", Number(valor))
                    db2.add(`${moment().format('L')}.pedidos`, 1)
                    db2.add(`${moment().format('L')}.recebimentos`, Number(valor))
                    db2.add(`${interaction.user.id}.gastosaprovados`, Number(valor))
                    db2.add(`${interaction.user.id}.pedidosaprovados`, 1)
                    db8.add(`${interaction.user}.valoresganhos`, Number(valor))
                    msg.edit({ content: `✅ | Pagamento aprovado.`, embeds: [], components: [] })

                    const embedlogsgs = new EmbedBuilder()
           .setTitle(`${dbcv.get('title')} | Pagamento Aprovado`)
           .addFields(
               { name: '👥 | Usuário:', value: `\`${interaction.user.username} - ${interaction.user.id}\`` },
               { name: '📝 | Pagamento:', value: `\`Valor: ${valor}\`` },
               { name: '🆔 | ID do Pagamento:', value: `\`Valor: ${data_id}\`` },
               { name: '🕒 | Data / Horário da Compra:',  value: `<t:${Math.floor(new Date() / 1000)}:f> (<t:${~~(new Date() / 1000)}:R>)` }
           )
           .setColor('Green')
           .setTimestamp()
           .setThumbnail(interaction.user.displayAvatarURL({ format: 'png' }))
       
       
       const button32 = new ButtonBuilder()
           .setCustomId('comprarcancelar123213')
           .setLabel('Mensagem Automática')
           .setStyle(2)
           .setDisabled(true);
       
       const row241 = new ActionRowBuilder().addComponents(button32);
       
       interaction.client.channels.cache.get(dbcv.get('logs_staff')).send({
           embeds: [embedlogsgs],
           components: [row241],
       });
                   }
                   
               })
              }, 2000)
          })
       })
   }
}

