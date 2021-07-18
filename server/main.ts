import {createApp} from './utils/init';
import {initHttp} from './utils/init/http';
import {isProduction} from './utils/misc';


// Starts New Relic APM
if (isProduction()) {
  require('newrelic');
}

(async () => {
  const {fastifyApp} = await createApp();

  await initHttp(fastifyApp);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
