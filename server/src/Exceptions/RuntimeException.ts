import Exception from "./Exception";

export default class RuntimeException extends Exception {
    constructor(error?: Error) {
        if (!error) {
            super("", null);
        } else {
            super(error.message, null);
        }
    }
}
