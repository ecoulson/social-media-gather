const transformFeed = (feed) => feed.map((post) => transformPost(post));

const transformPost = (post) => {
  switch (post.type) {
    case "YOUTUBE_VIDEO":
      return transformYouTubeVideo(post);
    case "TWITCH_VIDEO":
      return transformTwitchVideo(post);
    case "TWITCH_STREAM":
      return transformTwitchStream(post);
    case "TWEET":
      return transformTweet(post);
    case "INSTAGRAM_POST":
      return transformInstagramPost(post);
    default:
      return {};
  }
};

function transformYouTubeVideo(post) {
  return {
    id: post._id,
    type: post.type,
    publishedAt: post.youtubeVideo.publishedAt,
    title: post.youtubeVideo.title,
    media: {
      url: `https://youtube.com/watch?v=${post.youtubeVideo.videoId}`,
      thumbnailUrl: post.youtubeVideo.thumbnailUrl,
    },
    reactions: [
      {
        type: "likes",
        value: post.youtubeVideo.likes,
      },
      {
        type: "dislikes",
        value: post.youtubeVideo.dislikes,
      },
      {
        type: "views",
        value: post.youtubeVideo.views,
      },
      {
        type: "comments",
        value: post.youtubeVideo.commentCount,
      },
    ],
  };
}

function transformTwitchVideo(post) {
  return {
    id: post._id,
    type: post.type,
    author: post.twitchVideo.userName,
    publishedAt: post.twitchVideo.publishedAt,
    title: post.twitchVideo.title,
    media: {
      url: post.twitchVideo.url,
      thumbnailUrl: post.twitchVideo.thumbnailUrl,
    },
    reactions: [
      {
        type: "views",
        value: post.twitchVideo.views,
      },
    ],
  };
}

function transformTwitchStream(post) {
  return {
    id: post._id,
    type: post.type,
    author: post.twitchStream.userName,
    publishedAt: post.twitchStream.startedAt,
    title: post.twitchStream.title,
    media: {
      live: post.twitchStream.live,
      url: post.twitchStream.url,
      thumbnailUrl: post.twitchStream.thumbnailUrl
        .replace("{width}", "1080")
        .replace("{height}", "720"),
    },
    reactions: [
      {
        type: "views",
        value: post.twitchStream.viewers,
      },
    ],
  };
}

function transformTweet(post) {
  return {
    id: post.id,
    type: post.type,
    author: post.tweet.screenName,
    publishedAt: post.tweet.publishedAt,
    media: {
      content: post.tweet.media,
      text: post.tweet.text,
    },
    reactions: [
      {
        type: "favorites",
        value: post.tweet.favorites,
      },
      {
        type: "retweets",
        value: post.tweet.retweetCount,
      },
    ],
  };
}

function transformInstagramPost(post) {
  return {
    id: post._id,
    type: post.type,
    author: "",
    publishedAt: post.instagram.takenAt,
    media: {
      caption: post.instagram.caption,
      thumbnail: post.instagram.thumbnail,
      content: post.instagram.media,
    },
    reactions: [
      {
        type: "favorites",
        value: post.instagram.likes,
      },
      {
        type: "comments",
        value: post.instagram.commentCount,
      },
    ],
  };
}

export default transformFeed;
