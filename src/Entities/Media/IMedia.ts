import IEntity from "../IEntity";
import MediaType from "./MediaType";

export default interface IMedia extends IEntity {
    type() : MediaType;
    isType(type : MediaType) : boolean;
}