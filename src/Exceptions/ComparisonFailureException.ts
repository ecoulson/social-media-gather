import Exception from "./Exception";

export default class ComparisonFailureException extends Exception {
    constructor(error: Error) {
        super("Failed to compare plain text password to hashed password", error);
    }
}
