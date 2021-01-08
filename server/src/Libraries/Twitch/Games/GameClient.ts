import Axios from "axios";
import ITwitchGameResponseSchema from "../Schemas/ITwitchGameResponseSchema";
import TwitchAPIClient from "../TwitchAPIClient";
import GameResults from "./GameResults";
import IGetGamesOptions from "./IGetGamesOptions";

export default class GameClient {
    constructor(private twitchClient: TwitchAPIClient) {}

    async getGame(options: IGetGamesOptions): Promise<GameResults> {
        const token = await this.twitchClient.token.getAppAccessToken();
        const response = await Axios.get(`https://api.twitch.tv/helix/games?id=${options.id}`, {
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                "Client-Id": this.twitchClient.clientId()
            }
        });
        return new GameResults(response.data as ITwitchGameResponseSchema);
    }
}
