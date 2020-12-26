import ITwitchVideo from "../../Entities/TwitchVideo/ITwitchVideo";
import BasicRecord from "../BasicRecord";
import RecordMixin from "../RecordMixin";

class TwitchVideoRecord extends BasicRecord<ITwitchVideo> {}

export default RecordMixin<ITwitchVideo>()(TwitchVideoRecord);
