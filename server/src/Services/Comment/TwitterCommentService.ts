import { inject, injectable, tagged } from "inversify";
import Tags from "../../@Types/Tags";
import Types from "../../@Types/Types";
import CommentBuilder from "../../Entities/Comment/CommentBuilder";
import IComment from "../../Entities/Comment/IComment";
import Image from "../../Entities/Media/Image";
import ITweet from "../../Entities/Tweet/ITweet";
import TweetServiceV1 from "../../Libraries/Twitter/Services/v1/Tweets/TweetServiceV1";
import SearchServiceV2 from "../../Libraries/Twitter/Services/v2/Search/SearchServiceV2";
import TweetServiceV2 from "../../Libraries/Twitter/Services/v2/Tweets/TweetServiceV2";
import TwitterAPIClient from "../../Libraries/Twitter/TwitterAPIClient";
import TwitterServiceType from "../../Libraries/Twitter/TwitterServiceType";
import IMessageQueue from "../../MessageQueue/IMessageQueue";
import Subscriber from "../../MessageQueue/Subscriber";
import Topic from "../../MessageQueue/Topic";
import IPostsBody from "../../Messages/Bodies/IPostsBody";
import MessageType from "../../Messages/MessageType";
import GetPostsMessage from "../../Messages/Posts/GetPostsMessage";
import CommentRepository from "../../Repositories/Comment/CommentRepository";
import ICommentService from "./ICommentService";

@injectable()
export default class TwitterCommentService extends Subscriber implements ICommentService {
    constructor(
        @inject(Types.MessageQueue) messageQueue: IMessageQueue,
        @inject(Types.TwitterAPIClient)
        @tagged(Tags.V2, true)
        private twitterAPIClientV2: TwitterAPIClient,
        @inject(Types.TwitterAPIClient)
        @tagged(Tags.V1, true)
        private twitterAPIClientV1: TwitterAPIClient,
        @inject(Types.CommentsRepository)
        private commentsRepository: InstanceType<typeof CommentRepository>
    ) {
        super(messageQueue);
    }

    async getComments(postId: string, offset: number): Promise<IComment[]> {
        return this.loadCommentsFromMedia(postId);
    }

    private async getTweet(postId: string) {
        const postsResponse = await this.query<IPostsBody>(
            Topic.Posts,
            MessageType.Posts,
            new GetPostsMessage([postId])
        );
        return postsResponse.deserialize<ITweet[]>()[0];
    }

    async loadCommentsFromMedia(postId: string): Promise<IComment[]> {
        const commentBuilder = new CommentBuilder();
        const tweet = await this.getTweet(postId);
        const tweetService = this.twitterAPIClientV2.getService<TweetServiceV2>(
            TwitterServiceType.Tweets
        );
        const tweets = await tweetService.lookup({
            tweetFields: [
                "author_id",
                "conversation_id",
                "created_at",
                "in_reply_to_user_id",
                "referenced_tweets"
            ],
            ids: [tweet.tweetId()],
            expansions: ["author_id", "in_reply_to_user_id", "referenced_tweets.id"]
        });
        const searchService = this.twitterAPIClientV2.getService<SearchServiceV2>(
            TwitterServiceType.Search
        );
        const results = await searchService.searchRecentTweets({
            conversationId: tweets[0].conversation_id,
            tweetFields: ["in_reply_to_user_id", "author_id", "created_at", "conversation_id"]
        });
        const tweetServiceV1 = this.twitterAPIClientV1.getService<TweetServiceV1>(
            TwitterServiceType.Tweets
        );
        const comments = (
            await tweetServiceV1.lookupTweets({
                ids: results.map((result) => result.id_str)
            })
        ).map((tweet) => {
            return commentBuilder
                .setDateCreated(new Date(tweet.created_at))
                .setDislikes(0)
                .setLikes(tweet.favorite_count)
                .setPostId(postId)
                .setProfileImage(new Image("", tweet.user.profile_image_url, 0, 0))
                .setReplyCount(tweet.reply_count)
                .setText(tweet.full_text)
                .setUsername(tweet.user.screen_name)
                .build();
        });
        return await this.commentsRepository.addAll(comments);
    }
}
