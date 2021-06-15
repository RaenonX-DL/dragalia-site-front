import type {Config} from '@jest/types';


const testFileGlob = './**/+(*.)+(spec|test).ts?(x)';

const dependenciesExclusionGlob = '!**/node_modules/**';

const cypressExclusionGlobs = [
  // No files from hidden cypress folder
  '!**/.cypress/**',
  // No files from cypress folder
  '!**/cypress/**',
];

const config: Config.InitialOptions = {
  // Basic options
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': './test/transformers/babel.js',
    '^.+\\.css$': './test/transformers/css.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': './test/transformers/file.js',
  },
  resetMocks: true,
  testMatch: [
    // Include test files
    testFileGlob,
    // Exclude dependencies
    dependenciesExclusionGlob,
    // Exclude cypress files
    ...cypressExclusionGlobs,
  ],
  // Setup / Teardown
  setupFiles: [
    'dotenv/config',
    'react-app-polyfill/jsdom',
  ],
  setupFilesAfterEnv: [
    './test/jest.setup.ts',
  ],
  // Coverage
  collectCoverageFrom: [
    // Include all `ts` or `tsx` files in `src`
    './src/**/*.ts?(x)',
    // Exclude test files
    `!${testFileGlob}`,
    // Exclude dependencies
    dependenciesExclusionGlob,
    // Exclude cypress files
    ...cypressExclusionGlobs,
    // Exclude type definition files
    '!./**/*.d.ts',
  ],
  coverageDirectory: '.',
  coverageReporters: [
    'clover',
  ],
};

// noinspection JSUnusedGlobalSymbols
export default config;
