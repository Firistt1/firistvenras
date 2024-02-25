const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const db4 = new JsonDatabase({ databasePath:"./databases/myJsonSaldo.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
   name: "administrarsaldo",
   description: "「💰」Adicione ou Remova saldo de um usúario",
   type: ApplicationCommandType.ChatInput,
   options: [
     {
       name: "ação",
       description: "Adicionar ou remover?",
       type: ApplicationCommandOptionType.String,
       choices: [
         { name: `Adicionar`, value: `add` },
         { name: `Remover`, value: `del` }
       ],
       required: true
     },
     {
       name: "user",
       description: "Mencione o usuário para gerenciar o seu saldo",
       type: ApplicationCommandOptionType.User,
       required: true
     },
     {
       name: "valor",
       description: "Valor para remover ou adicionar ao usuário selecionado.",
       type: ApplicationCommandOptionType.Number,
       required: true
     }
   ],
   
   run: async(client, interaction) => {
     
     if (!perms.has(`${interaction.user.id}_id`)) return interaction.reply({ content: `${emoji.nao} | Você não está na lista de pessoas!`, ephemeral: true })
     
     const tipo = interaction.options.getString("ação")
     const usuario = interaction.options.getUser("user")
     const valorr = interaction.options.getNumber("valor")
     
     const saldoantigo = Number(db4.get(`${usuario.id}.saldo`)).toFixed(0) || "0"
     
     if (tipo == 'add') {
       db4.add(`${usuario.id}.saldo`, valorr)
       const embdd = new EmbedBuilder()
        .setTitle(`Saldo adicionado para ${usuario.username}`)
        .setDescription(`O ${usuario} tinha \`R$${saldoantigo}\`, foi adicionado \`R$${valorr.toFixed(0)}\`, agora ele está com \`R$${Number(db4.get(`${usuario.id}.saldo`)).toFixed(0) || "0"}\``)
        .setColor(dbcv.get(`color`))
        .setFooter({ text: `Autor: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
       interaction.reply({ embeds: [embdd] })
     } else if (tipo == 'del') {
       if (Number(db4.get(`${usuario.id}.saldo`)) < valorr) return interaction.reply(`🔍 | O ${usuario}, tem atualmente \`R$${saldoantigo}\`, não é possível retirar saldo deste usuário!`)
       
       const saldonovo = saldoantigo - valorr
       
       db4.set(`${usuario.id}.saldo`, saldonovo)
       
       const embdd = new EmbedBuilder()
        .setTitle(`Saldo retirado ${usuario.username}`)
        .setDescription(`O ${usuario} tinha \`R$${saldoantigo}\`, foi retirado \`R$${valorr.toFixed(0)}\`, agora ele está com \`R$${Number(db4.get(`${usuario.id}.saldo`)).toFixed(0) || "0"}\``)
        .setColor(dbcv.get(`color`))
        .setFooter({ text: `Autor: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
       interaction.reply({ embeds: [embdd] })
     }
   }
}