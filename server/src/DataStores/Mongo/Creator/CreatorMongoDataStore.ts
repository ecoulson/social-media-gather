import ICreator from "../../../Entities/Creator/ICreator";
import IUserDocument from "../../../Schemas/Mongo/User/IUserDocument";
import UserModel from "../../../Schemas/Mongo/User/UserModel";
import MongoDataStore from "../MongoDataStore";
import CreatorDocumentTransform from "./CreatorDocumentTransform";
import CreatorEntityTransform from "./CreatorEntityTransform";

export default class CreatorMongoDataStore extends MongoDataStore<IUserDocument, ICreator> {
    constructor() {
        super(UserModel, CreatorEntityTransform, CreatorDocumentTransform);
    }
}
