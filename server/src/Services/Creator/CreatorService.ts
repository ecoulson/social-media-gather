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
import MessageType from "../../Messages/MessageType";
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
        const creatorBuilder = new CreatorBuilder();
        creatorBuilder
            .setChannels([])
            .setEmail(body.email)
            .setPassword(await this.passwordManager.hash(body.password, 10))
            .setUsername(body.username)
            .setVerified(body.verified);
        const creator = (await this.creatorRepository.add(creatorBuilder.build())) as ICreator;
        const channels = await this.setupMediaChannels(body.channels, creator);
        channels.forEach((channel) => {
            creator.addChannel(channel.id());
        });
        return (await this.creatorRepository.update(creator)) as ICreator;
    }

    async setupMediaChannels(channelBodies: ICreateChannelBody[], creator: ICreator) {
        return await Promise.all(
            channelBodies.map((channelBody) => this.setupMediaChannel(channelBody, creator))
        );
    }

    async setupMediaChannel(channelBody: ICreateChannelBody, creator: ICreator) {
        const channelResponse = await this.query<IChannelsBody>(
            Topic.Channel,
            MessageType.Channels,
            new SetupMediaChannelMessage(channelBody, creator)
        );
        return ChannelJSONDeserializer(channelResponse.data().channels[0]);
    }
}
