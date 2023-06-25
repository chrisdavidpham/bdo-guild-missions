import { MissionSize } from './mission-size';
import { MissionStatus } from './mission-status';

export class Mission {
    private _server: string;
    private _size: MissionSize;
    private _objective: string;
    private _status: MissionStatus;
    private _timeLimitHours: number;

    constructor(server: string, size: MissionSize, objective: string) {
        this._server = server;
        this._size = size;
        this._objective = objective;
        this._status = MissionStatus.Accepted;
    }

    public get server {
        return this._server;
    }

    public get size {
        return this._size;
    }

    public get objective {
        return this._objective;
    }

    public get status {
        return this._status;
    }

    public Ready() {
        this._status = MissionStatus.ReadyToComplete;
    }

    public Done() {
        this._status = MissionStatus.Completed;
    }

    public Expired() {
        this._status = MissionStatus.Expired;
    }

    public Forfeit() {
        this._status = MissionStatus.Forfeit;
    }
}