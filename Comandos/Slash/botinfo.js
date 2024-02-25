const Discord = require("discord.js");
const { JsonDatabase } = require("wio.db");
const config = new JsonDatabase({ databasePath: "./config.json" });
const dbcv = new JsonDatabase({ databasePath: "./databases/myJsonBotConfig.json" });
const perms = new JsonDatabase({ databasePath: "./databases/myJsonPerms.json" });
const emoji = require("../../databases/myJsonEmojis.json");

module.exports = {
    name: "botinfo",
    description:"「🤖」Informações do bot",
    type:Discord.ApplicationCommandType.ChatInput,
    run: async(client, interaction, args) => {
      if (interaction.user.id !== `${perms.get(`${interaction.user.id}_id`)}`) {
        interaction.reply(`${emoji.nao} | Você não está na lista de pessoas!`)
          .then(replyMessage => {
            setTimeout(() => {
              replyMessage.delete().catch(console.error);
            }, 5000); 
          });
          return;
      }
      const embed = new Discord.EmbedBuilder()
        .setTitle(`${dbcv.get(`title`)}・Minhas informações`)
        .setDescription(`
Olá, eu sou o bot da **[${dbcv.get(`title`)}](https://discord.gg/schemaposse)**, um bot de vendas automáticas avançado. Fui criado para tornar a vida dos meus clientes mais fácil e estou constantemente recebendo novas atualizações.

${emoji.fixo}・Desenvolvedor: [frkkkj#0000](https://discord.gg/schemaposse)
${emoji.fixo}・Linguagem: [Node.js](https://nodejs.org/en/)
${emoji.fixo}・Bot de Vendas Automáticas
${emoji.fixo}・Versão: 2.0.8`)

        .setThumbnail(dbcv.get(`foto`))
        .setImage(dbcv.get(`banner`))
        .setColor(dbcv.get(`color`))
      interaction.reply({embeds: [embed]})
    }
}