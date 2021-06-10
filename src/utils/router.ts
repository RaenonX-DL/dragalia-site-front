import {NextRouter, useRouter} from 'next/router';

import {pathnameRemoveLang} from './path/process';


type UseNextRouterReturn = NextRouter & {
  pathnameNoLang: string,
}

export const useNextRouter = (): UseNextRouterReturn => {
  const router = useRouter();

  return {...router, pathnameNoLang: pathnameRemoveLang(router.pathname)};
};
