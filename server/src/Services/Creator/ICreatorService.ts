import ICreator from "../../Entities/Creator/ICreator";
import ICreateCreatorBody from "../../Messages/Bodies/ICreateCreatorBody";

export default interface ICreatorService {
    create(body: ICreateCreatorBody): Promise<ICreator>;
}
