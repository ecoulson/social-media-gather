import { Transformer } from "../../../@Types";
import CreatorBuilder from "../../../Entities/Creator/CreatorBuilder";
import ICreator from "../../../Entities/Creator/ICreator";
import IUserDocument from "../../../Schemas/Mongo/User/IUserDocument";

const CreatorEntityTransform: Transformer<IUserDocument, ICreator> = (user) => {
    const builder = new CreatorBuilder();
    builder
        .setChannels(user.channels)
        .setEmail(user.email)
        .setFollowers(user.following)
        .setId(user.id)
        .setPassword(user.password)
        .setUsername(user.username)
        .setVerified(user.verified);
    return builder.build();
};

export default CreatorEntityTransform;
