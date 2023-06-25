import { REST, Routes } from 'discord.js';

export async function setupCommands() {
    const commands = [{
        name: 'help',
        description: 'Displays commands and usage'
    }];
    console.log('Setting up application (/) commands.')
    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN as string);

    rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID as string, process.env.GUILD_ID as string), { body: commands })
        .then(() => console.log('Successfully reloaded application (/) commands.'))
        .catch(console.error);
}