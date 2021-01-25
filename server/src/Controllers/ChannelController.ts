import { inject } from "inversify";
import { controller, httpGet, httpPost, queryParam, requestBody } from "inversify-express-utils";
import Types from "../@Types/Types";
import IMessageQueue from "../MessageQueue/IMessageQueue";
import Topic from "../MessageQueue/Topic";
import ICreateChanneBody from "../Messages/Bodies/ICreateChannelBody";
import CreateChannelMessage from "../Messages/Channel/CreateChannelMessage";
import Subscriber from "../MessageQueue/Subscriber";
import IChannelsBody from "../Messages/Bodies/IChannelsBody";
import GetChannelsMessage from "../Messages/Channel/GetChannelsMessage";

@controller("/api/channel")
export default class ChannelController extends Subscriber {
    constructor(@inject(Types.MessageQueue) messageQueue: IMessageQueue) {
        super(messageQueue);
    }

    @httpPost("/")
    async create(@requestBody() body: ICreateChanneBody) {
        return (
            await this.query<IChannelsBody>(Topic.Channel, new CreateChannelMessage(body))
        ).toJson();
    }

    @httpGet("/")
    async getChannels(@queryParam("ids") rawIds: string) {
        return (
            await this.query<IChannelsBody>(
                Topic.Channel,
                new GetChannelsMessage(rawIds.split(","))
            )
        ).toJson();
    }
}
