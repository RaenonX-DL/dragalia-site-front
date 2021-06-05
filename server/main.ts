import {createApp} from './utils/init';
import {initHerokuNginx} from './utils/init/herokuNginx';
import {initHttp} from './utils/init/http';
import {isAppOnHeroku, isProduction} from './utils/misc';

// Starts New Relic APM
if (isProduction()) {
  require('newrelic');
}

(async () => {
  const {fastifyApp} = await createApp();

  if (!isAppOnHeroku()) {
    await initHttp(fastifyApp);
    return;
  }

  await initHerokuNginx(fastifyApp);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
