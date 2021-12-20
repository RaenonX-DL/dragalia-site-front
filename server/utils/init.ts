import fastify, {FastifyInstance} from 'fastify';
import next from 'next';
import {NextServer} from 'next/dist/server/next';

import {registerHandlers} from './init/handlers';
import {isProduction} from './misc';


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
