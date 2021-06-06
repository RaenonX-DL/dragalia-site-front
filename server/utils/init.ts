import fastify, {FastifyInstance} from 'fastify';
import next from 'next';
import {NextServer} from 'next/dist/server/next';

import {nextConfig} from '../config';
import {isAppOnHeroku, isProduction} from './misc';

type CreateAppReturn = {
  fastifyApp: FastifyInstance,
  nextApp: NextServer,
}

export const createApp = async (): Promise<CreateAppReturn> => {
  const nextApp = next({
    dev: !isProduction(),
    customServer: true,
    conf: nextConfig,
  });

  const fastifyApp = fastify({
    logger: isProduction() ?
      true :
      {
        prettyPrint: {
          translateTime: true,
        },
      },
    connectionTimeout: 20000, // 20 seconds
    trustProxy: isAppOnHeroku(),
  });

  // Wait for `next` server to prepare
  await nextApp.prepare();

  const nextHandler = nextApp.getRequestHandler();

  fastifyApp.all('/*', async (req, res) => {
    await nextHandler(req.raw, res.raw);
    res.sent = true;
  });

  return {nextApp, fastifyApp};
};
