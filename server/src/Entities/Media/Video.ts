import IImage from "./IImage";
import Image from "./Image";
import IVideo from "./IVideo";
import Media from "./Media";
import MediaType from "./MediaType";

export default class Video extends Media implements IVideo {
    constructor(
        id_: string,
        private url_: string,
        private height_: number,
        private width_: number,
        private thumbnail_: Image
    ) {
        super(id_, MediaType.VIDEO);
    }

    url(): string {
        return this.url_;
    }

    height(): number {
        return this.height_;
    }

    width(): number {
        return this.width_;
    }

    type(): MediaType {
        return MediaType.VIDEO;
    }

    thumbnail(): IImage {
        return this.thumbnail_;
    }
}
