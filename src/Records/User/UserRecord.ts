import IDataStore from "../../DataStore/IDataStore";
import IUser from "../../Entities/User/IUser";
import BasicRecord from "../BasicRecord";
import RecordMixin from "../RecordMixin";
import IUserRecord from "./IUserRecord";

class UserRecord extends BasicRecord<IUser> implements IUserRecord {
    constructor(dataStore : IDataStore<IUser>) {
        super(dataStore);
    }
}

export default RecordMixin<IUser>()(UserRecord)