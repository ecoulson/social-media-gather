import IException from "./IException";

export default abstract class Exception extends Error implements IException {
    protected innerException: Error | null;

    constructor(message: string, innerError?: Error) {
        super(message);
        this.innerException = innerError;
    }

    getStack(): string {
        return this.stack;
    }

    getMessage(): string {
        return this.message;
    }

    getInnerException(): Error {
        return this.innerException;
    }
}
