import React from 'react';

import {NormalComponents} from 'react-markdown/src/ast-to-react';

import {ImageInHTML} from '../transformers/image/main';
import {Text} from '../transformers/text/main';


export const renderImage: NormalComponents['img'] = ({node}) => {
  const imageSrc = node.properties?.src;
  const imageAlt = node.properties?.alt;

  if (!imageSrc || !imageAlt) {
    return <Text>{(imageSrc || imageAlt || '').toString()}</Text>;
  }

  return <ImageInHTML src={imageSrc.toString()} alt={imageAlt.toString()}/>;
};
