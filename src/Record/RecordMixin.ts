import { MixinConstructor } from "../@Types";
import IEntity from "../Entities/IEntity";
import BasicRecord from "./BasicRecord";

type RecordMixinConstructor<EntityType extends IEntity> = MixinConstructor<BasicRecord<EntityType>>

function RecordMixin<EntityType extends IEntity>() {
    return <BaseType extends RecordMixinConstructor<EntityType>>(Base: BaseType) => {
        return class Record extends Base {
            async findById(id: string) {
                return await this.dataStore.findById(id);
            }
        };
    }
}

export default RecordMixin;