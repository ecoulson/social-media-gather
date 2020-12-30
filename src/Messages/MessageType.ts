enum MessageType {
    UserExistsMessage = "UserExists",
    UserDoesNotExistMessage = "UserDoesNotExist",
    Error = "InternalError",
    UsersMessage = "UsersMessage",
    Unauthenticated = "Unauthenticated",
    TokenMessage = "TokenMessage",
    Authenticated = "Authenticated",
    DeletedUserMessage = "UserDeleted"
}

export default MessageType;
