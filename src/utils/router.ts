import {NextRouter, useRouter} from 'next/router';

import {pathnameRemoveLang} from '../api-def/paths';


type UseNextRouterReturn = NextRouter & {
  pathnameNoLang: string,
  lang: string,
  push: NextRouter['push'],
};

export const useNextRouter = (): UseNextRouterReturn => {
  const router = useRouter();

  const lang = router.query.lang as string;

  const push: NextRouter['push'] = (url, as, options) => {
    if (typeof url !== 'string') {
      url.pathname = `/${lang}${url.pathname}`;
    } else {
      url = `/${lang}${url}`;
    }

    return router.push(url, as, options);
  };

  return {
    ...router,
    push,
    pathnameNoLang: pathnameRemoveLang(router.pathname),
    lang,
  };
};
