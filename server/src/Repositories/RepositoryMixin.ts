import { MixinConstructor } from "../@Types";
import IQuery from "../DataStores/IQuery";
import assert from "assert";
import IEntity from "../Entities/IEntity";
import CoreRepository from "./CoreRepository";
import IRepositoryMixin from "./IRepositoryMixin";

export type RepositoryMixinConstructor<EntityType extends IEntity> = MixinConstructor<
    CoreRepository<EntityType>
>;

const EmptyId = "";

function RepositoryMixin<Entity extends IEntity>() {
    // TODO: resolve this return type
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return <BaseType extends RepositoryMixinConstructor<Entity>>(Base: BaseType) => {
        return class RepositoryMixin extends Base implements IRepositoryMixin<Entity> {
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

            async add(entity: Entity) {
                const createdEntity = await this.dataStore.persist(entity);
                assert.notStrictEqual(
                    createdEntity.id(),
                    EmptyId,
                    "The data store should set the id of the newly persisted entity"
                );
                return createdEntity;
            }

            async addAll(entities: Entity[]) {
                return Promise.all(entities.map((entity) => this.add(entity)));
            }
        };
    };
}

export default RepositoryMixin;
