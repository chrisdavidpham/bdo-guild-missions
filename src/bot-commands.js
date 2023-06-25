const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

export function setupCommands() {
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
}