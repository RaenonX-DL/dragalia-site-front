import React from 'react';

import {ImageInHTML} from '../transformers/image/main';
import {isImage} from '../transformers/image/utils';
import {EmbeddedYoutubeVideo, extractVideoId} from '../transformers/youtube';
import {MarkdownComponentProps} from '../types';


type LinkComponentProps = MarkdownComponentProps & {
  href: string
}

export const renderLink = ({children, href}: LinkComponentProps) => {
  const videoId = extractVideoId(href);
  if (videoId) {
    return <EmbeddedYoutubeVideo videoId={videoId}/>;
  }

  if (isImage(href)) {
    return <ImageInHTML src={href} alt="image"/>;
  }

  return <a href={href} target="_blank" rel="noreferrer">{children}</a>;
};
