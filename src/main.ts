const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, GatewayIntentBits } = require('discord.js');
const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

function setupCommands() {
    const commands = [{
        name: 'help',
        description: 'Displays commands and usage'
    }];

    const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                { body: commands }
            );
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}

setupCommands();

discordClient.on('ready', () => {
    console.log(`Logged in as ${discordClient.user.tag}`);
});

discordClient.on('messageCreate', async message => {
    if (message.channelId == process.env.CHANNEL_ID) {
        const regex = new RegExp('.*((kill.*bot)|(bot.*kill.*(you|it))).*');
        if (regex.exec(message.content)) {
            const channel = await discordClient.channels.fetch(process.env.CHANNEL_ID);
            channel.send('noo don\'t kill me, I want to live!!');
        }

        const commandRegex = new RegExp('^[!/$].*');
        const matches = commandRegex.exec(message.content)
        if (matches) {
            await message.reply({
                content: 'It looks like you\'re trying to use the guild mission bot. Type /help for a list of commands',
                ephemeral: true
            });
        }
    }
});

discordClient.on('interactionCreate', async interaction => {
    if (!interaction.isCommand() || interaction.channelId != process.env.CHANNEL_ID) {
        return;
    }

    switch(interaction.commandName)
    {
        case 'help':
            await interaction.reply({
                content: 'I\'m still under development!',
                ephemeral: true
            });
        default:
            break;
    }
});

discordClient.login(process.env.BOT_TOKEN);
