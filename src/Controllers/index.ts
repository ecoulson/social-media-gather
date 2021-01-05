/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from "inversify";
import AuthenticationController from "./AuthenticationController";
import FeedController from "./FeedController";
import InstagramChannelController from "./InstagramChannelController";
import SearchController from "./SearchController";
import TwitchWebhookCallbackController from "./TwitchWebhookCallbackController";
import UserController from "./UsersController";
import YouTubeWebhookCallbackController from "./YouTubeWebhookCallbackController";

export default function ControllerFactory(container: Container): unknown[] {
    return [
        AuthenticationController,
        SearchController,
        UserController,
        FeedController,
        TwitchWebhookCallbackController,
        YouTubeWebhookCallbackController,
        InstagramChannelController
    ];
}
