const Discord = require("discord.js");
const { TextInputStyle, InteractionType, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder } = require(`discord.js`);
const { JsonDatabase } = require("wio.db");
const dbe = new JsonDatabase({ databasePath: "./jsons/emojis.json" });

module.exports = {
  name: 'modais_g',
  run: async (interacao, mensagem, cliente) => {
    var emojis = '';
    dbe.all().map((entrada, indice) => {
      emojis += `${indice + 1} - ${entrada.data}\n`;
    });

    function puxarEmbed() {
      const embedNovo = new EmbedBuilder()
        .setTitle(`${interacao.guild.name} - Configuração dos emojis`)
        .setDescription(`Selecione abaixo qual opção deseja alterar em seus emojis. É importante que você preste atenção nas configurações atuais para garantir que suas alterações sejam feitas corretamente.\n\n${emojis}`)
        .setColor('#2b2d31');

      const linhaAcao = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Editar Emoji')
            .setStyle(2)
            .setCustomId(`editemoji_${interacao.user.id}`)
            .setEmoji('✏️')
        )
        .addComponents(
          new ButtonBuilder()
            .setLabel('Voltar')
            .setStyle(2)
            .setCustomId(`voltar100_${interacao.user.id}`)
            .setEmoji('<:voltarkauan:1166097952394186792>')
        );

      interacao.message.edit({ embeds: [embedNovo], components: [linhaAcao] });
    }

    function Voltar100() {
      const volta100 = new EmbedBuilder()
        .setTitle(`Moderação | Personalizar`)
        .setDescription(`Clique no que você deseja personalizar:`)
        .setFooter({ text: `${interacao.guild.name} - Todos os direitos reservados` });

      const voltar100 = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Alterar Emojis Padrão')
            .setCustomId(`altemojis_${interacao.user.id}`)
            .setEmoji('<:config:1168638169999220860>')
            .setStyle(1)
        );

      interacao.message.edit({ embeds: [volta100], components: [voltar100] });
    }

    if (interacao.isButton()) {
      if (interacao.customId.startsWith("altemojis_")) {
        const id = interacao.customId.slice(interacao.customId.indexOf('_')).replace('_', '');
        interacao.deferUpdate();
        if (interacao.user.id !== id) return;
        puxarEmbed();
      } else if (interacao.customId.startsWith('editemoji_')) {
        const id = interacao.customId.slice(interacao.customId.indexOf('_')).replace('_', '');
        if (interacao.user.id !== id) return;
        const modal = new ModalBuilder()
          .setCustomId(`EditarEmoji`)
          .setTitle(`✏️ Editar Emoji`);

        const Emoji = new TextInputBuilder()
          .setCustomId(`Emoji`)
          .setLabel(`QUAL ID DO EMOJI?`)
          .setPlaceholder(`Ex: 1`)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setMaxLength(2);

        const PrimeiraLinhaAcao = new ActionRowBuilder().addComponents(Emoji);

        modal.addComponents(PrimeiraLinhaAcao);

        await interacao.showModal(modal);
      } else if (interacao.customId.startsWith('voltar100_')) {
        interacao.deferUpdate();
        const id = interacao.customId.slice(interacao.customId.indexOf('_')).replace('_', '');
        if (interacao.user.id !== id) return;
        Voltar100();
      }
    }

    if (interacao.isModalSubmit()) {
      if (interacao.customId === 'EditarEmoji') {
        interacao.deferUpdate();
        const novo = interacao.fields.getTextInputValue('Emoji');
        const emojiantigo = `${dbe.get(`${novo}`)}`;
        const embedOriginal3 = new EmbedBuilder()
          .setTitle(`Moderação | Configurações Emojis`)
          .setDescription(`${dbe.get(`25`)} | Envie abaixo o emoji que deseja substituir o emoji ${emojiantigo} (\`${novo}\`), lembrando o BOT precisa estar no Discord na qual este emoji vai estar.`)
          .setColor("#2b2d31");

        interacao.message.edit({ embeds: [embedOriginal3], components: [] }).then(msg => {
          const filtroColecao = resposta => {
            return resposta.author.id === interacao.user.id;
          };

          interacao.channel.awaitMessages({ filter: filtroColecao, max: 1, time: 300000, errors: ['time'] })
            .then(async coletado => {
              const novoDado = coletado.first();
              novoDado.delete();

              if (dbe.has(novo)) {
                dbe.set(`${novo}`, novoDado.content);
                const embedNovo = new EmbedBuilder()
                  .setTitle(`${interacao.guild.name} - Configuração dos emojis`)
                  .setDescription(`${dbe.get(`1`)} Você alterou o emoji ${emojiantigo} pelo emoji ${novoDado}.\n\nSelecione abaixo qual opção deseja alterar em seus emojis. É importante que você preste atenção nas configurações atuais para garantir que suas alterações sejam feitas corretamente.\n\n${emojis}`)
                  .setColor('#2b2d31');

                const linhaAcaoNova = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setLabel('Editar Emoji')
                      .setStyle(2)
                      .setCustomId(`editemoji_${interacao.user.id}`)
                      .setEmoji('✏️')
                  )
                  .addComponents(
                    new ButtonBuilder()
                      .setLabel('Voltar')
                      .setStyle(2)
                      .setCustomId(`voltar100_${interacao.user.id}`)
                      .setEmoji('<:voltarkauan:1166097952394186792>')
                  );

                interacao.message.edit({ embeds: [embedNovo], components: [linhaAcaoNova] });
              } else {
                puxarEmbed();
                interacao.channel.send(`${dbe.get(`2`)} | O id do emoji \`${novo}\`, não foi encontrado na base de dados.`);
              }
            });
        });
      }
    }
  }
}
