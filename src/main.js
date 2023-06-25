import { setupCommands } from 'bot-commands.js';
const { Client, Intents } = require('Discord.js');
const discordClient = new  Client({ intents: Intents.FLAGS.GUILDS });

setupCommands();

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
