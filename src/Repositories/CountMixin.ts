import { MixinConstructor } from "../@Types";
import IEntity from "../Entities/IEntity";
import CoreRepository from "./CoreRepository";
import ICountMixin from "./ICountMixin";

export type CountMixinConstructor<EntityType extends IEntity> = MixinConstructor<
    CoreRepository<EntityType>
>;

function CountMixin<Entity extends IEntity>() {
    // TODO: resolve this return type
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return <BaseType extends CountMixinConstructor<Entity>>(Base: BaseType) => {
        return class CountMixin extends Base implements ICountMixin {
            async count(): Promise<number> {
                return this.dataStore.count();
            }

            async estimatedCount(): Promise<number> {
                return this.dataStore.estimatedCount();
            }
        };
    };
}

export default CountMixin;
