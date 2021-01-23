import { IUserJSONSchema } from "../../Schemas/JSON/User/IUserJSONSchema";

export default interface IUsersBody {
    users: IUserJSONSchema[];
}
