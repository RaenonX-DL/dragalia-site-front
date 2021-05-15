import {FastifyReply, FastifyRequest, RouteHandlerMethod} from 'fastify';

import {isReactApp} from './react';
import {isAccessRestricted} from './restrict';
import {isStaticFile} from './static';
import {HandlerFunction} from './types';


export const mainHandler: RouteHandlerMethod = async (req: FastifyRequest, res: FastifyReply) => {
  // ORDER MATTERS!!
  const handlers: Array<HandlerFunction> = [
    isAccessRestricted,
    isStaticFile,
    isReactApp,
  ];

  for (const handler of handlers) {
    if (await handler(req, res)) {
      return;
    }
  }
};
