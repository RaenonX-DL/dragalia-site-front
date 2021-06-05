// `jest-dom` extensions (for example, `expect` extension)
import '@testing-library/jest-dom';

import * as dotenv from 'dotenv';

dotenv.config();

import {initMockApi} from './init/api';


initMockApi();
