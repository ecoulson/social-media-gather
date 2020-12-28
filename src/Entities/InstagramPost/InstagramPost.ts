import IImage from "../Media/IImage";
import IMedia from "../Media/IMedia";
import IInstagramPost from "./IInstagramPost";

export default class InstagramPost implements IInstagramPost {
    constructor(
        private id_: string,
        private userId_: string,
        private postId_: string,
        private likes_: number,
        private takenAt_: Date,
        private caption_: string,
        private media_: IMedia[],
        private thumbnail_: IImage
    ) {}

    id(): string {
        return this.id_;
    }

    userId(): string {
        return this.userId_;
    }

    postId(): string {
        return this.postId_;
    }

    likes(): number {
        return this.likes_;
    }

    takenAt(): Date {
        return this.takenAt_;
    }

    caption(): string {
        return this.caption_;
    }

    media(): IMedia[] {
        return this.media_;
    }

    thumbnail(): IImage {
        return this.thumbnail_;
    }
}
