import {useLocation} from 'react-router-dom';

export const getParamValue = (paramName: string, defaultValue?: string): string | undefined => {
  const location = useLocation();

  return new URLSearchParams(location.search).get('start') || defaultValue;
};
