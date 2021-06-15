import {FastifyInstance} from 'fastify';


export const registerContentParsers = (fastifyApp: FastifyInstance) => {
  // Used by `nextauth.js`
  // - Bypasses any handling behaviors to let `next.js` handle it
  fastifyApp.addContentTypeParser(
    'application/x-www-form-urlencoded',
    async () => void 0,
  );
};
