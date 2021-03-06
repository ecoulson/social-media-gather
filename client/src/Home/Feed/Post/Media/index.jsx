import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import Instagram from "./Instagram";
import Tweet from "./Tweet";
import Video from "./Video";

const FeedPostBody = styled(Box)`
  margin: 15px auto 5px;
  grid-area: media;
  width: 100%;
`;

export default ({ media, type }) => {
  return <FeedPostBody>{renderMedia(type)(media)}</FeedPostBody>;
};

const renderMedia = (type) => {
  switch (type) {
    case "TWITCH_VIDEO":
      return renderTwitchVideo;
    case "TWITCH_STREAM":
    case "YOUTUBE_VIDEO":
      return renderVideo;
    case "TWEET":
      return renderTweet;
    case "INSTAGRAM_POST":
      return renderInstagramPost;
    default:
      console.log("Unknown media type");
  }
};

const renderTwitchVideo = ({ live, url, thumbnailUrl }) => {
  const sizedThumbnailUrl = thumbnailUrl
    .replace("%{width}", "1080")
    .replace("%{height}", "720");
  return renderVideo({ live, url, thumbnailUrl: sizedThumbnailUrl });
};

const renderVideo = ({ live, url, thumbnailUrl }) => {
  return <Video isLive={live} thumbnailUrl={thumbnailUrl} videoUrl={url} />;
};

const renderTweet = (media) => {
  return <Tweet media={media} />;
};

const renderInstagramPost = (media) => {
  return <Instagram media={media} />;
};
