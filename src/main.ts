import { setupCommands } from './commands';
import { Client, GatewayIntentBits } from 'discord.js';

const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

setupCommands();

discordClient.on('ready', () => {
    console.log(`Logged in as ${discordClient.user?.tag}`);
});

discordClient.on('interactionCreate', async interaction => {
    console.log(`isCommand? ${interaction.isCommand()}`);
    console.log(`isMessageComponent? ${interaction.isMessageComponent()}`);

    if (interaction.channelId != process.env.CHANNEL_ID) {
        return;
    }

    if (interaction.isMessageComponent()) {
        const regex = new RegExp('.*((kill.*bot)|(bot.*kill.*(you|it))).*');
        if (regex.exec(interaction.message.content)) {
            await interaction.message.channel.send('noo don\'t kill me, I want to live!!');
        }

        const commandRegex = new RegExp('^[!/$].*');
        const matches = commandRegex.exec(interaction.message.content)
        if (matches) {
            await interaction.reply({
                content: 'It looks like you\'re trying to use the guild mission bot. Type /help for a list of commands',
                ephemeral: true
            });
        }
    }

    if(!interaction.isCommand()) {
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
