import {GoogleAnalytics} from '../../../../utils/services/ga';
import {titleNavBarId} from './pageAnchor';


const calcOffsetHeight = (elem: HTMLElement | null | undefined): number => {
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

    window.scrollTo({
      top: anchorHeight - offsetHeight,
      left: 0,
      behavior: 'smooth',
    });
    history.pushState(null, document.title, hash); // Push history (change URL in address bar without jumping)
  }

  GoogleAnalytics.anchor(anchor ? 'navigate' : 'navFailed', hash);
};
