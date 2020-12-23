import ITweet from "../../Entities/Tweet/ITweet";
import BasicRecord from "../BasicRecord";
import RecordMixin from "../RecordMixin";
import ITweetRecord from "./ITweetRecord";

class TweetRecord extends BasicRecord<ITweet> implements ITweetRecord {

}

export default RecordMixin<ITweet>()(TweetRecord);