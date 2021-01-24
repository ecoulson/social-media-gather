import { Transformer } from "../../../@Types";
import ICreator from "../../../Entities/Creator/ICreator";
import IUserDocument from "../../../Schemas/Mongo/User/IUserDocument";

const CreatorDocumentTransform: Transformer<ICreator, Partial<IUserDocument>> = (creator) => {
    return {
        username: creator.username(),
        channels: creator.channels(),
        following: creator.following(),
        email: creator.email(),
        password: creator.password(),
        verified: creator.verified(),
        isCreator: creator.isCreator()
    };
};

export default CreatorDocumentTransform;
