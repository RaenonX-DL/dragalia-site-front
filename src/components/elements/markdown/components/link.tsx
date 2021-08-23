import React from 'react';

import {ExternalLink} from '../../common/link/external';
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

  return <ExternalLink href={href} newWindow>{children}</ExternalLink>;
};
