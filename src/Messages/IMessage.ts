import IMessageStructure from "./IMessageStructure";

export default interface IMessage {
    create(): IMessageStructure;
}
