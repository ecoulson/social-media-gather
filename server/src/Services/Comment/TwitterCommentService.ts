import { inject, injectable, tagged } from "inversify";
import Tags from "../../@Types/Tags";
import Types from "../../@Types/Types";
import CommentBuilder from "../../Entities/Comment/CommentBuilder";
import IComment from "../../Entities/Comment/IComment";
import Image from "../../Entities/Media/Image";
import ITweet from "../../Entities/Tweet/ITweet";
import ITweetSchema from "../../Libraries/Twitter/Schema/ITweetSchema";
import TweetServiceV1 from "../../Libraries/Twitter/Services/v1/Tweets/TweetServiceV1";
import SearchServiceV2 from "../../Libraries/Twitter/Services/v2/Search/SearchServiceV2";
import TweetServiceV2 from "../../Libraries/Twitter/Services/v2/Tweets/TweetServiceV2";
import TwitterAPIClient from "../../Libraries/Twitter/TwitterAPIClient";
import TwitterPaginatedResult from "../../Libraries/Twitter/TwitterPaginatedResult";
import TwitterServiceType from "../../Libraries/Twitter/TwitterServiceType";
import IMessageQueue from "../../MessageQueue/IMessageQueue";
import Subscriber from "../../MessageQueue/Subscriber";
import Topic from "../../MessageQueue/Topic";
import IPostsBody from "../../Messages/Bodies/IPostsBody";
import MessageType from "../../Messages/MessageType";
import GetPostsMessage from "../../Messages/Posts/GetPostsMessage";
import UpdatePostsMessage from "../../Messages/Posts/UpdatePostsMessage";
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
        const tweet = await this.getTweet(postId);
        if (await this.shouldLoadComments(tweet, offset)) {
            return this.loadCommentsFromMedia(postId);
        }
        return this.commentsRepository.find({
            where: {
                postId
            },
            skip: offset,
            limit: 100
        });
    }

    private async shouldLoadComments(tweet: ITweet, offset: number) {
        const postCommentCount = await this.getPostCommentCount(tweet);
        return (
            (tweet.pagination() == null || !tweet.pagination().isAtEnd) &&
            offset >= postCommentCount
        );
    }

    private async getPostCommentCount(tweet: ITweet) {
        return (
            await this.commentsRepository.find({
                where: {
                    postId: tweet.id()
                }
            })
        ).length;
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
        const tweet = await this.getTweet(postId);
        const recentTweetComments = await this.getCommentsFromLast7Days(tweet);
        const comments = await this.convertRecentTweetCommentsToComments(
            recentTweetComments,
            tweet
        );
        this.updateTweetCommentPagination(tweet, recentTweetComments);
        return await this.commentsRepository.addAll(comments);
    }

    private async updateTweetCommentPagination(
        tweet: ITweet,
        recentTweetComments: TwitterPaginatedResult<ITweetSchema[]>
    ) {
        const pagination = recentTweetComments.pagination();
        tweet.setPagination({
            newestId: pagination.newest_id,
            oldestId: pagination.oldest_id,
            isAtEnd: pagination.isAtEnd
        });
        tweet.setCommentCount(
            isNaN(tweet.commentCount())
                ? recentTweetComments.data().length
                : tweet.commentCount() + recentTweetComments.data().length
        );
        return await this.query(Topic.Posts, MessageType.Posts, new UpdatePostsMessage([tweet]));
    }

    private async convertRecentTweetCommentsToComments(
        recentTweetComments: TwitterPaginatedResult<ITweetSchema[]>,
        tweet: ITweet
    ) {
        const commentBuilder = new CommentBuilder();
        const tweetServiceV1 = this.twitterAPIClientV1.getService<TweetServiceV1>(
            TwitterServiceType.Tweets
        );
        const comments = (
            await tweetServiceV1.lookupTweets({
                ids: recentTweetComments.data().map((result) => result.id_str)
            })
        ).map((tweetSchema) => {
            return commentBuilder
                .setDateCreated(new Date(tweetSchema.created_at))
                .setDislikes(0)
                .setLikes(tweetSchema.favorite_count)
                .setPostId(tweet.id())
                .setProfileImage(new Image("", tweetSchema.user.profile_image_url, 0, 0))
                .setReplyCount(tweetSchema.reply_count)
                .setText(tweetSchema.full_text)
                .setUsername(tweetSchema.user.screen_name)
                .build();
        });
        return comments;
    }

    private async getCommentsFromLast7Days(tweet: ITweet) {
        const conversationIdOfTweet = await this.getConversationIdForTweet(tweet);
        const searchService = this.twitterAPIClientV2.getService<SearchServiceV2>(
            TwitterServiceType.Search
        );
        const results = await searchService.searchRecentTweets({
            conversationId: conversationIdOfTweet,
            tweetFields: [
                "in_reply_to_user_id",
                "author_id",
                "created_at",
                "conversation_id",
                "public_metrics"
            ],
            untilId: tweet.pagination() ? tweet.pagination().oldestId : undefined
        });
        return results;
    }

    private async getConversationIdForTweet(tweet: ITweet) {
        const tweetService = this.twitterAPIClientV2.getService<TweetServiceV2>(
            TwitterServiceType.Tweets
        );
        const tweets = await tweetService.lookup({
            tweetFields: [
                "author_id",
                "conversation_id",
                "created_at",
                "in_reply_to_user_id",
                "referenced_tweets",
                "public_metrics"
            ],
            ids: [tweet.tweetId()],
            expansions: ["author_id", "in_reply_to_user_id", "referenced_tweets.id"]
        });
        return tweets[0].conversation_id;
    }
}
