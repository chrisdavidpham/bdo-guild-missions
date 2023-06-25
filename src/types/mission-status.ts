type MissionStatusKey = keyof Omit<typeof MissionStatus, 'parse'>;

export function parse(status: string) {
    return MissionStatus[status as MissionStatusKey];
}

export enum MissionStatus {
    Available = 'available',
    Requested = 'requested',
    Started = 'started',
    ReadyToComplete = 'ready',
    Completed = 'completed',
    Expired = 'expired',
    Forfeit = 'forfeit',
}