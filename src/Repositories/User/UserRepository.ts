import IDataStore from "../../DataStore/IDataStore";
import IUser from "../../Entities/User/IUser";
import CoreRepository from "../CoreRepository";
import RepositoryMixin from "../RepositoryMixin";

class UserRepository extends CoreRepository<IUser> {
    constructor(dataStore: IDataStore<IUser>) {
        super(dataStore);
    }
}

export default RepositoryMixin<IUser>()(UserRepository);
