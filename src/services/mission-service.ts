export class MissionService {
    
    private _requests: Array<object>;
    private _missions: Array<object>;

    constructor() {
        this._requests = new Array<object>();
        this._missions = new Array<object>();
    }
}