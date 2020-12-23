import IUser from "../../../Entities/User/IUser";
import UserEntityTransform from "./UserEntityTransform";
import IUserDocument from "../Models/User/IUserDocument";
import UserModel from "../Models/User/UserModel";
import MongoDataStore from "../MongoDataStore";
import UserUpdateQueryTransform from "./UserUpdateQueryTransform";

export default class UserMongoDataStore extends MongoDataStore<IUserDocument, IUser> {
    constructor() {
        super(UserModel, UserEntityTransform, UserUpdateQueryTransform)
    }
}