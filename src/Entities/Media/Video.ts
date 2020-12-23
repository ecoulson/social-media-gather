import Image from "./Image";
import IMedia from "./IMedia";
import IVideo from "./IVideo";
import Media from "./Media";
import MediaType from "./MediaType";

export default class Video extends Media implements IVideo {
    constructor (
        id_ : string,
        private url_ : string,
        private height_ : number,
        private width_ : number,
        private thumbnail_ : Image
    ) {
        super(id_, MediaType.VIDEO)
    }

    url() {
        return this.url_;
    }

    height() {
        return this.height_;
    }

    width() {
        return this.width_;
    }

    type() {
        return MediaType.VIDEO;
    }

    thumbnail() {
        return this.thumbnail_
    }

    isType(type : MediaType) {
        return type === MediaType.VIDEO
    }
}