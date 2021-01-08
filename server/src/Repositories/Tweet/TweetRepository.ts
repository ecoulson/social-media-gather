import ITweet from "../../Entities/Tweet/ITweet";
import CoreRepository from "../CoreRepository";
import RepositoryMixin from "../RepositoryMixin";

class TweetRepository extends CoreRepository<ITweet> {}

export default RepositoryMixin<ITweet>()(TweetRepository);
