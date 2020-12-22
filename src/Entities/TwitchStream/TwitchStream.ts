import { IImage } from "../Image/IImage";
import ITwitchStream from "./ITwitchStream";
import ITwitchStreamDTO from "./ITwitchStreamDTO";

export default class TwitchStream implements ITwitchStream {
    private viewers_ : number;
    private isLive_ : boolean;
    private thumbnails_ : IImage[];
    private timeStarted_ : Date;
    private url_ : string;
    private title_ : string;
    private creator_ : any;
    private id_ : string;
    private gameId_ : string;
    private streamId_ : string;

    constructor(streamDTO : ITwitchStreamDTO) {
        this.viewers_ = streamDTO.viewers;
        this.isLive_ = streamDTO.isLive;
        this.thumbnails_ = streamDTO.thumbnails;
        this.timeStarted_ = streamDTO.timeStarted,
        this.url_ = streamDTO.url;
        this.title_ = streamDTO.title;
        this.creator_ = streamDTO.creator;
        this.id_ = streamDTO.id;
        this.gameId_ = streamDTO.gameId;
        this.streamId_ = streamDTO.streamId;
    }

    viewers() {
        return this.viewers_;
    }

    updateViewers(viewers : number) {
        this.viewers_ = viewers;
    }

    isLive() {
        return this.isLive_;
    }

    thumbnails() {
        return this.thumbnails_;
    }

    timeStarted() {
        return this.timeStarted_;
    }

    url() {
        return this.url_;
    }

    title() {
        return this.title_;
    }

    streamerName() {
        return this.creator_.getScreenName();
    }

    creator() {
        return this.creator_;
    }

    id() {
        return this.id_;
    }

    gameId() {
        return this.gameId_;
    }

    streamId() {
        return this.streamId_;
    }

    endStream() {
        this.isLive_ = false;
    }
}