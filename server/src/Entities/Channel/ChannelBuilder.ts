import Builder from "../../Libraries/Builder/Builder";
import Platform from "../Platform/Platform";
import Channel from "./Channel";
import IChannel from "./IChannel";

export default class ChannelBuilder extends Builder<IChannel> {
    private id: string;
    private name: string;
    private platform: Platform;
    private platformId: string;
    private subscriberCount: number;

    setId(id: string): ChannelBuilder {
        this.id = id;
        return this;
    }

    setName(name: string): ChannelBuilder {
        this.name = name;
        return this;
    }

    setPlatform(platform: Platform): ChannelBuilder {
        this.platform = platform;
        return this;
    }

    setPlatformId(platformId: string): ChannelBuilder {
        this.platformId = platformId;
        return this;
    }

    setSubscriberCount(subscriberCount: number): ChannelBuilder {
        this.subscriberCount = subscriberCount;
        return this;
    }

    reset(): void {
        this.id = null;
        this.name = null;
        this.platform = null;
        this.platformId = null;
        this.subscriberCount = null;
    }

    construct(): IChannel {
        return new Channel(
            this.name,
            this.id,
            this.platformId,
            this.platform,
            this.subscriberCount
        );
    }
}
