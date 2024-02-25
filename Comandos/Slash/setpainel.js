const { StringSelectMenuBuilder, EmbedBuilder, ActionRowBuilder } = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const emoji = require("../../databases/myJsonEmojis.json");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const dbcv = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });
const dbp = new JsonDatabase({ databasePath:"./databases/painel.json" });
const Discord = require("discord.js")

module.exports = {
    name: "setpainel",
    description:"「🧶」Exiba um painel",
    type:Discord.ApplicationCommandType.ChatInput, 
    options: [
      {
        name:"id",
        description:"Qual é o id do Painel?",
        type:Discord.ApplicationCommandOptionType.String,
        required: true,
        autocomplete: true,
      },
    ],
    async autocomplete(interaction) {
        const value = interaction.options.getFocused().toLowerCase();
        let choices = dbp.all().filter(pd => pd.data.idpainel)
    
        const filtered = choices.filter(choice => choice.data.idpainel.toLowerCase().includes(value)).slice(0, 25);
    
        if(!interaction) return;
        if(choices.length === 0){ 
            await interaction.respond([
                { name: "Crie um Painel!", value: "a29183912asd92384XASDASDSADASDSADASDASD12398212222" }
            ])
        } else if(filtered.length === 0) {
            await interaction.respond([
                { name: "Não Achei Nenhum Painel", value: "a29183912asd92384XASDASDSADASDSADASDASD1239821" }
            ]);
        } else {
            await interaction.respond(
                filtered.map(choice => ({ name: `ID  - ${choice.data.idpainel} | Titulo - ${choice.data.titulo}`, value: choice.data.idpainel }))
            );
        }
    },  
    run: async(client,interaction,) => {
      const args = [ interaction.options.getString("id") ]
        const id = args[0]
        
        if(interaction.user.id !== `${perms.get(`${interaction.user.id}_id`)}`) return interaction.reply(`${emoji.nao} | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] !== `${dbp.get(`${id}.idpainel`)}`) return interaction.reply(`${emoji.nao} | Esse ID de painel não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));

      if(id === "a29183912asd92384XASDASDSADASDSADASDASD1239821") {
        interaction.reply({
            embeds:[
                new EmbedBuilder()
                .setDescription(`❌ | Não Achei Nenhum Painel com este ID!`)
                .setColor("Red")
            ],
            ephemeral:true
        })
        return;
    }
    if(id === "a29183912asd92384XASDASDSADASDSADASDASD12398212222") {
        interaction.reply({
            embeds:[
                new EmbedBuilder()
                .setDescription(`❌ | Você não criou nenhum Painel!`)
                .setColor("Red")
            ],
            ephemeral:true
        })
        return;
    }

      const embed = new EmbedBuilder()
      .setTitle(`${dbp.get(`${id}.titulo`)}`)
      .setDescription(`${dbp.get(`${id}.desc`)} `);

      const select = new StringSelectMenuBuilder()
      .setCustomId(`${id}`)
      .setPlaceholder("Escolha algum produto")
      .setMaxValues(1)
  
      if(dbp.get(`${id}.miniatura`) !== "Nenhuma") {

        embed.setThumbnail(`${dbp.get(`${id}.miniatura`)}`)

      }

      dbp.get(`${id}.produtos`).map((pd) => {
        const valor = Number(db.get(`${pd}.preco`))
        select.addOptions(
            {
                label:`${db.get(`${pd}.nome`)}`,
                description:`💸| Valor: ${valor.toFixed(2)} - 📦 Estoque: ${db.get(`${pd}.conta`).length}`,
                value:`${db.get(`${pd}.idproduto`)}`,
                emoji:`${dbp.get(`${id}.emoji`)}`
            }
        )
      })



      interaction.channel.send({
        embeds:[
            embed.setColor(dbcv.get(`color`))
            .setImage(`${dbp.get(`${id}.banner`)}`)
        ],
        components:[
            new ActionRowBuilder()
            .addComponents(select)
        ]
      }).then((msg) => {
        interaction.reply({
          content:"Painel Enviado com sucesso!",
          ephemeral:true
        })
        dbp.set(`${id}.idmsg`, msg.id)
        dbp.set(`${id}.idcanal`, interaction.channel.id)
      })



    }}