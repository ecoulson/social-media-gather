import IEntity from "../IEntity";

export default interface IUser extends IEntity {
    twitterId(): string;
    youTubeId(): string;
    twitchId(): string;
    instagramId(): string;
    email(): string;
    username(): string;
    password(): string;
    verified(): boolean;
    following(): string[];
    verify(): void;
    addFollower(user: IUser): void;
}
