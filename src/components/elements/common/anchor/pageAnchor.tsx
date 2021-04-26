import React from 'react';

import {GoogleAnalytics} from '../../../../utils/services/ga';
import {scrollToAnchor} from './utils';


export const titleNavBarId = 'nav-title'; // Global element ID for the nav bar title

type PageAnchorProps = {
  name: string,
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  text: string,
  className?: string
}

export const PageAnchor = ({name, type, text, className = ''}: PageAnchorProps) => {
  const anchorOnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const anchorHash = e.currentTarget.getAttribute('href');

    if (!anchorHash) {
      GoogleAnalytics.anchor('navFailed', '');
      return;
    }

    GoogleAnalytics.anchor('click', anchorHash);

    // Not using `e.target.href` since it returns the full URL, but we only want the hash name
    scrollToAnchor(anchorHash);
  };

  const commonProps = {
    className,
    id: name,
  };

  if (type === 'h1') {
    return <h1 {...commonProps}>{text}&nbsp;<a href={`#${name}`} onClick={anchorOnClick}>#</a></h1>;
  }
  if (type === 'h2') {
    return <h2 {...commonProps}>{text}&nbsp;<a href={`#${name}`} onClick={anchorOnClick}>#</a></h2>;
  }
  if (type === 'h3') {
    return <h3 {...commonProps}>{text}&nbsp;<a href={`#${name}`} onClick={anchorOnClick}>#</a></h3>;
  }
  if (type === 'h4') {
    return <h4 {...commonProps}>{text}&nbsp;<a href={`#${name}`} onClick={anchorOnClick}>#</a></h4>;
  }
  if (type === 'h5') {
    return <h5 {...commonProps}>{text}&nbsp;<a href={`#${name}`} onClick={anchorOnClick}>#</a></h5>;
  }
  if (type === 'h6') {
    return <h6 {...commonProps}>{text}&nbsp;<a href={`#${name}`} onClick={anchorOnClick}>#</a></h6>;
  }

  return <></>;
};
