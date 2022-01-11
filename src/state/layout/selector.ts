import {useSelector} from 'react-redux';

import {ReduxState} from '../types';
import {LayoutDataSelectorReturn} from './types';


export const useLayoutSelector = (): LayoutDataSelectorReturn => {
  return useSelector((state: ReduxState) => state.layout);
};
