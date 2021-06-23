import React from 'react';

import {ImageProps} from './types';


export const ImageUnit = ({src, alt, className}: ImageProps) => (
  <a href={src} target="_blank" rel="noreferrer">
    <img src={src} alt={alt} className={className}/>
  </a>
);
