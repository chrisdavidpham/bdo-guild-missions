import { Interaction, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('missions')
        .setDescription('Gets missions and requests'),
    async execute(interaction: Interaction<CacheType>) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        // interaction.options
        // interaction.options.data
        await interaction.reply({
            content: `Thanks ${interaction.member.name}, but I'm still in development`,
            ephemeral: true
        });
    }
};
