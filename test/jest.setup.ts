// `jest-dom` extensions (for example, `expect` extension)
import '@testing-library/jest-dom';
import {configure} from '@testing-library/react';
import * as dotenv from 'dotenv';

dotenv.config();

import {initMockApi} from './init/api';
import {initMockConsoleBehavior} from './init/console';

// Automatically retry test
jest.retryTimes(3);

// Set findBy* and waitFor, etc. to 5 secs timeout
// https://github.com/testing-library/react-testing-library/issues/899#issuecomment-819761678
configure({asyncUtilTimeout: 5000});

initMockApi();
initMockConsoleBehavior();
