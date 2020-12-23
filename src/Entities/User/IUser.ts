import IEntity from "../IEntity";

export default interface IUser extends IEntity {
    twitterId(): string;
    youTubeId() : string;
    twitchId() : string;
    instagramId() : string;
    email() : string;
    username() : string;
    verified() : boolean;
    following() : Promise<IUser[]>;
    followingIds() : string[];
}