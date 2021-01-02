import IEntity from "../IEntity";
import PostType from "./PostType";

export default interface IPost extends IEntity {
    type(): PostType;
    isType(type: PostType): boolean;
}
