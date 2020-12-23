import IMedia from "./IMedia";

export default interface IImage extends IMedia {
    width() : number;
    height() : number;
    url() : string;
}