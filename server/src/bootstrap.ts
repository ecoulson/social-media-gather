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
import IMediaPlatformChannelService from "./Services/MediaChannel/IMediaChannelService";
import InstagramChannelService from "./Services/MediaChannel/Instagram/InstagramChannelService";
import TwitterChannelService from "./Services/MediaChannel/Twitter/TwitterChannelService";
import TwitterAPIClient from "./Libraries/Twitter/TwitterAPIClient";
import TwitchChannelService from "./Services/MediaChannel/Twitch/TwitchChannelService";
import YouTubeChannelService from "./Services/MediaChannel/YouTube/YouTubeChannelService";

configureEnvironment();

const container = new Container();

const mongoInstagramRepository = new InstagramPostRepository(new InstagramPostMongoStore());
const mongoTweetRepository = new TweetRepository(new TweetMongoDataStore());
const mongoTwitchStreamRepository = new TwitchStreamRepository(new TwitchStreamMongoDataStore());
const mongoTwitchVideoRepository = new TwitchVideoRepository(new TwitchVideoMongoDataStore());
const mongoUserRepository = new UserRepository(new UserMongoDataStore());
const mongoWebhookRepository = new WebhookRepository(new WebhookMongoDataStore());
const mongoYouTubeRepository = new YouTubeRepository(new YouTubeVideoMongoDataStore());
const mongoPostRepository = new PostRepository(new PostMongoDataStore());

container
    .bind<InstanceType<typeof UserRepository>>(Types.UserRepository)
    .toConstantValue(mongoUserRepository)
    .whenTargetTagged(Tags.MONGO, true);
container
    .bind<InstanceType<typeof InstagramPostRepository>>(Types.InstagramPostRepository)
    .toConstantValue(mongoInstagramRepository)
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
container
    .bind<TwitchAPIClient>(Types.TwitchAPIClient)
    .toConstantValue(
        new TwitchAPIClient(
            process.env.TWITCH_CLIENT_ID,
            process.env.TWITCH_CLIENT_SECRET,
            process.env.BASE_URL
        )
    );
container
    .bind<YouTubeAPIClient>(Types.YouTubeAPIClient)
    .toConstantValue(new YouTubeAPIClient(process.env.YOUTUBE_API_KEY, process.env.BASE_URL));
container
    .bind<TwitterAPIClient>(Types.TwitterAPIClient)
    .toConstantValue(new TwitterAPIClient(process.env.TWITTER_BEARER_TOKEN));

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
container
    .bind<IMediaPlatformChannelService>(Types.InstagramChannelService)
    .to(InstagramChannelService);
container.bind<IMediaPlatformChannelService>(Types.TwitterChannelService).to(TwitterChannelService);
container.bind<IMediaPlatformChannelService>(Types.TwitchChannelService).to(TwitchChannelService);
container.bind<IMediaPlatformChannelService>(Types.YouTubeChannelService).to(YouTubeChannelService);

export default container;