import {useSelector} from 'react-redux';

import {ReduxState} from '../state';

export const useConfigSelector = () => {
  return useSelector((state: ReduxState) => state.config);
};
