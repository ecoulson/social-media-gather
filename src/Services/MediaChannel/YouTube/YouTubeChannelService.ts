import { inject, injectable, tagged } from "inversify";
import Tags from "../../../@Types/Tags";
import Types from "../../../@Types/Types";
import IUser from "../../../Entities/User/IUser";
import YouTubeAPIClient from "../../../Library/YouTube/YouTubeAPIClient";
import WebhookRepository from "../../../Repositories/Webhook/WebhookRepository";
import YouTubeRepository from "../../../Repositories/YouTubeVideo/YouTubeRepository";
import IMediaPlatformChannelService from "../IMediaChannelService";
import IMediaPlatformChannelSearchResult from "../IMediaPlatformChannelSearchResult";

@injectable()
export default class YouTubeChannelService implements IMediaPlatformChannelService {
    constructor(
        @inject(Types.YouTubeAPIClient) private youTubeAPIClient: YouTubeAPIClient,
        @inject(Types.YouTubeVideoRepository)
        @tagged(Tags.MONGO, true)
        private youTubeVideoRepository: InstanceType<typeof YouTubeRepository>,
        @inject(Types.WebhookRepository)
        @tagged(Tags.MONGO, true)
        private webhookRepository: InstanceType<typeof WebhookRepository>
    ) {}

    async searchPlatformForChannel(username: string): Promise<IMediaPlatformChannelSearchResult> {
        const channels = await this.youTubeAPIClient.channels.searchChannelsByUsername(username);
        return {
            channels: channels.items.map((channel) => {
                return {
                    id: channel.id.channelId,
                    username: channel.snippet.title,
                    profilePicture: channel.snippet.thumbnails.default.url
                };
            })
        };
    }

    async registerChannel(user: IUser, mediaChannelId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async registerChannelForUserId(userId: string, mediaChannelId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
