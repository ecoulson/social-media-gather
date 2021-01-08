import IMedia from "./IMedia";
import MediaType from "./MediaType";

export default abstract class Media implements IMedia {
    constructor(protected id_: string, protected type_: MediaType) {}

    id(): string {
        return this.id_;
    }

    type(): MediaType {
        return this.type_;
    }

    isType(type: MediaType): boolean {
        return this.type_ === type;
    }
}
