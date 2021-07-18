import {FastifyInstance} from 'fastify';


export const initHttp = async (app: FastifyInstance) => {
  await app.listen(
    process.env.PORT || 3000,
    'localhost',
  );
  console.log('App started listening.', app.server.address());
};
