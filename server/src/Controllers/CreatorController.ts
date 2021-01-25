import { inject } from "inversify";
import { controller, httpPost, requestBody } from "inversify-express-utils";
import Types from "../@Types/Types";
import ICreateCreatorBody from "../Messages/Bodies/ICreateCreatorBody";
import CreateCreatorMessage from "../Messages/Creator/CreateCreatorMessage";
import IMessageQueue from "../MessageQueue/IMessageQueue";
import Topic from "../MessageQueue/Topic";
import Subscriber from "../MessageQueue/Subscriber";
import ICreatorCreatedBody from "../Messages/Bodies/ICreatorCreatedBody";

@controller("/api/creator")
export default class CreatorController extends Subscriber {
    constructor(@inject(Types.MessageQueue) messageQueue: IMessageQueue) {
        super(messageQueue);
    }

    @httpPost("/")
    async handleCreateCreator(@requestBody() body: ICreateCreatorBody) {
        return (
            await this.query<ICreatorCreatedBody>(Topic.Users, new CreateCreatorMessage(body))
        ).toJson();
    }
}
