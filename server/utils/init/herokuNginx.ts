import fs from 'fs';

import {FastifyInstance} from 'fastify';


export const initHerokuNginx = async (app: FastifyInstance) => {
  console.log('The app is on heroku.');

  console.log('Initializing nginx.');
  fs.openSync('/tmp/app-initialized', 'w');

  console.log('Listening on nginx socket.');
  await app.listen('/tmp/nginx.socket');
};
