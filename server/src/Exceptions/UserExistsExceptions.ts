import Exception from "./Exception";

export default class UserExistsException extends Exception {
    constructor(username: string, email: string) {
        super(`User with username ${username} or email ${email} already exists`);
    }
}
