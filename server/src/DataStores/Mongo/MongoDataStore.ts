import { Document as MongooseDocument, Model, MongooseFilterQuery, UpdateQuery } from "mongoose";
import { Transformer } from "../../@Types";
import IEntity from "../../Entities/IEntity";
import IDataStore from "../IDataStore";
import IQuery from "../IQuery";

type Query<T> = MongooseFilterQuery<T>;

export default abstract class MongoDataStore<
    Document extends MongooseDocument,
    Entity extends IEntity
> implements IDataStore<Entity> {
    constructor(
        protected model: Model<Document>,
        protected entityTransform: Transformer<Document, Entity>,
        protected documentTransform: Transformer<Entity, Partial<Document>>
    ) {}

    async count(): Promise<number> {
        return this.model.countDocuments();
    }

    async estimatedCount(): Promise<number> {
        return this.model.estimatedDocumentCount();
    }

    async find(query: IQuery): Promise<Entity[]> {
        const documents = await this.model
            .find(query.where as Query<Document>)
            .skip(query.skip ? query.skip : 0)
            .limit(query.limit ? query.limit : 0)
            .sort(query.sort ? query.sort : {})
            .exec();
        return documents.map((document) => this.entityTransform(document));
    }

    async findById(id: string): Promise<Entity> {
        return this.entityTransform(await this.model.findById(id).exec());
    }

    async update(entity: Entity): Promise<Entity> {
        const updatedDocument = await this.model
            .findByIdAndUpdate(entity.id(), this.documentTransform(entity), { new: true })
            .exec();
        return this.entityTransform(updatedDocument);
    }

    async delete(entity: Entity): Promise<Entity> {
        return this.entityTransform(await this.model.findByIdAndDelete(entity.id()));
    }

    async persist(entity: Entity): Promise<Entity> {
        const entityDocument = new this.model(this.documentTransform(entity));
        await entityDocument.save();
        return this.entityTransform(entityDocument);
    }
}
