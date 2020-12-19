import React from 'react';
import {GoogleAnalytics} from '../../../constants/ga';


export const titleNavBarId = 'nav-title';


type PageAnchorProps = {
  name: string,
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  text: string,
  className?: string
}


const calcOffsetHeight = (elem: HTMLElement | null | undefined) => {
  if (!elem) {
    return 0;
  }

  const offset = elem.offsetTop;
  const parent = elem.offsetParent;

  if (offset == 0 && parent) {
    return calcOffsetHeight(parent as HTMLElement);
  }
  return offset;
};


export const scrollToAnchor = (hash: string = window.location.hash) => {
  // Early termination on hash undefined or empty
  if (!hash) {
    return;
  }

  // Get the anchor element and the title element
  const anchor = document.getElementById(hash.substr(1));
  const titleNav = document.getElementById(titleNavBarId);

  if (anchor) {
    const anchorHeight = calcOffsetHeight(anchor);

    // Calculate the offset height of title nav bar
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const offsetHeight = (titleNav?.offsetHeight || 0) + rem;

    // Scrolling (jump) - Safari does not support using options yet
    window.scrollTo(0, anchorHeight - offsetHeight);
    history.pushState(null, document.title, hash); // Push history (change URL bar too, without jumping)
    GoogleAnalytics.anchor('navigate', hash);
  } else {
    GoogleAnalytics.anchor('navFailed', hash);
  }
};


export const PageAnchor = ({name, type, text, className = ''}: PageAnchorProps) => {
  const anchorOnClick = (e) => {
    e.preventDefault();

    const anchorHash = e.target.getAttribute('href');

    GoogleAnalytics.anchor('click', anchorHash);

    // Not using `e.target.href` since it returns the full URL, but we only want the hash name
    scrollToAnchor(anchorHash);
  };

  if (type === 'h1') {
    return <h1 className={className} id={name}>{text}&nbsp;<a href={`#${name}`} onClick={anchorOnClick}>#</a></h1>;
  } else if (type === 'h2') {
    return <h2 className={className} id={name}>{text}&nbsp;<a href={`#${name}`} onClick={anchorOnClick}>#</a></h2>;
  } else if (type === 'h3') {
    return <h3 className={className} id={name}>{text}&nbsp;<a href={`#${name}`} onClick={anchorOnClick}>#</a></h3>;
  } else if (type === 'h4') {
    return <h4 className={className} id={name}>{text}&nbsp;<a href={`#${name}`} onClick={anchorOnClick}>#</a></h4>;
  } else if (type === 'h5') {
    return <h5 className={className} id={name}>{text}&nbsp;<a href={`#${name}`} onClick={anchorOnClick}>#</a></h5>;
  } else if (type === 'h6') {
    return <h6 className={className} id={name}>{text}&nbsp;<a href={`#${name}`} onClick={anchorOnClick}>#</a></h6>;
  } else {
    return <></>;
  }
};
