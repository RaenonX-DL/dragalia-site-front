'use strict';
const env = require('env-var');

const {isProduction} = require('./src/api-def/utils');

/**
 * New Relic agent configuration.
 *
 * See lib/config/default.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  app_name: ['DL Site (Front)'],
  license_key: env.get('NEW_RELIC_LICENSE_KEY')
    .required(isProduction())
    .asString(),
  distributed_tracing: {
    enabled: true,
  },
  logging: {
    enabled: false,
  },
  allow_all_headers: true,
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*',
    ],
  },
};
