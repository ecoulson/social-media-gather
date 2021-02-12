import { Transformer } from "../../@Types";
import CreatorBuilder from "../../Entities/Creator/CreatorBuilder";
import ICreator from "../../Entities/Creator/ICreator";
import ICreatorJSONSchema from "../../Schemas/JSON/Creator/ICreatorJSONSchema";

const CreatorJSONDeserializer: Transformer<ICreatorJSONSchema, ICreator> = (schema) => {
    const creatorBuilder = new CreatorBuilder();
    creatorBuilder
        .setChannels(schema.channels)
        .setEmail(schema.email)
        .setFollowers(schema.following)
        .setId(schema.id)
        .setUsername(schema.username)
        .setVerified(schema.verified);

    return creatorBuilder.build();
};

export default CreatorJSONDeserializer;
