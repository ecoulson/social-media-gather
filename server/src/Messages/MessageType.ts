enum MessageType {
    ChannelCreated = "ChannelCreated",
    SetupMediaChannel = "SetupMediaChannel",
    GetChannels = "GetChannels",
    CreateChannel = "CreateChannel",
    CreateCreator = "CreateCreator",
    CreatorCreated = "CreatorCreated",
    UserExists = "UserExists",
    UserDoesNotExist = "UserDoesNotExist",
    Error = "InternalError",
    Success = "Success",
    Users = "UsersMessage",
    Unauthenticated = "Unauthenticated",
    Token = "TokenMessage",
    Authenticated = "Authenticated",
    DeletedUser = "UserDeleted",
    IsFollowing = "IsFollowing",
    Posts = "PostsMessage",
    ChannelSearchResult = "ChannelSearchResult",
    Response = "Response",
    Channels = "ChannelsMessage"
}

export default MessageType;
