import IEntity from "../IEntity";

export default interface IUser extends IEntity {
    twitterId(): string;
    youTubeId(): string;
    twitchId(): string;
    instagramId(): string;
    setInstagramId(instagramId: string): void;
    email(): string;
    setEmail(email: string): void;
    username(): string;
    password(): string;
    verified(): boolean;
    following(): string[];
    verify(): void;
    addFollower(user: IUser): void;
    removeFollower(user: IUser): void;
}
