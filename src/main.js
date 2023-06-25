// import { setupCommands } from 'bot-commands.js';
const { Client, Intents } = require('Discord.js');
const discordClient = new  Client({ intents: Intents.FLAGS.GUILDS });

// setupCommands();
const commands = [{
    name: 'help',
    description: 'Displays commands and usage'
}];

const rest = new REST({ version: '9' }).setToken('token');

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

discordClient.on('ready', () => {
    console.log(`Logged in as ${discordClient.user.tag}`);
});

discordClient.on('interactionCreate', async interaction => {
    if (!interaction.isCommand() || interaction.channelId != process.env.CHANNEL_ID) {
        return;
    }

    switch(interaction.commandName)
    {
        case 'help':
            await interaction.reply('I am currently nonfunctional and still under development!');
        default:
            break;
    }
});

discordClient.login(process.env.BOT_TOKEN);
