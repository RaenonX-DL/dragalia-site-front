import fastify from 'fastify';

import {mainHandler} from './handler/main';
import {isAppOnHeroku} from './utils/init/heroku';
import {initHerokuNginx} from './utils/init/herokuNginx';
import {initHttp} from './utils/init/http';

// Start New Relic APM
require('newrelic');

const app = fastify({
  logger: true,
  connectionTimeout: 20000, // 20 seconds
  trustProxy: isAppOnHeroku(),
});

// Handle all routes using the same handler
app.get('/*', mainHandler);

(async () => {
  if (!isAppOnHeroku()) {
    await initHttp(app);
    return;
  }

  await initHerokuNginx(app);
})().catch((err) => {
  app.log.error(err);
  process.exit(1);
});
