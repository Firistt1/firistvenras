const { joinVoiceChannel } = require("@discordjs/voice")
const { ApplicationCommandType, ApplicationCommandOptionType, ChannelType} = require("discord.js")

module.exports = {
    name:"connect",
    description:"「🔊」Conecte o bot em uma chamada",
    type:ApplicationCommandType.ChatInput,
    options: [
        {
            name:"canal",
            description:"Qual será a call?",
            type: ApplicationCommandOptionType.Channel,
            channelTypes: [
                ChannelType.GuildVoice,
            ],
            required:true
        }
    ],
    run: async (client, interaction) => {
        const canal = interaction.options.getChannel("canal")

        joinVoiceChannel({
            channelId: canal.id,
            guildId: canal.guild.id,
            adapterCreator: canal.guild.voiceAdapterCreator,
            selfDeaf: false,
            selfMute: true,
        })

        interaction.reply({
            content:`Connectado no canal: ${canal.url}`,
            ephemeral:true
        })

    }
}