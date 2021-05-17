import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  // Basic options
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  // Coverage
  collectCoverage: true,
  collectCoverageFrom: [
    './server/**/*.ts',
    // Node environment files
    '!**/node_modules/**',
    // React app files
    '!./src/**/*.ts',
  ],
  coverageDirectory: '.',
  coverageReporters: ['clover'],
};
// noinspection JSUnusedGlobalSymbols
export default config;
