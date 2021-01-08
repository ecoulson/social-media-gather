import ITwitterVideoVariant from "./ITwitterVideoVariant";

export default interface ITwitterVideoInfoSchema {
    aspect_ratio: [number, number];
    duration_millis: number;
    variants: ITwitterVideoVariant[];
}
