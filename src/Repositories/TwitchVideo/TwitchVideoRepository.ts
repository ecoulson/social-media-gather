import ITwitchVideo from "../../Entities/TwitchVideo/ITwitchVideo";
import CoreRepository from "../CoreRepository";
import RepositoryMixin from "../RepositoryMixin";

class TwitchVideoRepository extends CoreRepository<ITwitchVideo> {}

export default RepositoryMixin<ITwitchVideo>()(TwitchVideoRepository);
