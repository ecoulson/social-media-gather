enum MessageType {
    SetupMediaChannel = "SetupMediaChannel",
    GetPosts = "GetPosts",
    GetChannels = "GetChannels",
    GetComments = "GetComments",
    CreateChannel = "CreateChannel",
    CreateCreator = "CreateCreator",
    CreateComments = "CreateComments",
    Creators = "Creators",
    Comments = "Comments",
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
