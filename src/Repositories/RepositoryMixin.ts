import { MixinConstructor } from "../@Types";
import IQuery from "../DataStore/IQuery";
import IEntity from "../Entities/IEntity";
import CoreRepository from "./CoreRepository";

export type RepositoryMixinConstructor<EntityType extends IEntity> = MixinConstructor<
    CoreRepository<EntityType>
>;

function RepositoryMixin<Entity extends IEntity>() {
    // TODO: resolve this return type
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return <BaseType extends RepositoryMixinConstructor<Entity>>(Base: BaseType) => {
        return class Repository extends Base {
            async findById(id: string) {
                return this.dataStore.findById(id);
            }

            async find(query?: IQuery) {
                return this.dataStore.find(query);
            }

            async update(entity: Entity) {
                return this.dataStore.update(entity);
            }

            async delete(entity: Entity) {
                return this.dataStore.delete(entity);
            }

            async create(entity: Entity) {
                return this.dataStore.persist(entity);
            }
        };
    };
}

export default RepositoryMixin;
