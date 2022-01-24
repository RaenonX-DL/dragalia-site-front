import {isProduction} from '../api-def/utils';


export const throwError = (errorMessage: string) => {
  if (isProduction()) {
    console.warn(errorMessage);
  } else {
    throw new Error(errorMessage);
  }
};
