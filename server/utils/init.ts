import fastify, {FastifyInstance} from 'fastify';
// False-negative of duplicated import
import next from 'next'; // eslint-disable-line import/no-duplicates
import {NextServer} from 'next/dist/server/next'; // eslint-disable-line import/no-duplicates

import {isProduction} from '../../src/api-def/utils';
import {registerHandlers} from './init/handlers';


type CreateAppReturn = {
  fastifyApp: FastifyInstance,
  nextApp: NextServer,
};

export const createApp = async (): Promise<CreateAppReturn> => {
  const nextApp = next({
    dev: !isProduction(),
    customServer: true,
  });

  const fastifyApp = fastify({
    logger: isProduction() ?
      true :
      {prettyPrint: {translateTime: true}},
    ignoreTrailingSlash: true,
    connectionTimeout: 20000, // 20 seconds
    trustProxy: true,
  });

  // Wait for `next` server to prepare
  await nextApp.prepare();

  const nextHandler = nextApp.getRequestHandler();

  registerHandlers(fastifyApp, nextHandler);

  return {nextApp, fastifyApp};
};
