import { MixinConstructor } from "../@Types";
import IQuery from "../DataStore/IQuery";
import IEntity from "../Entities/IEntity";
import BasicRecord from "./BasicRecord";

export type RecordMixinConstructor<EntityType extends IEntity> = MixinConstructor<BasicRecord<EntityType>>

function RecordMixin<Entity extends IEntity>() {
    return <BaseType extends RecordMixinConstructor<Entity>>(Base: BaseType) => {
        return class Record extends Base {
            async findById(id: string) {
                return this.dataStore.findById(id);
            }

            async find(query : IQuery) {
                return this.dataStore.find(query);
            }

            async save(entity : Entity) {
                return this.dataStore.save(entity);
            }

            async delete(entity : Entity) {
                return this.dataStore.delete(entity);
            }
        };
    }
}

export default RecordMixin;