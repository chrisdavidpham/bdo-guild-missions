import { DiscordClientService } from './services/discord-client-service';
import { CommandName } from './types/command-name';

DiscordClientService.client.on('ready', () => {
    console.log(`Logged in as ${DiscordClientService.client.user?.tag}`);
});

DiscordClientService.client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand() || interaction.channelId != process.env.CHANNEL_ID) {
        return;
    }

    switch(interaction.commandName)
    {
        case CommandName.Help:
            await interaction.reply({
                content: 'I\'m still under development, but you may explore my commands',
                ephemeral: true
            });
            break;
        case CommandName.Mission:
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

DiscordClientService.client.login(process.env.BOT_TOKEN);
try {
    DiscordClientService.setupCommands();
}
catch (error) {
    console.log(error);
}