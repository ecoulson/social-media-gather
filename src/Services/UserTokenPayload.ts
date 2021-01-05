import IUser from "../Entities/User/IUser";
import IUserTokenPayload from "./IUserTokenPayload";

export default class UserTokenPayload implements IUserTokenPayload {
    public id: string;

    constructor(user: IUser) {
        this.id = user.id();
    }
}
