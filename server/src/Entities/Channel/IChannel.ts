import Platform from "../Platform/Platform";

export default interface IChannel {
    name(): string;
    id(): string;
    platformId(): string;
    platform(): Platform;
    subscriberCount(): number;
}
