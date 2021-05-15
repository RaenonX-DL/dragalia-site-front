import {promises as fs} from 'fs';

import {FastifyReply, FastifyRequest} from 'fastify';
import fetch from 'node-fetch';
import Cookies from 'universal-cookie';

import {CookiesKeys} from '../../src/const/cookies';
import {API_PAGE_META} from '../const';
import {PATH_INDEX_HTML} from '../paths';
import {PageMetaResponse, replaceHtmlContent} from './react/html';

export const isReactApp = async (req: FastifyRequest, res: FastifyReply) => {
  // Load React HTML file
  let reactFile = await fs.readFile(PATH_INDEX_HTML, 'utf-8');

  // Send Page Meta HTTP request and process the response
  const payload = {
    googleUid: new Cookies(req.headers.cookie).get(CookiesKeys.GOOGLE_UID) || '',
  };
  const responseRaw = await fetch(`${API_PAGE_META}?${new URLSearchParams(payload).toString()}`);
  const responseJson = await responseRaw.json() as unknown as PageMetaResponse;

  // Replace the inner contents
  reactFile = replaceHtmlContent(reactFile, responseJson);

  // Send the file content
  res.type('text/html').send(reactFile);
  return true;
};
