import {NextApiRequestCookies} from 'next/dist/server/api-utils';
import Cookies from 'universal-cookie';

import {CookiesKeys} from './keys';


type CookiesSource = NextApiRequestCookies | string;

const getCookiesSource = (cookiesSource?: CookiesSource) => {
  if (!cookiesSource) {
    return new Cookies();
  }

  return new Cookies(cookiesSource);
};


type GetCookies = <T extends string>(key: CookiesKeys, cookiesSource?: CookiesSource) => T | null;

export const getCookies: GetCookies = (key: CookiesKeys, cookiesSource?: CookiesSource) => {
  const cookies = getCookiesSource(cookiesSource);

  return cookies.get(key);
};


type SetCookies = (key: CookiesKeys, value: string, cookiesSource?: CookiesSource) => void;

export const setCookies: SetCookies = (key: CookiesKeys, value: string, cookiesSource?: CookiesSource) => {
  const cookies = getCookiesSource(cookiesSource);

  cookies.set(key, value, {path: '/'});
};
