import { inject, injectable, tagged } from "inversify";
import Tags from "../../@Types/Tags";
import Types from "../../@Types/Types";
import CreatorBuilder from "../../Entities/Creator/CreatorBuilder";
import ICreator from "../../Entities/Creator/ICreator";
import IMessageQueue from "../../MessageQueue/IMessageQueue";
import Subscriber from "../../MessageQueue/Subscriber";
import Topic from "../../MessageQueue/Topic";
import IChannelsBody from "../../Messages/Bodies/IChannelsBody";
import ICreateChannelBody from "../../Messages/Bodies/ICreateChannelBody";
import ICreateCreatorBody from "../../Messages/Bodies/ICreateCreatorBody";
import SetupMediaChannelMessage from "../../Messages/MediaChannel/SetupMediaChannelMessage";
import CreatorRepository from "../../Repositories/Creator/CreatorRepository";
import IPasswordManager from "../../Security/PasswordManagers/IPasswordManager";
import ChannelJSONDeserializer from "../../Serializers/JSON/ChannelJSONDeserializer";
import ICreatorService from "./ICreatorService";

@injectable()
export default class CreatorService extends Subscriber implements ICreatorService {
    constructor(
        @inject(Types.CreatorRepository)
        @tagged(Tags.MONGO, true)
        private creatorRepository: InstanceType<typeof CreatorRepository>,
        @inject(Types.MessageQueue) messageQueue: IMessageQueue,
        @inject(Types.PasswordManager) private passwordManager: IPasswordManager
    ) {
        super(messageQueue);
    }

    async create(body: ICreateCreatorBody): Promise<ICreator> {
        const channels = await this.createChannels(body.channels);
        const creatorBuilder = new CreatorBuilder();
        creatorBuilder
            .setChannels(channels.map((channel) => channel.id()))
            .setEmail(body.email)
            .setPassword(await this.passwordManager.hash(body.password, 10))
            .setUsername(body.username)
            .setVerified(body.verified);
        return (await this.creatorRepository.add(creatorBuilder.build())) as ICreator;
    }

    async createChannels(channelBodies: ICreateChannelBody[]) {
        return await Promise.all(
            channelBodies.map((channelBody) => this.createChannel(channelBody))
        );
    }

    async createChannel(channelBody: ICreateChannelBody) {
        const channelResponse = await this.query<IChannelsBody>(
            Topic.Channel,
            new SetupMediaChannelMessage(channelBody)
        );
        return ChannelJSONDeserializer(channelResponse.data().channels[0]);
    }
}
