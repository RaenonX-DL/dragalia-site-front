import {FastifyReply, FastifyRequest} from 'fastify';

export const isAccessRestricted = async (req: FastifyRequest, res: FastifyReply) => {
  if (req.url.endsWith('html')) {
    res.status(403).send('403 Forbidden');
    return true;
  }

  return false;
};
