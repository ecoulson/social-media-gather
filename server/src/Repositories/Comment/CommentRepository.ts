import IComment from "../../Entities/Comment/IComment";
import CoreRepository from "../CoreRepository";
import CountMixin from "../CountMixin";
import RepositoryMixin from "../RepositoryMixin";

class InstagramPostRepository extends CoreRepository<IComment> {}

export default RepositoryMixin<IComment>()(InstagramPostRepository);
