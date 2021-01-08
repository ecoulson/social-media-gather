import IUser from "../Entities/User/IUser";
import Exception from "./Exception";

export default class IllegalLoginException extends Exception {
    constructor(user: IUser) {
        super(`Attempted to login in to user@${user.id()} with invalid credentials`);
    }
}
