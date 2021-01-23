import { model, Schema } from "mongoose";
import IChannelDocument from "./IChannelDocument";

const channelSchema = new Schema({
    name: String,
    subscriberCount: Number,
    platform: String,
    platformId: {
        type: String,
        index: true
    }
});

export default model<IChannelDocument>("Channel", channelSchema);
