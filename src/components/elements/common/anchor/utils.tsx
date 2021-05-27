import {History} from 'history';

import {GoogleAnalytics} from '../../../../utils/services/ga';
import {titleNavBarId} from './pageAnchor';

export const scrollToAnchor = (history: History) => {
  const hashIndex = window.location.hash.indexOf('#');

  // Early termination on hash string not found
  if (hashIndex === -1) {
    return;
  }

  const anchorHashId = window.location.hash.substr(hashIndex + 1);
  const anchorElement = document.getElementById(anchorHashId);

  if (anchorElement) {
    scrollToElement(anchorElement);
    history.push(window.location); // Push history (change URL in address bar without jumping)
  }

  GoogleAnalytics.anchor(anchorElement ? 'navigate' : 'navFailed', anchorHashId);
};


export const scrollToElement = (element: HTMLElement) => {
  // FIXME: possible duplicate of `scrollToTop`?
  const titleNav = document.getElementById(titleNavBarId);

  const anchorHeight = element.getBoundingClientRect().top + window.pageYOffset;

  // Calculate the offset height of title nav bar
  const remUnit = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const offsetHeight = (titleNav?.offsetHeight || 0) + remUnit;

  window.scrollTo({
    top: anchorHeight - offsetHeight,
    left: 0,
    behavior: 'smooth',
  });
};
