import ICreatorCreatedBody from "../Bodies/ICreatorCreatedBody";
import { v4 as uuid } from "uuid";
import ICreator from "../../Entities/Creator/ICreator";
import CreatorJSONSerializer from "../../Serializers/JSON/CreatorJSONSerializer";
import ResponseMessage from "../Users/ResponseMessage";

export default class CreatorCreatedMessage extends ResponseMessage<ICreatorCreatedBody> {
    constructor(originalMessageId: string, creator: ICreator) {
        super(uuid(), originalMessageId, {
            creator: CreatorJSONSerializer(creator)
        });
    }
}
