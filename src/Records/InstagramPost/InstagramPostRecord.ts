import IInstagramPost from "../../Entities/InstagramPost/IInstagramPost";
import BasicRecord from "../BasicRecord";
import RecordMixin from "../RecordMixin";
import IInstagramPostRecord from "./IInstagramPostRecord";

class InstagramPostRecord extends BasicRecord<IInstagramPost> implements IInstagramPostRecord {

}

export default RecordMixin<IInstagramPost>()(InstagramPostRecord);