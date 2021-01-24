import { Document } from "mongoose";

export default interface IUserDocument extends Document {
    channels: string[];
    email: string;
    password: string;
    username: string;
    verified: boolean;
    following: string[];
    isCreator: boolean
}
