import {FastifyReply, FastifyRequest} from 'fastify';

export type HandlerFunction = (req: FastifyRequest, res: FastifyReply) => Promise<boolean>;
