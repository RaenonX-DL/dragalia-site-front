import fastify from 'fastify';

import {mainHandler} from './handler/main';

const app = fastify({
  logger: true,
  connectionTimeout: 20000, // 20 seconds
});

// Handle all routes using the same handler
app.get('/*', mainHandler);

(async () => {
  await app.listen(process.env.PORT || 5000, process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost');
})().catch((err) => {
  app.log.error(err);
  process.exit(1);
});
