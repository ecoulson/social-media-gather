import { inject, injectable, tagged } from "inversify";
import Tags from "../../@Types/Tags";
import Types from "../../@Types/Types";
import ICreator from "../../Entities/Creator/ICreator";
import IPost from "../../Entities/Post/IPost";
import IUser from "../../Entities/User/IUser";
import CreatorRepository from "../../Repositories/Creator/CreatorRepository";
import PostRepository from "../../Repositories/Post/PostRepository";
import IFeedService from "./IFeedService";
const BATCH_SIZE = 20;

@injectable()
export default class FeedService implements IFeedService {
    constructor(
        @inject(Types.PostRepository)
        @tagged(Tags.MONGO, true)
        private postRepository: InstanceType<typeof PostRepository>,
        @inject(Types.CreatorRepository)
        @tagged(Tags.MONGO, true)
        private creatorRepository: InstanceType<typeof CreatorRepository>
    ) {}

    async getUsersFeed(user: IUser, postOffset: number): Promise<IPost[]> {
        const followedCreators = (await Promise.all(
            user.following().map((creatorId) => this.creatorRepository.findById(creatorId))
        )) as ICreator[];
        const followedChannels = followedCreators
            .map((creator) => creator.channels())
            .reduce((flattenedChannels, currentChannels) => [
                ...flattenedChannels,
                ...currentChannels
            ])
            .filter((channelId, index, channelIds) => channelIds.lastIndexOf(channelId) === index);
        return await this.postRepository.find({
            where: {
                channelId: {
                    $in: followedChannels
                }
            },
            limit: BATCH_SIZE,
            skip: postOffset,
            sort: { timeCreated: -1 }
        });
    }

    async getCreatorsPosts(userId: string, postOffset: number): Promise<IPost[]> {
        const creator = (await this.creatorRepository.findById(userId)) as ICreator;
        return await this.postRepository.find({
            where: {
                channelId: {
                    $in: creator.channels()
                }
            },
            limit: BATCH_SIZE,
            skip: postOffset,
            sort: { timeCreated: -1 }
        });
    }
}
