import Axios from "axios";
import ITwitchTokenSchema from "../Schemas/ITwitchTokenSchema";
import TwitchAPIClient from "../TwitchAPIClient";

export default class TokensClient {
    constructor(private twitchClient: TwitchAPIClient) {}

    async getAppAccessToken(): Promise<ITwitchTokenSchema> {
        const response = await Axios.post(
            `https://id.twitch.tv/oauth2/token?client_id=${await this.twitchClient.clientId()}&client_secret=${await this.twitchClient.clientSecret()}&grant_type=client_credentials`
        );
        return {
            refreshToken: response.data.refresh_token,
            accessToken: response.data.access_token,
            expiresIn: response.data.expires_in,
            type: response.data.token_type,
            scope: response.data.scope
        };
    }
}
