import {URL} from 'url';

import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';

import {isSupportedLang} from '../../../src/api-def/api';
import {DEFAULT_LANG} from '../../../src/i18n/langCode';
import {CookiesKeys} from '../../../src/utils/cookies/keys';
import {getCookies} from '../../../src/utils/cookies/utils';
import {urlObjectToLegacy} from '../url';
import {NextHandler, Server, ServerHasLang} from './types';


const isUrlToBypass = (url: string) => {
  return url.includes('.') || url.startsWith('/api') || url.includes('next');
};

const getLanguage = (req: FastifyRequest) => {
  return getCookies(CookiesKeys.LANG, req.headers.cookie) || DEFAULT_LANG;
};

const handleByNext = async (req: FastifyRequest, res: FastifyReply, nextHandler: NextHandler, bypassed?: boolean) => {
  const parsedUrl = urlObjectToLegacy(
    new URL(req.url, `${req.protocol}://${req.hostname}`),
    bypassed ? {} : {lang: getLanguage(req)},
  );

  await nextHandler(req.raw, res.raw, parsedUrl);
  res.sent = true;
};

export const registerRoutes = (fastifyApp: FastifyInstance, nextHandler: NextHandler) => {
  // Catch requests to site root
  fastifyApp.all<Server>('/', async (req, res) => {
    res.redirect(`/${getLanguage(req)}`);
  });

  // Catch requests with a single depth
  fastifyApp.all<ServerHasLang>('/:lang', async (req, res) => {
    if (isUrlToBypass(req.url)) {
      await handleByNext(req, res, nextHandler, true);
      return;
    }
    if (!isSupportedLang(req.params.lang)) {
      res.redirect(`/${getLanguage(req)}/${req.params.lang}`);
      return;
    }

    await handleByNext(req, res, nextHandler);
  });

  // Catch requests with multiple levels
  fastifyApp.all<ServerHasLang>('/:lang/*', async (req, res) => {
    if (isUrlToBypass(req.url)) {
      await handleByNext(req, res, nextHandler, true);
      return;
    }
    if (!isSupportedLang(req.params.lang)) {
      res.redirect(`/${getLanguage(req)}${req.url}`);
      return;
    }

    await handleByNext(req, res, nextHandler);
  });
};
