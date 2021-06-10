import {IncomingMessage, ServerResponse} from 'http';
import {parse, UrlWithParsedQuery} from 'url';

import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';

import {isSupportedLang} from '../../../src/api-def/api';
import {DEFAULT_LANG} from '../../../src/i18n/langCode';
import {CookiesKeys} from '../../../src/utils/cookies/keys';
import {getCookies} from '../../../src/utils/cookies/utils';


type Server = {
  QueryString: {},
  Headers: {}
}

type ServerHasLang = Server & {
  Params: {lang: string},
}

type NextHandler = (req: IncomingMessage, res: ServerResponse, parsedUrl: UrlWithParsedQuery) => Promise<any>

export const registerHandlers = (fastifyApp: FastifyInstance, nextHandler: NextHandler) => {
  const isUrlToBypass = (url: string) => {
    return url.includes('.') || url.startsWith('/api') || url.includes('next');
  };

  const getLanguage = (req: FastifyRequest) => {
    return getCookies(CookiesKeys.LANG, req.headers.cookie) || DEFAULT_LANG;
  };

  const handleOnNext = async (req: FastifyRequest, res: FastifyReply) => {
    await nextHandler(
      req.raw,
      res.raw,
      {
        ...parse(req.url, true),
        query: {lang: getLanguage(req)},
      },
    );
    res.sent = true;
  };

  fastifyApp.all<Server>('/', async (req, res) => {
    res.redirect(`/${getLanguage(req)}`);
  });

  fastifyApp.all<ServerHasLang>('/:lang', async (req, res) => {
    if (isUrlToBypass(req.url)) {
      await handleOnNext(req, res);
      return;
    }
    if (!isSupportedLang(req.params.lang)) {
      res.redirect(`/${getLanguage(req)}/${req.params.lang}`);
      return;
    }

    await handleOnNext(req, res);
  });

  fastifyApp.all<ServerHasLang>('/:lang/*', async (req, res) => {
    if (isUrlToBypass(req.url)) {
      await handleOnNext(req, res);
      return;
    }
    if (!isSupportedLang(req.params.lang)) {
      res.redirect(`/${getLanguage(req)}${req.url}`);
      return;
    }

    await handleOnNext(req, res);
  });
};
