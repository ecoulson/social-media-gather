import ITweet from "../../Entities/Tweet/ITweet";
import BasicRecord from "../BasicRecord";
import RecordMixin from "../RecordMixin";

class TweetRecord extends BasicRecord<ITweet> {}

export default RecordMixin<ITweet>()(TweetRecord);
