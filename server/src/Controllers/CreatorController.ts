import { inject } from "inversify";
import { controller, httpPost, requestBody } from "inversify-express-utils";
import Types from "../@Types/Types";
import ICreateCreatorBody from "../Messages/Bodies/ICreateCreatorBody";
import CreateCreatorMessage from "../Messages/Creator/CreateCreatorMessage";
import IMessageQueue from "../MessageQueue/IMessageQueue";
import Topic from "../MessageQueue/Topic";
import Subscriber from "../MessageQueue/Subscriber";
import ICreatorsBody from "../Messages/Bodies/ICreatorsBody";
import MessageType from "../Messages/MessageType";

@controller("/api/creator")
export default class CreatorController extends Subscriber {
    constructor(@inject(Types.MessageQueue) messageQueue: IMessageQueue) {
        super(messageQueue);
    }

    @httpPost("/")
    async handleCreateCreator(@requestBody() body: ICreateCreatorBody) {
        return (
            await this.query<ICreatorsBody>(
                Topic.Users,
                MessageType.CreateCreator,
                new CreateCreatorMessage(body)
            )
        ).toJson();
    }
}
