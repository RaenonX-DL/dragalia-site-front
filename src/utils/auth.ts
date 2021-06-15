import {getMongoManager} from 'typeorm';

import {UserModel} from '../models/user';


export const ensureIndex = async () => {
  const mongoManager = getMongoManager('nextauth');

  await mongoManager.createCollectionIndex(
    UserModel.name,
    'adsFreeExpiry',
    {expireAfterSeconds: 1},
  );
};
