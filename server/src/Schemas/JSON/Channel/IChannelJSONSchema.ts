import Platform from "../../../Entities/Platform/Platform";

export default interface IChannelJSONSchema {
    id: string;
    name: string;
    platform: Platform;
    platformId: string;
    subscriberCount: number;
}
