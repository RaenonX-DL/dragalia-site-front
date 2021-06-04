import fastify from 'fastify';
import next from 'next';

import {initHerokuNginx} from './utils/init/herokuNginx';
import {initHttp} from './utils/init/http';
import {isAppOnHeroku, isProduction} from './utils/misc';

// Starts New Relic APM
if (isProduction()) {
  require('newrelic');
}

const nextApp = next({
  dev: !isProduction(),
  customServer: true,
});

nextApp.prepare()
  .then(async () => {
    const nextHandler = nextApp.getRequestHandler();
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

    // FIXME: Check page list working correctly (contains `start` as params)
    fastifyApp.all('/*', async (req, res) => {
      await nextHandler(req.raw, res.raw);
      res.sent = true;
    });

    if (!isAppOnHeroku()) {
      await initHttp(fastifyApp);
      return;
    }

    await initHerokuNginx(fastifyApp);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
