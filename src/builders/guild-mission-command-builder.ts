import { SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js';
import { BdoServerGroupName } from '../types/bdo-server-group-name';
import { MissionSize } from '../types/mission-size';
import { MissionStatus } from '../types/mission-status';

export abstract class GuildMissionCommandBuilder {
    public static BuildCommands() {
        return new Array<SlashCommandBuilder>(
            this.BuildMissionsCommand(),
            this.BuildMissionCommand()
        )
    }

    public static BuildMissionsCommand(): SlashCommandBuilder {
        return new SlashCommandBuilder()
            .setName('missions')
            .setDescription('Show all missions and requests')
    }

    public static BuildMissionCommand(): SlashCommandSubcommandsOnlyBuilder {
        const missionCommand = new SlashCommandBuilder()
            .setName('mission')
            .setDescription('Request, get, or update guild missions')
            .addSubcommand(requestCommand => requestCommand
                .setName('request')
                .setDescription('Add a mission to the list of requests')
                .addStringOption(objectiveOption => objectiveOption
                    .setName('objective')
                    .setDescription('Mission objective')
                    .setMaxLength(64)
                    .setRequired(true))
                .addIntegerOption(expireHoursOption => expireHoursOption
                    .setName('timeToLiveHours')
                    .setDescription('How many hours should the mission stay on the request list?')
                    .setRequired(true)
                    .setMinValue(1)
                    .setMaxValue(24))
                .addStringOption(sizeOption => sizeOption
                    .setName('size')
                    .setDescription('Mission size')
                    .setRequired(true)
                    .setChoices(...Object.values(MissionSize).map(s => { return { name: s, value: s } })))
            )
            .addSubcommand(updateCommand => updateCommand
                .setName('update')
                .setDescription('Update the status of a mission')
                .addStringOption(missionStatus => missionStatus
                    .setName('status')
                    .setDescription('Mission status')
                    .setRequired(true)
                    .setChoices(...Object.values(MissionStatus).map(s => { return { name: s, value: s } })))
            )
            .addSubcommand(startCommand => startCommand
                .addStringOption(serverGroupOption => serverGroupOption
                    .setName('serverGroup')
                    .setDescription('Server group')
                    .setRequired(true)
                    .setChoices(...Object.values(BdoServerGroupName).map(s => { return { name: s, value: s } })))
                .addIntegerOption(serverNumberOption => serverNumberOption
                    .setName('serverNumber')
                    .setDescription('Server number (1-6)')
                    .setRequired(true))
                .addStringOption(sizeOption => sizeOption
                    .setName('size')
                    .setDescription('Mission size')
                    .setRequired(true)
                    .setChoices(...Object.values(MissionSize).map(s => { return { name: s, value: s } })))
            );

        return missionCommand;
    }

    private readonly serverSizeOption = Object.values(MissionSize).map(s => { return { name: s, value: s } };
}