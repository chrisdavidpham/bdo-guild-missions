import { APIApplicationCommandOptionChoice, RequestData, REST, Routes, SlashCommandBuilder } from 'discord.js';
import { GuildMissionCommand } from './types/guild-mission-command';
import { GuildMissionServer } from './types/guild-mission-server';
import { GuildMissionSize } from './types/guild-mission-size';
import { GuildMissionStatus } from './types/guild-mission-status';

function NewOptionChoice(nameValue: string): APIApplicationCommandOptionChoice<string> {
    return { name: nameValue, value: nameValue } as APIApplicationCommandOptionChoice<string>;
}

function BuildServerOptionChoices(): APIApplicationCommandOptionChoice<string>[] {
    let choices = new Array<APIApplicationCommandOptionChoice<string>>();
    Object.values(GuildMissionServer).forEach(server => choices.push(NewOptionChoice(server)));
    return choices;
}

function BuildServerSizeChoices(): APIApplicationCommandOptionChoice<string>[] {
    let choices = new Array<APIApplicationCommandOptionChoice<string>>();
    Object.values(GuildMissionSize).forEach(server => choices.push(NewOptionChoice(server)));
    return choices;
}

export async function setupCommands() {
    console.log('Setting up commands...');

    const serverChoices = BuildServerOptionChoices();
    const sizeChoices = BuildServerSizeChoices();

    const helpCommand = new SlashCommandBuilder()
        .setName(GuildMissionCommand.Help)
        .setDescription('How to use the guild mission bot');

    const missionCommand = new SlashCommandBuilder()
        .setName(GuildMissionCommand.Mission)
        .setDescription('Start a new guild mission. Example: /start rul1 xl witch')
        .addStringOption(o => o
            .setName('status')
            .setDescription('guild mission status')
            .addChoices(
                NewOptionChoice(GuildMissionStatus.Available),
                NewOptionChoice(GuildMissionStatus.Done),
                NewOptionChoice(GuildMissionStatus.Expired),
                NewOptionChoice(GuildMissionStatus.Forfeit),
                NewOptionChoice(GuildMissionStatus.Ready),
                NewOptionChoice(GuildMissionStatus.Started),
            ))
        .addStringOption(o => o
            .setName('server')
            .setDescription('guild mission server')
            // broken: too many choices
            // .addChoices(...serverChoices))
            .addChoices(
                NewOptionChoice(GuildMissionServer.rul1),
                NewOptionChoice(GuildMissionServer.ser4),
                NewOptionChoice(GuildMissionServer.ser5),
                NewOptionChoice(GuildMissionServer.ser6),
                { name: 'other (more options soon)', value: 'other' },
            ))
        .addStringOption(o => o
            .setName('size')
            .setDescription('guild mission size')
            .addChoices(...sizeChoices))
        .addStringOption(o => o
            .setName('objective')
            .setDescription('guild mission objective')
            .addChoices(
                { name: 'Witch\'s Delicacy', value: 'witch' },
                { name: 'Sea Monster', value: 'smh' },
                { name: 'other (more options soon)', value: 'other' },
            ));
    // const missionCommand = new SlashCommandBuilder()
    //     .setName(GuildMissionCommand.Mission)
    //     .setDescription('Start a new guild mission. Example: /start rul1 xl witch')
    //     .addSubcommand(s => s
    //         .setName('status')
    //         .setDescription('status the guild mission')
    //         .addUserOption(o => o
    //             .setName(GuildMissionStatus.Available)
    //             .setDescription('Mission is available and unaccepted'))
    //         .addUserOption(o => o
    //             .setName(GuildMissionStatus.Started)
    //             .setDescription('Mission is started and in progress'))
    //         .addUserOption(o => o
    //             .setName(GuildMissionStatus.Ready)
    //             .setDescription('Mission is ready to be completed by an officer'))
    //         .addUserOption(o => o
    //             .setName(GuildMissionStatus.Done)
    //             .setDescription('Mission has been completed by an officer'))
    //         .addUserOption(o => o
    //             .setName(GuildMissionStatus.Expired)
    //             .setDescription('Mission has expired because it was not completed in time'))
    //         .addUserOption(o => o
    //             .setName(GuildMissionStatus.Forfeit)
    //             .setDescription('Mission has expired because it was not completed in time'))
    //     )
    //     .addSubcommand(s => s
    //         .setName('server')
    //         .setDescription('Server of the guild mission')
    //         .addUserOption(o => o
    //             .setName('rul1')
    //             .setDescription(GuildMissionServers.rul1))
    //         .addUserOption(o => o
    //             .setName('ser4')
    //             .setDescription(GuildMissionServers.ser4))
    //         .addUserOption(o => o
    //             .setName('ser5')
    //             .setDescription(GuildMissionServers.ser5))
    //         .addUserOption(o => o
    //             .setName('ser6')
    //             .setDescription(GuildMissionServers.ser6))
    //         .addUserOption(o => o
    //             .setName('other')
    //             .setDescription('more options coming soon'))
    //     )
    //     .addSubcommand(s => s
    //         .setName('size')
    //         .setDescription('Size of the mission')
    //         .addUserOption(o => o
    //             .setName(GuildMissionSize.ExtraLarge)
    //             .setDescription(GuildMissionSize.ExtraLarge))
    //         .addUserOption(o => o
    //             .setName(GuildMissionSize.Large)
    //             .setDescription(GuildMissionSize.Large))
    //         .addUserOption(o => o
    //             .setName(GuildMissionSize.Medium)
    //             .setDescription(GuildMissionSize.Medium))
    //         .addUserOption(o => o
    //             .setName(GuildMissionSize.Small)
    //             .setDescription(GuildMissionSize.Small))
    //     )
    //     .addSubcommand(s => s
    //         .setName('objective')
    //         .setDescription('Objective of the mission')
    //         .addUserOption(o => o
    //             .setName('witch')
    //             .setDescription('Produce Witch\'s Delicacy'))
    //         .addUserOption(o => o
    //             .setName('other')
    //             .setDescription('more missions coming soon'))
    //     );

    const GuildMissionCommandData = [
        helpCommand,
        missionCommand,
    ];

    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN as string);
    const commandsRoute = Routes.applicationGuildCommands(process.env.CLIENT_ID as string, process.env.GUILD_ID as string);
    const commandsRequest = { body: GuildMissionCommandData } as RequestData;

    rest.put(commandsRoute, commandsRequest)
        .then(() => console.log('Successfully reloaded commands.'))
        .catch(console.error);
}

export async function GetStatus() {

}