import React from 'react';

import {ImageInHTML} from '../transformers/image/main';
import {Text} from '../transformers/text/main';
import {MarkdownComponentProps} from '../types';


export const renderImage = ({node}: MarkdownComponentProps) => {
  const imageSrc = node.properties?.src;
  const imageAlt = node.properties?.alt;

  if (!imageSrc || !imageAlt) {
    return <Text>{(imageSrc || imageAlt || '').toString()}</Text>;
  }

  return <ImageInHTML src={imageSrc.toString()} alt={imageAlt.toString()}/>;
};
