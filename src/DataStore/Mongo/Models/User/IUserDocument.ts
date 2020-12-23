import { Document } from "mongoose";

export default interface IUserDocument extends Document {
    twitterId: string,
    youtubeId: string,
    twitchId: string,
    instagramId: string,
    email: string,
    password: string,
    username: string,
    verified: boolean,
    following: string[]
}