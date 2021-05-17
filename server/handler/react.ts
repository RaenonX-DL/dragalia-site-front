import {promises as fs} from 'fs';

import {FastifyReply, FastifyRequest} from 'fastify';

import {PATH_INDEX_HTML} from '../paths';
import {replaceHtmlContent} from './react/html';
import {getGoogleUid} from './utils';

export const isReactApp = async (req: FastifyRequest, res: FastifyReply) => {
  // Load React HTML file
  let reactFile = await fs.readFile(PATH_INDEX_HTML, 'utf-8');

  // Replace the inner contents
  reactFile = await replaceHtmlContent(getGoogleUid(req), req.url, reactFile);

  // Send the file content
  res.type('text/html').send(reactFile);
  return true;
};
