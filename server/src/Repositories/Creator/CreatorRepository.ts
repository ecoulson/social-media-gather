import IDataStore from "../../DataStores/IDataStore";
import ICreator from "../../Entities/Creator/ICreator";
import UserRepository from "../User/UserRepository";

export default class CreatorRepository extends UserRepository {
    constructor(dataStore: IDataStore<ICreator>) {
        super(dataStore);
    }
}
