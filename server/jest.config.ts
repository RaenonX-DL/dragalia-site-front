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
    // All files in the children directory of the current directory
    './**/*.ts',
  ],
  coverageDirectory: '.',
  coverageReporters: ['clover'],
};

// noinspection JSUnusedGlobalSymbols
export default config;
