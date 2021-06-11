import {FastifyInstance} from 'fastify';

import {registerContentParsers} from '../handlers/contentParser';
import {registerRoutes} from '../handlers/routes';
import {NextHandler} from '../handlers/types';


export const registerHandlers = (fastifyApp: FastifyInstance, nextHandler: NextHandler) => {
  registerContentParsers(fastifyApp);
  registerRoutes(fastifyApp, nextHandler);
};
