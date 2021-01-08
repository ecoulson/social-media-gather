import IInstagramPost from "../../Entities/InstagramPost/IInstagramPost";
import CoreRepository from "../CoreRepository";
import RepositoryMixin from "../RepositoryMixin";

class InstagramPostRepository extends CoreRepository<IInstagramPost> {}

export default RepositoryMixin<IInstagramPost>()(InstagramPostRepository);
