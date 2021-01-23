enum MessageType {
    ChannelCreatedMessage = "ChannelCreated",
    CreateChannelMessage = "CreateChannel",
    UserExistsMessage = "UserExists",
    UserDoesNotExistMessage = "UserDoesNotExist",
    Error = "InternalError",
    Success = "Success",
    UsersMessage = "UsersMessage",
    Unauthenticated = "Unauthenticated",
    TokenMessage = "TokenMessage",
    Authenticated = "Authenticated",
    DeletedUserMessage = "UserDeleted",
    IsFollowingMessage = "IsFollowing",
    PostsMessage = "PostsMessage",
    ChannelSearchResultMessage = "ChannelSearchResult"
}

export default MessageType;
