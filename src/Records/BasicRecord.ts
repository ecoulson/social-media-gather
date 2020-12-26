import { injectable } from "inversify";
import IDataStore from "../DataStore/IDataStore";
import IEntity from "../Entities/IEntity";

@injectable()
export default class BasicRecord<EntityType extends IEntity> {
    constructor(protected dataStore: IDataStore<EntityType>) {}
}
