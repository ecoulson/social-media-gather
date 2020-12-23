import ITwitchVideo from "../../Entities/TwitchVideo/ITwitchVideo";
import BasicRecord from "../BasicRecord";
import RecordMixin from "../RecordMixin";
import ITwitchVideoRecord from "./ITwitchVideoRecord";

class TwitchVideoRecord extends BasicRecord<ITwitchVideo> implements ITwitchVideoRecord {

}

export default RecordMixin<ITwitchVideo>()(TwitchVideoRecord);