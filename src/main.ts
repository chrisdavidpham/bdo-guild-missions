import { setupCommands } from './commands';
import { Client, GatewayIntentBits, Guild } from 'discord.js';
import { GuildMissionCommand } from './types/guild-mission-command';

const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

setupCommands();

discordClient.on('ready', () => {
    console.log(`Logged in as ${discordClient.user?.tag}`);
});

discordClient.on('interactionCreate', async interaction => {
    if (!interaction.isCommand() || interaction.channelId != process.env.CHANNEL_ID) {
        return;
    }

    switch(interaction.commandName)
    {
        case GuildMissionCommand.Help:
            await interaction.reply({
                content: 'I\'m still under development, but you can can start playing with /mission',
                ephemeral: true
            });
            break;
        case GuildMissionCommand.Mission:
            console.log('command options type: ' + typeof interaction.options);
            console.log('options: ' + interaction.options);
            console.log('options.data: ' + interaction.options.data);
            await interaction.reply({
                content: 'I received your request and options, but I\'m still under development and don\'t know what to do next!',
                ephemeral: true
            });
            break;
        default:
            console.log(`Invalid command: ${interaction.commandName}`);
            await interaction.reply({
                content: '??? - I don\'t recognize that command.',
                ephemeral: true
            });
            break;
    }
});

discordClient.login(process.env.BOT_TOKEN);
