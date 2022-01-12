import React from 'react';

import {WH_RATIO_GT_ALLOW_FLUID} from './const';
import {Dimension, UseLayoutReturn} from './type';


const getWindowDimensions = (): Dimension => {
  const {innerWidth: width, innerHeight: height} = window;
  return {width, height};
};

export const useLayout = (): UseLayoutReturn => {
  const [dimension, setDimension] = React.useState(getWindowDimensions());
  const {width, height} = dimension;

  React.useEffect(() => {
    const onResize = () => {
      setDimension(getWindowDimensions());
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return {dimension, isLandscape: width / height > WH_RATIO_GT_ALLOW_FLUID};
};
