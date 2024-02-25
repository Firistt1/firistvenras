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
    name: "entrega",
    description:"「📦」Envie um produto do estoque para um usúario",
    type:Discord.ApplicationCommandType.ChatInput,
    options: [
        {
          name:"pessoa",
          description:"Quem vai receber o produto?",
          type:Discord.ApplicationCommandOptionType.User,
          required: true
        },
        {
          name:"id",
          description:"Qual é o id do produto?",
          type:Discord.ApplicationCommandOptionType.String,
          required: true
        },
        {
          name:"quantidade",
          description:"Qual é a quantidade?",
          type:Discord.ApplicationCommandOptionType.Number,
          required: true
        },
    ],
    run: async(client,interaction, message, args, ) => {
        if (interaction.user.id !== `${perms.get(`${interaction.user.id}_id`)}`) {
            interaction.reply(`${emoji.nao} | Você não está na lista de pessoas!`)
              .then(replyMessage => {
                setTimeout(() => {
                  replyMessage.delete().catch(console.error);
                }, 5000); 
              });
              return;
          };
          const pessoa = interaction.options.getUser("pessoa");
          const adb = interaction.options.getString("id");
          const quantidade1 = interaction.options.getNumber("quantidade");
          
        if(adb !== `${db.get(`${adb}.idproduto`)}`) return interaction.reply(`${emoji.nao} | Esse ID de produto não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        const quantidade = db.get(`${adb}.conta`).length;

        if(pessoa.id === interaction.user.id) {
            interaction.reply({
                embeds:[
                    new Discord.EmbedBuilder()
                    .setDescription(`Você não pode enviar para si mesmo`)
                ]
            })
        }
        if (quantidade < 1) {
            interaction.reply({
                content:"Este produto está sem stock!",
                ephemeral:true
            })
          } else {
            const a = db.get(`${adb}.conta`);

            const removed = a.splice(0, Number(quantidade1));
            
               pessoa.send({
                content:`${emoji.planet} | Entrega do produto: ${db.get(`${adb}.nome`)} x${quantidade1} Unidade \n${removed.join("\n")}`,
               }).then(() => {
                db.set(`${adb}.conta`, a);
                interaction.reply({
                    content:"Produto enviado com sucesso"
                })
               }).catch(() => {
                interaction.reply({
                    content:"O usuario está com o privado bloqueado!"
                })
               })
          }
         
    
        }}