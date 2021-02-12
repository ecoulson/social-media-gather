import { Transformer } from "../../@Types";
import ICreator from "../../Entities/Creator/ICreator";
import ICreatorJSONSchema from "../../Schemas/JSON/Creator/ICreatorJSONSchema";

const CreatorJSONSerializer: Transformer<ICreator, ICreatorJSONSchema> = (user) => {
    return {
        id: user.id(),
        username: user.username(),
        email: user.email(),
        verified: user.verified(),
        following: user.following(),
        isCreator: user.isCreator(),
        channels: user.channels()
    };
};

export default CreatorJSONSerializer;
