import ICreateChannelBody from "./ICreateChannelBody";

export default interface ICreateCreatorBody {
    channels: ICreateChannelBody[];
    password: string;
    username: string;
    verified: boolean;
    email: string;
}
