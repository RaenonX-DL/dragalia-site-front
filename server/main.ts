import * as dotenv from 'dotenv';


dotenv.config();

import {isProduction} from '../src/api-def/utils';
import {createApp} from './utils/init';
import {initHttp} from './utils/init/http';


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
