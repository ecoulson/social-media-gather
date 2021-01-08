import IDataStore from "../../DataStores/IDataStore";
import IYouTubeVideo from "../../Entities/YouTubeVideo/IYouTubeVideo";
import CoreRepository from "../CoreRepository";
import RepositoryMixin from "../RepositoryMixin";

class YouTubeVideoRepository extends CoreRepository<IYouTubeVideo> {
    constructor(dataStore: IDataStore<IYouTubeVideo>) {
        super(dataStore);
    }
}

export default RepositoryMixin<IYouTubeVideo>()(YouTubeVideoRepository);
