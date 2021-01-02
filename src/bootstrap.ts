import { RequestHandler } from "express";
import { Container } from "inversify";
import Tags from "./@Types/Tags";
import Types from "./@Types/Types";
import InstagramPostMongoStore from "./DataStore/Mongo/InstagramPost/InstagramPostMongoStore";
import PostMongoDataStore from "./DataStore/Mongo/Post/PostMongoDataStore";
import TweetMongoDataStore from "./DataStore/Mongo/Tweet/TweetMongoDataStore";
import TwitchStreamMongoDataStore from "./DataStore/Mongo/TwitchStream/TwitchStreamMongoDataStore";
import TwitchVideoMongoDataStore from "./DataStore/Mongo/TwitchVideo/TwitchVideoMongoDataStore";
import UserMongoDataStore from "./DataStore/Mongo/User/UserMongoDataStore";
import WebhookMongoDataStore from "./DataStore/Mongo/Webhook/WebhookMongoDataStore";
import YouTubeVideoMongoDataStore from "./DataStore/Mongo/YouTubeVideo/YouTubeVideoMongoDataStore";
import requiresAuth from "./Middleware/RequiresAuth";
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
import AuthenticationService from "./Services/AuthenticationService";
import FeedService from "./Services/FeedService";
import IAuthenticationService from "./Services/IAuthenticationService";
import IFeedService from "./Services/IFeedService";
import ISearchService from "./Services/ISearchService";
import IUserService from "./Services/IUserService";
import IUserTokenPayload from "./Services/IUserTokenPayload";
import SearchService from "./Services/SearchService";
import UserService from "./Services/UserService";

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
    .bind<InstanceType<typeof YouTubeRepository>>(Types.WebhookRepository)
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

container.bind<IUserService>(Types.UserService).to(UserService);
container.bind<IAuthenticationService>(Types.AuthenticationService).to(AuthenticationService);
container.bind<ISearchService>(Types.SearchService).to(SearchService);
container.bind<IFeedService>(Types.FeedService).to(FeedService);

export default container;
