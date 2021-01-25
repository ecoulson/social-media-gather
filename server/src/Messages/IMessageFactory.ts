import IMessageJSONSchema from "../Schemas/JSON/Message/IMessageJSONSchema";
import MessageType from "./MessageType";
import IChannelSearchResultBody from "./Bodies/IChannelSearchResultBody";
import ICreateChanneBody from "./Bodies/ICreateChannelBody";
import IErrorBody from "./Bodies/IErrorBody";
import IPostsBody from "./Bodies/IPostsBody";
import IIsFollowingBody from "./Bodies/IIsFollowingBody";
import IMessageBody from "./Bodies/IMessageBody";
import ITokenBody from "./Bodies/ITokenBody";
import IUsersBody from "./Bodies/IUsersBody";
import IMessage from "./IMessage";
import Message from "./Message";
import MetaData from "./MetaData";
import { v4 as uuid } from 'uuid';

export default class IMessageFactory {
    create(message: IMessageJSONSchema) {
        switch (message.metadata.type) {
            case MessageType.ChannelSearchResult:
                return this.createMessage<IChannelSearchResultBody>(message);
            case MessageType.CreateChannel:
                return this.createMessage<ICreateChanneBody>(message);
            case MessageType.DeletedUser:
            case MessageType.Unauthenticated:
            case MessageType.UserDoesNotExist:
            case MessageType.UserExists:
                return this.createMessage<IMessageBody>(message);
            case MessageType.Error:
                return this.createMessage<IErrorBody>(message);
            case MessageType.Posts:
                return this.createMessage<IPostsBody>(message);
            case MessageType.IsFollowing:
                return this.createMessage<IIsFollowingBody>(message);
            case MessageType.Success:
                return this.createMessage(message);
            case MessageType.Token:
                return this.createMessage<ITokenBody>(message);
            case MessageType.Users:
                return this.createMessage<IUsersBody>(message);
        }
    }

    private createMessage<T>({ metadata, data }: IMessageJSONSchema): IMessage<T> {
        return new Message(new MetaData(uuid(), metadata.succes, metadata.type), data as T);
    }
}
