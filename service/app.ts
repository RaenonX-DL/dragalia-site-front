import compression from 'compression';
import express from 'express';

import {handleRoot} from './handlers/root';
import {PATH_BUILD_DIR} from './paths';

const app = express();

// Middleware
app.use(compression());

app.use('/', handleRoot);
app.use('/', express.static(PATH_BUILD_DIR));

app.listen(process.env.PORT || 5000, () => {
  console.log(`server started on port ${process.env.PORT || 5000}`);
});
