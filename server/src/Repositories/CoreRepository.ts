import { injectable } from "inversify";
import IDataStore from "../DataStores/IDataStore";
import IEntity from "../Entities/IEntity";

@injectable()
export default class CoreRepository<EntityType extends IEntity> {
    constructor(protected dataStore: IDataStore<EntityType>) {}
}
