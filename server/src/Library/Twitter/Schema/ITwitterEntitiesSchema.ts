import ITwitterHashtagSchema from "./ITwitterHashtagSchema";
import ITwitterMediaSchema from "./ITwitterMediaSchema";
import ITwitterPlaceSchema from "./ITwitterPlaceSchema";
import ITwitterSymbolSchema from "./ITwitterSymbolSchema";
import ITwitterURLSchema from "./ITwitterURLSchema";
import ITwitterUserMentionsSchema from "./ITwitterUserMentionsSchema";

export default interface ITwitterEntitiesSchema {
    hashtags: ITwitterHashtagSchema[];
    media: ITwitterMediaSchema[];
    urls: ITwitterURLSchema[];
    user_mentions: ITwitterUserMentionsSchema[];
    symbols: ITwitterSymbolSchema[];
    polls: ITwitterPlaceSchema[];
}
