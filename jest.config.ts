import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  // Basic options
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': './test/transformers/babel.js',
    '^.+\\.css$': './test/transformers/css.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': './test/transformers/file.js',
  },
  resetMocks: true,
  // Setup / Teardown
  setupFiles: [
    'dotenv/config',
    'react-app-polyfill/jsdom',
  ],
  setupFilesAfterEnv: [
    './test/jest.setup.ts',
  ],
  // Coverage
  collectCoverage: true,
  collectCoverageFrom: [
    // All script files in the children directory of the current directory
    './**/*.{js,jsx,ts,tsx}',
    // No type definition files
    '!./**/*.d.ts',
    // No node module files
    '!./node_modules/**/*',
  ],
  coverageDirectory: '.',
  coverageReporters: [
    'clover',
  ],
};

// noinspection JSUnusedGlobalSymbols
export default config;
