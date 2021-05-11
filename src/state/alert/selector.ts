import {useSelector} from 'react-redux';

import {ReduxState} from '../state';

export const useAlertSelector = () => {
  return useSelector((state: ReduxState) => state.alert);
};
