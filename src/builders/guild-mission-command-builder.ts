import { APIApplicationCommandOptionChoice, SlashCommandBuilder, SlashCommandStringOption } from 'discord.js';
import { BdoServerName } from '../types/bdo-server-name';
import { GuildMissionCommand } from '../types/guild-mission-command';
import { GuildMissionObjective } from '../types/guild-mission-objective';
import { GuildMissionSize } from '../types/guild-mission-size';
import { GuildMissionStatus } from '../types/guild-mission-status';

export abstract class GuildMissionCommandBuilder {
    public static BuildAllCommands(): SlashCommandBuilder[] {
        const missionCommand = this.BuildMissionCommand();
        const helpCommand = this.BuildHelpCommand();
        return new Array<SlashCommandBuilder>(missionCommand, helpCommand);
    }

    private static BuildHelpCommand(): SlashCommandBuilder {
        return new SlashCommandBuilder()
            .setName(GuildMissionCommand.Help)
            .setDescription('How to use the guild mission bot');
    }

    private static BuildRequestCommand(): SlashCommandBuilder {
        return new SlashCommandBuilder()
            .setName(GuildMissionCommand.Request)
            .setDescription('Request a guild mission');
    }

    private static BuildMissionCommand(): SlashCommandBuilder {
        const serverNames = new Array<string>(
            BdoServerName.rul1,
            BdoServerName.ser4,
            BdoServerName.ser5,
            BdoServerName.ser6,
        );
        const statusOption = this.BuildStringOption('status', Object.values(GuildMissionStatus));
        const serverOption = this.BuildStringOption('server', serverNames);
        const sizeOption = this.BuildStringOption('size', Object.values(GuildMissionSize));
        const objectiveOption = this.BuildStringOption('objective', Object.values(GuildMissionObjective));

        const missionCommand = new SlashCommandBuilder();
        missionCommand.setName(GuildMissionCommand.Mission);
        missionCommand.setDescription('Request, get, or update guild missions');
        missionCommand.addStringOption(statusOption);
        missionCommand.addStringOption(serverOption);
        missionCommand.addStringOption(sizeOption);
        missionCommand.addStringOption(objectiveOption);

        return missionCommand;
    }

    private static BuildStringOption(name: string, values: string[]): SlashCommandStringOption {
        const optionChoices = this.BuildOptionChoices(values);
        const stringOption = new SlashCommandStringOption().setName(name);
        stringOption.setDescription(name);
        stringOption.setChoices(...optionChoices);
        return stringOption;
    }

    private static BuildOptionChoices(values: string[]): APIApplicationCommandOptionChoice<string>[] {
        return values.map(v => { return { name: v, value: v } as APIApplicationCommandOptionChoice<string> });
    }
}