import IImage from "./IImage";
import Media from "./Media";
import MediaType from "./MediaType";

export default class Image extends Media implements IImage {
    constructor(
        id_: string,
        private url_: string,
        private width_: number,
        private height_: number
    ) {
        super(id_, MediaType.IMAGE);
    }

    url(): string {
        return this.url_;
    }

    width(): number {
        return this.width_;
    }

    height(): number {
        return this.height_;
    }
}
