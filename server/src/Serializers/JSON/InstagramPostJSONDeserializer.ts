import InstagramPostBuilder from "../../Entities/InstagramPost/InstagramPostBuilder";
import Image from "../../Entities/Media/Image";
import MediaType from "../../Entities/Media/MediaType";
import Video from "../../Entities/Media/Video";
import IPostJSONSchema from "../../Schemas/JSON/Post/IPostJSONSchema";

export default function InstagramPostJSONDeserializer(schema: IPostJSONSchema) {
    const instagramPostBuilder = new InstagramPostBuilder();
    instagramPostBuilder
        .setCaption(schema.instagram.caption)
        .setChannelId(schema.channelId)
        .setCommentCount(schema.instagram.commentCount)
        .setCommentCursor(schema.instagram.commentCursor)
        .setCreatorId(schema.creatorId)
        .setId(schema.id)
        .setLikes(schema.instagram.likes)
        .setMedia(
            schema.instagram.media.map((media) =>
                media.type === MediaType.IMAGE
                    ? new Image("", media.url, 0, 0)
                    : new Video("", media.url, 0, 0, null)
            )
        )
        .setPostId(schema.instagram.id)
        .setTakenAt(schema.timeCreated)
        .setThumbnail(new Image("", schema.instagram.thumbnail.url, 0, 0));
    return instagramPostBuilder.build();
}
