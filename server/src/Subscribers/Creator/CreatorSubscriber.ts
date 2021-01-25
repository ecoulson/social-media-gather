import { inject } from "inversify";
import Types from "../../@Types/Types";
import CreateCreatorMessage from "../../Messages/Creator/CreateCreatorMessage";
import CreatorCreatedMessage from "../../Messages/Creator/CreatorCreatedMessage";
import MessageType from "../../Messages/MessageType";
import ICreatorService from "../../Services/Creator/ICreatorService";
import IMessageQueue from "../../MessageQueue/IMessageQueue";
import Topic from "../../MessageQueue/Topic";
import Subscriber from "../../MessageQueue/Subscriber";

export default class CreatorSubscriber extends Subscriber {
    constructor(
        @inject(Types.CreatorService) private creatorService: ICreatorService,
        @inject(Types.MessageQueue) messageQueue: IMessageQueue
    ) {
        super(messageQueue);
        this.subscribe(Topic.Users, MessageType.CreateCreator, this.handleCreate);
    }

    async handleCreate(message: CreateCreatorMessage) {
        const creator = await this.creatorService.create(message.data());
        this.publish(Topic.Users, new CreatorCreatedMessage(message.metadata().id(), creator));
    }
}
