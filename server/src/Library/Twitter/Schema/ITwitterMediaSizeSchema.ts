import ITwitterSizeSchema from "./ITwitterSizeSchema";

export default interface ITwitterMediaSizeSchema {
    thumb: ITwitterSizeSchema;
    large: ITwitterSizeSchema;
    medium: ITwitterSizeSchema;
    small: ITwitterSizeSchema;
}
