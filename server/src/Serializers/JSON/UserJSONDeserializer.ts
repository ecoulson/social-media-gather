import { Transformer } from "../../@Types";
import IUser from "../../Entities/User/IUser";
import UserBuilder from "../../Entities/User/UserBuilder";
import { IUserJSONSchema } from "../../Schemas/JSON/User/IUserJSONSchema";

const UserJSONDeserializer: Transformer<IUserJSONSchema, IUser> = (schema) => {
    const userBuilder = new UserBuilder();
    return userBuilder
        .setChannels(schema.channels)
        .setCreator(schema.isCreator)
        .setEmail(schema.email)
        .setFollowers(schema.following)
        .setId(schema.id)
        .setUsername(schema.username)
        .setVerified(schema.verified)
        .build();
};

export default UserJSONDeserializer;
