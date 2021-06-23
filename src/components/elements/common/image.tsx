import React from 'react';

import {OverlayTooltip} from './overlay/tooltip';


type ImageIconProps = {
  className?: string,
  src: string,
  text: string,
  style?: React.CSSProperties,
}

export const Image = ({text, src, className, style}: ImageIconProps) => (
  <OverlayTooltip text={text}>
    <img src={src} alt={text} style={style} className={className}/>
  </OverlayTooltip>
);
