const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const emoji = require("../../databases/myJsonEmojis.json");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });
const db1 = new JsonDatabase({ databasePath:"./databases/personalizar.json" });

module.exports = {
    name: "set", 
    description:"「🧶」Exiba um produto",
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
    run: async(client,interaction,) => {
      const args = [ interaction.options.getString("id") ]
      if(interaction.user.id !== `${perms.get(`${interaction.user.id}_id`)}`) return interaction.reply(`${emoji.nao} | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] !== `${db.get(`${args[0]}.idproduto`)}`) return interaction.reply(`${emoji.nao} | Esse ID de produto não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      
      
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

      const row = new Discord.ActionRowBuilder()               
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId(args[0])
          .setLabel(`${db1.get(`button.text`)}`)
          .setEmoji(`${db1.get(`button.emoji`)}`)
          .setStyle(db1.get(`button.style`)),
    )
    let titulo = `${db1.get(`titulo`)}`;
    titulo = titulo.replace(`#{nome}`, `${db.get(`${args[0]}.nome`)}`);
    titulo = titulo.replace(`#{preco}`, `${db.get(`${args[0]}.preco`,).toLocaleString()}`);
    titulo = titulo.replace(`#{estoque}`, `${db.get(`${args[0]}.conta`).length}`);
    let desc = `${db1.get(`desc`)}`;
    desc = desc.replace(`#{desc}`, `${db.get(`${args[0]}.desc`)}`);
    desc = desc.replace(`#{nome}`, `${db.get(`${args[0]}.nome`)}`);
    desc = desc.replace(`#{preco}`, `${db.get(`${args[0]}.preco`,).toLocaleString()}`);
    desc = desc.replace(`#{estoque}`, `${db.get(`${args[0]}.conta`).length}`);
    
    const embed = new Discord.EmbedBuilder()
      .setTitle(titulo)
      .setColor(dbcv.get(`color`))
      .setThumbnail(db.get(`${args[0]}.foto`))
      .setDescription(`${desc}`)
      .setImage(db.get(`${args[0]}.banner`))
      if(db1.get(`rodape`) !== "remover") {
        embed.setFooter({text:`${db1.get(`rodape`)}`})
      }
        
      interaction.channel.send({embeds: [embed], components: [row]}).then((msg) => {
        interaction.reply({
          content:"Painel Enviado com sucesso",
          ephemeral:true
        })
        db.set(`${args[0]}.idmsg`, msg.id)
        db.set(`${args[0]}.idcanal`, interaction.channel.id)
       
      })
    }
    
}