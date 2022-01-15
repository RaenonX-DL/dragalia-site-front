import env from 'env-var';
import {MongoClient} from 'mongodb';
import urlJoin from 'url-join';

import {isCi} from '../../api-def/utils';


const generateMongoClientUrl = (db?: string) => {
  const clientUrl = env.get('AUTH_DATABASE_URL')
    .required(!isCi())
    .example('mongodb://localhost:27017/')
    .asString();

  if (!db) {
    return clientUrl;
  }

  return urlJoin(clientUrl, db);
};

export const generateMongoClient = (db?: string) => {
  return new MongoClient(generateMongoClientUrl(db), {appName: 'dragalia-site-front'});
};
