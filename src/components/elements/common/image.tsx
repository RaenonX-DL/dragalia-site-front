import React from 'react';

import {OverlayTooltip} from './overlay/tooltip';


type ImageIconProps = {
  className?: string,
  src: string,
  text: string,
  style?: React.CSSProperties,
}

// `...props` is required for triggering the overlay
export const Image = ({text, src, className, style, ...props}: ImageIconProps) => (
  <img src={src} alt={text} style={style} className={className} {...props}/>
);

export const ImageWithOverlay = ({text, src, className, style}: ImageIconProps) => (
  <OverlayTooltip text={text} key={text}>
    <Image src={src} text={text} style={style} className={className}/>
  </OverlayTooltip>
);
