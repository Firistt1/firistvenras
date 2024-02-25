const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const db7 = new JsonDatabase({ databasePath:"./databases/myJsonRankProdutos.json" });
const emoji = require("../../databases/myJsonEmojis.json");
const fs = require('fs');

module.exports = {
  name: "stockid",
  description:"「📦」Veja o stock de um produto",
  type:Discord.ApplicationCommandType.ChatInput, 
    options: [
      {
        name:"id",
        description:"Qual é o id do produto?",
        type:Discord.ApplicationCommandOptionType.String,
        required: true,
        autocomplete: true,
      },
    ],
    async autocomplete(interaction) {
      const value = interaction.options.getFocused().toLowerCase();
      let choices = db.all().filter(pd => pd.data.idproduto)
  
      const filtered = choices.filter(choice => choice.data.idproduto.toLowerCase().includes(value)).slice(0, 25);
  
      if(!interaction) return;
      if(choices.length === 0){ 
          await interaction.respond([
              { name: "Crie um produto!", value: "a29183912asd92384XASDASDSADASDSADASDASD12398212222" }
          ])
      } else if(filtered.length === 0) {
          await interaction.respond([
              { name: "Não Achei Nenhum produto", value: "a29183912asd92384XASDASDSADASDSADASDASD1239821" }
          ]);
      } else {
          await interaction.respond(
              filtered.map(choice => ({name: `ID  - ${choice.data.idproduto} | Nome -  ${choice.data.nome}`, value: choice.data.idproduto}))
          );
      }
  },  
  run: async(client,  interaction) => {
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
     if(args[0] !== `${db.get(`${args[0]}.idproduto`)}`) return interaction.reply(`${emoji.nao} | Este ID de produto não existe.`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      
     if(args[0] === "a29183912asd92384XASDASDSADASDSADASDASD1239821") {
      interaction.reply({
          embeds:[
              new EmbedBuilder()
              .setDescription(`❌ | Não Achei Nenhum produto com este nome!`)
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
              .setDescription(`❌ | Você não criou nenhum produto!`)
              .setColor("Red")
          ],
          ephemeral:true
      })
      return;
  }
      const produto = args[0];
      
      var quantia = 1;
      var contas = `${db.get(`${produto}.conta`)}`.split(',');
      var backup = `📦 | ${contas.join(`\n📦 | `)}`
      const pasta = `stock_${produto}.txt`;
      fs.writeFile(`stock_${produto}.txt`, `📦 | Seu Estoque:\n${backup}`, (err) => {
       if (err) throw err;
       console.log(`Arquivo de Estoque ${produto} criado!`);
             });
       const embed = new Discord.EmbedBuilder()
       .setTitle(`Mostrando estoque de: ${produto}`)
       .setDescription(`\`\`Estoque no arquivo txt.\`\``)
       .setColor(dbcv.get(`color`))
       .setFooter({ text: `${dbcv.get(`title`)} - Todos os direitos reservados.`, iconURL: interaction.user.avatarURL({ dynamic: true })})
        interaction.reply({ files: [pasta], embeds: [embed], ephemeral: true })
        
        setTimeout(() => {
          fs.unlink(pasta, (err) => {
            if (err) {
              console.error(`Erro ao apagar o arquivo: ${err}`);
              return;
            }
            console.log(`Arquivo foi apagado com sucesso.`);
          });
        }, 5000)
        }
  }