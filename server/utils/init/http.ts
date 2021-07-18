import {FastifyInstance} from 'fastify';

import {isProduction} from '../misc';


export const initHttp = async (app: FastifyInstance) => {
  await app.listen(
    process.env.PORT || 3000,
    isProduction() ? '0.0.0.0' : 'localhost',
  );
  console.log('App started listening.', app.server.address());
};
