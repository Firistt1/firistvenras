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

module.exports = {
    name: "dm",
    description:"「📬」Envie uma mensagem para um usúario",
    type:Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name:"pessoa",
            description:"Quem vai receber o produto?",
            type:Discord.ApplicationCommandOptionType.User,
            required: true
          },
          {
            name:"mensagem",
            description:"Qual será a mensagem?",
            type:Discord.ApplicationCommandOptionType.String,
            required: true
          },

    ],
    run: async(client,interaction, message, args, ) => {
        const pessoa = interaction.options.getUser("pessoa")
        const mensagem = interaction.options.getString("mensagem")
        if (interaction.user.id !== `${perms.get(`${interaction.user.id}_id`)}`) {
            interaction.reply(`${emoji.nao} | Você não está na lista de pessoas!`)
              .then(replyMessage => {
                setTimeout(() => {
                  replyMessage.delete().catch(console.error);
                }, 5000); 
              });
              return;
          };
        pessoa.send(`${mensagem}`).then(()=> {
            interaction.reply({content:"Mensagem Enviada com sucesso!",
            ephemeral:true})
        }).catch(() => {
            interaction.reply({
                content:"O usuario está com a dm bloqueada",
                ephemeral:true
            })
        })
    }}