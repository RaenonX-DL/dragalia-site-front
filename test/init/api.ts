import fs from 'fs';
import path from 'path';

import {rest} from 'msw';
import {setupServer} from 'msw/node';

import {ResourcePaths} from '../../src/api-def/resources';

export const initMockApi = () => {
  const server = setupServer(
    rest.get('*', async (req, res, ctx) => {
      const fileContent = fs.readFileSync(
        path.join(
          'test',
          'data',
          'resources',
          req.url.href.replace(ResourcePaths.ROOT || '', ''),
        ),
        'utf-8',
      );
      return res(ctx.json(JSON.parse(fileContent)));
    }),
  );

  // Enable API mocking
  beforeAll(() => server.listen());

  // Reset any runtime request handlers added during single test case
  afterEach(() => server.resetHandlers());

  // Disable API mocking
  afterAll(() => server.close());
};
