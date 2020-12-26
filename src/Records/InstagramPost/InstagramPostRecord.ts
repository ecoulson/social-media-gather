import IInstagramPost from "../../Entities/InstagramPost/IInstagramPost";
import BasicRecord from "../BasicRecord";
import RecordMixin from "../RecordMixin";

class InstagramPostRecord extends BasicRecord<IInstagramPost> {}

export default RecordMixin<IInstagramPost>()(InstagramPostRecord);
