import IQuery from "../DataStores/IQuery";
import IEntity from "../Entities/IEntity";

export default interface IRepositoryMixin<Entity extends IEntity> {
    find(query?: IQuery): Promise<Entity[]>;
    findById(id: string): Promise<Entity>;
    update(entity: Entity): Promise<Entity>;
    delete(entity: Entity): Promise<Entity>;
    add(entity: Entity): Promise<Entity>;
}
