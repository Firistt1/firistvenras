const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const emoji = require("../../databases/myJsonEmojis.json");
const config = new JsonDatabase({ databasePath:"./config.json" });
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db7 = new JsonDatabase({ databasePath:"./databases/myJsonRankProdutos.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });

module.exports = {
    name: "criar", 
    description:"「💥」Crie um produto",
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
      if(args[0] === `${db.get(`${args[0]}.idproduto`)}`) return interaction.reply(`${emoji.nao} | Esse ID de produto já é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      
      
      const row = new Discord.ActionRowBuilder()               
        .addComponents(
          new Discord.ButtonBuilder()
            .setCustomId(args[0])
            .setLabel('Adicionar ao Carrinho')
            .setEmoji(`${emoji.carrinho}`)
            .setStyle(4),
      );
       
      const adici = new Discord.EmbedBuilder()
        .setTitle(`${dbcv.get(`title`)} | Produto`)
        .setColor(dbcv.get(`color`))
        .setDescription(`\`\`\`Sem descrição ainda...\`\`\`\n**${emoji.planet} | Nome:** __Sem nome ainda...__\n**${emoji.dinheiro} | Preço:** __5__\n**${emoji.caixa} | Estoque:** __0__`)
        .setColor(dbcv.get(`color`))
        
      interaction.channel.send({embeds: [adici], components: [row]}).then(msg => {

        interaction.reply({
          content:"Produto Criado com sucesso!",
          ephemeral:true
        })
        
      const idproduto = args[0]
        db.set(`${idproduto}.idproduto`, `${idproduto}`)
        db.set(`${idproduto}.nome`, `Sem nome ainda...`) 
        db.set(`${idproduto}.desc`, `Sem descrição ainda...`) 
        db.set(`${idproduto}.preco`, `5`) 
        db.set(`${idproduto}.idmsg`, msg.id)
        db.set(`${idproduto}.idcanal`, interaction.channel.id)  
        db.set(`${idproduto}.minimo`, `1`)  
        db.push(`${idproduto}.conta`, `${idproduto}`)
        const a = db.get(`${idproduto}.conta`);
        const removed = a.splice(0, 1);
        db.set(`${idproduto}.conta`, a);
        
        })
       }
     }