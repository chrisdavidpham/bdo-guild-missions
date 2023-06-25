type MissionSizeKey = keyof Omit<typeof MissionSize, 'parse'>;

export function parse(size: string) {
    return MissionSize[size as MissionSizeKey];
}

export enum MissionSize {
    ExtraLarge = 'xl',
    Large = 'l',
    Medium = 'm',
    Small = 's'
}