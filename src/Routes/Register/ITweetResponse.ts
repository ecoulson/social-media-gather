import { ITwitterUser } from "./ITwitterUser";
import { ITweetResponseExtendedEntities } from "./ITweetResponseExtendedEntities";
import { ITweetResponseEntities } from "./ITweetResponseEntities";

export interface ITweetResponse {
    created_at: string | number | Date;
    id_str: string;
    full_text: string;
    user: ITwitterUser;
    entities: ITweetResponseEntities;
    extended_entities: ITweetResponseExtendedEntities;
    text: string;
}
