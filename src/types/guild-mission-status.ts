type GuildMissionStatusKey = keyof Omit<typeof GuildMissionStatus, 'parse'>;

export function parse(status: string) {
    return GuildMissionStatus[status as GuildMissionStatusKey];
}

export enum GuildMissionStatus {
    Available = 'available',
    Started = 'started',
    Ready = 'ready',
    Done = 'done',
    Expired = 'expired',
    Forfeit = 'forfeit',
}