// `jest-dom` extensions (for example, `expect` extension)
import '@testing-library/jest-dom';

import * as dotenv from 'dotenv';

dotenv.config();

import {initMockApi} from './init/api';
import {initMockConsoleBehavior} from './init/console';

jest.retryTimes(3);

initMockApi();
initMockConsoleBehavior();
