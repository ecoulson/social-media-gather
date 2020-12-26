import IEntity from "../Entities/IEntity";
import IQuery from "./IQuery";

export default interface IDataStore<Entity extends IEntity> {
    findById(id: string): Promise<Entity>;
    find(query: IQuery): Promise<Entity[]>;
    save(entity: Entity): Promise<Entity>;
    delete(entity: Entity): Promise<Entity>;
}
