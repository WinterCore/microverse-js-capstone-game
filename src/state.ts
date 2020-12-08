
class State {
    soundOn: boolean = false;
    musicOn: boolean = false;
    data: any = {};

    private static _instance: State;

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

export default State.Instance;
