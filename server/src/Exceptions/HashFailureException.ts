import Exception from "./Exception";

export default class HashFailureException extends Exception {
    constructor(error: Error) {
        super("Failed to hash password", error);
    }
}
