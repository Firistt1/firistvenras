const Discord = require("discord.js");
const { JsonDatabase } = require("wio.db");
const config = new JsonDatabase({ databasePath: "./config.json" });
const dbcv = new JsonDatabase({ databasePath: "./databases/myJsonBotConfig.json" });
const emoji = require("../../databases/myJsonEmojis.json");

module.exports = {
  name: "help",
  description:"「❓」Exiba meus comandos",
  type:Discord.ApplicationCommandType.ChatInput,
  run: async (client, interaction, message, args) => {
    const embed = new Discord.EmbedBuilder()
      .setColor(dbcv.get(`color`))
      .setTimestamp()
      .setFooter({text:`Pagina Inicial`})
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setImage(dbcv.get(`banner`))
      .setTitle(`${dbcv.get(`title`)}・Comandos`)
      .setDescription(`
      Olá <@${interaction.user.id}>, escolha qual das opções, você deseja ver.
`);

    const rowPublic = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('PUBLICO')
          .setLabel('ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤComandos Geraisㅤㅤㅤㅤㅤㅤㅤㅤㅤ')
          .setEmoji(`${emoji.mundo}`)
          .setStyle(1)
      )
      const rowadm41421 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('ADM')
          .setLabel('ㅤㅤㅤㅤㅤㅤㅤㅤㅤComandos De Staffsㅤㅤㅤㅤㅤㅤㅤㅤㅤ')
          .setEmoji(`${emoji.staff}`)
          .setStyle(1)
      )
      const rowowner41421 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('owner')
          .setLabel('ㅤㅤㅤㅤㅤㅤㅤㅤㅤComandos de donosㅤㅤㅤㅤㅤㅤㅤㅤㅤ')
          .setEmoji(`${emoji.coroa}`)
          .setStyle(1)
      );
      const rowvoltarpubic = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('publicvoltar')
          .setLabel('Voltar')
          .setEmoji(`${emoji.setaEsquerda}`)
          .setStyle(1)
      );
      const rowvoltarpubic2 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('publicvoltar2')
          .setLabel('Voltar')
          .setEmoji(`${emoji.setaEsquerda}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
        .setLabel(`Adquirir um BOT`)
        .setEmoji(`${emoji.bot}`)
        .setStyle(`Link`).setURL(`https://discord.gg/D7VbeUBySX`)
      );
      const rowvoltardono = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('owneretroceder')
          .setLabel('Voltar')
          .setEmoji(`${emoji.setaEsquerda}`)
          .setStyle(1)
      )
      const rowvoltarstaff = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('staffretroceder')
          .setLabel('Voltar')
          .setEmoji(`${emoji.setaEsquerda}`)
          .setStyle(1)
      );
      const rowvoltarstaff2 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('staffvoltar')
          .setLabel('Voltar')
          .setEmoji(`${emoji.setaEsquerda}`)
          .setStyle(1)
      );


    const messageToSend = await interaction.reply({
      embeds: [embed],
      components: [rowPublic, rowadm41421, rowowner41421]
    });
    
    const collector = messageToSend.createMessageComponentCollector({ componentType: Discord.ComponentType.Button });
    const user = interaction.user
    collector.on("collect", async (interaction) => {
      if (user.id !== interaction.user.id) {
        return interaction.reply({
          content: `${emoji.interrogacao} | Oops... Parece que você não foi o autor deste comando, ${interaction.user}. Utilize **/help** para ver os comandos disponíveis!`,
          ephemeral: true
        });
      }
      if (interaction.customId === 'staffretroceder') {
        
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 2/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・Comandos Privados`)
        .setDescription(`
        Olá <@${interaction.user.id}>, escolha qual comando privado, você deseja saber como ele funciona.
`);
const row = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('ids')
    .setLabel('ids')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('moneytop')
    .setLabel('moneytop')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('permlist')
    .setLabel('permlist')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('rankadm')
    .setLabel('rankadm')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
const row2 = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('rankcupom')
    .setLabel('rankcupom')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('rankprodutos')
    .setLabel('rankprodutos')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('rendimentos')
    .setLabel('rendimentos')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
const row3 = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('set')
    .setLabel('set')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('setpainel')
    .setLabel('setpainel')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('stockid')
    .setLabel('stockid')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('taxa')
    .setLabel('taxa')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
const voltar = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('voltar')
    .setLabel('voltar')
    .setEmoji(`${emoji.setaEsquerda}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
  .setLabel(`Adquirir um BOT`)
  .setEmoji(`${emoji.bot}`)
  .setStyle(`Link`).setURL(`https://discord.gg/D7VbeUBySX`)
)

        interaction.update({ embeds: [embed], components: [row, row2, row3, voltar] });
      }
      if (interaction.customId === 'staffvoltar') {
        
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 1/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・Comandos Privados`)
        .setDescription(`
Olá <@${interaction.user.id}>, escolha qual comando privado, você deseja saber como ele funciona.
`);
const row = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('administrarsaldo')
          .setLabel('administrarsaldo')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('admsaldo')
          .setLabel('admsaldo')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('config')
          .setLabel('config')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('configcupom')
          .setLabel('configcupom')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      const row2 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('configpainel')
          .setLabel('configpainel')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('connect')
          .setLabel('connect')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('criarpainel')
          .setLabel('criarpainel')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('criar')
          .setLabel('criar')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('criarcupom')
          .setLabel('criarcupom')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      const row3 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('criargift')
          .setLabel('criargift')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('criarkey')
          .setLabel('criar-key')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('dm')
          .setLabel('dm')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('entregar')
          .setLabel('entregar')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('gerarpix')
          .setLabel('gerarpix')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      const row4 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('voltarstaff')
          .setLabel('Voltar')
          .setEmoji(`${emoji.setaEsquerda}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('ADM2')
          .setLabel('Proxima Página')
          .setEmoji(`${emoji.setaDireita}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
        .setLabel(`Adquirir um BOT`)
        .setEmoji(`${emoji.bot}`)
        .setStyle(`Link`).setURL(`https://discord.gg/D7VbeUBySX`)
      );

        interaction.update({ embeds: [embed], components: [row, row2, row3, row4] });
      }
      if (interaction.customId === 'publicvoltar2') {
        
        const embed = new Discord.EmbedBuilder()
      .setColor(dbcv.get(`color`))
      .setTimestamp()
      .setFooter({text:`Pagina Inicial`})
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setImage(dbcv.get(`banner`))
      .setTitle(`${dbcv.get(`title`)}・Comandos`)
      .setDescription(`
      Olá <@${interaction.user.id}>, escolha qual das opções, você deseja ver.
`);

const rowPublic = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('PUBLICO')
    .setLabel('ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤComandos Geraisㅤㅤㅤㅤㅤㅤㅤㅤㅤ')
    .setEmoji(`${emoji.mundo}`)
    .setStyle(1)
)
const rowadm41421 = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('ADM')
    .setLabel('ㅤㅤㅤㅤㅤㅤㅤㅤㅤComandos De Staffsㅤㅤㅤㅤㅤㅤㅤㅤㅤ')
    .setEmoji(`${emoji.staff}`)
    .setStyle(1)
)
const rowowner41421 = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('owner')
    .setLabel('ㅤㅤㅤㅤㅤㅤㅤㅤㅤComandos de donosㅤㅤㅤㅤㅤㅤㅤㅤㅤ')
    .setEmoji(`${emoji.coroa}`)
    .setStyle(1)
);


      interaction.update({ embeds: [embed], components: [rowPublic, rowadm41421, rowowner41421] });
  }
      if (interaction.customId === 'publicvoltar') {
        
        const embedADM = new Discord.EmbedBuilder()
          .setColor(dbcv.get(`color`))
          .setTimestamp()
          .setFooter({text:`Comandos Públicos`})
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
          .setImage(dbcv.get(`banner`))
          .setTitle(`${dbcv.get(`title`)}・Comandos Publicos`)
          .setDescription(`
          Olá <@${interaction.user.id}>, escolha qual comando públicos, você deseja saber como ele funciona.
`);
const row = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('adicionarsaldo')
          .setLabel('adicionarsaldo')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('cleardm')
          .setLabel('cleardm')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('fechar')
          .setLabel('fechar')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      const row2 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('help')
          .setLabel('help')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('perfil')
          .setLabel('perfil')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('rank')
          .setLabel('rank')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('resgatar')
          .setLabel('resgatar-gift')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )

        interaction.update({ embeds: [embedADM], components: [row, row2, rowvoltarpubic2] });
      }
      if (interaction.customId === 'owneretroceder') {
        
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos dono`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・Owner`)
        .setDescription(`
        Olá <@${interaction.user.id}>, escolha qual comando públicos, você deseja saber como ele funciona.
`);
const row = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('owner2')
    .setLabel('botconfig')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('owner3')
    .setLabel('perms')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('owner4')
    .setLabel('gerenciarvendas')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
const row2 = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('voltarowner')
    .setLabel('Voltar')
    .setEmoji(`${emoji.setaEsquerda}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
  .setLabel(`Adquirir um BOT`)
  .setEmoji(`${emoji.bot}`)
  .setStyle(`Link`).setURL(`https://discord.gg/D7VbeUBySX`)
)
        interaction.update({ embeds: [embed], components: [row, row2] });
      }
      if (interaction.customId === 'owner') {
        
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos dono`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・Owner`)
        .setDescription(`
        Olá <@${interaction.user.id}>, escolha qual comando públicos, você deseja saber como ele funciona.
`);
const row = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('owner2')
    .setLabel('botconfig')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('owner3')
    .setLabel('perms')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('owner4')
    .setLabel('gerenciarvendas')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
const row2 = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('voltarowner')
    .setLabel('Voltar')
    .setEmoji(`${emoji.setaEsquerda}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
  .setLabel(`Adquirir um BOT`)
  .setEmoji(`${emoji.bot}`)
  .setStyle(`Link`).setURL(`https://discord.gg/D7VbeUBySX`)
)
        interaction.update({ embeds: [embed], components: [row, row2] });
}
      if (interaction.customId === 'voltarowner') {
const embed = new Discord.EmbedBuilder()
.setColor(dbcv.get(`color`))
.setTimestamp()
.setFooter({text:`Pagina Inicial`})
.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
.setImage(dbcv.get(`banner`))
.setTitle(`${dbcv.get(`title`)}・Comandos`)
.setDescription(`
Olá <@${interaction.user.id}>, escolha qual das opções, você deseja ver.
`);

const rowPublic = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('PUBLICO')
    .setLabel('ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤComandos Geraisㅤㅤㅤㅤㅤㅤㅤㅤㅤ')
    .setEmoji(`${emoji.mundo}`)
    .setStyle(1)
)
const rowadm41421 = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('ADM')
    .setLabel('ㅤㅤㅤㅤㅤㅤㅤㅤㅤComandos De Staffsㅤㅤㅤㅤㅤㅤㅤㅤㅤ')
    .setEmoji(`${emoji.staff}`)
    .setStyle(1)
)
const rowowner41421 = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('owner')
    .setLabel('ㅤㅤㅤㅤㅤㅤㅤㅤㅤComandos de donosㅤㅤㅤㅤㅤㅤㅤㅤㅤ')
    .setEmoji(`${emoji.coroa}`)
    .setStyle(1)
);


      interaction.update({ embeds: [embed], components: [rowPublic, rowadm41421, rowowner41421] });
  }
      if (interaction.customId === 'owner2') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Owner`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・bot-config`)
        .setDescription(`
        ***O comando __bot-config__, serve para configurar o bot.***
`);     

        interaction.update({ embeds: [embed], components: [rowvoltardono] });
      }
      if (interaction.customId === 'owner3') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Owner`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・Perms`)
        .setDescription(`
      ***O comando __perms__, serve para adiiconar e remover permissões das pessoas.***
      `);
        
      
        interaction.update({ embeds: [embed], components: [rowvoltardono] });
      }
      if (interaction.customId === 'owner4') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Owner`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・gerenciar-vendas`)
        .setDescription(`
        ***O comando __gerenciar-vendas__, serve para você administrar suas vendas.***
`);     

        interaction.update({ embeds: [embed], components: [rowvoltardono] });
      }


      if (interaction.customId === 'PUBLICO') {

        const embedADM = new Discord.EmbedBuilder()
          .setColor(dbcv.get(`color`))
          .setTimestamp()
          .setFooter({text:`Comandos Públicos`})
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
          .setImage(dbcv.get(`banner`))
          .setTitle(`${dbcv.get(`title`)}・Comandos Publicos`)
          .setDescription(`
          Olá <@${interaction.user.id}>, escolha qual comando públicos, você deseja saber como ele funciona.
`);
const row = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('adicionarsaldo')
          .setLabel('adicionarsaldo')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('cleardm')
          .setLabel('cleardm')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('fechar')
          .setLabel('fechar')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('help')
          .setLabel('help')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      const row2 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('perfil')
          .setLabel('perfil')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('rank')
          .setLabel('rank')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('resgatar')
          .setLabel('resgatar-gift')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('resgatarkey')
          .setLabel('resgatar-key')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )

        interaction.update({ embeds: [embedADM], components: [row, row2, rowvoltarpubic2] });
      }
      if (interaction.customId === 'ADMDOIS') {
        
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 2/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・Comandos Privados`)
        .setDescription(`
        Olá <@${interaction.user.id}>, escolha qual comando privado, você deseja saber como ele funciona.
`);
const row = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('ids')
    .setLabel('ids')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('moneytop')
    .setLabel('moneytop')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('permlist')
    .setLabel('permlist')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('rankadm')
    .setLabel('rankadm')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
const row2 = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('rankcupom')
    .setLabel('rankcupom')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('rankprodutos')
    .setLabel('rankprodutos')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('rendimentos')
    .setLabel('rendimentos')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('set')
    .setLabel('set')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('setpainel')
    .setLabel('setpainel')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
const row3 = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('stockid')
    .setLabel('stockid')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('taxa')
    .setLabel('taxa')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
const voltar = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('voltar')
    .setLabel('voltar')
    .setEmoji(`${emoji.setaEsquerda}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
  .setLabel(`Adquirir um BOT`)
  .setEmoji(`${emoji.bot}`)
  .setStyle(`Link`).setURL(`https://discord.gg/D7VbeUBySX`)
)

        interaction.update({ embeds: [embed], components: [row, row2, row3, voltar] });
      }
      if (interaction.customId === 'adicionarsaldo') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Públicos`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・adicionar-saldo`)
        .setDescription(`
***O comando __adicionar-saldo__, serve para comprar saldo.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarpubic] });
      }
      if (interaction.customId === 'cleardm') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Públicos`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・cleardm`)
        .setDescription(`
***O comando __clear-dm__, serve para limpar as mensagem do seu privado com o bot.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarpubic] });
      }
      if (interaction.customId === 'fechar') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Públicos`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・fechar`)
        .setDescription(`
        ***O comando __fechar__, serve para fechar um carrinho.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarpubic]  });
      }
      if (interaction.customId === 'help') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Públicos`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・help`)
        .setDescription(`
        ***O comando __help__, serve para exibir os comandos do bot.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarpubic]  });
      }
      if (interaction.customId === 'perfil') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Públicos`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・perfil`)
        .setDescription(`
        ***O comando __perfil__, serve para ver as informações do seu perfil, ou de outra pessoa.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarpubic]  });
      }
      if (interaction.customId === 'rank') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Públicos`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・rank`)
        .setDescription(`
        ***O comando __rank__, serve para ver as pessoas no rank de clientes.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarpubic]  });
      }
      if (interaction.customId === 'resgatar') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Públicos`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・resgatar`)
        .setDescription(`
        ***O comando __resgatar-gift__, serve para resgatar um gift.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarpubic]  });
      }
      if (interaction.customId === 'resgatarkey') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Públicos`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・resgatar-key`)
        .setDescription(`
        ***O comando __resgatar-key__, serve para resgatar uma key.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarpubic]  });
      }

      if (interaction.customId === 'ADM') {
        
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 1/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・Comandos Privados`)
        .setDescription(`
Olá <@${interaction.user.id}>, escolha qual comando privado, você deseja saber como ele funciona.
`);
const row = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('administrarsaldo')
          .setLabel('administrarsaldo')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('admsaldo')
          .setLabel('admsaldo')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('config')
          .setLabel('config')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('configcupom')
          .setLabel('configcupom')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      const row2 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('configpainel')
          .setLabel('configpainel')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('connect')
          .setLabel('connect')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('criarpainel')
          .setLabel('criarpainel')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('criar')
          .setLabel('criar')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('criarcupom')
          .setLabel('criarcupom')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      const row3 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('criargift')
          .setLabel('criargift')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('criarkey')
          .setLabel('criar-key')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('dm')
          .setLabel('dm')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('entregar')
          .setLabel('entregar')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('gerarpix')
          .setLabel('gerarpix')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      const row4 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('voltarstaff')
          .setLabel('Voltar')
          .setEmoji(`${emoji.setaEsquerda}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('ADM2')
          .setLabel('Proxima Página')
          .setEmoji(`${emoji.setaDireita}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
        .setLabel(`Adquirir um BOT`)
        .setEmoji(`${emoji.bot}`)
        .setStyle(`Link`).setURL(`https://discord.gg/D7VbeUBySX`)
      );

        interaction.update({ embeds: [embed], components: [row, row2, row3, row4] });
      }
      if (interaction.customId === 'voltarstaff') {
        const embed = new Discord.EmbedBuilder()
      .setColor(dbcv.get(`color`))
      .setTimestamp()
      .setFooter({text:`Pagina Inicial`})
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setImage(dbcv.get(`banner`))
      .setTitle(`${dbcv.get(`title`)}・Comandos`)
      .setDescription(`
      Olá <@${interaction.user.id}>, escolha qual das opções, você deseja ver.
`);

    const rowPublic = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('PUBLICO')
    .setLabel('ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤComandos Geraisㅤㅤㅤㅤㅤㅤㅤㅤㅤ')
    .setEmoji(`${emoji.mundo}`)
    .setStyle(1)
)
const rowadm41421 = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('ADM')
    .setLabel('ㅤㅤㅤㅤㅤㅤㅤㅤㅤComandos De Staffsㅤㅤㅤㅤㅤㅤㅤㅤㅤ')
    .setEmoji(`${emoji.staff}`)
    .setStyle(1)
)
const rowowner41421 = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('owner')
    .setLabel('ㅤㅤㅤㅤㅤㅤㅤㅤㅤComandos de donosㅤㅤㅤㅤㅤㅤㅤㅤㅤ')
    .setEmoji(`${emoji.coroa}`)
    .setStyle(1)
);


      interaction.update({ embeds: [embed], components: [rowPublic, rowadm41421, rowowner41421] });
  }
      if (interaction.customId === 'administrarsaldo') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 1/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・administrar-saldo`)
        .setDescription(`
        ***O comando __administrar-saldo__, serve para gerenciar o saldo do usuário.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarstaff2]  });
      }
      if (interaction.customId === 'admsaldo') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 1/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・adm-saldo`)
        .setDescription(`
        ***O comando __adm-saldo__, serve para gerenciar o saldo do usuário.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarstaff2]  });
      }
      if (interaction.customId === 'config') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 1/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・config`)
        .setDescription(`
        ***O comando __config__, serve para configurar um produto.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarstaff2]  });
      }
      if (interaction.customId === 'configcupom') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 1/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・config-cupom`)
        .setDescription(`
        ***O comando __config-cupom__, serve para configurar um cupom.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarstaff2]  });
      }
      if (interaction.customId === 'configpainel') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 1/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・config-painel`)
        .setDescription(`
        ***O comando __config-painel__, serve para configurar um painel.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarstaff2]  });
      }
      if (interaction.customId === 'connect') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 1/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・connect`)
        .setDescription(`
        ***O comando __connect__, serve para o bot conectar em um canal de voz.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarstaff2]  });
      }
      if (interaction.customId === 'criarpainel') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 1/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・criar-painel`)
        .setDescription(`
        ***O comando __criar-painel__, serve para criar um painel.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarstaff2]  });
      }
      if (interaction.customId === 'criar') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 1/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・criar`)
        .setDescription(`
        ***O comando __criar__, serve para criar um produto.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarstaff2]  });
      }
      if (interaction.customId === 'criarcupom') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 1/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・criar-cupom`)
        .setDescription(`
        ***O comando __criar-cupom__, serve para criar um cupom.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarstaff2]  });
      }
      if (interaction.customId === 'criargift') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 1/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・criar-gift`)
        .setDescription(`
        ***O comando __criar-gift__, serve para criar um gift.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarstaff2]  });
      }
      if (interaction.customId === 'criarkey') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 1/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・criar-gift`)
        .setDescription(`
        ***O comando __criar-key__, serve para criar uma key.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarstaff2]  });
      }
      if (interaction.customId === 'dm') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 1/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・dm`)
        .setDescription(`
        ***O comando __dm__, serve para o bot enviar uma mensagem no privado, do usúario selecionado.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarstaff2]  });
      }
      if (interaction.customId === 'entregar') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 1/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・entregar`)
        .setDescription(`
        ***O comando __entregar__, serve para entregar um produto que tem no estoque para alguem.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarstaff2]  });
      }
      if (interaction.customId === 'gerarpix') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 1/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・gerar-pix`)
        .setDescription(`
        ***O comando __gerar-pix__, serve para gerar um pix, para o usúario pagar.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarstaff2]  });
      }
      if (interaction.customId === 'ADM2') {
        
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 2/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・Comandos Privados`)
        .setDescription(`
        Olá <@${interaction.user.id}>, escolha qual comando privado, você deseja saber como ele funciona.
`);
const row = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('ids')
    .setLabel('ids')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('moneytop')
    .setLabel('moneytop')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('permlist')
    .setLabel('permlist')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('rankadm')
    .setLabel('rankadm')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
const row2 = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('rankcupom')
    .setLabel('rankcupom')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('rankprodutos')
    .setLabel('rankprodutos')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('rendimentos')
    .setLabel('rendimentos')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
const row3 = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('set')
    .setLabel('set')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('setpainel')
    .setLabel('setpainel')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('stockid')
    .setLabel('stockid')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('taxa')
    .setLabel('taxa')
    .setEmoji(`${emoji.info2}`)
    .setStyle(1)
)
const voltar = new Discord.ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
    .setCustomId('voltar')
    .setLabel('voltar')
    .setEmoji(`${emoji.setaEsquerda}`)
    .setStyle(1)
)
.addComponents(
  new Discord.ButtonBuilder()
  .setLabel(`Adquirir um BOT`)
  .setEmoji(`${emoji.bot}`)
  .setStyle(`Link`).setURL(`https://discord.gg/D7VbeUBySX`)
)

        interaction.update({ embeds: [embed], components: [row, row2, row3, voltar] });
      }
      if (interaction.customId === 'ids') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 2/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・ids`)
        .setDescription(`
        ***O comando __ids__, serve para você ver os ids dos produtos, cupons, gifts e paineis criados.***
`);
        

        interaction.update({ embeds: [embed], components: [rowvoltarstaff] });
      }
      if (interaction.customId === 'moneytop') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 2/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・moneytop`)
        .setDescription(`
        ***O comando __moneytop__, serve para exibir a lista das 10 pessoas que mais gastaram no servidor, ele fica atualizando constantemente.***
`);

interaction.update({ embeds: [embed], components: [rowvoltarstaff] });
      }
      if (interaction.customId === 'permlist') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 2/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・perm-list`)
        .setDescription(`
        ***O comando __perm-list__, serve para ver as pessoas que tem permissão no bot.***
`);

interaction.update({ embeds: [embed], components: [rowvoltarstaff] });
      }
      if (interaction.customId === 'rankadm') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 2/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・rank-adm`)
        .setDescription(`
        ***O comando __rank-adm__, serve para ver o rank com quanto cada pessoa gastou.***
`);



interaction.update({ embeds: [embed], components: [rowvoltarstaff] });
      }
      if (interaction.customId === 'rankcupom') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 2/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・rank-cupom`)
        .setDescription(`
        ***O comando __rank-cupom__, serve para ver o rank dos cupons.***
`);



interaction.update({ embeds: [embed], components: [rowvoltarstaff] });
      }
      if (interaction.customId === 'rankprodutos') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 2/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・rank-produtos`)
        .setDescription(`
        ***O comando __rank-produtos__, serve para ver o rank dos produtos.***
`);



interaction.update({ embeds: [embed], components: [rowvoltarstaff] });
      }
      if (interaction.customId === 'rendimentos') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 2/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・rendimentos`)
        .setDescription(`
        ***O comando __rendimentos__, serve para ver o rendimentos da sua loja.***
`);



interaction.update({ embeds: [embed], components: [rowvoltarstaff] });
      }
      if (interaction.customId === 'set') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 2/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・set`)
        .setDescription(`
        ***O comando __set__, serve para você setar um produto no canal.***
`);



interaction.update({ embeds: [embed], components: [rowvoltarstaff] });
      }
      if (interaction.customId === 'setpainel') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 2/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・set-painel`)
        .setDescription(`
        ***O comando __set-painel__, serve para você setar um painel no canal.***
`);



interaction.update({ embeds: [embed], components: [rowvoltarstaff] });
      }
      if (interaction.customId === 'stockid') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 2/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・stock-id`)
        .setDescription(`
        ***O comando __stock-id__, serve para você ver o stock de um produto.***
`);



interaction.update({ embeds: [embed], components: [rowvoltarstaff] });
      }
      if (interaction.customId === 'taxa') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 2/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・taxa`)
        .setDescription(`
        ***O comando __taxa__, serve para você ver as taxas do mercado pago.***
`);



interaction.update({ embeds: [embed], components: [rowvoltarstaff] });
      }
      if (interaction.customId === 'voltar') {
        const embed = new Discord.EmbedBuilder()
        .setColor(dbcv.get(`color`))
        .setTimestamp()
        .setFooter({text:`Comandos Privados 1/2`})
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setImage(dbcv.get(`banner`))
        .setTitle(`${dbcv.get(`title`)}・Comandos Privados`)
        .setDescription(`
Olá <@${interaction.user.id}>, escolha qual comando privado, você deseja saber como ele funciona.
`);
const row = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('administrarsaldo')
          .setLabel('administrarsaldo')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('admsaldo')
          .setLabel('admsaldo')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('config')
          .setLabel('config')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('configcupom')
          .setLabel('configcupom')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      const row2 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('configpainel')
          .setLabel('configpainel')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('connect')
          .setLabel('connect')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('criarpainel')
          .setLabel('criarpainel')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('criar')
          .setLabel('criar')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('criarcupom')
          .setLabel('criarcupom')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      const row3 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('criargift')
          .setLabel('criargift')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('dm')
          .setLabel('dm')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('entregar')
          .setLabel('entregar')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('gerarpix')
          .setLabel('gerarpix')
          .setEmoji(`${emoji.info2}`)
          .setStyle(1)
      )
      const row4 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('voltarstaff')
          .setLabel('Voltar')
          .setEmoji(`${emoji.setaEsquerda}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('ADM2')
          .setLabel('Proxima Página')
          .setEmoji(`${emoji.setaDireita}`)
          .setStyle(1)
      )
      .addComponents(
        new Discord.ButtonBuilder()
        .setLabel(`Adquirir um BOT`)
        .setEmoji(`${emoji.bot}`)
        .setStyle(`Link`).setURL(`https://discord.gg/D7VbeUBySX`)
      );

        interaction.update({ embeds: [embed], components: [row, row2, row3, row4] });
      }
    });
  }
};