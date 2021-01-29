import ICreatorsBody from "../Bodies/ICreatorsBody";
import { v4 as uuid } from "uuid";
import ICreator from "../../Entities/Creator/ICreator";
import CreatorJSONSerializer from "../../Serializers/JSON/CreatorJSONSerializer";
import ResponseMessage from "../ResponseMessage";
import MessageType from "../MessageType";
import IMessage from "../IMessage";
import CreatorJSONDeserializer from "../../Serializers/JSON/CreatorJSONDeserializer";

export default class CreatorsMessage extends ResponseMessage<ICreatorsBody> {
    constructor(creators: ICreator[], originalMessage?: IMessage<unknown>) {
        super(
            uuid(),
            MessageType.Creators,
            {
                creators: creators.map((creator) => CreatorJSONSerializer(creator))
            },
            originalMessage
        );
    }

    deserialize<T>(): T {
        return (this.body().creators.map((creator) =>
            CreatorJSONDeserializer(creator)
        ) as unknown) as T;
    }
}
