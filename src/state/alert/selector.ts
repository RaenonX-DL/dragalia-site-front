import {useSelector} from 'react-redux';

import {ReduxState} from '../types';
import {AlertSelectorReturn} from './types';


export const useAlertSelector = (): AlertSelectorReturn => {
  const alertData = useSelector((state: ReduxState) => state.alert);

  return {
    ...alertData,
    show: !!alertData.message,
  };
};
