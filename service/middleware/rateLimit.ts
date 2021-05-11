// False positive of `esModuleInterop` not provided
// @ts-ignore
import rateLimit from 'express-rate-limit';

export const commonRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // 30 for each IP
});
