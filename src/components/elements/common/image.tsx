import React from 'react';

import {OverlayTooltip} from './overlay/tooltip';


type ImageIconProps = {
  className?: string,
  src: string,
  text: string,
  style?: React.CSSProperties,
}

export const Image = ({text, src, className, style}: ImageIconProps) => (
  <img src={src} alt={text} style={style} className={className}/>
);

export const ImageWithOverlay = ({text, src, className, style}: ImageIconProps) => (
  <OverlayTooltip text={text}>
    <Image src={src} text={text} style={style} className={className}/>
  </OverlayTooltip>
);
