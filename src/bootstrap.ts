import { RequestHandler } from "express";
import { Container } from "inversify";
import Tags from "./@Types/Tags";
import Types from "./@Types/Types";
import InstagramPostMongoStore from "./DataStore/Mongo/InstagramPost/InstagramPostMongoStore";
import TweetMongoDataStore from "./DataStore/Mongo/Tweet/TweetMongoDataStore";
import TwitchStreamMongoDataStore from "./DataStore/Mongo/TwitchStream/TwitchStreamMongoDataStore";
import TwitchVideoMongoDataStore from "./DataStore/Mongo/TwitchVideo/TwitchVideoMongoDataStore";
import UserMongoDataStore from "./DataStore/Mongo/User/UserMongoDataStore";
import WebhookMongoDataStore from "./DataStore/Mongo/Webhook/WebhookMongoDataStore";
import YouTubeVideoMongoDataStore from "./DataStore/Mongo/YouTubeVideo/YouTubeVideoMongoDataStore";
import requiresAuth from "./Middleware/RequiresAuth";
import InstagramPostRecord from "./Records/InstagramPost/InstagramPostRecord";
import TweetRecord from "./Records/Tweet/TweetRecord";
import TwitchStreamRecord from "./Records/TwitchStream/TwitchStreamRecord";
import TwitchVideoRecord from "./Records/TwitchVideo/TwitchVideoRecord";
import UserRecord from "./Records/User/UserRecord";
import WebhookRecord from "./Records/Webhook/WebhookRecord";
import YouTubeRecord from "./Records/YouTubeVideo/YouTubeRecord";
import UserService from "./Services/UserService";

const container = new Container();

const mongoInstagramRecord = new InstagramPostRecord(new InstagramPostMongoStore());
const mongoTweetRecord = new TweetRecord(new TweetMongoDataStore());
const mongoTwitchStreamRecord = new TwitchStreamRecord(new TwitchStreamMongoDataStore());
const mongoTwitchVideoRecord = new TwitchVideoRecord(new TwitchVideoMongoDataStore());
const mongoUserRecord = new UserRecord(new UserMongoDataStore());
const mongoWebhookRecord = new WebhookRecord(new WebhookMongoDataStore());
const mongoYouTubeRecord = new YouTubeRecord(new YouTubeVideoMongoDataStore());

container
    .bind<InstanceType<typeof UserRecord>>(Types.UserRecord)
    .toConstantValue(mongoUserRecord)
    .whenTargetTagged(Tags.MONGO, true);
container
    .bind<InstanceType<typeof InstagramPostRecord>>(Types.InstagramPostRecord)
    .toConstantValue(mongoInstagramRecord)
    .whenTargetTagged(Tags.MONGO, true);
container
    .bind<InstanceType<typeof TweetRecord>>(Types.TweetRecord)
    .toConstantValue(mongoTweetRecord)
    .whenTargetTagged(Tags.MONGO, true);
container
    .bind<InstanceType<typeof TwitchStreamRecord>>(Types.TwitchStreamRecord)
    .toConstantValue(mongoTwitchStreamRecord)
    .whenTargetTagged(Tags.MONGO, true);
container
    .bind<InstanceType<typeof TwitchVideoRecord>>(Types.TwitchVideoRecord)
    .toConstantValue(mongoTwitchVideoRecord)
    .whenTargetTagged(Tags.MONGO, true);
container
    .bind<InstanceType<typeof WebhookRecord>>(Types.WebhookRecord)
    .toConstantValue(mongoWebhookRecord)
    .whenTargetTagged(Tags.MONGO, true);
container
    .bind<InstanceType<typeof YouTubeRecord>>(Types.WebhookRecord)
    .toConstantValue(mongoYouTubeRecord)
    .whenTargetTagged(Tags.MONGO, true);

container
    .bind<RequestHandler>(Types.RequiresAuthentication)
    .toConstantValue(
        requiresAuth(
            container.getTagged<InstanceType<typeof UserRecord>>(Types.UserRecord, Tags.MONGO, true)
        )
    );

container.bind<UserService>(Types.UserService).to(UserService);

export default container;
