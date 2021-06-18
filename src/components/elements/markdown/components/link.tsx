import React from 'react';

import {ImageInHTML, isImage} from '../transformers/image';
import {EmbeddedYoutubeVideo, extractVideoId} from '../transformers/youtube';
import {MarkdownComponentProps} from '../types';


type LinkComponentProps = MarkdownComponentProps & {
  href: string
}

export const renderLink = ({children, href, ...props}: LinkComponentProps) => {
  const videoId = extractVideoId(href);
  if (videoId) {
    return <EmbeddedYoutubeVideo videoId={videoId}/>;
  }

  if (isImage(href)) {
    return <ImageInHTML imageUrl={href} alt="image"/>;
  }

  return <a href={href} target="_blank" rel="noreferrer" {...props}>{children}</a>;
};
