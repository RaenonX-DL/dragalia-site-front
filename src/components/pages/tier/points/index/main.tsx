import React from 'react';

import {Loading} from '../../../../elements/common/loading';
import {useKeyPointData} from '../../hooks';


export const KeyPointIndexPage = () => {
  const {isFetched} = useKeyPointData();

  if (!isFetched) {
    return <Loading/>;
  }

  return <>WIP</>;
};
