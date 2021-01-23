import { inject } from "inversify";
import { controller, httpPost, requestBody } from "inversify-express-utils";
import Types from "../@Types/Types";
import IMessageQueue from "../Services/MessageQueue/IMessageQueue";
import Topic from "../Services/MessageQueue/Topic";
import ICreateChanneBody from "../Messages/Bodies/ICreateChannelBody";
import CreateChannelMessage from "../Messages/Channel/CreateChannelMessage";
import Subscriber from "../Services/MessageQueue/Subscriber";
import ChannelCreatedMessage from "../Messages/Channel/ChannelCreatedMessage";
import { v4 as uuid } from "uuid";

@controller("/api/channel")
export default class ChannelController {
    constructor(@inject(Types.MessageQueue) private messageQueue: IMessageQueue) {}

    @httpPost("/")
    async get(@requestBody() body: ICreateChanneBody) {
        const originalMessage = new CreateChannelMessage(body);
        this.messageQueue.publish(Topic.Channel, originalMessage);
        return await this.getCreatedChannelMessage(originalMessage);
    }

    private async getCreatedChannelMessage(
        originalMessage: CreateChannelMessage
    ): Promise<ChannelCreatedMessage> {
        return new Promise((resolve) => {
            const subscription = this.messageQueue.subscribe(
                Topic.Channel,
                new Subscriber(
                    uuid(),
                    (message: ChannelCreatedMessage) => {
                        if (message.data().originalId === originalMessage.metadata().id()) {
                            this.messageQueue.unsubcribe(Topic.Channel, subscription);
                            return resolve(message);
                        }
                    },
                    this
                )
            );
        });
    }
}
