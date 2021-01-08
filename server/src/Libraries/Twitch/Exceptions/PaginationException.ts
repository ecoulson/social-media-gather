import Exception from "../../../Exceptions/Exception";

export default class PaginationException extends Exception {
    constructor(message: string) {
        super(message);
    }
}
