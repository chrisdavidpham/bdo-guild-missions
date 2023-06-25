type GuildMissionSizeKey = keyof Omit<typeof GuildMissionSize, 'parse'>;

export function parse(size: string) {
    return GuildMissionSize[size as GuildMissionSizeKey];
}

export enum GuildMissionSize {
    ExtraLarge = 'xl',
    Large = 'l',
    Medium = 'm',
    Small = 's'
}