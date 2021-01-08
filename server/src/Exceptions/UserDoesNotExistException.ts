import Exception from "./Exception";

export default class UserDoesNotExistsException extends Exception {
    constructor(username: string) {
        super(`User with username '${username}' does not exist`);
    }
}
