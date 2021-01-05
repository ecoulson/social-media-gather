import ITwitterBoundingBoxSchema from "./ITwitterBoundingBoxSchema";

export default interface ITwitterPlaceSchema {
    id: number;
    id_str: string;
    place_type: string;
    name: string;
    full_name: string;
    country_code: string;
    country: string;
    bounding_box: ITwitterBoundingBoxSchema;
    attributes: Record<string, unknown>;
}
