import Types from "../@Types/Types";
import container from "../bootstrap";
import IChannelService from "../Services/Channel/IChannelService";
import ICreatorService from "../Services/Creator/ICreatorService";
import IMessageQueue from "../MessageQueue/IMessageQueue";
import ChannelSubscriber from "../Subscribers/Channel/ChannelSubscriber";
import CreatorSubscriber from "../Subscribers/Creator/CreatorSubscriber";
import MediaChannelSubscriber from "../Subscribers/MediaChannel/MediaChannelSubscriber";
import Platform from "../Entities/Platform/Platform";
import IMediaPlatformService from "../Services/MediaChannel/IMediaPlatformService";
import PostSubscriber from "../Subscribers/Posts/PostSubscriber";
import IPostsService from "../Services/Posts/IPostsService";
import CommentSubscriber from "../Subscribers/Comments/CommentSubscriber";
import ICommentService from "../Services/Comment/ICommentService";

export default () => {
    const messageQueue = container.get<IMessageQueue>(Types.MessageQueue);
    const mediaPlatformMap = container.get<Map<Platform, IMediaPlatformService>>(
        Types.MediaPlatformMap
    );
    new ChannelSubscriber(container.get<IChannelService>(Types.ChannelService), messageQueue);
    new CreatorSubscriber(container.get<ICreatorService>(Types.CreatorService), messageQueue);
    new MediaChannelSubscriber(messageQueue, mediaPlatformMap);
    new PostSubscriber(messageQueue, container.get<IPostsService>(Types.PostsService));
    new CommentSubscriber(
        messageQueue,
        container.get<ICommentService>(Types.YouTubeCommentsService)
    );
};
