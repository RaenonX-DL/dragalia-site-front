import fs from 'fs';
import path from 'path';

import {rest} from 'msw';
import {setupServer} from 'msw/node';

import {ResourcePaths} from '../../src/api-def/resources';


export const mswServer = setupServer(
  rest.get('/api/auth/session', async (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.get(`${ResourcePaths.ROOT}/*`, async (req, res, ctx) => {
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

export const initMockApi = () => {
  beforeAll(() => {
    // Enable API mocking (mock automatically cleared by `jest` so no need to `.close()` here)
    mswServer.listen({
      // Should not send any external requests
      onUnhandledRequest: 'error',
    });
  });

  beforeEach(() => {
    // Reset any runtime request handlers added during single test case
    mswServer.resetHandlers();
  });
};
