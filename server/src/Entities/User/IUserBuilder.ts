import IUser from "./IUser";

export default interface IUserBuilder {
    setId(id: string): IUserBuilder;
    setTwitterId(twitterId: string): IUserBuilder;
    setYouTubeId(youTubeId: string): IUserBuilder;
    setTwitchId(twitchId: string): IUserBuilder;
    setInstagramId(instagramId: string): IUserBuilder;
    setEmail(email: string): IUserBuilder;
    setUsername(username: string): IUserBuilder;
    setPassword(password: string): IUserBuilder;
    setVerified(): IUserBuilder;
    setFollowers(followers: string[]): IUserBuilder;
    build(): IUser;
}
