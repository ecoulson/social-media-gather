export default interface IException {
    getInnerException(): Error;
    getMessage(): string;
    getStack(): string;
}
