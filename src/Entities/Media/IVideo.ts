import IImage from "./IImage";
import IMedia from "./IMedia";

export default interface IVideo extends IMedia {
    url(): string;
    width(): number;
    height(): number;
    thumbnail(): IImage;
}
