import { injectable } from "inversify";
import IPost from "../../Entities/Post/IPost";
import CoreRepository from "../CoreRepository";
import RepositoryMixin from "../RepositoryMixin";

@injectable()
class PostRepository extends CoreRepository<IPost> {}

export default RepositoryMixin<IPost>()(PostRepository);
