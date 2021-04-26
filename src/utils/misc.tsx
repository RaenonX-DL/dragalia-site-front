import React from 'react';

import {titleNavBarId} from '../components/elements/common/anchor/pageAnchor';


export const scrollToTop = <T extends HTMLElement>(refElement?: React.RefObject<T>) => {
  const topLocation = (
    (refElement?.current?.offsetTop || 0) -
    (document.getElementById(titleNavBarId)?.offsetHeight || 0)
  );

  window.scrollTo({top: topLocation, left: 0, behavior: 'smooth'});
};
