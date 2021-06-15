import React from 'react';

import {titleNavBarId} from '../components/elements/nav/const';


export const scrollRefToTop = <T extends HTMLElement>(refElement?: React.RefObject<T>) => {
  scrollElementToTop(refElement?.current);
};

export const scrollElementToTop = (element?: HTMLElement | null) => {
  const topLocation = (
    (element?.offsetTop || 0) -
    (document.getElementById(titleNavBarId)?.offsetHeight || 0)
  );

  window.scrollTo({top: topLocation, left: 0, behavior: 'smooth'});
};
