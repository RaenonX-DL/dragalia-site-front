import {History} from 'history';

import {scrollElementToTop} from '../../../../utils/scroll';
import {GoogleAnalytics} from '../../../../utils/services/ga';

export const scrollToAnchor = (history: History) => {
  const hashIndex = window.location.hash.indexOf('#');

  // Early termination on hash string not found
  if (hashIndex === -1) {
    return;
  }

  const anchorHashId = window.location.hash.substr(hashIndex + 1);
  const anchorElement = document.getElementById(anchorHashId);

  if (anchorElement) {
    scrollElementToTop(anchorElement);
    history.push(window.location); // Push history (change URL in address bar without jumping)
  }

  GoogleAnalytics.anchor(anchorElement ? 'navigate' : 'navFailed', anchorHashId);
};
