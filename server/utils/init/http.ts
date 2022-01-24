import env from 'env-var';
import {FastifyInstance} from 'fastify';


export const initHttp = async (app: FastifyInstance) => {
  await app.listen(
    env.get('PORT').default(3000).asIntPositive(),
    'localhost',
  );
  console.log('App started listening.', app.server.address());
};
