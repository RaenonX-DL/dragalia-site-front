import React from 'react';

import {ImageInHTML, isImage} from './image';
import {EmbeddedYoutubeVideo, extractVideoId} from './youtube';

export const renderLink = (o: HTMLLinkElement) => {
  const videoId = extractVideoId(o.href);
  if (videoId) {
    return <EmbeddedYoutubeVideo videoId={videoId}/>;
  }

  if (isImage(o.href)) {
    return <ImageInHTML imageUrl={o.href} alt="image"/>;
  }

  return <a href={o.href}>{o.children}</a>;
};
