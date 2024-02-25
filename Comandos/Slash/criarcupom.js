const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonCupons.json" });
const emoji = require("../../databases/myJsonEmojis.json");

module.exports = {
    name: "criarcupom", 
    description:"「💥」Crie um cupom",
    type:Discord.ApplicationCommandType.ChatInput,
    options: [
      {
        name:"id",
        description:"Qual será o id do produto?",
        type:Discord.ApplicationCommandOptionType.String,
        required: true
      }
    ],
    run: async(client, interaction) => {
      const args = [interaction.options.getString("id")]
      if (interaction.user.id !== `${perms.get(`${interaction.user.id}_id`)}`) {
        interaction.reply(`${emoji.nao} | Você não está na lista de pessoas!`)
          .then(replyMessage => {
            setTimeout(() => {
              replyMessage.delete().catch(console.error);
            }, 5000);
          });
          return;
      }
      if(args[0] === `${db.get(`${args[0]}.idcupom`)}`) return interaction.reply(`❌・Esse ID de cupom já é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));

      interaction.reply(`${emoji.sim} | Criado com sucesso!`)
  .then((replyMessage) => {
    setTimeout(() => {
      replyMessage.delete().catch(console.error);
    }, 5000);
  });

      const idcupom = args[0]
        db.set(`${idcupom}.idcupom`, `${idcupom}`)
        db.set(`${idcupom}.quantidade`, `0`)
        db.set(`${idcupom}.minimo`, `20`)
        db.set(`${idcupom}.desconto`, `50`)
       }
     }