import IDataStore from "../../DataStore/IDataStore";
import IYouTubeVideo from "../../Entities/YouTubeVideo/IYouTubeVideo";
import BasicRecord from "../BasicRecord";
import RecordMixin from "../RecordMixin";

class YouTubeVideoRecord extends BasicRecord<IYouTubeVideo> {
    constructor(dataStore: IDataStore<IYouTubeVideo>) {
        super(dataStore);
    }
}

export default RecordMixin<IYouTubeVideo>()(YouTubeVideoRecord);
