import GameClient from "./Games/GameClient";
import TokenClient from "./Tokens/TokenClient";

export default class TwitchAPIClient {
    private gameClient: GameClient;
    private tokenClient: TokenClient;

    constructor(private _clientId: string, private _clientSecret: string) {
        this.gameClient = new GameClient(this);
        this.tokenClient = new TokenClient(this);
    }

    public clientId(): string {
        return this._clientId;
    }

    public clientSecret(): string {
        return this._clientSecret;
    }

    get games(): GameClient {
        return this.gameClient;
    }

    get token(): TokenClient {
        return this.tokenClient;
    }
}
