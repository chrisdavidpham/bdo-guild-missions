import { GuildMissionSize } from "./guild-mission-size";
import { GuildMissionStatus } from "./guild-mission-status";

export class GuildMission {
    private _server: string;
    private _size: GuildMissionSize;
    private _objective: string;
    private _status: GuildMissionStatus;

    constructor(server: string, size: GuildMissionSize, objective: string) {
        this._server = server;
        this._size = size;
        this._objective = objective;
        this._status = GuildMissionStatus.Started;
    }

    public get server() {
        return this._server;
    }

    public get size() {
        return this._size;
    }

    public get objective() {
        return this._objective;
    }

    public get status() {
        return this._status;
    }

    public Ready() {
        this._status = GuildMissionStatus.Ready;
    }

    public Done() {
        this._status = GuildMissionStatus.Done;
    }

    public Expired() {
        this._status = GuildMissionStatus.Expired;
    }

    public Forfeit() {
        this._status = GuildMissionStatus.Forfeit;
    }
}