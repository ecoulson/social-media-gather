import ITwitterCoordinatesSchema from "./ITwitterCoordinatesSchema";
import ITwitterEntitiesSchema from "./ITwitterEntitiesSchema";
import ITwitterExtendedEntitiesSchema from "./ITwitterExtendedEntitiesSchema";
import ITwitterPlaceSchema from "./ITwitterPlaceSchema";
import ITwitterRuleSchema from "./ITwitterRuleSchema";
import { ITwitterUserSchema } from "./ITwitterUserSchema";

export default interface ITweetSchema {
    created_at: string;
    id: number;
    id_str: string;
    text: string;
    full_text: string;
    source: string;
    truncated: boolean;
    in_reply_to_status_id: number | null;
    in_reply_to_status_str: string | null;
    in_reply_to_user_id: number | null;
    in_reply_to_user_str: string | null;
    in_reply_to_screen_name: string | null;
    user: ITwitterUserSchema;
    coordinates: ITwitterCoordinatesSchema | null;
    place: ITwitterPlaceSchema | null;
    quoted_status_id?: number;
    quoted_status_id_str?: string;
    is_quote_status: boolean;
    quoted_status?: ITweetSchema;
    retweeted_status?: ITweetSchema;
    quote_count: number | null;
    reply_count: number;
    retweet_count: number;
    favorite_count: number | null;
    entities: ITwitterEntitiesSchema;
    extended_entities: ITwitterExtendedEntitiesSchema;
    favorited: boolean | null;
    retweeted: boolean;
    possibly_sensitive: boolean | null;
    filter_level: string;
    lang: string | null;
    matching_rules: ITwitterRuleSchema[];
    current_user_retweet?: {
        id: number;
        id_str: string;
    };
    scopes?: { [key: string]: boolean };
    withheld_copyright?: boolean;
    withheld_in_countries?: string[];
    withheld_scope?: string;
}