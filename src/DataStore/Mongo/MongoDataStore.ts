import { Document as MongooseDocument, Model, MongooseFilterQuery, UpdateQuery } from "mongoose";
import { Transformer } from "../../@Types";
import IEntity from "../../Entities/IEntity";
import IDataStore from "../IDataStore";

type Query<T> = MongooseFilterQuery<T>;

export default class MongoDataStore<Document extends MongooseDocument, Entity extends IEntity>
    implements IDataStore<Entity> {
    constructor(
        private model: Model<Document>,
        private entityTransformer: Transformer<Document, Entity>,
        private updateQueryTransformer: Transformer<Entity, UpdateQuery<Document>>
    ) {}

    async find(query: Query<Document>): Promise<Entity[]> {
        const documents = await this.model.find(query).exec();
        return documents.map((document) => this.entityTransformer(document));
    }

    async findById(id: string): Promise<Entity> {
        return this.entityTransformer(await this.model.findById(id).exec());
    }

    async save(entity: Entity): Promise<Entity> {
        console.log(this.updateQueryTransformer(entity));
        return this.entityTransformer(
            await this.model
                .findByIdAndUpdate(entity.id(), this.updateQueryTransformer(entity))
                .exec()
        );
    }

    async delete(entity: Entity): Promise<Entity> {
        return this.entityTransformer(await this.model.findByIdAndDelete(entity.id()));
    }
}
