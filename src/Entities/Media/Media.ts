import IMedia from "./IMedia";
import MediaType from "./MediaType";

export default abstract class Media implements IMedia {
    constructor(
        protected id_ : string,
        protected type_ : MediaType
    ) {}

    id() {
        return this.id_;
    }

    type() {
        return this.type_;
    }

    isType(type : MediaType) {
        return this.type_ === type;
    }
}