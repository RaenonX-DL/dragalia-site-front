import React from 'react';

import {ImageProps} from './types';


export const ImageUnit = ({src, alt, className}: ImageProps) => (
  <img src={src} alt={alt} className={className}/>
);
