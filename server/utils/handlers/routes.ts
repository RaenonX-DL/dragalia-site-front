import {URL} from 'url';

import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';

import {DEFAULT_LANG, isSupportedLang} from '../../../src/api-def/api';
import {urlRemoveLang} from '../../../src/api-def/paths';
import {CookiesKeys} from '../../../src/utils/cookies/keys';
import {getCookies} from '../../../src/utils/cookies/utils';
import {redirectLookup} from '../../const/redirect';
import {urlObjectToLegacy} from '../url';
import {NextHandler, Server, ServerHasLang} from './types';


const isUrlToBypass = (url: string) => {
  return url.includes('.') ||
    url.startsWith('/api') ||
    url.startsWith('/auth') ||
    url.includes('next');
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

const checkEarlyTermination = async <R extends FastifyRequest<ServerHasLang>>(
  req: R, res: FastifyReply, nextHandler: NextHandler,
  urlOnLangUnsupported: (req: R) => string,
): Promise<boolean> => {
  // URLs to bypass language fixing?
  if (isUrlToBypass(req.url)) {
    await handleByNext(req, res, nextHandler, true);
    return true;
  }

  // Language prefix check
  if (!isSupportedLang(req.params.lang)) {
    res.redirect(urlOnLangUnsupported(req));
    return true;
  }

  // Legacy URL redirection
  const redirectUrl = redirectLookup[urlRemoveLang(req.url)];
  if (redirectUrl) {
    // 301 for permanent redirect
    res.redirect(301, redirectUrl);
    return true;
  }

  return false;
};

export const registerRoutes = (fastifyApp: FastifyInstance, nextHandler: NextHandler) => {
  // Catch requests to site root
  fastifyApp.all<Server>('/', async (req, res) => {
    res.redirect(`/${getLanguage(req)}`);
  });

  // Catch requests with a single depth
  fastifyApp.all<ServerHasLang>('/:lang', async (req, res) => {
    const isEarlyTerminated = await checkEarlyTermination(
      req, res, nextHandler,
      (req) => `/${getLanguage(req)}/${req.params.lang}`,
    );
    if (isEarlyTerminated) {
      return;
    }

    await handleByNext(req, res, nextHandler);
  });

  // Catch requests with multiple levels
  fastifyApp.all<ServerHasLang>('/:lang/*', async (req, res) => {
    const isEarlyTerminated = await checkEarlyTermination(
      req, res, nextHandler,
      (req) => `/${getLanguage(req)}${req.url}`,
    );
    if (isEarlyTerminated) {
      return;
    }

    await handleByNext(req, res, nextHandler);
  });
};
