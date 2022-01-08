import React from 'react';

import styles from '../main.module.css';


export const extractVideoId = (videoUrl: string): string | null => {
  const match = videoUrl.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);

  return (match && match[2].length === 11) ? match[2] : null;
};

type Props = {
  videoId: string
};

export const EmbeddedYoutubeVideo = ({videoId}: Props) => {
  const videoUrl = `//www.youtube.com/embed/${videoId}`;

  const allowedFeatures = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';

  return (
    <div className={`${styles['youtube-embed']} mb-2`}>
      <iframe
        className={`${styles['youtube-embed']} border-0`}
        title={`Youtube video: ${videoUrl}`}
        src={videoUrl}
        allow={allowedFeatures}
        allowFullScreen
        data-testid="youtubeEmbed"
      />
    </div>
  );
};
