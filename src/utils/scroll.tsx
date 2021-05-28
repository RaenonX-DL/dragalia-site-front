import React from 'react';

import {titleNavBarId} from '../components/elements/common/anchor/pageAnchor';


export const scrollRefToTop = <T extends HTMLElement>(refElement?: React.RefObject<T>) => {
  scrollElementToTop(refElement?.current);
};

export const scrollElementToTop = (element?: HTMLElement | null) => {
  // FIXME: possible duplicate of `scrollToTop`?
  const topLocation = (
    (element?.offsetTop || 0) -
    (document.getElementById(titleNavBarId)?.offsetHeight || 0)
  );

  window.scrollTo({top: topLocation, left: 0, behavior: 'smooth'});
};
