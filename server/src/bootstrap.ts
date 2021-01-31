import { RequestHandler } from "express";
import { Container } from "inversify";
import Tags from "./@Types/Tags";
import Types from "./@Types/Types";
import InstagramPostMongoStore from "./DataStores/Mongo/InstagramPost/InstagramPostMongoStore";
import PostMongoDataStore from "./DataStores/Mongo/Post/PostMongoDataStore";
import TweetMongoDataStore from "./DataStores/Mongo/Tweet/TweetMongoDataStore";
import TwitchStreamMongoDataStore from "./DataStores/Mongo/TwitchStream/TwitchStreamMongoDataStore";
import TwitchVideoMongoDataStore from "./DataStores/Mongo/TwitchVideo/TwitchVideoMongoDataStore";
import UserMongoDataStore from "./DataStores/Mongo/User/UserMongoDataStore";
import WebhookMongoDataStore from "./DataStores/Mongo/Webhook/WebhookMongoDataStore";
import YouTubeVideoMongoDataStore from "./DataStores/Mongo/YouTubeVideo/YouTubeVideoMongoDataStore";
import TwitchAPIClient from "./Libraries/Twitch/TwitchAPIClient";
import requiresAuth from "./Middlewares/RequiresAuth";
import InstagramPostRepository from "./Repositories/InstagramPost/InstagramPostRepository";
import PostRepository from "./Repositories/Post/PostRepository";
import TweetRepository from "./Repositories/Tweet/TweetRepository";
import TwitchStreamRepository from "./Repositories/TwitchStream/TwitchStreamRepository";
import TwitchVideoRepository from "./Repositories/TwitchVideo/TwitchVideoRepository";
import UserRepository from "./Repositories/User/UserRepository";
import WebhookRepository from "./Repositories/Webhook/WebhookRepository";
import YouTubeRepository from "./Repositories/YouTubeVideo/YouTubeRepository";
import BcryptPasswordManager from "./Security/PasswordManagers/BcryptPasswordManager";
import IPasswordManager from "./Security/PasswordManagers/IPasswordManager";
import ITokenFactory from "./Security/Tokens/ITokenFactory";
import TokenFactory from "./Security/Tokens/TokenFactory";
import AuthenticationService from "./Services/Authentication/AuthenticationService";
import FeedService from "./Services/Feed/FeedService";
import IAuthenticationService from "./Services/Authentication/IAuthenticationService";
import IFeedService from "./Services/Feed/IFeedService";
import ISearchService from "./Services/Search/ISearchService";
import ITwitchWebhookCallbackData from "./Services/WebhookCallbacks/ITwitchWebhookCallbackData";
import IUserService from "./Services/User/IUserService";
import IUserTokenPayload from "./Services/User/IUserTokenPayload";
import IWebhookCallbackService from "./Services/WebhookCallbacks/IWebhookCallbackService";
import SearchService from "./Services/Search/SearchService";
import TwitchWebhookCallbackService from "./Services/WebhookCallbacks/TwitchWebhookCallbackService";
import UserService from "./Services/User/UserService";
import { config as configureEnvironment } from "dotenv";
import IYouTubeWebhookCallbackData from "./Services/WebhookCallbacks/IYouTubeWebhookCallbackData";
import YouTubeWebhookCallbackService from "./Services/WebhookCallbacks/YouTubeWebhookCallbackService";
import YouTubeAPIClient from "./Libraries/YouTube/YouTubeAPIClient";
import IMediaPlatformService from "./Services/MediaChannel/IMediaPlatformService";
import InstagramChannelService from "./Services/MediaChannel/Instagram/InstagramChannelService";
import TwitterChannelService from "./Services/MediaChannel/Twitter/TwitterChannelService";
import TwitterAPIClient from "./Libraries/Twitter/TwitterAPIClient";
import TwitchChannelService from "./Services/MediaChannel/Twitch/TwitchChannelService";
import YouTubeChannelService from "./Services/MediaChannel/YouTube/YouTubeChannelService";
import Config from "./Config/Config";
import AWSConfig from "./Config/AWSConfig";
import Environment from "./Environment";
import ProcessConfig from "./Config/ProcessConfig";
import IConfig from "./Config/IConfig";
import ChannelRepository from "./Repositories/Channel/ChannelRepository";
import ChannelMongoStore from "./DataStores/Mongo/Channel/ChannelMongoStore";
import IMessageQueue from "./MessageQueue/IMessageQueue";
import ChannelService from "./Services/Channel/ChannelService";
import IChannelService from "./Services/Channel/IChannelService";
import TopicMessageQueue from "./MessageQueue/TopicMessageQueue";
import CreatorRepository from "./Repositories/Creator/CreatorRepository";
import CreatorMongoDataStore from "./DataStores/Mongo/Creator/CreatorMongoDataStore";
import ICreatorService from "./Services/Creator/ICreatorService";
import CreatorService from "./Services/Creator/CreatorService";
import Platform from "./Entities/Platform/Platform";
import InstagramAPIClient from "./Libraries/Instagram/InstagramAPIClient";
import IPostsService from "./Services/Posts/IPostsService";
import PostsService from "./Services/Posts/PostsService";
import YouTubeCommentService from "./Services/Comment/YouTubeCommentService";
import ICommentService from "./Services/Comment/ICommentService";
import CommentRepository from "./Repositories/Comment/CommentRepository";
import MongoCommentStore from "./DataStores/Mongo/Comment/MongoCommentStore";
import InstagramCommentService from "./Services/Comment/InstagramCommentService";

configureEnvironment();

const container = new Container();

const mongoInstagramRepository = new InstagramPostRepository(new InstagramPostMongoStore());
const mongoTweetRepository = new TweetRepository(new TweetMongoDataStore());
const mongoTwitchStreamRepository = new TwitchStreamRepository(new TwitchStreamMongoDataStore());
const mongoTwitchVideoRepository = new TwitchVideoRepository(new TwitchVideoMongoDataStore());
const mongoUserRepository = new UserRepository(new UserMongoDataStore());
const mongoCreatorRepository = new CreatorRepository(new CreatorMongoDataStore());
const mongoWebhookRepository = new WebhookRepository(new WebhookMongoDataStore());
const mongoYouTubeRepository = new YouTubeRepository(new YouTubeVideoMongoDataStore());
const mongoPostRepository = new PostRepository(new PostMongoDataStore());
const mongoChannelRepository = new ChannelRepository(new ChannelMongoStore());
const mongoCommentRepository = new CommentRepository(new MongoCommentStore());

const config = new Config(new AWSConfig(Environment.getType()), new ProcessConfig());
const messageQueue = new TopicMessageQueue();
container.bind<IConfig>(Types.Config).toConstantValue(config);

container
    .bind<InstanceType<typeof UserRepository>>(Types.UserRepository)
    .toConstantValue(mongoUserRepository)
    .whenTargetTagged(Tags.MONGO, true);
container
    .bind<InstanceType<typeof InstagramPostRepository>>(Types.InstagramPostRepository)
    .toConstantValue(mongoInstagramRepository)
    .whenTargetTagged(Tags.MONGO, true);
container
    .bind<InstanceType<typeof CommentRepository>>(Types.CommentsRepository)
    .toConstantValue(mongoCommentRepository)
    .whenTargetTagged(Tags.MONGO, true);
container
    .bind<InstanceType<typeof TweetRepository>>(Types.TweetRepository)
    .toConstantValue(mongoTweetRepository)
    .whenTargetTagged(Tags.MONGO, true);
container
    .bind<InstanceType<typeof TwitchStreamRepository>>(Types.TwitchStreamRepository)
    .toConstantValue(mongoTwitchStreamRepository)
    .whenTargetTagged(Tags.MONGO, true);
container
    .bind<InstanceType<typeof TwitchVideoRepository>>(Types.TwitchVideoRepository)
    .toConstantValue(mongoTwitchVideoRepository)
    .whenTargetTagged(Tags.MONGO, true);
container
    .bind<InstanceType<typeof WebhookRepository>>(Types.WebhookRepository)
    .toConstantValue(mongoWebhookRepository)
    .whenTargetTagged(Tags.MONGO, true);
container
    .bind<InstanceType<typeof YouTubeRepository>>(Types.YouTubeVideoRepository)
    .toConstantValue(mongoYouTubeRepository)
    .whenTargetTagged(Tags.MONGO, true);
container
    .bind<InstanceType<typeof PostRepository>>(Types.PostRepository)
    .toConstantValue(mongoPostRepository)
    .whenTargetTagged(Tags.MONGO, true);
container
    .bind<InstanceType<typeof ChannelRepository>>(Types.ChannelRepository)
    .toConstantValue(mongoChannelRepository)
    .whenTargetTagged(Tags.MONGO, true);
container
    .bind<InstanceType<typeof CreatorRepository>>(Types.CreatorRepository)
    .toConstantValue(mongoCreatorRepository)
    .whenTargetTagged(Tags.MONGO, true);

container
    .bind<RequestHandler>(Types.RequiresAuthentication)
    .toConstantValue(
        requiresAuth(
            container.getTagged<InstanceType<typeof UserRepository>>(
                Types.UserRepository,
                Tags.MONGO,
                true
            )
        )
    );

container.bind<IPasswordManager>(Types.PasswordManager).to(BcryptPasswordManager);
container
    .bind<ITokenFactory<IUserTokenPayload>>(Types.TokenFactory)
    .to(TokenFactory)
    .whenInjectedInto(AuthenticationService);
container.bind<TwitchAPIClient>(Types.TwitchAPIClient).toConstantValue(new TwitchAPIClient(config));
container
    .bind<YouTubeAPIClient>(Types.YouTubeAPIClient)
    .toConstantValue(new YouTubeAPIClient(config));
container
    .bind<TwitterAPIClient>(Types.TwitterAPIClient)
    .toConstantValue(new TwitterAPIClient(config));
container
    .bind<InstagramAPIClient>(Types.InstagramAPIClient)
    .toConstantValue(new InstagramAPIClient(config));

container.bind<IUserService>(Types.UserService).to(UserService);
container.bind<IAuthenticationService>(Types.AuthenticationService).to(AuthenticationService);
container.bind<ISearchService>(Types.SearchService).to(SearchService);
container.bind<IFeedService>(Types.FeedService).to(FeedService);
container
    .bind<IWebhookCallbackService<ITwitchWebhookCallbackData>>(Types.TwitchWebhookCallbackService)
    .to(TwitchWebhookCallbackService);
container
    .bind<IWebhookCallbackService<IYouTubeWebhookCallbackData>>(Types.YouTubeWebhookCallbackService)
    .to(YouTubeWebhookCallbackService);
container.bind<IMediaPlatformService>(Types.InstagramChannelService).to(InstagramChannelService);
container.bind<IMediaPlatformService>(Types.TwitterChannelService).to(TwitterChannelService);
container.bind<IMediaPlatformService>(Types.TwitchChannelService).to(TwitchChannelService);
container.bind<IMediaPlatformService>(Types.YouTubeChannelService).to(YouTubeChannelService);
container.bind<IChannelService>(Types.ChannelService).to(ChannelService);
container.bind<ICreatorService>(Types.CreatorService).to(CreatorService);
container.bind<IPostsService>(Types.PostsService).to(PostsService);
container.bind<ICommentService>(Types.YouTubeCommentsService).to(YouTubeCommentService);

container.bind<IMessageQueue>(Types.MessageQueue).toConstantValue(messageQueue);

container.bind<Map<Platform, IMediaPlatformService>>(Types.MediaPlatformMap).toConstantValue(
    new Map<Platform, IMediaPlatformService>([
        [
            Platform.TWITCH,
            new TwitchChannelService(
                container.get<TwitchAPIClient>(Types.TwitchAPIClient),
                mongoTwitchStreamRepository,
                mongoTwitchVideoRepository,
                mongoWebhookRepository,
                messageQueue
            )
        ],
        [
            Platform.TWITTER,
            new TwitterChannelService(
                container.get<TwitterAPIClient>(Types.TwitterAPIClient),
                mongoTweetRepository,
                messageQueue
            )
        ],
        [
            Platform.YOUTUBE,
            new YouTubeChannelService(
                container.get<YouTubeAPIClient>(Types.YouTubeAPIClient),
                mongoYouTubeRepository,
                mongoWebhookRepository,
                messageQueue
            )
        ],
        [
            Platform.INSTAGRAM,
            new InstagramChannelService(
                container.get<InstagramAPIClient>(Types.InstagramAPIClient),
                mongoInstagramRepository,
                messageQueue
            )
        ]
    ])
);

container.bind<Map<Platform, ICommentService>>(Types.CommentServiceMap).toConstantValue(
    new Map<Platform, ICommentService>([
        [
            Platform.YOUTUBE,
            new YouTubeCommentService(
                container.get<YouTubeAPIClient>(Types.YouTubeAPIClient),
                mongoCommentRepository,
                messageQueue
            )
        ],
        [
            Platform.INSTAGRAM,
            new InstagramCommentService(
                messageQueue,
                mongoCommentRepository,
                container.get<InstagramAPIClient>(Types.InstagramAPIClient)
            )
        ]
    ])
);

export default container;
