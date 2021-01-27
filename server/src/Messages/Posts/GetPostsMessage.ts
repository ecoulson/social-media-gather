import IGetPostsBody from "../Bodies/IGetPostsBody";
import Message from "../Message";
import MetaData from "../MetaData";
import { v4 as uuid } from "uuid";
import MessageType from "../MessageType";

export default class GetPostsMessage extends Message<IGetPostsBody> {
    constructor(ids: string[]) {
        super(new MetaData(uuid(), true, MessageType.GetPosts), {
            ids
        });
    }
}
