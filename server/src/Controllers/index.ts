/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from "inversify";
import AuthenticationController from "./AuthenticationController";
import FeedController from "./FeedController";
import InstagramChannelController from "./InstagramChannelController";
import SearchController from "./SearchController";
import TestController from "./ChannelController";
import TwitchChannelController from "./TwitchChannelController";
import TwitchWebhookCallbackController from "./TwitchWebhookCallbackController";
import TwitterChannelController from "./TwitterChannelController";
import UserController from "./UsersController";
import YouTubeChannelController from "./YouTubeChannelController";
import YouTubeWebhookCallbackController from "./YouTubeWebhookCallbackController";
import CreatorController from "./CreatorController";
import CommentsController from "./CommentsController";

export default function ControllerFactory(container: Container): unknown[] {
    return [
        AuthenticationController,
        SearchController,
        UserController,
        FeedController,
        TwitchWebhookCallbackController,
        YouTubeWebhookCallbackController,
        InstagramChannelController,
        TwitterChannelController,
        TwitchChannelController,
        YouTubeChannelController,
        TestController,
        CreatorController,
        CommentsController
    ];
}
