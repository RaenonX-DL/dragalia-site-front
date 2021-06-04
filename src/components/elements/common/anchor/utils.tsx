import {NextRouter} from 'next/router';

import {scrollElementToTop} from '../../../../utils/scroll';
import {GoogleAnalytics} from '../../../../utils/services/ga';

export const scrollToAnchor = (fnPushHistory: NextRouter['push']) => {
  const hashIndex = window.location.hash.indexOf('#');

  // Early termination on hash string not found
  if (hashIndex === -1) {
    return;
  }

  const anchorHashId = window.location.hash.substr(hashIndex + 1);
  const anchorElement = document.getElementById(anchorHashId);

  if (anchorElement) {
    scrollElementToTop(anchorElement);
    fnPushHistory(window.location).then(() => void 0); // Push history (change URL in address bar without jumping)
  }

  GoogleAnalytics.anchor(anchorElement ? 'navigate' : 'navFailed', anchorHashId);
};
