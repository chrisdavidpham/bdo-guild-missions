import { Client, GatewayIntentBits, RequestData, Routes } from "discord.js";
import { GuildMissionCommandBuilder } from "../builders/guild-mission-command-builder";

export namespace DiscordClientService {
    export const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
        ]
    });

    export async function setupCommands() {
        console.log('Setting up commands...');

        const GuildMissionCommandData = GuildMissionCommandBuilder.BuildAllCommands();
        const commandsRoute = Routes.applicationGuildCommands(process.env.CLIENT_ID as string, process.env.GUILD_ID as string);
        const commandsRequest = { body: GuildMissionCommandData } as RequestData;

        client.rest.put(commandsRoute, commandsRequest)
            .then(() => console.log('Successfully reloaded commands.'))
            .catch(console.error);
    }
}