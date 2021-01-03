enum MessageType {
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
    FeedMessage = "Feed"
}

export default MessageType;
