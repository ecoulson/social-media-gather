import { 
    Document as MongooseDocument, 
    Model, 
    MongooseFilterQuery
} from "mongoose";
import { Transformer } from "../@Types";
import IEntity from "../Entities/IEntity";
import IDataStore from "./IDataStore";

type Query<T> = MongooseFilterQuery<T>;

export class MongoDataStore<Document extends MongooseDocument, Entity extends IEntity> implements IDataStore<Entity> {
    constructor(
        private model : Model<Document>,
        private transformer : Transformer<Document, Entity>
    ) {}

    async find(query : Query<Document>) {
        return this.transformer(await this.model.findOne(query).exec());
    }

    async findById(id : string) {
        return this.transformer(await this.model.findById(id).exec());
    }

    async update(entity : Entity) {

    }

    async delete() {

    }
}