// False positive of `esModuleInterop` not provided
// @ts-ignore
import express from 'express';

import {handleRoot} from './handlers/root';
import {commonRateLimiter} from './middleware/rateLimit';
import {PATH_BUILD_DIR} from './paths';

const app = express();

// Middleware
app.use(commonRateLimiter);

app.use('/', handleRoot);
app.use('/', express.static(PATH_BUILD_DIR));

app.listen(process.env.PORT || 5000, () => {
  console.log(`server started on port ${process.env.PORT || 5000}`);
});
