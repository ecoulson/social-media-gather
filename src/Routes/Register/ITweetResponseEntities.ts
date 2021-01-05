import { ITweetResponseMedia } from "./ITweetResponseMedia";
import { ITweetResponseUserMentions } from "./ITweetResponseUserMentions";
import { ITweetResponseUrls } from "./ITweetResponseUrls";
import { ITweetResponseHashtag } from "./ITweetResponseHashtag";

export interface ITweetResponseEntities {
    hashtags: ITweetResponseHashtag[];
    urls: ITweetResponseUrls[];
    user_mentions: ITweetResponseUserMentions[];
    media: ITweetResponseMedia[];
}
