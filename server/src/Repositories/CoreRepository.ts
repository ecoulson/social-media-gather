import { injectable } from "inversify";
import IDataStore from "../DataStore/IDataStore";
import IEntity from "../Entities/IEntity";

@injectable()
export default class CoreRepository<EntityType extends IEntity> {
    constructor(protected dataStore: IDataStore<EntityType>) {}
}
