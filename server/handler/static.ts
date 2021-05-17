import {promises as fs} from 'fs';
import path from 'path';

import {FastifyReply, FastifyRequest} from 'fastify';
import mime from 'mime/lite';

import {PATH_BUILD_DIR} from '../paths';

export const isStaticFile = async (req: FastifyRequest, res: FastifyReply) => {
  const staticFilePath = path.join(PATH_BUILD_DIR, req.url);

  try {
    // If file exists, consider it as a static file
    const assetFile = await fs.readFile(staticFilePath);

    // Per RFC-7231: Do not send content-type if it is unknown
    // - https://stackoverflow.com/a/28652339/11571888
    const mimeType = mime.getType(staticFilePath);
    if (mimeType) {
      res = res.type(mimeType);
    }

    res.send(assetFile);
    return true;
  } catch (e) {
    // If the path is a file, return 404
    if (staticFilePath.includes('.')) {
      res.status(404).send();
      return true;
    }

    return false;
  }
};
