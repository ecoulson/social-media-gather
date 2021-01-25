import React, { useEffect, useState } from "react";
import CreatorMediaContainer from "./CreatorMediaContainer";
import MediaIcon from "../../../../../MediaIcon";
import MediaIconType from "../../../../../MediaIcon/Type";

export default function CreatorMedias({ user, channels }) {
  const [media, setMedia] = useState([]);

  async function getMedias() {
    const medias = channels.map((channel) => {
      switch (channel.platform) {
        case "TWITCH":
          return <MediaIcon key={3} type={MediaIconType.TWITCH} />;
        case "YOUTUBE":
          return <MediaIcon key={2} type={MediaIconType.YOUTUBE} />;
        case "TWITTER":
          return <MediaIcon key={4} type={MediaIconType.TWITTER} />;
        case "INSTAGRAM":
          return <MediaIcon key={1} type={MediaIconType.INSTAGRAM} />;
      }
    });
    setMedia(medias);
  }

  useEffect(() => {
    getMedias();
  }, [channels]);

  return <CreatorMediaContainer>{media}</CreatorMediaContainer>;
}
