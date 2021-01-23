import Platform from "../../Entities/Platform/Platform";

export default interface ICreateChannelBody {
    name: string;
    subscriberCount: number;
    platform: Platform;
    platformId: string;
}
