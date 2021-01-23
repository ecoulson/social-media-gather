import { Document } from "mongoose";
import Platform from "../../../Entities/Platform/Platform";

export default interface IChannelDocument extends Document {
    name: string;
    platformId: string;
    platform: Platform;
    subscriberCount: number;
}
