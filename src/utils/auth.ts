import {AUTH_DB, AUTH_USER_COLLECTION, UserDocumentKey} from '../api-def/models';
import {generateMongoClient} from './db/client';


export const ensureIndex = async () => {
  const mongoDb = await generateMongoClient(AUTH_DB).connect();

  await mongoDb
    .db(AUTH_DB)
    .collection(AUTH_USER_COLLECTION)
    .createIndex([UserDocumentKey.adsFreeExpiry], {expireAfterSeconds: 1});
};
