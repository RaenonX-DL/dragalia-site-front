import * as dotenv from 'dotenv';

import {ApiEndPoints} from '../src/api-def/api/endpoints';

dotenv.config();

export const ADS_CLIENT = 'ca-pub-1535004092052078';

export const API_ROOT = process.env.REACT_APP_API_ROOT;

if (!API_ROOT) {
  console.error('Website API root must be defined in environment variables as `REACT_APP_API_ROOT`.');
  process.exit(1);
}

export const API_PAGE_META = API_ROOT + ApiEndPoints.USER_SHOW_ADS;
