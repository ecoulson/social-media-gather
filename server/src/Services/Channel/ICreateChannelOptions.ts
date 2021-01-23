import Platform from "../../Entities/Platform/Platform";

export default interface ICreateChannelOptions {
    name: string;
    platform: Platform;
    platformId: string;
    subscriberCount: number;
}
