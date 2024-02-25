const Discord = require("discord.js")
const { JsonDatabase } = require("wio.db");
const emoji = require("../../databases/myJsonEmojis.json");
const dbcv = new JsonDatabase({ databasePath: "./databases/myJsonBotConfig.json" });
const config = require("../../config.json")
module.exports = {
    name: "taxa",
    description:"「📊」Veja a taxa do mercado pago",
    type:Discord.ApplicationCommandType.ChatInput,
    run: async(client, interaction, message, args) => {
        const embederro = new Discord.EmbedBuilder()
        .setTitle(`Erro - Permissão`)
        .setDescription(`Você não tem permissão para isto!`)
        .setColor(dbcv.get(`color`))
        .setFooter({text:`Mercado Pago`})
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return interaction.reply({ embeds: [embederro] })
        const embed = new Discord.EmbedBuilder()
        .setTitle(`Checkouts`)
        .addFields(
            { name: `Melhor Negócios`, value: `Configure quando ter o dinheiro das suas futuras vendas disponível de acordo com os custos mais adequados para os seus negócios.`, inline: false },
            { name: `Mudar em quais funções:`, value: `Crédito, saldo no Mercado Pago, Mercado Crédito e dinheiro disponível`, inline: false }
        )
        .setDescription(`[Mude aqui](https://www.mercadopago.com.br/costs-section/release-options/edit/merchant-services)`)
        .setColor(dbcv.get(`color`))
        .setFooter({text:`Mercado Pago`})
        .setThumbnail(dbcv.get(`foto`))
        .setImage(dbcv.get(`banner`));
    
        
interaction.reply({embeds: [embed]})
        
    }
}
