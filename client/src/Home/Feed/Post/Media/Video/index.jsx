import React, { useState } from "react";
import ReactPlayer from "react-player";
import Overlay from "./Overlay";

export default ({ thumbnailUrl, videoUrl, isLive = false }) => {
  const [shouldLoad, setLoaded] = useState(false);
  const loadVideo = () => setLoaded(true);

  if (!shouldLoad) {
    return (
      <Overlay
        thumbnailUrl={thumbnailUrl}
        isLive={isLive}
        onClick={loadVideo}
      />
    );
  }

  console.log(videoUrl);

  return (
    <ReactPlayer width="100%" height="500px" controls playing url={videoUrl} />
  );
};
