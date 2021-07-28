import {useSelector} from 'react-redux';

import {ReduxState} from '../types';


export const useBackupSelector = () => {
  return useSelector((state: ReduxState) => state.backup);
};
