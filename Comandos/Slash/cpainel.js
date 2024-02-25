const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const emoji = require("../../databases/myJsonEmojis.json");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });
const dbp = new JsonDatabase({ databasePath:"./databases/painel.json" });
const Discord = require("discord.js")

module.exports = {
    name: "criar-painel",
    description:"「💫」Crie um painel",
    type:Discord.ApplicationCommandType.ChatInput,
    options: [
      {
        name:"id-painel",
        description:"Qual será o id do painel?",
        type:Discord.ApplicationCommandOptionType.String,
        required: true
      },
      {
        name:"id-produto",
        description:"Coloque o id de algum produto existente!",
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
    run: async(client, interaction, message) => {
      const args = [interaction.options.getString("id-painel"), interaction.options.getString("id-produto")]
        const id1 = args[0]
        const id2 = args[1];


        
        if(interaction.user.id !== `${perms.get(`${interaction.user.id}_id`)}`) return interaction.reply(`${emoji.nao} | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1] !== `${db.get(`${id2}.idproduto`)}`) return interaction.reply(`${emoji.nao} | Esse ID de produto não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] === `${dbp.get(`${id1}.idpainel`)}`) return interaction.reply(`${emoji.nao} | Esse ID de produto já é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));

      if(id2 === "a29183912asd92384XASDASDSADASDSADASDASD1239821") {
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
    if(id2=== "a29183912asd92384XASDASDSADASDSADASDASD12398212222") {
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

const valor =Number(db.get(`${id2}.preco`))
      interaction.channel.send({
        embeds:[
            new EmbedBuilder()
            .setTitle(`${dbcv.get(`title`)} | Painel`)
            .setColor(dbcv.get(`color`))
            .setDescription(`Sem Descrição`)      
            .setImage(dbcv.get(`banner`))
        ],
        components:[
            new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId(`${id1}`)
                .addOptions(
                    {
                        label:`${db.get(`${id2}.nome`)}`,
                        description:`💸| Valor: ${valor.toFixed(2)} - 📦 Estoque: ${db.get(`${id2}.conta`).length}`,
                        value:`${db.get(`${id2}.idproduto`)}`,
                        emoji:"🛒"
                    }
                )
                .setPlaceholder(`Escolha algum dos produtos abaixo`)

            )
        ]
      }).then(()=> {
        interaction.reply({
          content:"Painel Criado com Sucesso!",
          ephemeral:true
        })
      })


      dbp.set(`${id1}`, {
        idpainel: `${id1}`,
        banner:`${dbcv.get(`banner`)}`,
        miniatura:`Nenhuma`,
        titulo:`${dbcv.get(`title`)} | Painel`,
        produtos:[
            `${id2}`
        ],
        desc:"Sem Descrição",
        emoji:"🛒"

      })

    }
}