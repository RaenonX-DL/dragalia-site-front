import {FastifyRequest} from 'fastify';
import Cookies from 'universal-cookie';

import {CookiesKeys} from '../../src/const/cookies';

export const getGoogleUid = (req: FastifyRequest): string => {
  return new Cookies(req.headers.cookie).get(CookiesKeys.GOOGLE_UID) || '';
};
